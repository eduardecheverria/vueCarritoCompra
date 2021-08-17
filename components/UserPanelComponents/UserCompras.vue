<template>
  <div class="TablaCompras">
    <h2>Historial de Compras</h2>
    <table v-if="compras.length > 0">
      <tr class="encabezadoTabla">
        <th>ID de compra</th>
        <th>Fecha de compra</th>
        <th>Producto</th>
      </tr>
      <tr v-for="compra in compras" :key="compra.id" class="cuerpoTabla">
        <td>{{ compra.id }}</td>
        <td>{{ compra.fechaHora }}</td>
        <td
          class="producto"
          v-if="getProductObject(compra.ISBN)"
          :compra="compra"
        >
          <!--prettier-ignore-->
          <img :src="require(`@/assets/productos/${getProductObject(compra.ISBN).src}`)"/>
          <ul>
            <li>
              <span>Titulo: </span> {{ getProductObject(compra.ISBN).title }}
            </li>
            <li>
              <span>ISBN:</span> {{ getProductObject(compra.ISBN).autor }}
            </li>
            <li>
              <span>Costo:</span> {{ getProductObject(compra.ISBN).costo }}
            </li>
            <li>
              <span>Autor:</span> {{ getProductObject(compra.ISBN).autor }}
            </li>
          </ul>
        </td>
      </tr>
    </table>
    <p v-else>No tiene Compras aún</p>
  </div>
</template>

<script>
export default {
  methods: {
    async fetchProductByISBN(ISBN) {
      await this.$store.dispatch("product/fetch_productCompradoByISBN", ISBN);
    },
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    compras() {
      return this.$store.state.compras.compras;
    },
    getProductObject() {
      return this.$store.getters["product/getProductByISBN"];
    },
  },
  async created() {
    await this.$store.dispatch("compras/fetch_compras", this.user.id);
    let array_compras = this.$store.state.compras.compras;
    await array_compras.forEach(async (compra) => {
      await this.fetchProductByISBN(compra.ISBN);
    });
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.TablaCompras {
  padding: 5px;
  color: #35495e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.TablaCompras h2 {
  font-weight: bolder;
  margin-bottom: 30px;
}
table,
td,
th {
  border: 0;
  border-spacing: 0;
}

td {
  padding: 10px;
}
th {
  padding: 5px !important;
  border-bottom: 3px solid #35495e;
}
.encabezadoTabla th {
  padding: 0;
}
.producto {
  display: flex;
  align-content: center;
  justify-content: space-around;
  padding: 10px;
  width: 300px;
}

.producto img {
  width: 100px;
}
.producto ul {
  list-style: none;
}
.producto ul li {
  padding: 3px;
}
.producto ul li span {
  font-style: italic;
  font-weight: bolder;
}
</style>
