import Vue from "vue";
import Vuex from "vuex";
import * as product from "@/store/modules/products.js";
import * as notification from "@/store/modules/notification.js";
import * as user from "@/store/modules/user.js";
import * as compras from "@/store/modules/compras.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    product,
    notification,
    user,
    compras,
  },
});
