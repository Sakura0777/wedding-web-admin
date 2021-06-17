<template>
  <div>
    <editor id="tinymce" v-model="value" :init="init"></editor>
  </div>
</template>

<script lang="ts">
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
    "preview fullscreen link lists image media table textcolor wordcount contextmenu ";
  toolbar =
    "undo redo | formatselect bold italic forecolor removeformat |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent  |table image media  link|  preview fullscreen";
  init = {
    // selector: "#tinymce",
    language_url: "tinymce/langs/zh_CN.js", //语言包的路径
    language: "zh_CN", //语言
    content_css: "tinymce/skins/content/default/content.css",
    skin_url: "tinymce/skins/ui/oxide", //skin路径
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
      let imageForm = new FormData();
      imageForm.append("file", file);
      imageUploadApi(imageForm)
        .then((res) => {
          // success(res.data.path);
          success(picUrlFormat(res.data.path));
        })
        .catch((e) => {
          fail(e);
        });
    },
    file_picker_types: " media",
    media_live_embeds: true,
    file_picker_callback: function (
      callback: Function,
      value: Object,
      meta: any
    ) {
      if (meta.filetype == "media") {
        // callback(this.uploadVideo());
        //模拟出一个input用于添加本地文件
        let input = document && document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "video/*");
        input.click();
        input.onchange = function (e: any) {
          console.log('eeeeeeeeee',e)
          let file = e.target.files[0];
          let videoFrom = new FormData();
          videoFrom.append("file", file);
          videoUploadApi(videoFrom)
            .then((res) => {
              callback(picUrlFormat(res.data.path));
            })
            .catch((e) => {
              callback(e);
            });
        };
      }
    },
    media_url_resolver: function (data: any, resolve: Function) {
      try {
        let embedHtml = `<p>
                 <span
                data-mce-selected="1"
                data-mce-object="video"
                data-mce-p-controls="controls"
                data-mce-p-controlslist="nodownload"
                data-mce-p-allowfullscreen="true"
                style="width: 500px;height:300px;display: block;"
                data-mce-p-src=${data.url} >
                <video src=${data.url} width="100%" height="100%" controls="controls" controlslist="nodownload">
                </video>
              </span>
                </p>
                <p style="text-align: left;"></p>`;
        resolve({ html: embedHtml });
      } catch (e) {
        resolve({ html: "" });
      }
    },
  };

  mounted() {
    console.log('999999999999999',this.tinymceHtml)
    this.value =  this.tinymceHtml;
    tinymce.init({});
  }

  @Watch("tinymceHtml")
  getTinymceHtml(newValue: any) {
    this.value = newValue;
  }
  @Watch("value")
  sendValue() {
    this.$emit("input", this.value);
  }
}
</script>
