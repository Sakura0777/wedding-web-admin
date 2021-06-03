import { loginApi } from "@/api/api";
import store from "@/store";
import { Md5 } from "ts-md5";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";

export interface IUserState {
  username: string;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public username = sessionStorage.sysAdminName || "";
  @Mutation
  public SET_USERNAME(username: string) {
    this.username = username;
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    let { username, password } = userInfo;
    username = username.trim();
    password = Md5.hashStr(password).toString();
    const data = {
      admin_name: username,
      admin_pwd: password,
    };
    const res: any = await loginApi(data)
      .then((res) => res)
      .catch((error) => {
        return false;
      });
    if (res) {
      sessionStorage.sysAdminName = username;
      this.SET_USERNAME(username);
    }
    return res;
  }
}

export const UserModule = getModule(User);
