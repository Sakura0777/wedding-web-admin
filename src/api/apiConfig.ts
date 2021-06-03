/** @format */
import { ApiModule } from "@/store/api";
import axios from "axios";
import { Message } from "element-ui";

const qs = require("qs");

const instance = axios.create({
  timeout: 10000,
});

//请求拦截处理
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//返回拦截处理
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.data && response.data.code !== 200) {
      handleError(response.data.code, response.data.msg);
      throw response;
    }
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    try {
      if (error.response.status !== 200) {
        Message.error("网络错误，请检查后重试");
      }
    } catch (err) {
      if (!(error.message && error.message === "cancelRequest")) {
        Message.error("网络错误，请检查后重试");
      }
    }
    return Promise.reject(error);
  }
);

function handleError(code: any, errMsg: string) {
  let msg = "";
  switch (code) {
    case -3:
      msg = "登录信息已过期";
      sessionStorage.sysAdminName = "";
      location.reload();
      break;
    case -1:
      msg = errMsg;
      break;
    case -2:
      msg = errMsg;
      break;
    case 201:
      msg = errMsg;
      break;
    case 202:
      msg = errMsg;
      break;
    case 203:
      msg = errMsg;
      break;
    default:
      msg = errMsg ? errMsg : "系统错误，请联系技术人员处理";
      break;
  }
  Message.error(msg);
}

export const baseUrl = process.env.VUE_APP_BASE_URL;
export const baseImgUrl = process.env.VUE_APP_BASE_IMG_URL;

export const postWithoutBaseUrl = (url: string, data?: any) => {
  instance.defaults.baseURL = "";
  const CancelToken = axios.CancelToken;
  return instance.post(url, data, {
    cancelToken: new CancelToken((c) => ApiModule.PushCancel(c)),
  });
};

export const postWithBaseUrl = (url: string, data?: any) => {
  instance.defaults.baseURL = baseUrl;
  const CancelToken = axios.CancelToken;
  return instance.post(url, data, {
    cancelToken: new CancelToken((c) => ApiModule.PushCancel(c)),
  });
};

export const postFormWithBaseUrl = (url: string, data?: any) => {
  instance.defaults.baseURL = baseUrl;
  instance.defaults.headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  const CancelToken = axios.CancelToken;
  data = qs.stringify(data);
  return instance.post(url, data, {
    cancelToken: new CancelToken((c) => ApiModule.PushCancel(c)),
  });
};

export const postFormDataWithBaseUrl = (url: string, data?: any) => {
  instance.defaults.baseURL = baseUrl;
  instance.defaults.headers = {
    "content-type": "application/x-www-form-urlencoded",
  };
  const CancelToken = axios.CancelToken;
  return instance.post(url, data, {
    cancelToken: new CancelToken((c) => ApiModule.PushCancel(c)),
  });
};

export const postWithBaseUrlAutoCatch = (url: string, data?: any) => {
  instance.defaults.baseURL = baseUrl;
  const CancelToken = axios.CancelToken;
  return instance
    .post(url, data, {
      cancelToken: new CancelToken((c) => ApiModule.PushCancel(c)),
    })
    .then((res) => (res.data ? res.data : true))
    .catch(() => false);
};

export default instance;
