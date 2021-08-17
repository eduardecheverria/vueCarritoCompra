<template>
  <footer>
    <p>@Copyright ecofactura 2020 by Eduardo Echeverria</p>
  </footer>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
footer {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: white;
  font-size: 10px;
  background: #35495e;
  position: fixed;
  bottom: 0;
}
</style>
