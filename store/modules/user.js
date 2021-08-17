import apiClient from "@/services/axios.js";

export const namespaced = true;

export const state = {
  user: {},
};
export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};
export const actions = {
  async set_user_action({ commit, dispatch }, username) {
    try {
      const user = await apiClient.getUser(username);
      if (user.data.length === 0) {
        const error = {
          header: "Error al autenticar",
          description: "Nombre de usuario equivocado",
        };
        dispatch("notification/set_notification_action", error, { root: true });
      } else {
        commit("SET_USER", user.data[0]);

        dispatch("product/fetch_wishlist", state.user.id, {
          root: true,
        });
        dispatch("product/fetch_carrito", state.user.id, {
          root: true,
        });
      }
    } catch (err) {
      const error = {
        header: "Error al autenticar",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  cerrar_sesion({ commit, dispatch }) {
    dispatch("compras/cerrar_sesion", {}, { root: true });
    dispatch("product/cerrar_sesion", {}, { root: true });
    commit("SET_USER", {});
  },
  async update_user({ commit, dispatch }, objetoUsuario) {
    try {
      const respuesta = await apiClient.updateUser(objetoUsuario);
      if (respuesta.status === 200) {
        commit("SET_USER", objetoUsuario);
        const exito = {
          header: "Exito al actualizar",
          description: "Sus datos han sido actualizados",
        };
        dispatch("notification/set_notification_action", exito, { root: true });
      } else {
        const error = {
          header: "Error al actualizar",
          description: "Error en el servidor, código " + respuesta.status,
        };
        dispatch("notification/set_notification_action", error, { root: true });
      }
    } catch (err) {
      const error = {
        header: "Error al actualizar",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
};

export const getters = {};
