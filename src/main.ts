import ElementUI from "element-ui";
import * as filters from "@/filters";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(ElementUI, {
  size: "small",
});

Vue.component("v-icon", Icon);

Object.keys(filters).forEach((key) => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
