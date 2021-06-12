<template>
  <el-container style="height: 100%">
    <el-header style="background: #409eff">
      <el-row type="flex" class="header" justify="space-between" align="center">
        <div class="title">结婚一站式服务网后台管理系统</div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            你好，{{ username }} <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">
              <v-icon
                name="sign-out-alt"
                style="vertical-align: middle; margin-right: 8px"
              ></v-icon>
              注销</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-header>
    <el-container style="height: 100%">
      <el-aside style="width: 200px; height: 100%; overflow-y: auto">
        <el-menu :default-active="defaultActive">
          <template v-for="(item, index) in routes">
            <el-menu-item
              :index="index + 1 + ''"
              :key="index"
              @click="toRoute(item.path)"
            >
              <v-icon :name="item.meta.icon"></v-icon>
              <span slot="title" style="margin-left: 8px">{{
                item.meta | hasVal("title")
              }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main style="height: 100%;">
        <el-scrollbar style="height: 90%" ref="scrollbar">
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { routes } from "../../router/index";
import { UserModule } from "../../store/user";
import { logoutApi } from "@/api/api";

@Component({
  name: "Main",
})
export default class extends Vue {
  get username() {
    return UserModule.username;
  }


  get routes() {
    return routes.filter((item: any) => {
      // // 有限进行权限判断
      // if (item.meta.roles && item.meta.roles.indexOf(this.role) < 0) {
      //   return false;
      // }
      // if (!item.meta.hidden && item.children && item.children.length > 0) {
      //   if (item.meta.quick) {
      //     item.children = [];
      //   } else {
      //     item.children = item.children.filter((child: any) => child.component);
      //   }
      // }
      return !item.meta.hidden;
    });
  }

  get defaultActive() {
    let result = "";
    for (let index = 0; index < this.routes.length; index++) {
      const route = this.routes[index];
      if (this.$route.path.indexOf(route.path) >= 0) {
        result = index + 1 + "";
        break;
      }
    }
    return result;
  }

  toRoute(path: string) {
    this.$router.push(path).catch((err) => {
      return;
    });
  }

  handleCommand(command: string) {
    switch (command) {
      case "logout":
        this.logOut();
        break;
    }
  }

  logOut() {
    logoutApi();
    sessionStorage.sysAdminName = "";
    location.reload();
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-aside {
  border-right: 1px solid rgb(230, 230, 230);
  overflow-x: hidden;
  user-select: none;
}
::v-deep .el-menu {
  border-right: none !important;
}
::v-deep .el-menu-item {
  color: #606266;
  span {
    vertical-align: inherit;
  }
}
::v-deep .el-menu-item.is-active {
  color: #409eff;
}
::v-deep .el-scrollbar__wrap {
  overflow-x: auto !important;
  padding: 0 10px;
}

.header {
  height: 100%;
  align-items: center;
}
.title {
  color: #ffffff;
  font-size: 22px;
  font-weight: bold;
}
.el-dropdown-link {
  color: #ffffff;
  cursor: pointer;
}
</style>
