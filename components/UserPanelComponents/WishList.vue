<template>
  <div class="WishList">
    <h2>Wish List</h2>
    <table v-if="wishlist.length > 0">
      <tr class="encabezado">
        <th>Producto</th>
        <th>Detalles del producto</th>
        <th>Añadir al carrito</th>
      </tr>
      <tr class="productoRow" v-for="(product, index) in wishlist" :key="index">
        <td>
          <img :src="require(`@/assets/productos/${product.src}`)" />
        </td>
        <td>{{ product.title }} del autor : {{ product.autor }}</td>
        <td>
          <p>$ {{ product.costo }}</p>
          <form @submit.prevent="anadirACarrito(product, index)">
            <input v-model="numProdReq[index]" type="text" value="1" />
            <input type="submit" value="Añadir al carrito" />
            <input
              @click="eliminarDeWishList(product)"
              type="button"
              value="X"
            />
          </form>
        </td>
      </tr>
      <input
        class="enviarTodoCarrito"
        type="button"
        value="Enviar todo al carrito"
        @click="enviarTodoCarrito"
      />
    </table>
    <p v-else>No tiene productos en Wish List</p>
  </div>
</template>

<script>
export default {
  computed: {
    wishlist() {
      return this.$store.state.product.wishList;
    },
    numProdReq() {
      let numProdReq = [];
      for (let i = 0; i < this.wishlist.length; i++) {
        numProdReq.push(1);
      }
      return numProdReq;
    },
  },
  methods: {
    async eliminarDeWishList(product) {
      await this.$store.dispatch("product/eliminarProdWishList", product);
    },
    async enviarTodoCarrito() {
      await this.$store.dispatch("product/enviarWishListCarrito");
    },
    async anadirACarrito(product, index) {
      this.$store.dispatch("product/add_product_carrito", {
        product: product,
        copias: this.numProdReq[index],
        tipoAccion: "aumentar",
      });
      await this.eliminarDeWishList(product);
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.WishList {
  padding: 20px;
  color: #35495e;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.WishList h2 {
  font-weight: bolder;
  margin-bottom: 50px;
}
.WishList input[type="submit"] {
  width: 20%;
  align-items: flex-start;
}
.productoRow {
  display: flex;
}
.productoRow td {
  padding: 10px 30px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.productoRow img {
  width: 100px;
}
.productoRow td:nth-child(2) {
  font-weight: bolder;
  font-style: italic;
}
.productoRow td:nth-child(3) {
  font-size: 20px;
}
.productoRow td:nth-child(3) form {
  display: flex;
}
form input[type="text"] {
  max-width: 40px;
  height: 24px;
  text-align: center;
  justify-content: center;
}
form input[type="submit"] {
  height: 24px;
  width: 120px !important;
  padding: 0 5px;
  background: #42b883;
  border: 0;
  color: white;
}
form input[type="button"] {
  height: 24px;
  padding: 0 5px;
  background: white;
  border: 0;
  color: red;
  font-size: 24px;
}
table {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
table tr {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
table td {
  width: 100%;
}
.encabezado {
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #35495e;
}
.enviarTodoCarrito {
  background: #42b883;
  border: 0;
  padding: 5px;
  color: white;
  width: 30%;
  margin: 30px 30%;
}
</style>
