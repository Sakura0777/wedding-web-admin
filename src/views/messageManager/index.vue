<template>
  <div>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="8">
        <el-input
          size="medium"
          placeholder="请输入用户账号进行搜索"
          v-model="page.key"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" plain @click="getMessageList(true, true)"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      v-loading="isLoading"
      stripe
      border
      style="margin-top: 20px"
    >
      <!-- <el-table-column prop="ID" label="ID" align="center"> </el-table-column> -->
      <el-table-column
        prop="account"
        label="留言用户"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="留言内容"
        align="center"
      ></el-table-column>
      <el-table-column
        label="留言时间"
        align="center"
        :formatter="
          (row) => timeFormat(row.add_time * 1000, 'yyyy-MM-dd hh:mm')
        "
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="color: #e83929"
            @click="messageDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
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
import { messageListApi, messageDeleteApi } from "@/api/api";
@Component({
  name: "index",
})
export default class extends Vue {
  isLoading: boolean = false;
  tableData: any = [];
  page: any = {
    key: "",
    id: "",
    pn: 1,
    size: 10,
    total: 0,
  };
  mounted() {
    //git push test
    this.getMessageList(true);
  }
  timeFormat = timeFormat;
  async getMessageList(isFirst?: boolean, isSerach?: Boolean) {
    if (this.isLoading) return;
    this.isLoading = true;
    if (isFirst) this.page.pn = 1;
    if (!isSerach) {
      this.page.key = "";
    }
    let res = await messageListApi(this.page);

    this.page.total = res.data.count;
    this.tableData = res.data.list;
    this.isLoading = false;
  }
  messageDelete(id: String) {
    this.$confirm("确定删除该留言吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        let res = await messageDeleteApi({ id: id });
        this.$message.success("留言已删除");
         this.getMessageList(true);
      })
      .catch(() => {
        return;
      });
  }
  handleSizeChange(size: number) {
    this.page.size = size;
    this.getMessageList(true);
  }

  handleCurrentChange(current: number) {
    this.page.pn = current;
    this.getMessageList();
  }
}
</script>
<style lang="scss" scoped>
</style>