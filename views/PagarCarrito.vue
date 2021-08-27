<template>
  <div class="PagarCarrito">
    <h2>Pagar</h2>
    <p>Para completar tu pedido, sólo falta llenar los siguientes campos</p>
    <main>
      <div class="formPago">
        <div v-if="Object.keys(user).length === 0" class="encabezadoPedido">
          <font-awesome-icon class="icono" :icon="['fas', 'user']" />
          <div class="tituloEncabezado">
            <h3>Mi cuenta</h3>
          </div>
        </div>
        <form
          v-if="Object.keys(user).length === 0"
          class="iniciarSesion"
          @submit.prevent="iniciarSesion()"
        >
          <div class="inputContainer">
            <label for="nombre">*Nombre de Usuario</label>
            <input required type="text" v-model="nombreUsuario" name="nombre" />
          </div>
          <div class="inputContainer">
            <label for="apellido">*Contraseña</label>
            <input
              required
              type="password"
              v-model="password"
              name="apellido"
            />
          </div>
          <div class="inputContainer">
            <input class="enviarFormulario" type="submit" value="Continuar" />
          </div>
        </form>
        <div class="encabezadoPedido">
          <font-awesome-icon class="icono" :icon="['fas', 'map-marker-alt']" />
          <div class="tituloEncabezado">
            <h3>Dirección</h3>
          </div>
        </div>
        <form
          v-if="Object.keys(user).length > 0"
          @submit.prevent="validarErroresMetPag"
          class="formDireccion"
        >
          <div class="inputContainer">
            <label for="nombre">*Nombre</label>
            <input
              :class="claseInputNombre"
              required
              type="text"
              v-model="nombre"
              name="nombre"
            />
          </div>
          <div class="inputContainer">
            <label for="apellido">*Apellido</label>
            <input
              :class="claseInputApellidos"
              required
              type="text"
              v-model="apellidos"
              name="apellido"
            />
          </div>
          <div class="inputContainer inputLargo">
            <label for="direccion">*Dirección</label>
            <input
              :class="claseInputDireccion"
              required
              type="text"
              v-model="direccion"
              name="direccion"
            />
          </div>
          <div class="inputContainer inputLargo">
            <input type="button" @click="showMetodosPago()" value="Continuar" />
          </div>
          <div class="encabezadoPedido metodoPago">
            <font-awesome-icon
              class="icono"
              :icon="['fas', 'money-bill-wave-alt']"
            />
            <div class="tituloEncabezado">
              <h3>Método de Pago</h3>
            </div>
          </div>
          <div v-if="visibilityMetodosPago" class="formMetodoPago">
            <div class="metodoPagoOption">
              <input @click="showInfoTarjeta" type="radio" name="metodo_pago" />
              <label>Tarjeta de Crédito o Débito</label>
              <div v-if="visibilityInfoTarjeta" class="informacion_tarjeta">
                <h3>Información Tarjeta</h3>
                <div class="inputContainer">
                  <label for="tarjeta_habiente">*Tarjeta habiente</label>
                  <input
                    :class="claseInputNombreTarjetaHab"
                    type="text"
                    v-model="nombreTarjetaHabiente"
                    name="tarjeta_habiente"
                  />
                </div>
                <div class="inputContainer">
                  <label for="numero_tarjeta">*Numero tarjeta</label>
                  <input
                    :class="claseInputNumTarjeta"
                    type="text"
                    v-model="numeroTarjeta"
                    name="numero_tarjeta"
                  />
                </div>
                <div class="inputContainer inputLargo">
                  <label for="direccion">*Vigencia</label>
                  <div class="fecha_expiracion">
                    <select
                      v-model="tarjetaVigenciaMes"
                      :class="claseInputVigenciaMes"
                      name="mes"
                    >
                      <option value="mes" selected="selected">Mes</option>
                      <option value="1">Enero</option>
                      <option value="2">Febrero</option>
                      <option value="3">Marzo</option>
                      <option value="4">Abril</option>
                      <option value="5">Mayo</option>
                      <option value="6">Junio</option>
                      <option value="7">Julio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                    <select
                      v-model="tarjetaVigenciaAnio"
                      :class="claseInputVigenciaAnio"
                    >
                      <option value="anio" selected="selected">Año</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="metodoPagoOption top_border">
              <input
                @click="showInfoEfectivo"
                type="radio"
                name="metodo_pago"
              /><label>Efectivo</label>
            </div>
            <!-- prettier-ignore -->
            <div v-if="visibilityInfoEfectivo === true || visibilityInfoTarjeta === true" class="inputComprarContainer">
              <input type="submit" value="Comprar" />
            </div>
          </div>
        </form>
      </div>
      <div class="ResumenPedido">
        <div class="encabezadoPedido">
          <font-awesome-icon class="icono" :icon="['fas', 'shopping-bag']" />
          <div class="tituloEncabezado">
            <h3>Resumen del pedido</h3>
            <p>libro(s) en la bolsa.</p>
          </div>
        </div>
        <div v-for="producto in carrito" :key="producto.ISBN" class="producto">
          <img :src="require(`@/assets/productos/${producto.src}`)" />
          <div class="descripcionProducto">
            <h4>{{ producto.title }}</h4>
            <p>Autor: {{ producto.autor }}</p>
            <div class="copiasCantidad">
              <label>Cantidad:{{ producto.copias }}</label
              ><label>${{ producto.copias * producto.costo }}</label>
            </div>
          </div>
        </div>

        <div class="total_container">
          <p>
            Total <span class="total">${{ total }} </span>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visibilityMetodosPago: false,
      visibilityInfoTarjeta: false,
      visibilityInfoEfectivo: false,
      nombre: "",
      apellidos: "",
      direccion: "",
      nombreTarjetaHabiente: "",
      numeroTarjeta: "",
      tarjetaVigenciaMes: "mes",
      tarjetaVigenciaAnio: "anio",
      claseInputNombre: "",
      claseInputApellidos: "",
      claseInputDireccion: "",
      claseInputNumTarjeta: "",
      claseInputNombreTarjetaHab: "",
      claseInputVigenciaMes: "",
      claseInputVigenciaAnio: "",
      password: "",
      nombreUsuario: "",
    };
  },
  methods: {
    validarErroresMetPag() {
      let errores = 0;
      if (this.nombreTarjetaHabiente === "") {
        this.claseInputNombreTarjetaHab = "error";
        errores++;
      } else {
        this.claseInputNombreTarjetaHab = "";
      }
      if (this.numeroTarjeta === "") {
        this.claseInputNumTarjeta = "error";
        errores++;
      } else {
        this.claseInputNumTarjeta = "";
      }
      if (this.tarjetaVigenciaMes === "mes") {
        this.claseInputVigenciaMes = "error";
        errores++;
      } else {
        this.claseInputVigenciaMes = "";
      }
      if (this.tarjetaVigenciaAnio === "anio") {
        this.claseInputVigenciaAnio = "error";
        errores++;
      } else {
        this.claseInputVigenciaAnio = "";
      }
      if (errores === 0) {
        this.comprar();
      }
    },
    comprar() {
      this.$store.dispatch("product/comprar");
    },
    remarcarInputsVacio() {
      if (this.nombre === "") {
        this.claseInputNombre = "error";
      } else {
        this.claseInputNombre = "";
      }
      if (this.apellidos === "") {
        this.claseInputApellidos = "error";
      } else {
        this.claseInputApellidos = "";
      }
      if (this.direccion === "") {
        this.claseInputDireccion = "error";
      } else {
        this.claseInputDireccion = "";
      }
    },
    showMetodosPago() {
      this.remarcarInputsVacio();
      // prettier-ignore
      if (this.nombre!==""&& this.apellidos!=="" && this.direccion!=="") {
          this.visibilityMetodosPago = true;
      }
    },
    showInfoTarjeta() {
      this.visibilityInfoTarjeta = true;
      this.visibilityInfoEfectivo = false;
    },
    showInfoEfectivo() {
      this.visibilityInfoTarjeta = false;
      this.visibilityInfoEfectivo = true;
    },
    iniciarSesion() {
      console.log("se envia formulario");
      this.$store.dispatch("user/set_user_action", this.nombreUsuario);
    },
  },
  computed: {
    carrito() {
      return this.$store.state.product.carrito;
    },
    user() {
      return this.$store.state.user.user;
    },
    total() {
      let total = 0;
      for (let i = 0; i < this.carrito.length; i++) {
        total = total + this.carrito[i].costo * this.carrito[i].copias;
      }
      return total;
    },
    optionsMes() {
      return [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
h2 {
  font-weight: bolder;
  color: #308972;
}
.PagarCarrito {
  padding: 50px 10% 0 10%;
  margin-bottom: 100px;
}
.PagarCarrito main {
  display: flex;
  flex-direction: row;
}
.ResumenPedido {
  padding: 10px;
  background: #f1f1f1;
  height: 100%;
}
.encabezadoPedido {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: #e8e8e8;
  height: 40px;
  padding: 5px 10px;
}
.iniciarSesion {
  margin-bottom: 20px;
}
.icono {
  font-size: 40px;
  color: #308972;
  margin-right: 10px;
}
.tituloEncabezado h3 {
  font-size: 16px;
  color: #308972;
}
.tituloEncabezado p {
  margin-top: 5px;
  font-size: 12px;
  color: #35495e;
}
.producto {
  margin: 20px 0;
  display: flex;
  align-items: flex-start;
  min-width: 400px;
}
.producto img {
  width: 50px;
  margin-right: 10px;
}
.descripcionProducto h4 {
  font-size: 13px;
  max-width: 250px;
  font-weight: bolder;
}
.descripcionProducto p {
  font-size: 12px;
  color: #474b4e;
  margin-top: 10px;
}
.copiasCantidad {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 300px;
}
.copiasCantidad label:nth-child(1) {
  font-size: 12px;
  font-weight: bolder;
}
.copiasCantidad label:nth-child(2) {
  font-weight: bolder;
  color: #35495e;
}
.total_container {
  border-top: 1px solid#999999;
  display: flex;
  justify-content: flex-end;
  font-weight: bolder;
  font-size: 18px;
  color: #35495e;
  padding: 20px;
}
.total {
  margin-left: 10px;
  font-size: 20px;
}
.formPago {
  background: #f1f1f1;
  margin-right: 40px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 800px;
  height: 100%;
}
.formDireccion {
  animation-name: aparecer;
  animation-duration: 0.3s;
}
@keyframes aparecer {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}
.formPago form {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 20px;
}
.inputContainer input {
  width: 80%;
  padding: 5px 10%;
  border: 1px solid #e8e8e8;
}
.enviarFormulario {
  width: auto;
  background: #42b883;
  color: white;
  border: 1px solid #e8e8e8;
}

.inputContainer input[type="button"] {
  width: auto;
  background: #42b883;
  color: white;
  border: 1px solid #e8e8e8;
}
.inputLargo {
  grid-column: 1 / -1;
}
.metodoPago {
  grid-column: 1 / -1;
}
.formMetodoPago {
  display: flex;
  flex-direction: column;
  grid-column: 1 / -1;
  animation-name: expandir;
  animation-duration: 0.25s;
}
@keyframes expandir {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
.informacion_tarjeta {
  margin-top: 40px;
}
.informacion_tarjeta h3 {
  color: #308972;
}
.informacion_tarjeta .inputContainer {
  padding-top: 20px;
}
.metodoPagoOption {
  padding: 50px 0;
}
.metodoPagoOption label {
  margin-left: 10px;
}
.top_border {
  border-top: 1px solid #999999;
}
.fecha_expiracion {
  display: flex;
}
.fecha_expiracion select {
  width: 80%;
  margin-right: 10px;
  padding: 5px 10%;
  border: 1px solid #e8e8e8;
}
.inputComprarContainer input {
  width: 100%;
  background: #42b883;
  color: white;
  border: 1px solid #e8e8e8;
  font-size: 20px;
  padding: 10px 0;
}
.error {
  border: 1px solid #ff0000 !important;
}
</style>
