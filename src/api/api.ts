import { postFormWithBaseUrl } from "./apiConfig";

export const loginApi = (data: any) => postFormWithBaseUrl("admin/login", data);

export const logoutApi = () => postFormWithBaseUrl("admin/logout");
export const userListApi = (data) => postFormWithBaseUrl("user/getList",data);
export const userAddApi = (data: any) => postFormWithBaseUrl("user/add",data);
export const userDeleteApi = (data: any) => postFormWithBaseUrl("user/delete",data);
export const userUpdateApi = (data: any) => postFormWithBaseUrl("user/update",data);
