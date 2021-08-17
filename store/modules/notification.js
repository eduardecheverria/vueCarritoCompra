export const namespaced = true;

export const state = {
  notifications: [],
};
export const mutations = {
  SET_NOTIFICATIONS(state, notification) {
    const notification_len = state.notifications.length;
    if (notification_len > 0) {
      console.log(notification_len);
      notification.id = state.notifications[notification_len - 1].id + 1;
    } else {
      notification.id = notification_len + 1;
    }
    state.notifications.push(notification);
  },
  DESTROY_NOTIFICATION(state, notification_id) {
    const new_notifications = state.notifications.filter((notification) => {
      return notification.id !== notification_id;
    });
    state.notifications = new_notifications;
  },
};
export const actions = {
  set_notification_action({ commit }, notification) {
    commit("SET_NOTIFICATIONS", notification);
  },
  destroy_notification_action({ commit }, notification_id) {
    commit("DESTROY_NOTIFICATION", notification_id);
  },
};

export const getters = {};
