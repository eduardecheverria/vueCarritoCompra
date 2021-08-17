<template>
  <div class="UserPanel">
    <ul class="PanelBar">
      <li
        :class="link_info_cuenta_css"
        @click="cambiarContenido('info_cuenta')"
      >
        información de cuenta ⓘ
      </li>
      <li :class="link_compras_css" @click="cambiarContenido('compras')">
        Compras &#127915;
      </li>
      <li :class="link_deseos_css" @click="cambiarContenido('lista_deseos')">
        Wish list &#9829;
      </li>
    </ul>
    <InfoCuenta v-if="contenido === 'info_cuenta'" />
    <UserCompras v-if="contenido === 'compras'" />
    <WishList v-if="contenido === 'lista_deseos'" />
  </div>
</template>

<script>
import InfoCuenta from "@/components/UserPanelComponents/InfoCuenta.vue";
import UserCompras from "@/components/UserPanelComponents/UserCompras.vue";
import WishList from "@/components/UserPanelComponents/WishList.vue";

export default {
  data() {
    return {
      contenido: "info_cuenta",
      link_compras_css: "",
      link_info_cuenta_css: "selected",
      link_deseos_css: "",
    };
  },
  methods: {
    cambiarContenido(contenido) {
      this.contenido = contenido;
      // prettier-ignore
      this.link_info_cuenta_css = contenido === "info_cuenta" ? "selected" : "";
      this.link_compras_css = contenido === "compras" ? "selected" : "";
      this.link_deseos_css = contenido === "lista_deseos" ? "selected" : "";
    },
  },
  components: {
    InfoCuenta,
    UserCompras,
    WishList,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.UserPanel {
  display: grid;
  grid-template-columns: 20% 80%;
  margin-top: 60px;
  grid-gap: 30px;
  box-sizing: border-box;
}
.areaInfo {
  background: olivedrab;
}
.PanelBar {
  background: #35495e;
  color: white;
  list-style: none;
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.PanelBar li {
  padding: 10px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
}
.PanelBar li:last-child {
  border-bottom: 1px solid white;
}
.selected {
  background: #42b883;
  color: #35495e;
  -webkit-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);
  border-top-right-radius: 50px;
  border-bottom-right-radius: 200px;
  width: 110% !important;
}
</style>
