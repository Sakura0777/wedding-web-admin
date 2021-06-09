<template>
  <div>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="8">
        <el-input
          size="medium"
          placeholder="请输入标题"
          v-model="page.key"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="14">
        <el-button type="primary" plain @click="getSliceShowList(true, true)"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain @click="dialogFormVisible = true"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%; margin-top: 15px"
    >
      <el-table-column
        prop="title"
        label="标题"
        align="center"
      ></el-table-column>
      <el-table-column prop="photo" label="图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="scope.row.photo"
            :preview-src-list="[scope.row.photo]"
          >
          </el-image>
        </template>
        ></el-table-column
      >
      <el-table-column
        prop="jump_url"
        label="跳转地址"
        align="center"
      ></el-table-column>
      <el-table-column
        :formatter="
          (row) => timeFormat(row.create_time * 1000, 'yyyy-MM-dd hh:mm')
        "
        label="添加时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="text">修改</el-button>
        <el-button type="text" style="color: #e83929">删除</el-button>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top: 15px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pn"
        :page-sizes="[5, 10]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-row>
    <el-dialog
      width="50%"
      title="添加轮播图"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :show-close="!submiting"
    >
      <el-form
        :model="newSliceShow"
        status-icon
        ref="newSliceShow"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="newSliceShow.title"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址" prop="jump_url">
          <el-input v-model="newSliceShow.jump_url"></el-input>
          <p>
            跳转地址，如果是内部文章跳转，可以不加域名，例如/article/1.html，如果是跳转外部链接则需加上域名，例如：https://www.baidu.com
          </p>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input
            type="number"
            placeholder="请输入一个整数"
            v-model="newSliceShow.sort"
          ></el-input>
          <p>数字越大，排序越靠前</p>
        </el-form-item>
        <el-form-item label="图片">
          <div class="imageUploadBox">
            <v-icon name="trash-alt" style="margin-left:80px" @click="newSliceShow.photo=''"></v-icon>
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
              v-if="newSliceShow.photo !== ''"
              :src="`http://material.shilim.cn${newSliceShow.photo}`"
              :preview-src-list="[`http://material.shilim.cn${newSliceShow.photo}`]"
            >
            </el-image>
            <i
              v-else
              class="avatar-uploader-icon el-icon-plus"
              @click="focusFileInput"
            ></i>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearForm('newUser')" :disabled="submiting"
            >取消</el-button
          >
          <el-button type="primary" :loading="submiting" @click="submitAdd()"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { timeFormat } from "@/utils/format";
import {
  sliceShowListApi,
  sliceShowDeleteApi,
  sliceShowUpdateApi,
  sliceShowAddApi,
  imageUploadApi,
} from "@/api/api";
@Component({
  name: "index",
})
export default class extends Vue {
  isLoading: boolean = false;
  submiting: Boolean = false;
  dialogFormVisible: Boolean = false;
  tableData: any = [];
  page: any = {
    key: "",
    type: 2,
    id: "",
    pn: 1,
    size: 5,
    total: 0,
  };
  newSliceShow: any = {
    title: "",
    photo: "",
    sort: "",
    jump_url: "",
  };
  timeFormat = timeFormat;
  mounted() {
    this.getSliceShowList(true);
  }
  focusFileInput() {
    document.getElementById("fileInput").click();
  }
  async uploadPhoto() {
    console.log("图片", this.$refs.image.files);
    let imageForm = new FormData();
    imageForm.append("file", this.$refs.image.files[0]);
    let res = await imageUploadApi(imageForm);
    console.log(res);
    this.newSliceShow.photo = res.data.path;
  }
  beforeAvatarUpload(file) {
    // jpg,jpeg,png,jpeg,png,gif,bmp
    const isType = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/bmp",
    ].includes(file.type);
    const isLt10M = file.size / 1024 / 1024 < 10;

    if (!isType) {
      this.$message.error("上传图片只能是 jpg,jpeg,png,gif,bmp 格式!");
    }
    if (!isLt10M) {
      this.$message.error("上传头像图片大小不能超过 10MB!");
    }
    return isJPG && isLt2M;
  }
  async getSliceShowList(isFirst?: boolean, isSerach?: Boolean) {
    console.log("时间", this.dateRange);
    if (this.isLoading) return;
    this.isLoading = true;
    if (isFirst) this.page.pn = 1;
    if (!isSerach) {
      this.page.key = "";
    }
    let res = await sliceShowListApi(this.page);
    console.info("留言列表接口返回了哦", res);
    this.page.total = res.data.count;
    this.tableData = res.data.list;
    this.isLoading = false;
  }
  handleSizeChange(size: number) {
    this.page.size = size;
    this.getSliceShowList(true);
  }

  handleCurrentChange(current: number) {
    this.page.pn = current;
    this.getSliceShowList();
  }
}
</script>
<style lang="scss" scoped>
@import url("../scss/index.scss");
</style>
