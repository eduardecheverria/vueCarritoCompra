<template>
  <div id="SearchBar">
    <div class="input_container_search">
      <input
        type="text"
        placeholder="Search By ISBN, Autor ,Title"
        v-model="search_value"
        @keyup.enter="search_value_change()"
      />
      <button class="search_icon" @click="search_value_change()">
        <img src="@/assets/search.png" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_value: "",
    };
  },
  methods: {
    search_value_change() {
      this.$store.dispatch(
        "product/set_search_value_action",
        this.search_value
      );
    },
  },
  watch: {
    search_value: function () {
      if (this.search_value.length === 0) {
        this.$store.dispatch("product/set_search_value_action", "");
      }
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
#SearchBar {
  background: #999999;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  position: fixed;
}
.input_container_search input {
  width: 500px;
  height: 30px;
  border: 0;
  border-radius: 5px;
  padding: 2px 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 0;
}
.search_icon {
  background: white;
  border: 0 solid;
  height: 30px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 20px;
  border-left: 1px solid #999999;
  padding: 2px 0;
}
.search_icon img {
  width: 10px;
}
</style>
