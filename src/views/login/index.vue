<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">结婚一站式服务网后台登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <v-icon name="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="'请输入用户名'"
          name="username"
          type="text"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <v-icon name="key" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="'请输入密码'"
          name="password"
          autocomplete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <v-icon :name="passwordType === 'password' ? 'eye-slash' : 'eye'" />
        </span>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <span class="svg-container">
          <v-icon name="image" />
        </span>
        <el-input
          v-model="loginForm.vcode"
          :placeholder="'请输入图形验证码'"
          name="verifyCode"
        />
        <img :src="vcodeUrl" alt="" class="show-pwd" style="top:2px;right:2px;"/>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        size="big"
        style="width: 100%; margin-top: 20px"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { Form as ElForm, Input } from "element-ui";
import { UserModule } from "@/store/user";
import { Dictionary } from "vue-router/types/router";

@Component({
  name: "Login",
  components: {},
})
export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    callback();
  };
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error("密码不能少于6位"));
    } else {
      callback();
    }
  };
  private loginForm = {
    username: "",
    password: "",
    vcode: "",
  };
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: "blur" }],
    password: [{ validator: this.validatePassword, trigger: "blur" }],
  };
  private passwordType = "password";
  private loading = false;
  private showDialog = false;
  private redirect?: string;
  private otherQuery: Dictionary<string> = {};
  private vcodeUrl =
    process.env.VUE_APP_BASE_URL + "verify/img?t=" + new Date().getTime();
  // process.env.VUE_APP_BASE_URL + "verify/getImg?t=" + new Date().getTime();

  @Watch("$route", { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>;
    if (query) {
      this.redirect = query.redirect;
      this.otherQuery = this.getOtherQuery(query);
    }
  }

  mounted() {
    if (this.loginForm.username === "") {
      (this.$refs.username as Input).focus();
    } else if (this.loginForm.password === "") {
      (this.$refs.password as Input).focus();
    }
  }

  private showPwd() {
    if (this.passwordType === "password") {
      this.passwordType = "";
    } else {
      this.passwordType = "password";
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus();
    });
  }

  private getVerifyCode() {
    this.vcodeUrl =
      process.env.VUE_APP_BASE_URL + "verify/img?t=" + new Date().getTime();
  }

  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        const res = await UserModule.Login(this.loginForm);
        if (res) {
          this.$router.push({
            path: "/userManager",
          });
          // this.$router.push({
          //   path: this.redirect || "/",
          //   query: this.otherQuery
          // });
        } else {
          this.getVerifyCode();
        }
        setTimeout(() => {
          this.loading = false;
        }, 0.5 * 1000);
      } else {
        return false;
      }
    });
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== "redirect") {
        acc[cur] = query[cur];
      }
      return acc;
    }, {} as Dictionary<string>);
  }
}
</script>

<style lang="scss">
$lightGray: #eee;
$darkGray: #889aa4;
$loginBg: #eee;
$loginCursorColor: #fff;
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $darkGray)) {
  .login-container .el-input {
    input {
      color: $darkGray;
    }
    input::first-line {
      color: $darkGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $darkGray;
      caret-color: $darkGray;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: $darkGray !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: $loginBg;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$lightGray: #409eff;
$darkGray: #889aa4;
$loginBg: #eee;
$loginCursorColor: #fff;
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f8;

  .login-form {
    width: 520px;
    padding: 40px 30px;
    overflow: hidden;
    background: #fff;
    border-radius: 6px;
    box-sizing: content-box;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 7px 10px;
    color: $darkGray;
    width: 30px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 6px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
