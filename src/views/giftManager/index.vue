<template>
  <div>
    <el-row>
      <el-button type="primary" plain style="float: right">添加</el-button>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "index",
  components: {},
})
export default class extends Vue {
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
