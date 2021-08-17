<template>
  <div class="home_root">
    <SearchBar />
    <div class="home">
      <ProductCard v-for="item in products" :key="item.ISBN" :product="item" />
    </div>
  </div>
</template>

<script>
//import mapState from "vuex";
//import { mapGetters } from "vuex";
import ProductCard from "@/components/ProductCard.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "Home",
  components: {
    ProductCard,
    SearchBar,
  },
  computed: {
    products() {
      return this.$store.getters["product/getProductByTitle"];
    },
  },
  async created() {
    //reestableciendo el valor de busqueda
    this.$store.dispatch("product/set_search_value_action", "");
    await this.$store.dispatch("product/fetch_products");
  },
};
</script>

<style scoped>
.home {
  display: grid;
  align-content: center;
  justify-content: center;
  grid-gap: 3px;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 8%;
}
</style>
