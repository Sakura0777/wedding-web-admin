import Main from "@/layout/main/index.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    redirect: "login",
    meta: {
      hidden: true,
    },
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      hidden: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/index.vue"),
  },
  {
    path: "/userManager",
    component: Main,
    name: "userManager",
    meta: {
      title: "用户管理",
      icon: "fa-address-book"
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
