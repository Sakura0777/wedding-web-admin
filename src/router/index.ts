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
      import("../views/login/index.vue"),
  },
  {
    path: "/userManager",
    component: Main,
    name: "userManager",
    meta: {
      title: "用户管理",
      icon: "user-cog"
    },
    children: [
      {
        path: "/",
        component: () =>
          import("../views/userManager/index.vue"),
      },
    ],
  },
  {
    path: "/articleManager",
    component: Main,
    name: "articleManager",
    meta: {
      title: "文章管理",
      icon: "file-alt"
    },
    children: [
      {
        path: "/",
        component: () =>
          import("../views/articleManager/index.vue"),
      },
    ],
  },
  {
    path: "/giftManager",
    component: Main,
    name: "giftManager",
    meta: {
      title: "礼包管理",
      icon: "gift"
    },
    children: [
      {
        path: "/",
        component: () =>
          import("../views/giftManager/index.vue"),
      },
    ],
  },
  {
    path: "/sliceShowManager",
    component: Main,
    name: "sliceShowManager",
    meta: {
      title: "轮播图管理",
      icon: "image"
    },
    children: [
      {
        path: "/",
        component: () =>
          import("../views/sliceShowManager/index.vue"),
      },
    ],
  },
  {
    path: "/messageManager",
    component: Main,
    name: "messageManager",
    meta: {
      title: "留言管理",
      icon: "comment-dots"
    },
    children: [
      {
        path: "/",
        component: () =>
          import("../views/messageManager/index.vue"),
      },
    ],
  },
  {
    path: "/logsManager",
    component: Main,
    name: "logsManager",
    meta: {
      title: "日志管理",
      icon: "stream"
    },
    children: [
      {
        path: "/",
        component: () =>
          import("../views/logsManager/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
