<template>
  <div>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="8">
        <el-input
          size="medium"
          placeholder="请输入账号"
          v-model="userName"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" plain>搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe border style="margin-top: 20px">
      <el-table-column prop="ID" label="ID" align="center"> </el-table-column>
      <el-table-column
        prop="account"
        label="留言用户"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="signTime"
        label="留言内容"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="留言时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="回复内容"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="回复时间"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="text">回复</el-button>
        <el-button type="text" style="color: #e83929">删除</el-button>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top: 15px; width: 82%">
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "index",
  components: {},
})
export default class extends Vue {
  userName = "";
  tableData = [
    {
      ID: "7777",
      signTime: "2016-05-02 19:09:07",
      account: "王小虎",
      status: "正常",
    },
    {
      ID: "95949545",
      signTime: "2016-05-02 19:09:07",
      account: "拉克丝",
      status: "正常",
    },
    {
      ID: "38843493",
      signTime: "2016-05-02 19:09:07",
      account: "王小虎",
      status: "已禁用",
    },
    {
      ID: "99999",
      signTime: "2021-05-03 19:09:07",
      account: "galen",
      status: "正常高考考了高分v君麻吕材料成本v看来不错了吧，局的领导的管理管理规定了",
    },
    {
      ID: "000555",
      signTime: "2016-05-02 19:09:07",
      account: "lux",
      status: "正常",
    },
  ];
}
</script>
<style lang="scss" scoped>
</style>