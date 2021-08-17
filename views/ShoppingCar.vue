<template>
  <div class="carrito_container">
    <div v-if="carrito.length > 0" class="carrito">
      <div class="productos">
        <h2>Mi Carrito</h2>
        <table>
          <tr class="encabezado_tabla">
            <th>Tu producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Sub-total</th>
            <th>Eliminar</th>
          </tr>
          <tr
            class="producto_row"
            v-for="(producto, index) in carrito"
            :key="index"
          >
            <td>
              <div class="producto_container">
                <img
                  :src="require(`@/assets/productos/${producto.src}`)"
                  alt=""
                />
                <div class="producto_descripcion">
                  <h4>{{ producto.title }}</h4>
                  <p>
                    Autor: <a href="#">{{ producto.autor }}</a>
                  </p>
                </div>
              </div>
            </td>
            <td class="producto_costo">${{ producto.costo }}</td>
            <td class="cantidad_producto">
              <input
                type="text"
                @blur="cambiar_numCopias(index)"
                v-model="producto.copias"
              />
            </td>
            <td class="producto_costo">
              ${{ producto.copias * producto.costo }}
            </td>
            <td class="eliminar_producto">
              <button @click="eliminarProducto(index)">X</button>
            </td>
          </tr>
        </table>
      </div>
      <div class="pagar">
        <h2>Resumen del pedido</h2>
        <div class="total">
          <label>Total</label><span>${{ total }}</span>
        </div>
        <router-link to="PagarCarrito" class="btn_pagar">
          <label>Pagar</label>
          <span>En este último paso podrás revisar tu pedido</span>
        </router-link>
        <div class="politicas">
          <h3>POLÍTICA DE DEVOLUCIÓN</h3>
          <p>Tienes 60 días para devolver tu producto por cualquier motivo.</p>
          <a href="#">Ver política de devolución</a>
        </div>
        <div class="politicas">
          <h3>ENVÍO Y ENTREGA</h3>
          <p>
            Los pedidos se entregan en días laborales (de lunes a viernes),
            excepto en días festivos.
          </p>
          <a href="#">Conoce nuestros tiempos de entrega</a>
        </div>
      </div>
    </div>
    <div v-else class="mensaje_informativo">
      <h2>Bolsa Vacía</h2>
      <p>No tienes productos en tu carrito</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagina: 1,
    };
  },
  computed: {
    carrito() {
      return this.$store.state.product.carrito;
    },
    cantidad() {
      let cantidad = [];
      for (let i = 0; i < this.carrito.length; i++) {
        cantidad[i] = 1;
      }
      return cantidad;
    },
    total() {
      let total = 0;
      for (let i = 0; i < this.carrito.length; i++) {
        total = total + this.carrito[i].copias * this.carrito[i].costo;
      }
      return total;
    },
  },
  methods: {
    async cambiar_numCopias(index) {
      if (this.carrito[index].copias !== "") {
        this.carrito[index].copias = parseInt(this.carrito[index].copias);
        if (this.carrito[index].copias === 0) {
          await this.$store.dispatch(
            "product/eliminar_product_carrito_action",
            this.carrito[index]
          );
        } else {
          await this.$store.dispatch("product/add_product_carrito", {
            product: this.carrito[index],
            copias: this.carrito[index].copias,
            tipoAccion: "asignar",
          });
        }
      }
    },
    async eliminarProducto(index) {
      await this.$store.dispatch(
        "product/eliminar_product_carrito_action",
        this.carrito[index]
      );
    },
  },
};
</script>

<style scoped>
.carrito_container {
  margin-top: 100px;
}
.mensaje_informativo {
  margin-left: 200px;
}
.mensaje_informativo h2 {
  color: #308972;
}
.carrito {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.carrito h2 {
  font-weight: bolder;
  color: #308972;
}
.carrito table {
  padding: 0;
  border-spacing: 0px;
  color: #35495e;
}
.encabezado_tabla {
  background: #35495e;
  border-spacing: 0;
  font-size: 18px;
  color: white;
  font-weight: lighter;
}
.encabezado_tabla th {
  padding: 8px;
}
.producto_container {
  display: flex;
  align-items: center;
}
.producto_container img {
  width: 80px;
  padding: 10px;
}
.producto_descripcion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}
.producto_descripcion h4 {
  max-width: 150px;
  text-align: center;
}
.producto_container a {
  color: #35495e;
}
.producto_costo {
  font-size: 25px;
  padding: 0 30px;
}
.cantidad_producto input {
  width: 50px;
  padding: 5px;
  text-align: center;
  font-size: 20px;
}
.producto_row:nth-child(odd) {
  background: #eeeeee;
}
.eliminar_producto {
  padding: 0 30px;
}
.eliminar_producto button {
  background: transparent;
  border: 0;
}
.pagar {
  margin-left: 80px;
  width: 20%;
}
.pagar .total {
  display: flex;
  justify-content: space-between;
  margin: 0;
  font-weight: bolder;
  font-size: 25px;
}
.btn_pagar {
  margin: 30px 0;
  padding: 20px;
  background: #42b883;
  border: 0;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-decoration: none;
}
.btn_pagar label {
  font-size: 25px;
}
.politicas h3 {
  font-size: 13px;
  color: #308972;
}
.politicas p,
.politicas a {
  font-size: 11px;
}
</style>
