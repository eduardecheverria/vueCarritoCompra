<template>
  <div id="notificationContainer">
    <NotificationBubble
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBubble from "@/components/NotificationBubble.vue";
export default {
  computed: {
    notifications() {
      return this.$store.state.notification.notifications;
    },
  },
  components: {
    NotificationBubble,
  },
};
</script>

<style scoped>
#notificationContainer {
  position: fixed;
  top: 0;
  right: 0;
  width: 15%;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
