import apiClient from "@/services/axios.js";
import Vue from "vue";

export const namespaced = true;

export const state = {
  products: [],
  productos_comprados: [],
  search_value: "",
  wishList: [],
  carrito: [],
};
export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_SEARCH_VALUE(state, search_value) {
    state.search_value = search_value;
  },
  ELIMINAR_COMPRAS(state) {
    state.productos_comprados = [];
  },
  SET_PRODUCTO_COMPRADO(state, product) {
    state.productos_comprados.push(product);
  },
  ADD_PRODUCT_WISHLIST(state, product) {
    state.wishList.push(product);
  },
  SET_WISHLIST(state, wishlist) {
    state.wishList = wishlist;
  },
  ELIMINAR_PROD_WISHLIST(state, product) {
    state.wishList = state.wishList.filter((item) => item !== product);
  },
  ELIMINAR_WISHLIST(state) {
    state.wishList = [];
  },
  SET_CARRITO(state, newCarrito) {
    state.carrito = newCarrito;
  },
  MIX_CARRITO(state, carrito) {
    state.carrito = [...state.carrito, ...carrito];
  },
  ADD_PRODUCT_CARRITO(state, product) {
    state.carrito.push(product);
  },
  ADD_COPY_PRODUCT_CARRITO(state, { product, index, copias }) {
    //solo para disparar una "mutacion"
    //this.$set(state.carrito[index], "copias", copias);
    console.log(index);
    Vue.set(product, "copias", copias);
    //state.carrito = state.carrito.filter((item) => item);
  },
  ELIMINAR_PRODUCT_CARRITO(state, product) {
    state.carrito = state.carrito.filter((item) => item !== product);
  },
  VACIAR_CARRITO(state) {
    state.carrito = [];
  },
};
export const actions = {
  async fetch_products({ commit, dispatch }) {
    try {
      const products = await apiClient.getProducts();
      commit("SET_PRODUCTS", products.data);
    } catch (err) {
      const error = {
        header: "Error al autenticar",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  set_search_value_action({ commit }, search_value) {
    commit("SET_SEARCH_VALUE", search_value);
  },
  async fetch_productCompradoByISBN({ commit, dispatch }, ISBN) {
    try {
      const products = await apiClient.getProductByISBN(ISBN);
      commit("SET_PRODUCTO_COMPRADO", products.data);
    } catch (err) {
      const error = {
        header: "Error al autenticar",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  async add_product_wishList({ commit, rootState, dispatch }, newProduct) {
    //encontrar si el producto ya esta en wishlist
    const encontrarProduto = state.wishList.find(
      (product) => product.ISBN === newProduct.ISBN
    );
    //si el producto ya existe no se inserta
    if (encontrarProduto === undefined) {
      const user = rootState.user.user;
      let wishList = [];
      state.wishList.forEach((product) => {
        wishList.push(product.ISBN);
      });
      wishList.push(newProduct.ISBN);
      try {
        await apiClient.postProductWishList(wishList, user.id);
        commit("ADD_PRODUCT_WISHLIST", newProduct);
        const notificacion = {
          header: "Producto agregado",
          description: "Producto agregado a su Wish List",
        };
        dispatch("notification/set_notification_action", notificacion, {
          root: true,
        });
      } catch (err) {
        const error = {
          header: "Error al autenticar",
          description: err,
        };
        dispatch("notification/set_notification_action", error, { root: true });
      }
    } else {
      const error = {
        header: "Producto no agregado",
        description: "el producto seleccionado ya existe en su Wish List",
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  async fetch_wishlist({ commit, dispatch }, id_user) {
    try {
      const respuesta = await apiClient.getWishList(id_user);
      if (respuesta.data != null) {
        let newWishList = [];
        for (let i = 0; i < respuesta.data.list.length; i++) {
          let temporal = await apiClient.getProductByISBN(
            respuesta.data.list[i]
          );
          newWishList[i] = temporal.data;
        }
        commit("SET_WISHLIST", newWishList);
      } else {
        commit("SET_WISHLIST", []);
      }
    } catch (err) {
      const error = {
        header: "Error al obtener su WishList",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  async eliminarProdWishList({ commit, dispatch, rootState }, product) {
    try {
      const user = rootState.user.user;
      let newWishList = [];
      state.wishList.forEach((item) => {
        if (item.ISBN !== product.ISBN) {
          newWishList.push(item.ISBN);
        }
      });
      await apiClient.postProductWishList(newWishList, user.id);
      commit("ELIMINAR_PROD_WISHLIST", product);
    } catch (err) {
      const error = {
        header: "Error al obtener su Carrito",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  async enviarWishListCarrito(
    { commit, rootState, dispatch },
    { arregloCopiasProductos }
  ) {
    try {
      const user = rootState.user.user;
      let DataBaseNewCarrito = [];
      let LocalStateNewCarrito = [];
      state.wishList.forEach(async (element, index) => {
        DataBaseNewCarrito.push({
          ISBN: element.ISBN,
          copias: arregloCopiasProductos[index],
        });
        let temporalProduct = await apiClient.getProductByISBN(element.ISBN);
        LocalStateNewCarrito.push({
          ISBN: element.ISBN,
          copias: arregloCopiasProductos[index],
          costo: temporalProduct.data.costo,
          autor: temporalProduct.data.autor,
          descripcion: temporalProduct.data.descripcion,
          src: temporalProduct.data.src,
          title: temporalProduct.data.title,
        });
      });
      state.carrito.forEach((element) => {
        DataBaseNewCarrito.push({ ISBN: element.ISBN, copias: element.copias });
      });
      await apiClient.postProductCarrito(DataBaseNewCarrito, user.id);
      commit("MIX_CARRITO", LocalStateNewCarrito);
      dispatch("eliminarWishList");
    } catch (err) {
      const error = {
        header: "Error al obtener su Carrito",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  async eliminarWishList({ commit, rootState, dispatch }) {
    try {
      const user = rootState.user.user;
      await apiClient.postProductWishList([], user.id);
      commit("ELIMINAR_WISHLIST");
    } catch (err) {
      const error = {
        header: "Error al obtener su Carrito",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  async fetch_carrito({ commit, dispatch, rootState }) {
    try {
      const user = rootState.user.user;
      const actualCarrito = state.carrito;

      const respuesta = await apiClient.getCarrito(user.id);
      if (respuesta.data != null) {
        let newCarrito = [];
        for (let i = 0; i < respuesta.data.list.length; i++) {
          let temporal = await apiClient.getProductByISBN(
            respuesta.data.list[i].ISBN
          );
          const buscarProducto = actualCarrito.find(
            (element) => element.ISBN === respuesta.data.list[i].ISBN
          );
          if (buscarProducto !== undefined) {
            temporal.data.copias =
              respuesta.data.list[i].copias + buscarProducto.copias;
          } else {
            temporal.data.copias = respuesta.data.list[i].copias;
          }
          newCarrito[i] = temporal.data;
        }
        if (actualCarrito.length > 0) {
          await apiClient.postProductCarrito(newCarrito, user.id);
        }
        if (actualCarrito.length === 0) {
          commit("SET_CARRITO", newCarrito);
        } else {
          commit("MIX_CARRITO", newCarrito);
          await apiClient.postProductCarrito(state.carrito, user.id);
        }
      } else {
        commit("SET_CARRITO", []);
      }
    } catch (err) {
      const error = {
        header: "Error al obtener su Carrito",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  async add_product_carrito(
    { commit, dispatch, rootState },
    { product, copias, tipoAccion }
  ) {
    try {
      const actualCarrito = state.carrito;
      let newCarritoISBN = [];
      for (let i = 0; i < actualCarrito.length; i++) {
        newCarritoISBN.push({
          ISBN: actualCarrito[i].ISBN,
          copias: actualCarrito[i].copias,
        });
      }
      const product_copias = newCarritoISBN.filter(
        (element) => element.ISBN === product.ISBN
      );
      const user = rootState.user.user;
      if (product_copias.length === 0) {
        newCarritoISBN.push({ ISBN: product.ISBN, copias: copias });
        if (Object.keys(user).length > 0) {
          await apiClient.postProductCarrito(newCarritoISBN, user.id);
        }
        product.copias = copias;
        commit("ADD_PRODUCT_CARRITO", product);
      } else {
        const oldElement = newCarritoISBN.find(
          (element) => element.ISBN === product.ISBN
        );
        const index = newCarritoISBN.indexOf(oldElement);
        if (tipoAccion === "aumentar") {
          copias = copias + newCarritoISBN[index].copias;
        }

        newCarritoISBN[index].copias = copias;
        if (Object.keys(user).length > 0) {
          await apiClient.postProductCarrito(newCarritoISBN, user.id);
        }
        commit("ADD_COPY_PRODUCT_CARRITO", {
          product,
          index: index,
          copias: copias,
        });
      }

      const notification = {
        header: "Producto agregado",
        description: "Se agrego el producto al carrito",
      };
      dispatch("notification/set_notification_action", notification, {
        root: true,
      });
    } catch (err) {
      const error = {
        header: "Error al actualizar Carrito",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  async eliminar_product_carrito_action(
    { commit, dispatch, rootState },
    product
  ) {
    try {
      const user = rootState.user.user;
      const actualCarrito = state.carrito;
      let newCarritoISBN = [];
      for (let i = 0; i < actualCarrito.length; i++) {
        if (actualCarrito[i].ISBN !== product.ISBN) {
          newCarritoISBN.push({
            ISBN: actualCarrito[i].ISBN,
            copias: actualCarrito[i].copias,
          });
        }
      }
      if (Object.keys(user).length > 0) {
        await apiClient.postProductCarrito(newCarritoISBN, user.id);
      }
      commit("ELIMINAR_PRODUCT_CARRITO", product);
    } catch (err) {
      const error = {
        header: "Error al actualizar Carrito",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  async comprar({ commit, dispatch, rootState }) {
    try {
      const user = rootState.user.user;
      const carrito = state.carrito;
      for (let i = 0; i < carrito.length; i++) {
        const fecha = new Date().toISOString();
        const fecha_formato = fecha.substring(0, 19);
        await apiClient.postCompra(carrito[i].ISBN, fecha_formato, user.id);
      }
      commit("VACIAR_CARRITO");
    } catch (err) {
      const error = {
        header: "Error al realizar la compra",
        description: err,
      };
      dispatch("notification/set_notification_action", error, { root: true });
    }
  },
  cerrar_sesion({ commit }) {
    commit("VACIAR_CARRITO");
    commit("ELIMINAR_COMPRAS");
    commit("ELIMINAR_WISHLIST");
  },
};

export const getters = {
  getProductByTitle: (state) => {
    if (state.search_value === "") {
      return state.products;
    } else {
      const products_filtered = state.products.filter((product) => {
        return (
          product.title.includes(state.search_value) ||
          product.ISBN.includes(state.search_value) ||
          product.autor.includes(state.search_value)
        );
      });
      return products_filtered;
    }
  },
  getProductByISBN: (state) => (ISBN) => {
    return state.productos_comprados.find((product) => product.ISBN === ISBN);
  },
  getCarrito: (state) => {
    return state.carrito;
  },
};
