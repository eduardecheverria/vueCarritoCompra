import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://databaselibrary-ef73d-default-rtdb.firebaseio.com`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getProducts() {
    return apiClient.get("/products" + ".json?print=pretty");
  },
  getProductByISBN(ISBN) {
    return apiClient.get("/products/" + ISBN + ".json?print=pretty");
  },
  getUser(username) {
    return apiClient.get("/users/" + username + ".json?print=pretty");
  },
  updateUser(user) {
    return apiClient.put(
      "/users/" + user.username + ".json?print=pretty",
      user
    );
  },
  getCompras(id_user) {
    return apiClient.get("/compras/" + id_user + ".json?print=pretty");
  },
  postProductWishList(wishList, id_user) {
    const instanciaWishList = {
      list: wishList,
    };
    return apiClient.put(
      "/wishlist/" + id_user + ".json?print=pretty",
      instanciaWishList
    );
  },
  getWishList(id_user) {
    return apiClient.get("/wishlist/" + id_user + ".json?print=pretty");
  },
  async getCarrito(id_user) {
    return apiClient.get("/carrito/" + id_user + ".json?print=pretty");
  },
  postProductCarrito(carrito, id_user) {
    const instanciaCarrito = {
      list: carrito,
    };
    return apiClient.put(
      "/carrito/" + id_user + ".json?print=pretty",
      instanciaCarrito
    );
  },
  postCompra(ISBN, fechaHora, id_user) {
    const nuevaCompra = {
      ISBN: ISBN,
      id_user: id_user,
      fechaHora: fechaHora,
    };
    return apiClient.post("/compras", nuevaCompra);
  },
};
