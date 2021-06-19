<template>
  <div>
    <editor id="tinymce" v-model="value" :init="init"></editor>
  </div>
</template>

<script lang="ts">
import { baseImgUrl } from "@/api/apiConfig";
import { Loading } from 'element-ui';
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { imageUploadApi, videoUploadApi } from "@/api/api";
import { picUrlFormat } from "@/utils/format";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/icons/default/icons";
import "tinymce/themes/silver";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/preview";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/charmap";
@Component({
  name: "tinymceEditor",
  components: {
    Editor,
  },
})
export default class extends Vue {
  @Prop({ default: "" }) tinymceHtml!: String;
  value:String = '';
  plugins =
    "charmap preview fullscreen link lists image media table textcolor wordcount contextmenu emoticons ";
  toolbar =
    "undo redo | formatselect bold italic forecolor removeformat |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent  |emoticons charmap table | image media  link|  preview fullscreen";
  init = {
    // selector: "#tinymce",
    language_url: "tinymce/langs/zh_CN.js", //语言包的路径
    language: "zh_CN", //语言
    content_css: "tinymce/skins/content/default/content.css",
    skin_url: "tinymce/skins/ui/oxide", //skin路径
    emoticons_database_url: 'tinymce/emoticons/js/emojis.js',
    width: 1000,
    height: 680, //编辑器高度
    branding: true, //是
    placeholder: "请在这里输入文章内容",
    toolbar: this.toolbar,
    menubar: false,
    plugins: this.plugins,
    images_upload_handler: function (
      blobInfo: any,
      success: Function,
      fail: Function
    ) {
      let file = blobInfo.blob(); //转化为易于理解的file对象
      // let loadingInstance = Loading.service({ target:Object=document.getElementsByClassName('tox-dialog')[0] });
      let imageForm = new FormData();
      imageForm.append("file", file);
      imageUploadApi(imageForm)
        .then((res) => {
          // loadingInstance.close();
          success(picUrlFormat(res.data.path));
        })
        .catch((e) => {
          fail(e);
        });
    },
    file_picker_types: "media",
    media_live_embeds: true,
    file_picker_callback: function (
      callback: Function,
      value: Object,
      meta: any
    ) {
      console.log('^^^^^^^^^^^^^',meta)
      if (meta.filetype == "media") {
        // callback(this.uploadVideo());
        //模拟出一个input用于添加本地文件
        let input = document && document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "video/*");
        input.click();
        input.onchange = function (e: any) {
          let file = e.target.files[0];
            // let loadingInstance = Loading.service({ target:Object=document.getElementsByClassName('tox-dialog')[0] });
          let videoFrom = new FormData();
          videoFrom.append("file", file);
          videoUploadApi(videoFrom)
            .then((res) => {
              // loadingInstance.close();
              callback(picUrlFormat(res.data.path));
            })
            .catch((e) => {
              callback(e);
            });
        };
      }
    },
    // media_url_resolver: function (data: any, resolve: Function) {
    //   // try {
    //     let embedHtml = `
    //              <span
    //             data-mce-selected="1"
    //             data-mce-object="video"
    //             data-mce-p-controls="controls"
    //             data-mce-p-controlslist="nodownload"
    //             data-mce-p-allowfullscreen="true"
    //             style="width: 500px;height:300px;display: block;"
    //             data-mce-p-src=${data.url} >
    //             <video src=${data.url} width="100%" height="100%" controls="controls" controlslist="nodownload">
    //             </video>
    //           </span>`;
    //     console.log('@@@@@@@@@@@@',data)
    //     resolve({ html: embedHtml || '' });
    //     embedHtml = ''
    //   // } catch (e) {
    //   //   resolve({ html: "" });
    //   // }
    // },
  };

  mounted() {
    console.log('this.tinymceHtml',this.tinymceHtml)
    if(this.tinymceHtml !== ''){
      let str1 = '/storage/video'
      let str2 = '/storage/images'
      let  sendData=this.tinymceHtml.replace(new RegExp(str1, "g"), baseImgUrl.substr(1)+str1)
       sendData=sendData.replace(new RegExp(str2, "g"), baseImgUrl.substr(1)+str2)
       console.log('sendData',sendData)
    this.value =  sendData;
    } 
    tinymce.init({});
  }

  @Watch("value")
  sendValue() {
    console.log('5555555555',this.value)
    let sendData=this.value.replace(new RegExp(baseImgUrl, "g"),'')
    sendData=sendData.replace(new RegExp(baseImgUrl.substr(1), "g"),'')
    console.log('sendData',sendData)
    this.$emit("input", sendData);
  }
}
</script>
<style lang="scss" scoped>
</style>
