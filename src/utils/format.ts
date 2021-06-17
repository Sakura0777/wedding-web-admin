import { baseImgUrl } from "@/api/apiConfig";
import { hasVal } from "./has";
// 时间格式化
export const timeFormat = (
  value: number | string,
  fmt: string = "yyyy-MM-dd hh:mm:ss"
) => {
  let getDate = new Date(value);
  let o: any = {
    "M+": getDate.getMonth() + 1,
    "d+": getDate.getDate(),
    "h+": getDate.getHours(),
    "m+": getDate.getMinutes(),
    "s+": getDate.getSeconds(),
    "q+": Math.floor((getDate.getMonth() + 3) / 3),
    S: getDate.getMilliseconds(),
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

export const str2obj = (item: any, key: string, defaultVal?: any) => {
  item = JSON.parse(item);
  return hasVal(item, key, defaultVal);
};

export const arr2obj = (list: any[]) => {
  return list.reduce((res, v) => ((res[v.value] = v.label), res), {});
};

export const picUrlFormat = (url?: string) => {
  if (!url) {
    return baseImgUrl;
  }
  let out = url;
  if (url.indexOf("//") < 0) {
    out = baseImgUrl + url;
  }
  return out;
};

export const arrStr2str = (arrStr: string) => {
  return arrStr ? JSON.parse(arrStr).join(", ") : "";
};

export const toChinesNum = (num: number) => {
  let changeNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]; //changeNum[0] = "零"
  let unit = ["", "十", "百", "千", "万"];
  let getWan = (temp: number) => {
    let strArr: any[] = temp
      .toString()
      .split("")
      .reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum =
        (i == 0 && strArr[i] == 0
          ? ""
          : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
            ? ""
            : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
        newNum;
    }
    return newNum;
  };
  let overWan = Math.floor(num / 10000);
  let noWan: any = num % 10000;
  if (noWan.toString().length < 4) noWan = "0" + noWan;
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
};
