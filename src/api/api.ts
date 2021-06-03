import { postFormWithBaseUrl } from "./apiConfig";

export const loginApi = (data: any) => postFormWithBaseUrl("admin/login", data);

export const logoutApi = () => postFormWithBaseUrl("admin/logout");
