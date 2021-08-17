<template>
  <div class="notification_box">
    <input type="submit" value="x" @click="destroy_notification" />
    <div class="notification">
      <h3>{{ this.notification.header }}</h3>
      <p>{{ this.notification.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: { notification: { type: Object } },
  methods: {
    destroy_notification() {
      this.$store.dispatch(
        "notification/destroy_notification_action",
        this.notification.id
      );
    },
  },
};
</script>

<style scoped>
.notification_box {
  width: 100%;
  padding: 10px;
  background: white;
  border: 1px solid #c1c1c1;
  -webkit-box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.75);
}
.notification {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.notification p {
  font-size: 12px;
}
input[type="submit"] {
  background: white;
  border: 0;
  display: flex;
  position: fixed;
  font-size: 20px;
  justify-content: center;
}
</style>
