import { UserModule } from "@/store/user";
import { Route } from "vue-router";
import router from "./router";

const whiteList = ["/login"];

router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Determine whether the user has logged in
  if (UserModule.username && sessionStorage.sysAdminName) {
    if (to.path === "/login") {
      // If is logged in, redirect to the home page
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next();
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
    }
  }
});

router.afterEach((to: Route) => {
  // set page title
  document.title = to.matched[0].meta.title;
});
