import Vue from "vue";
import Vuex from "vuex";
import { IApiState } from "./api/index";
import { IUserState } from "./user";

Vue.use(Vuex);

export interface IRootState {
  user: IUserState;
  api: IApiState;
}

export default new Vuex.Store<IRootState>({});
