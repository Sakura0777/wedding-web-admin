import store from "@/store";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";

export interface IApiState {
  cancelList: Array<any>;
}

@Module({ dynamic: true, store, name: "api" })
class Api extends VuexModule implements IApiState {
  public cancelList: Array<any> = [];

  @Mutation
  public SET_CANCEL_LIST(cancelList: Array<any>) {
    this.cancelList = cancelList;
  }

  @Action
  public PushCancel(cancel: any) {
    this.SET_CANCEL_LIST([...this.cancelList, cancel]);
  }

  @Action({ rawError: true })
  public CancelAll() {
    for (const cancel of this.cancelList) {
      cancel("cancelRequest");
    }
    this.SET_CANCEL_LIST([]);
  }
}

export const ApiModule = getModule(Api);
