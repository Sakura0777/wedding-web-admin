<template>
  <div class="imageUploadBox">
    <input
      style="opacity: 0; height: 80px; width: 80px"
      id="fileInput"
      type="file"
      ref="image"
      accept="image/png,image/jpeg,image/gif,image/jpg,image/bmp"
      @change="uploadPhoto"
    />
    <el-image
      class="avatar-uploader-icon"
      v-if="imageSrc !== ''"
      :src="picUrlFormat(imageSrc)"
      :preview-src-list="[picUrlFormat(imageSrc)]"
    >
    </el-image>
    <i
      v-else
      class="avatar-uploader-icon el-icon-plus"
      @click="focusFileInput"
    ></i>
    <el-button
      v-if="imageSrc !== ''"
      type="text"
      style="margin-left: 10px; margin-top: 58px"
      @click="focusFileInput"
      >更换</el-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { imageUploadApi } from "@/api/api";
import { picUrlFormat } from "@/utils/format";
@Component({
  name: "imageUpload",
  components: {},
})
export default class extends Vue {
  @Prop({ default: "" }) imageSrc: String | undefined;
  picUrlFormat = picUrlFormat;
  focusFileInput() {
    document.getElementById("fileInput").click();
  }
  async uploadPhoto() {
    let file = (this.$refs.image as any).files[0];
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      return this.$message.error("上传头像图片大小不能超过 10MB!");
    }
    let imageForm = new FormData();
    imageForm.append("file", file);
    let res = await imageUploadApi(imageForm);
    this.$emit("change", res.data.path);
  }
}
</script>
<style lang="scss" scoped>
.imageUploadBox {
  position: relative;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  display: inline-block;
  position: absolute;
  left: 0;
}
</style>
