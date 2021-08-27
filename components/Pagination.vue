<template>
  <ul>
    <li>&#60;</li>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>&#62;</li>
  </ul>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style scoped>
ul {
  display: flex;
  list-style: none;
  margin: 20px;
  justify-content: center;
}
li {
  margin: 2px;
  padding: 5px;
  background: #35495e;
}
</style>
