import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ContactUs from "../views/ContactUs.vue";
import ShoppingCar from "../views/ShoppingCar.vue";
import MyAccount from "../views/MyAccount.vue";
import ShowProduct from "../views/ShowProduct.vue";
import PagarCarrito from "../views/PagarCarrito.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contactus",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/myaccount",
    name: "MyAccount",
    component: MyAccount,
  },
  {
    path: "/shoppingcar",
    name: "ShoppingCar",
    component: ShoppingCar,
  },
  {
    path: "/showproduct",
    name: "ShowProduct",
    component: ShowProduct,
  },
  {
    path: "/pagarcarrito",
    name: "PagarCarrito",
    component: PagarCarrito,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
