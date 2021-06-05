<template>
  <div>
    <editor id="tinymce" v-model="value" :init="init"></editor>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
import "tinymce/plugins/preview"
@Component({
  name: "tinymceEditor",
  components: {
    Editor,
  },
})
export default class extends Vue {
  value = "";
  plugins = "preview fullscreen link lists image media table textcolor wordcount contextmenu ";
  toolbar =
    "undo redo | formatselect bold italic forecolor removeformat |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent  |table image media  link|  preview fullscreen";
  init = {
    // selector: "#tinymce",
    language_url: "tinymce/langs/zh_CN.js", //语言包的路径
    language: "zh_CN", //语言
    content_css: "tinymce/skins/content/default/content.css",
    skin_url: "tinymce/skins/ui/oxide", //skin路径
    width: 950,
    height: 680, //编辑器高度
    branding: true, //是
    placeholder:'请在这里输入文章内容',
    toolbar: this.toolbar,
    menubar: false,
    plugins: this.plugins,
    // contextmenu: this.toolbar,
    images_upload_handler: function (blobInfo, succFun, failFun) {
      blobInfo.blob(); //转化为易于理解的file对象
    },
    file_picker_types: "file image media",
    file_picker_callback: function (callback, value, meta) {
      if (meta.filetype == "file") {
        callback("mypage.html", { text: "My text" });
      }
      // Provide image and alt text for the image dialog
      if (meta.filetype == "image") {
        callback("myimage.jpg", { alt: "My alt text" });
      }
      // Provide alternative source and posted for the media dialog
      if (meta.filetype == "media") {
        callback("movie.mp4", { source2: "alt.ogg", poster: "image.jpg" });
      }
    },
  };

  mounted() {
    tinymce.init({});
  }
}
</script>
