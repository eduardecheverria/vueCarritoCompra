import apiClient from "@/services/axios.js";

export const namespaced = true;

export const state = {
  compras: [],
};
export const mutations = {
  SET_COMPRAS(state, compras) {
    state.compras = compras;
  },
};
export const actions = {
  async fetch_compras({ commit, dispatch }, id_user) {
    try {
      const compras = await apiClient.getCompras(id_user);
      commit("SET_COMPRAS", compras.data);
    } catch (err) {
      const error = {
        header: "Error al obtener compras",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  cerrar_sesion({ commit }) {
    commit("SET_COMPRAS", []);
  },
};

export const getters = {};
