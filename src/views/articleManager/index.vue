<template>
  <div>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="6">
        <el-input
          size="medium"
          placeholder="请输入标题"
          v-model="title"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-select v-model="type" placeholder="请选择文章类型">
          <el-option
            v-for="item in typeSelectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="11">
        <el-button type="primary" plain>搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain>添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="ID" label="ID" align="center"> </el-table-column>
      <el-table-column
        prop="account"
        label="标题"
        align="center"
      ></el-table-column>
      <el-table-column prop="imgSrc" label="封面" align="center">
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
      <el-table-column label="操作" align="center" width="250">
        <el-button type="text">静态化</el-button>
        <el-button type="text">预览</el-button>
        <el-button type="text">修改</el-button>
        <el-button type="text">发布</el-button>
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
    <div class="tips" style="margin-top: 20px">
      <p>温馨提示：</p>
      <p>1.点击预览将直接跳转到文章页面。</p>
      <p>2.静态化--生成静态HTML文件，可以直接请求静态页面，不需要请求后台资源，提高访问速度。</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "index",
  components: {},
})
export default class extends Vue {
  type = "";
  title = "";
  typeSelectOptions = [
    {
      value: "选项1",
      label: "结婚领证仪式",
    },
    {
      value: "选项2",
      label: "一站式婚庆",
    },
    {
      value: "选项3",
      label: "婚俗见闻",
    },
    {
      value: "选项4",
      label: "备婚助手",
    },
    {
      value: "选项5",
      label: "婚礼问答",
    },
    {
      value: "选项6",
      label: "婚礼礼仪小百科",
    },
  ];
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
.tips {
  font-size: 14px;
  color: #409eff;
  p:nth-of-type(1) {
    font-weight: 600;
    font-size: 16px;
  }
}
</style>