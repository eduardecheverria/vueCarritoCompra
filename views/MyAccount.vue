<template>
  <div class="MyAccount">
    <UserLogin v-if="Object.keys(this.user) == 0" />
    <UserPanel v-else />
  </div>
</template>

<script>
import UserLogin from "@/components/UserLogin.vue";
import UserPanel from "@/components/UserPanel.vue";

export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  /*async created() {
    await this.$store.dispatch("user/set_user_action", "obi_22");
  },*/
  components: {
    UserLogin,
    UserPanel,
  },

  //v-if="user.length > 0"
};
</script>

<style scoped>
.MyAccount {
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
}
</style>
