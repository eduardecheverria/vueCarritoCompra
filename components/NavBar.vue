<template>
  <header>
    <nav>
      <span class="logo"><img src="@/assets/logo.png" alt="Home" /></span>
      <ul>
        <li><router-link to="/">Inicio </router-link></li>
        <li>
          <router-link to="/contactus">Contactanos</router-link>
        </li>
        <li><router-link to="/myaccount">Mi cuenta</router-link></li>
        <li class="shopping_car">
          <p class="numberItemsCarrito" v-if="numero_productos_carrito > 0">
            {{ numero_productos_carrito }}
          </p>
          <router-link to="/ShoppingCar"
            ><img src="@/assets/shopping_car.png" alt="shopping car"
          /></router-link>
        </li>
      </ul>
      <span class="user_profile"
        ><router-link v-if="Object.keys(user).length === 0" to="/myaccount"
          ><img src="@/assets/profile-user.png" alt="user-icon"
        /></router-link>
        <div v-else>
          <button @click="mostrar_user_menu" class="link_user_profile">
            {{ user.username[0] }}
          </button>
          <div class="user_menu" v-if="mostrar_menu === true">
            <ul>
              <li>
                <router-link to="/myaccount">{{ user.username }}</router-link>
              </li>
              <li><router-link to="/myaccount">Mi cuenta</router-link></li>
              <li @click="cerrar_sesion">Cerrar Sesión</li>
            </ul>
          </div>
        </div>
      </span>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mostrar_menu: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    carrito() {
      return this.$store.getters["product/getCarrito"];
    },
    numero_productos_carrito() {
      let numero_productos = 0;
      this.carrito.forEach((element) => {
        numero_productos = numero_productos + element.copias;
      });
      return numero_productos;
    },
  },
  methods: {
    mostrar_user_menu() {
      if (this.mostrar_menu === false) {
        this.mostrar_menu = true;
      } else {
        this.mostrar_menu = false;
      }
    },
    cerrar_sesion() {
      this.$store.dispatch("user/cerrar_sesion");
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
header {
  background: #42b883;
  color: white;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  max-height: 40px;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
}
.logo img {
  max-width: 50px !important;
  display: block;
  padding: 5px;
  margin-left: 10px;
}
.shopping_car {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #35495e;
  background: #35495e;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 78px -5px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 0px 0px 78px -5px rgba(0, 0, 0, 0.41);
  box-shadow: 0px 0px 78px -5px rgba(0, 0, 0, 0.41);
  padding-top: 5px;
}
.shopping_car img {
  max-height: 20px;
}
nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 15px 10px 10px 0;
  width: 100%;
}
ul {
  list-style: none;
  display: flex;
}
ul li {
  list-style: none;
  padding: 0 15px;
}
ul li a {
  text-decoration: none;
  color: white;
  outline: none;
}
.user_profile img {
  padding: 5px;
  width: 30px;
}

.link_user_profile {
  border: 2px solid #35495e;
  background: #35495e;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  font-size: 15px;
  outline: none;
}
.link_user_profile:active {
  border: 2px solid white;
  background: white;
  color: #35495e;
}
.user_menu {
  width: 200px;
  padding: 10px;
  background: white;
  position: fixed;
  color: #35495e;
  z-index: 2;
  -webkit-box-shadow: 0px 0px 78px -5px rgba(0, 0, 0, 0.41);
  -moz-box-shadow: 0px 0px 78px -5px rgba(0, 0, 0, 0.41);
  box-shadow: 0px 0px 78px -5px rgba(0, 0, 0, 0.41);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.user_menu ul {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}
.user_menu li {
  margin: 10px 0;
  text-decoration: underline;
  cursor: pointer;
}
.user_menu li a {
  color: #35495e;
  cursor: pointer;
}
.numberItemsCarrito {
  border: 2px solid red;
  background: #35495e;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  font-size: 15px;
  outline: none;
  text-align: center;
  vertical-align: middle;
  position: absolute;
  top: 0;
  margin-right: -40px;
  z-index: 3;
}
</style>
