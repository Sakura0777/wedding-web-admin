<template>
  <div>
    <el-row :gutter="20" style="margin-top: 30px">
      <el-col :span="8">
        <el-input
          size="medium"
          placeholder="请输入账号"
          v-model="page.key"
          clearable
        >
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-button type="primary" plain @click="getUserList(true, true)"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="6">
        <el-button type="primary" plain @click="dialogFormVisible = true"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      v-loading="isLoading"
      stripe
      border
      style="width: 82%; margin-top: 20px"
    >
      <el-table-column
        prop="account"
        label="账号"
        align="center"
      ></el-table-column>
      <el-table-column
        :formatter="
          (row) => timeFormat(row.register_time * 1000, 'yyyy-MM-dd hh:mm')
        "
        label="注册时间"
        align="center"
      ></el-table-column>
      <el-table-column
        :formatter="(row) => (row.flag ? '已禁用' : '正常')"
        label="状态"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="updateUserPsd(scope.row.uid)"
            >修改密码</el-button
          >
          <el-button
            type="text"
            style="color: #e83929"
            @click="modifyUser(scope.row.uid, 2)"
            >删除</el-button
          >
          <el-button
            type="text"
            style="color: #e83929"
            v-if="scope.row.flag === 0"
            @click="modifyUser(scope.row.uid, 1)"
            >禁用</el-button
          >
          <el-button type="text" v-else @click="modifyUser(scope.row.uid, 0)"
            >启用</el-button
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
    <el-dialog
      width="50%"
      title="添加用户"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      :show-close="!submiting"
    >
      <el-form
        :model="newUser"
        status-icon
        :rules="userRules"
        ref="newUser"
        label-width="100px"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            v-model="newUser.account"
            placeholder="请输入一个邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            type="password"
            v-model="newUser.pwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd_confirm">
          <el-input
            type="password"
            v-model="newUser.pwd_confirm"
            autocomplete="off"
          ></el-input>
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
    <el-dialog
      width="50%"
      title="修改密码"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible2"
      :show-close="!submiting"
    >
      <el-form
        :model="updateUser"
        status-icon
        :rules="userRules"
        ref="updateUser"
        label-width="100px"
      >
        <el-form-item label="密码" prop="pwd">
          <el-input
            type="password"
            v-model="updateUser.pwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd_confirm">
          <el-input
            type="password"
            v-model="updateUser.pwd_confirm"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="clearForm('updateUser')" :disabled="submiting"
            >取消</el-button
          >
          <el-button type="primary" :loading="submiting" @click="submitUpdate"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Md5 } from "ts-md5";
import { timeFormat } from "@/utils/format";
import { userRules } from "./data/rules";
import {
  userListApi,
  userAddApi,
  userDeleteApi,
  userUpdateApi,
} from "@/api/api";
@Component({
  name: "index",
  components: {},
})
export default class extends Vue {
  isLoading: boolean = false;
  submiting:Boolean=false
  dialogFormVisible:Boolean=false
  dialogFormVisible2:Boolean=false
  page: any = {
    key: "",
    type: 2,
    id: "",
    pn: 1,
    size: 10,
    total: 0,
  };
  tableData: any[] = [];
  newUser: any = {
    account: "",
    pwd: "",
    pwd_confirm: "",
  };
  updateUser:any ={
    uid:'',
    pwd:'',
    pwd_confirm:''
  }
  userRules: any = {
    ...userRules,
    pwd_confirm: [
      ...userRules.pwd_confirm,
      { validator: this.checkPassword, trigger: "blur" }
    ]
  };
  mounted() {
    this.getUserList(true);
  }
  timeFormat = timeFormat;

  checkPassword(rule: any, value: string, callback: Function) {
    if (value &&  value !== `${this.dialogFormVisible?this.newUser.pwd:this.updateUser.pwd}` ) {
      callback(new Error("密码与确认密码不一致"));
    } else {
      callback();
    }
  }
  clearForm(name:String){
        this.$ref.name.resetFields();
    this.dialogFormVisible = false
  }
  async getUserList(isFirst?: boolean,isSerach?:Boolean) {
    if (this.isLoading) return;
    this.isLoading = true;
    if (isFirst) this.page.pn = 1;
    if(!isSerach){
      this.page.key =''
    }
    let res = await userListApi(this.page);
    console.info("用户列表接口返回了哦", res);
    this.page.total = res.data.count;
    this.tableData = res.data.list;
    this.isLoading = false;
  }
  updateUserPsd(id:Number){
    this.updateUser.uid = id
    this.dialogFormVisible2 = true
  }
  modifyUser(id: number, option: number) {
    let msg = "";
    switch (option) {
      case 0:
        msg = "你确定要启用该用户吗？";
        break;
      case 1:
        msg = "你确定要禁用该用户吗？";
        break;
      case 2:
        msg = "你确定要删除该用户吗？";
        break;
    }
    this.$confirm(msg, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        let params = {
          uid: id,
          status: option,
        };
        console.log("params", params);
        let res = await userDeleteApi(params);
        switch (option) {
          case 0:
             this.$message.success("账户启用成功");
            break;
          case 1:
            this.$message.success("账户禁用成功");
            break;
          case 2:
            this.$message.success("账户已删除");
            break;
        }
        this.getUserList(true);
      })
      .catch(() => {
        return;
      });
  }
  submitUpdate(){
        (this.$refs["updateUser"] as any).validate((valid: boolean) => {
      if (valid) {
        if (this.submiting) return;
        this.submiting = true;
        const data: any = Object.assign({}, this.updateUser);
        data.pwd = Md5.hashStr(data.pwd);
        data.pwd_confirm = Md5.hashStr(data.pwd_confirm);
        data.uid = data.uid;
        userUpdateApi(data)
          .then(res => {
            this.$message.success("用户密码修改成功");
            this.clearForm('updateUser')
          })
          .catch(() => {})
          .finally(() => {
            this.submiting = false;
          });
      }
    });
  }
  submitAdd() {
    (this.$refs["newUser"] as any).validate((valid: boolean) => {
      if (valid) {
        if (this.submiting) return;
        this.submiting = true;
        const data: any = Object.assign({}, this.newUser);
        data.pwd = Md5.hashStr(data.pwd);
        data.pwd_confirm = Md5.hashStr(data.pwd_confirm);
        data.account = data.account;
        userAddApi(data)
          .then(res => {
            this.$message.success("新增用户成功");
            this.clearForm('newUser')
            this.getUserList(true);
          })
          .catch(() => {})
          .finally(() => {
            this.submiting = false;
          });
      }
    });
  }
  handleSizeChange(size: number) {
    this.page.size = size;
    this.getUserList(true);
  }

  handleCurrentChange(current: number) {
    this.page.pn = current;
    this.getUserList();
  }
  }

</script>
<style lang="scss" scoped>
@import url("../scss/index.scss");
.el-dropdown-link {
  color: #409eff;
  cursor: pointer;
}
</style>