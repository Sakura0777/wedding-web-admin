import { postFormWithBaseUrl,postFormDataWithBaseUrl } from "./apiConfig";

export const loginApi = (data: any) => postFormWithBaseUrl("admin/login", data);

export const logoutApi = () => postFormWithBaseUrl("admin/logout");
export const userListApi = (data:any) => postFormWithBaseUrl("user/getList",data);
export const userAddApi = (data: any) => postFormWithBaseUrl("user/add",data);
export const userDeleteApi = (data: any) => postFormWithBaseUrl("user/delete",data);
export const userUpdateApi = (data: any) => postFormWithBaseUrl("user/update",data);

export const messageListApi = (data: any) => postFormWithBaseUrl("message/getList",data);
export const messageDeleteApi = (data: any) => postFormWithBaseUrl("message/delete",data);

export const logListApi = (data: any) => postFormWithBaseUrl("accessLog/getList",data);

export const sliceShowListApi = (data: any) => postFormWithBaseUrl("carousel/getList",data);
export const sliceShowDeleteApi = (data: any) => postFormWithBaseUrl("carousel/delete",data);
export const sliceShowUpdateApi = (data: any) => postFormWithBaseUrl("carousel/update",data);
export const sliceShowAddApi = (data: any) => postFormWithBaseUrl("carousel/add",data);

export const imageUploadApi = (data: any) => postFormDataWithBaseUrl("upload/image",data);
export const videoUploadApi = (data: any) => postFormWithBaseUrl("upload/video",data);