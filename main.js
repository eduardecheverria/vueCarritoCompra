import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faMapMarkerAlt,
  faShoppingBag,
  faHeart,
  faMoneyBillWaveAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faShoppingCart,
  faMapMarkerAlt,
  faShoppingBag,
  faHeart,
  faMoneyBillWaveAlt,
  faUser
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
