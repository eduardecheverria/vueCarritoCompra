import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getProducts() {
    return apiClient.get("/products");
  },
  getProductByISBN(ISBN) {
    return apiClient.get("/products/?ISBN=" + ISBN);
  },
  getUser(username) {
    return apiClient.get("/users/?username=" + username);
  },
  updateUser(user) {
    return apiClient.put("/users/" + user.id, user);
  },
  getCompras(id_user) {
    return apiClient.get("/compras/?id_user=" + id_user);
  },
  postProductWishList(wishList, id_user) {
    const instanciaWishList = {
      list: wishList,
    };
    console.log(wishList);
    return apiClient.put("/wishlist/" + id_user, instanciaWishList);
  },
  getWishList(id_user) {
    return apiClient.get("/wishlist/?id=" + id_user);
  },
  getCarrito(id_user) {
    return apiClient.get("/carrito/?id=" + id_user);
  },
  postProductCarrito(carrito, id_user) {
    const instanciaCarrito = {
      list: carrito,
    };
    return apiClient.put("/carrito/" + id_user, instanciaCarrito);
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
