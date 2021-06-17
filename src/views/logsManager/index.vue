<template>
  <div>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="8">
        <el-date-picker
          v-model="dateRange"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" plain @click="getLogList(true, true)"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <el-table :data="tableData" v-loading="isLoading" stripe border style="margin-top: 20px">
      <!-- <el-table-column prop="id" label="ID" align="center"> </el-table-column> -->
      <el-table-column
        prop="username"
        label="操作人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="ip"
        label="操作IP"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="request_api"
        label="操作接口"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="api_name"
        label="接口名称"
        align="center"
      ></el-table-column>
      <el-table-column
        :formatter="
          (row) => timeFormat(row.create_time * 1000, 'yyyy-MM-dd hh:mm')
        "
        label="操作时间"
        align="center"
      ></el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top: 15px; width: 82%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pn"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { timeFormat } from "@/utils/format";
import { logListApi } from "@/api/api";

@Component({
  name: "index",
})
export default class extends Vue {
  dateRange = "";
  isLoading: boolean = false;
  tableData: any = [];
  page: any = {
    startTime: "",
    endTime: "",
    type: 2,
    id: "",
    pn: 1,
    size: 10,
    total: 0,
  };
  mounted() {
    this.getLogList(true);
  }
    timeFormat = timeFormat;
  async getLogList(isFirst?: boolean, isSerach?: Boolean) {
    if (this.isLoading) return;
    this.isLoading = true;
    if (isFirst) this.page.pn = 1;
    if (!isSerach) {
      this.page.startTime = "";
      this.page.endTime = "";
    } else {
      this.page.startTime = this.dateRange[0];
      this.page.end = this.dateRange[1];
    }
    let res = await logListApi(this.page);
    this.page.total = res.data.count;
    this.tableData = res.data.list;
    this.isLoading = false;
  }
  handleSizeChange(size: number) {
    this.page.size = size;
    this.getLogList(true);
  }

  handleCurrentChange(current: number) {
    this.page.pn = current;
    this.getLogList();
  }
}
</script>
<style lang="scss" scoped>
</style>