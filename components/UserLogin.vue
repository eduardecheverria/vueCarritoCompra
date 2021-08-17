<template>
  <div class="about">
    <div class="form_body">
      <div class="encabezado">
        <h2>Login</h2>
        <p>Puedes contactarnos al 33119903345 o a correo@corre.com</p>
      </div>
      <form @submit.prevent="send_form()" action="./">
        <input type="text" placeholder="Nombre" required v-model="username" />
        <input type="password" required placeholder="Password" />
        <input type="submit" value="Enviar" />
      </form>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    send_form() {
      this.$store.dispatch("user/set_user_action", this.username);
    },
  },
};
</script>

<style scoped>
.about {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.encabezado {
  background: #e3e3e3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.encabezado h2 {
  font-size: 40px;
  font-weight: bolder;
  color: #414a4c;
}
.encabezado p {
  text-justify: justify;
  color: #848484;
}
.form_body {
  -webkit-box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -2px rgba(0, 0, 0, 0.75);
}
form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
input,
textarea {
  width: 80%;
  padding: 5px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #c1c1c1;
}
input[type="submit"] {
  background: #42b883;
  color: white;
}
</style>
