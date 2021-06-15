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
            style="width: 60px; height: 60px"
            :src="picUrlFormat(scope.row.photo)"
            :preview-src-list="[picUrlFormat(scope.row.photo)]"
          >
          </el-image>
        </template>
        ></el-table-column
      >
      <el-table-column label="跳转地址" align="center">
        <template slot-scope="scope">
          <el-link :href="scope.row.jump_url" target="_blank" type="primary">{{
            scope.row.jump_url
          }}</el-link>
        </template></el-table-column
      >
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
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyBtn(scope.row)">修改</el-button>
          <el-button
            type="text"
            style="color: #e83929"
            @click="deleteBtn(scope.row.id)"
            >删除</el-button
          >
        </template>
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
        :rules="inputRules"
        ref="newSliceShow"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="newSliceShow.title"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址" prop="jump_url">
          <el-input v-model="newSliceShow.jump_url"></el-input>
        </el-form-item>
        <p style="margin-left: 100px; font-size: 12px; color: #409eff">
          跳转地址，如果是内部文章跳转，可以不加域名，例如/article/1.html，如果是跳转外部链接则需加上域名，例如：https://www.baidu.com
        </p>
        <el-form-item label="排序" prop="sort">
          <el-input
            type="number"
            placeholder="请输入一个整数"
            v-model.number="newSliceShow.sort"
          ></el-input>
          <p>数字越大，排序越靠前</p>
        </el-form-item>
        <el-form-item label="图片">
          <image-upload
            :imageSrc="newSliceShow.photo"
            @change="(e) => (newSliceShow.photo = e)"
          ></image-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearForm('newSliceShow')" :disabled="submiting"
            >取消</el-button
          >
          <el-button type="primary" :loading="submiting" @click="submitAdd()"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      width="50%"
      title="修改轮播图"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible2"
      :show-close="!submiting"
    >
      <el-form
        :model="modifySliceShow"
        status-icon
        :rules="inputRules"
        ref="modifySliceShow"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="modifySliceShow.title"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址" prop="jump_url">
          <el-input v-model="modifySliceShow.jump_url"></el-input>
        </el-form-item>
        <p style="margin-left: 100px; font-size: 12px; color: #409eff">
          跳转地址，如果是内部文章跳转，可以不加域名，例如/article/1.html，如果是跳转外部链接则需加上域名，例如：https://www.baidu.com
        </p>
        <el-form-item label="排序" prop="sort">
          <el-input
            type="number"
            placeholder="请输入一个整数"
            v-model.number="modifySliceShow.sort"
          ></el-input>
          <p>数字越大，排序越靠前</p>
        </el-form-item>
        <el-form-item label="图片">
          <image-upload
            :imageSrc="modifySliceShow.photo"
            @change="(e) => (modifySliceShow.photo = e)"
          ></image-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearForm('modifySliceShow')" :disabled="submiting"
            >取消</el-button
          >
          <el-button type="primary" :loading="submiting" @click="submitModify()"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { timeFormat, picUrlFormat } from "@/utils/format";
import imageUpload from "../../components/imageUpload.vue";
import {
  sliceShowListApi,
  sliceShowDeleteApi,
  sliceShowUpdateApi,
  sliceShowAddApi,
} from "@/api/api";
@Component({
  name: "index",
  components: {
    imageUpload,
  },
})
export default class extends Vue {
  isLoading: boolean = false;
  submiting: Boolean = false;
  dialogFormVisible: Boolean = false;
  dialogFormVisible2: Boolean = false;
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
    sort: 0,
    jump_url: "",
  };
  modifySliceShow: any = {
    id: "",
    title: "",
    photo: "",
    sort: 0,
    jump_url: "",
  };
  inputRules: any = {
    title: [
      {
        type: "string",
        required: true,
        message: "标题不能为空",
        trigger: "blur",
      },
    ],
    sort: [
      {
        type: "number",
        required: true,
        message: "排序不能为空",
        trigger: "blur",
      },
    ],
    jump_url: [
      {
        type: "string",
        required: true,
        message: "跳转地址不能为空",
        trigger: "blur",
      },
    ],
  };
  timeFormat = timeFormat;
  picUrlFormat = picUrlFormat;
  mounted() {
    this.getSliceShowList(true);
  }
  async getSliceShowList(isFirst?: boolean, isSerach?: Boolean) {
    if (this.isLoading) return;
    this.isLoading = true;
    if (isFirst) this.page.pn = 1;
    if (!isSerach) {
      this.page.key = "";
    }
    let res = await sliceShowListApi(this.page);

    this.page.total = res.data.count;
    this.tableData = res.data.list;
    this.isLoading = false;
  }
  deleteBtn(id: Number) {
    this.$confirm("你确定要删除该轮播图吗", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        let params = {
          id: id,
        };
        let res = await sliceShowDeleteApi(params);
        this.$message.success("轮播图删除成功");

        this.getSliceShowList(true);
      })
      .catch(() => {
        return;
      });
  }
  modifyBtn(item: Object) {
    this.modifySliceShow = item;
    this.dialogFormVisible2 = true;
  }
  submitAdd() {
    (this.$refs["newSliceShow"] as any).validate((valid: boolean) => {
      if (valid) {
    if (this.newSliceShow.photo === "") {
      return this.$message.error("请先上传图片");
    }
    if (this.submiting) return;
    this.submiting = true;
    sliceShowAddApi(this.newSliceShow)
      .then((res) => {
        this.$message.success("新增轮播图成功");
        this.clearForm("newSliceShow");
        this.getSliceShowList(true);
      })
      .catch(() => {})
      .finally(() => {
        this.submiting = false;
      });
      }
    })
  }
  submitModify() {
    (this.$refs["modifySliceShow"] as any).validate((valid: boolean) => {
      if (valid) {
      if (this.modifySliceShow.photo === "") {
        return this.$message.error("请先上传图片");
      }
      if (this.submiting) return;
      this.submiting = true;
      sliceShowUpdateApi(this.modifySliceShow)
        .then((res) => {
          this.$message.success("轮播图修改成功");
          this.clearForm("modifySliceShow");
          this.getSliceShowList(true);
        })
        .catch(() => {})
        .finally(() => {
          this.submiting = false;
        });
        }
        })
  }
  handleSizeChange(size: number) {
    this.page.size = size;
    this.getSliceShowList(true);
  }

  handleCurrentChange(current: number) {
    this.page.pn = current;
    this.getSliceShowList();
  }
  clearForm(name: String) {
    this.$refs[name].resetFields();
    this.dialogFormVisible = false;
    this.dialogFormVisible2 = false;
  }
}
</script>
<style lang="scss" scoped>
@import url("../scss/index.scss");
</style>
