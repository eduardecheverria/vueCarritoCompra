<template>
  <div id="app">
    <NavBar />
    <router-view class="navFixed" />
    <NotificationContainer v-show="notification.length > 0" />
    <FooterBar />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import NotificationContainer from "@/components/NotificationContainer.vue";

export default {
  components: {
    NavBar,
    FooterBar,
    NotificationContainer,
  },
  computed: {
    notification() {
      return this.$store.state.notification.notifications;
    },
  },
  async mounted() {
    if (localStorage.getItem("576987") !== null) {
      await this.$store.dispatch(
        "user/set_user_action",
        localStorage.getItem("576987")
      );
    }
  },
};
</script>

<style>
.navFixed {
  margin: 40px 0;
}
</style>
