<template>
  <div>
    <el-row>
      <el-button
        type="primary"
        plain
        style="float: right"
        @click="addBox = true"
        >添加</el-button
      >
    </el-row>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%; margin-top: 15px"
    >
      <el-table-column prop="ID" label="ID" align="center"> </el-table-column>
      <el-table-column
        prop="account"
        label="礼包内容简介"
        align="center"
      ></el-table-column>
      <el-table-column prop="imgSrc" label="图片" align="center">
        <template slot-scope="scope">
          <img
            style="
              width: 80px;
              max-heigth: 80px;
              display: block;
              margin: 0 auto;
            "
            :src="scope.row.imgSrc"
          /> </template
      ></el-table-column>
      <el-table-column
        prop="status"
        label="添加时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="text">修改</el-button>
        <el-button type="text" style="color: #e83929">删除</el-button>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top: 15px">
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </el-row>
    <div class="addBox" v-if="addBox">
      <button class="closeBtn" @click="addBox = false">
        <v-icon name="times"></v-icon>
      </button>
      <p style="margin: 10px; color: #409eff">添加礼包</p>
      <div gutter="15" class="mt20 inputItem">
        <span>礼包简述</span>
        <el-input
          class="ml20"
          style="width: 75%"
          type="textarea"
          placeholder="请输入礼包内容简述"
          v-model="form.giftBrief"
          clearable
        >
        </el-input>
      </div>
      <div
        class="inputItem"
        style="height: 80px; line-height: 80px; padding: 20px 25px 0 25px"
      >
        <span style="dispaly: inline-block; transform: translateY(-40px)"
          >礼包图片</span
        >
        <el-upload
          class="avatar-uploader ml20"
          style="display: inline-block"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="inputItem">
        <span>发布状态</span>
        <el-switch class="ml20" v-model="form.staticSwitch"></el-switch>
      </div>
      <el-row gutter="40" class="mt20">
        <el-col span="4" offset="3">
          <el-button type="primary" style="float: right">提交</el-button>
        </el-col>
        <el-col span="4">
          <el-button type="danger" plain @click="cancelEdit">退出</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="350px">
      <span>{{ dialogMsg }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "index",
  components: {},
})
export default class extends Vue {
  addBox = false;
  dialogVisible = false;
  dialogMsg = "";
  form = {
    giftBrief: "",
    imgSrc: "",
    staticSwitch: false,
  };
  tableData = [
    {
      ID: "7777",
      signTime: "2016-05-02 19:09:07",
      account: "王小虎",
      status: "正常",
      imgSrc: "https://t7.baidu.com/it/u=2952695990,867219380&fm=193&f=GIF",
    },
    {
      ID: "95949545",
      signTime: "2016-05-02 19:09:07",
      account: "拉克丝",
      status: "正常",
      imgSrc: "https://t7.baidu.com/it/u=2952695990,867219380&fm=193&f=GIF",
    },
    {
      ID: "38843493",
      signTime: "2016-05-02 19:09:07",
      account: "王小虎",
      status: "已禁用",
      imgSrc: "https://t7.baidu.com/it/u=201707926,1798162982&fm=193&f=GIF",
    },
    {
      ID: "99999",
      signTime: "2021-05-03 19:09:07",
      account: "galen",
      status: "正常",
      imgSrc: "https://t7.baidu.com/it/u=4214840714,1181319136&fm=193&f=GIF",
    },
    {
      ID: "000555",
      signTime: "2016-05-02 19:09:07",
      account: "lux",
      status: "正常",
      imgSrc: "https://t7.baidu.com/it/u=4214840714,1181319136&fm=193&f=GIF",
    },
  ];
}
</script>
<style lang="scss" scoped>
@import url("../scss/index.scss");
</style>
