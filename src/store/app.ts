// Utilities
import { ICobrosExt } from "@/interface/Cobros/ICobros";
import { IUsuario } from "@/interface/Login/Usuario";
import { defineStore } from "pinia";

export const storeApp = defineStore("app", {
  state: () => {
    return {
      user: null as IUsuario | null,
      autorizationCobro: null as ICobrosExt | null,
      drawerState: false,
    };
  },

  actions: {
    setUserState(data: IUsuario) {
      this.user = data;
    },
    setAutorizationCobro(data: ICobrosExt){
      this.autorizationCobro = data;
    },
    setDrawerState(state: boolean){
      this.drawerState = state;
    }
  },
});
