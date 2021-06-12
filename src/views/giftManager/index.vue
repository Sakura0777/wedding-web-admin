<template>
  <div>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="24" align="right">
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
        prop="introduce"
        label="礼包内容简介"
        align="center"
      ></el-table-column>
      <el-table-column prop="picture" label="图片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="picUrlFormat(scope.row.picture)"
            :preview-src-list="[picUrlFormat(scope.row.picture)]"
          >
          </el-image>
        </template>
        ></el-table-column
      >
      <el-table-column
        :formatter="
          (row) => timeFormat(row.create_time * 1000, 'yyyy-MM-dd hh:mm')
        "
        label="添加时间"
        align="center"
      ></el-table-column>
      <el-table-column
        label="状态"
        :formatter="(row) => (row.flag ? '已启用' : '停用')"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #e83929"
            v-if="scope.row.flag === 1"
            @click="modifyGiftStatus(scope.row.id, 0)"
            >停用</el-button
          >
          <el-button
            type="text"
            v-else
            @click="modifyGiftStatus(scope.row.id, 1)"
            >启用</el-button
          >
          <el-button type="text" @click="modifyBtn(scope.row)">修改</el-button>
          <el-button
            type="text"
            style="color: #e83929"
            @click="modifyGiftStatus(scope.row.id, 2)"
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
      title="添加礼包"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :show-close="!submiting"
    >
      <el-form
        :model="newGift"
        status-icon
        :rules="inputRules"
        ref="newGift"
        label-width="100px"
      >
        <el-form-item label="简介" prop="introduce">
          <el-input
            placeholder="请输入礼包描述"
            v-model="newGift.introduce"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <image-upload
            :imageSrc="newGift.picture"
            @change="(e) => (newGift.picture = e)"
          ></image-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearForm('newGift')" :disabled="submiting"
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
      title="修改礼包"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible2"
      :show-close="!submiting"
    >
      <el-form
        :model="modifyGift"
        status-icon
        :rules="inputRules"
        ref="modifyGift"
        label-width="100px"
      >
        <el-form-item label="简介" prop="introduce">
          <el-input
            placeholder="请输入礼包描述"
            v-model="modifyGift.introduce"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <image-upload
            :imageSrc="modifyGift.picture"
            @change="(e) => (modifyGift.picture = e)"
          ></image-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearForm('modifyGift')" :disabled="submiting"
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
  giftListApi,
  giftDeleteApi,
  giftUpdateApi,
  giftAddApi,
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
    type: 2,
    id: "",
    pn: 1,
    size: 5,
    total: 0,
  };
  newGift: any = {
    introduce: "",
    picture: "",
  };
  modifyGift: any = {
    id: "",
    introduce: "",
    picture: "",
  };
  inputRules: any = {
    introduce: [
      {
        type: "string",
        required: true,
        message: "简介不能为空",
        trigger: "blur",
      },
    ],
  };
  timeFormat = timeFormat;
  picUrlFormat = picUrlFormat;
  mounted() {
    this.getGiftList(true);
  }
  async getGiftList(isFirst?: boolean, isSerach?: Boolean) {
    if (this.isLoading) return;
    this.isLoading = true;
    if (isFirst) this.page.pn = 1;
    if (!isSerach) {
      this.page.key = "";
    }
    let res = await giftListApi(this.page);
    this.page.total = res.data.count;
    this.tableData = res.data.list;
    this.isLoading = false;
  }
  modifyGiftStatus(id: number, option: number) {
    let msg = "";
    switch (option) {
      case 0:
        msg = "你确定要停用此礼包吗？";
        break;
      case 1:
        msg = "你确定要启用此礼包吗？";
        break;
      case 2:
        msg = "你确定要删除此礼包吗？";
        break;
    }
    this.$confirm(msg, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        let params = {
          id: id,
          status: option,
        };
        console.log("params", params);
        let res = await giftDeleteApi(params);
        switch (option) {
          case 0:
            this.$message.success("礼包停用成功");
            break;
          case 1:
            this.$message.success("礼包启用成功");
            break;
          case 2:
            this.$message.success("礼包已删除");
            break;
        }
        this.getGiftList(true);
      })
      .catch(() => {
        return;
      });
  }
  modifyBtn(item: Object) {
    this.modifyGift = item;
    this.dialogFormVisible2 = true;
  }
  submitAdd() {
    if (this.newGift.picture === "") {
      return this.$message.success("请先上传图片");
    }
    if (this.submiting) return;
    this.submiting = true;
    giftAddApi(this.newGift)
      .then((res) => {
        this.$message.success("新增礼包成功");
        this.clearForm("newGift");
        this.getGiftList(true);
      })
      .catch(() => {})
      .finally(() => {
        this.submiting = false;
      });
  }
  submitModify() {
    if (this.modifyGift.picture === "") {
      return this.$message.success("请先上传图片");
    }
    if (this.submiting) return;
    this.submiting = true;
    giftUpdateApi(this.modifyGift)
      .then((res) => {
        this.$message.success("礼包修改成功");
        this.clearForm("modifyGift");
        this.getGiftList(true);
      })
      .catch(() => {})
      .finally(() => {
        this.submiting = false;
      });
  }
  handleSizeChange(size: number) {
    this.page.size = size;
    this.getGiftList(true);
  }

  handleCurrentChange(current: number) {
    this.page.pn = current;
    this.getGiftList();
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
