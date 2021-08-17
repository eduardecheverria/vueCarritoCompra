<template>
  <div class="ProductCard">
    <div class="ProductImage_container" :id="product.id">
      <img
        :src="require(`@/assets/productos/${this.product.src}`)"
        alt="image of product"
      />
    </div>
    <h3>{{ this.product.title }}</h3>
    <div class="contenedor_info_producto">
      <div class="info_producto">
        <p>Autor: {{ this.product.autor }}</p>
        <p>$ {{ this.product.costo }}</p>
      </div>
      <div class="botones_producto">
        <button @click="add_carrito(product)">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        </button>
        <button
          @click="add_wishlist(product)"
          v-if="Object.keys(user).length > 0"
        >
          <font-awesome-icon :icon="['fas', 'heart']" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  methods: {
    add_wishlist(product) {
      this.$store.dispatch("product/add_product_wishList", product);
    },
    add_carrito(product) {
      console.log(product);
      this.$store.dispatch("product/add_product_carrito", {
        product: product,
        copias: 1,
        tipoAccion: "aumentar",
      });
    },
  },
};
</script>

<style scoped>
.ProductCard {
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.ProductCard p {
  padding: 5px 0;
  margin: 0;
}
.ProductCard h3 {
  padding: 10px 0;
  margin: 0;
}
.contenedor_info_producto {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info_producto {
  padding: 5px;
}
.botones_producto {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}
.botones_producto button {
  background: white;
  border: 0;
  font-size: 20px;
  margin-top: 10px;
  cursor: pointer;
}
.botones_producto button:first-child {
  color: #35495e;
}
.botones_producto button:nth-child(2) {
  color: #572364;
}
.ProductImage_container img {
  width: 200px;
}
</style>
