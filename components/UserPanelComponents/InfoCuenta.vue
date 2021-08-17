<template>
  <div class="InfoCuenta">
    <h2>Modificar información de cuenta</h2>
    <h3>información de cuenta</h3>
    <form @submit.prevent="validar_formulario">
      <div class="FormInfo">
        <div class="InputContainer">
          <label for="nombre"><span>*</span>Username</label>
          <input
            required
            v-model="newUser.username"
            type="text"
            name="username"
          />
        </div>
        <div class="InputContainer">
          <label for="nombre"><span>*</span>Dirección</label>
          <input
            v-model="newUser.direccion"
            required
            type="text"
            name="nombre"
          />
        </div>
        <div class="InputContainer">
          <label for="nombre"><span>*</span>Fecha de nacimiento</label>
          <input
            required
            v-model="newUser.fecha_nacimiento"
            type="text"
            name="fecha_nacimiento"
          />
        </div>
      </div>
      <div class="InputCambiarPass">
        <input type="checkbox" name="cambiarPass" v-model="cambiarPass" />
        <label for="cambiarPass">Cambiar contraseña</label>
      </div>
      <div v-if="cambiarPass === true" class="FormInfo">
        <div class="InputContainer">
          <label for="actualPass"><span>*</span>Contraseña Actual</label>
          <input
            required
            type="text"
            v-model="actualPass"
            name="actualPass"
            :class="claseInputActualPass"
          />
          <span :class="actualPassMessageClass">{{
            this.actualPassMessage
          }}</span>
        </div>
        <div class="InputContainer">
          <label for="newPass"><span>*</span>Nueva Contraseña</label>
          <input
            required
            type="text"
            name="newPass"
            v-model="newPass"
            :class="claseInputNewPass"
          />
          <span :class="newPassMessageClass">{{ this.newPassMessage }}</span>
        </div>
        <div class="InputContainer">
          <label for="newPassConfirm"><span>*</span>Repite Contraseña</label>
          <input
            required
            type="text"
            name="newPassConfirm"
            v-model="newPassConfirm"
            :class="claseInputNewPassConf"
          />
          <span :class="newPassConfMessageClass">{{
            this.newPassConfMessage
          }}</span>
        </div>
      </div>
      <div class="InputSubmit">
        <input type="submit" value="Guardar" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },
  data() {
    return {
      cambiarPass: false,
      newUser: {
        id: this.$store.state.user.user.id,
        username: this.$store.state.user.user.username,
        password: "",
        direccion: this.$store.state.user.user.direccion,
        fecha_nacimiento: this.$store.state.user.user.fecha_nacimiento,
      },
      actualPass: "",
      claseInputActualPass: "",
      actualPassMessage: "",
      actualPassMessageClass: "",
      newPass: "",
      newPassConfirm: "",
      claseInputNewPass: "",
      claseInputNewPassConf: "",
      newPassMessage: "",
      newPassConfMessage: "",
      newPassMessageClass: "",
      newPassConfMessageClass: "",
      formError: 0,
    };
  },
  methods: {
    validar_formulario() {
      if (this.autenticarNewPass() && this.autenticarPassActual()) {
        this.newUser.password = this.newPass;
        this.$store.dispatch("user/update_user", this.newUser);
      } else {
        console.log("formulario no enviado");
      }
    },
    autenticarPassActual() {
      if (this.actualPass === this.user.password) {
        this.claseInputActualPass = "";
        this.actualPassMessage = "";
        this.actualPassMessageClass = "";
        return true;
      } else {
        this.claseInputActualPass = "inputError";
        this.actualPassMessage = "Error: Contraseña erronea";
        this.actualPassMessageClass = "messageError";
        return false;
      }
    },
    autenticarNewPass() {
      let errores = 0;
      if (this.newPass !== this.newPassConfirm) {
        this.claseInputNewPassConf = "inputError";
        this.newPassConfMessage = "Error: Contraseñas no coinciden";
        this.newPassConfMessageClass = "messageError";
        errores++;
      } else {
        this.claseInputNewPassConf = "";
        this.newPassConfMessage = "";
        this.newPassConfMessageClass = "";
      }
      // validar si tiene numero
      if (/\d/.test(this.newPass) === false) {
        this.claseInputNewPass = "inputError";
        this.newPassMessage = "Error: Contraseña debe contener un número";
        this.newPassMessageClass = "messageError";
        errores++;
      } else {
        this.claseInputNewPass = "";
        this.newPassMessage = "";
        this.newPassMessageClass = "";
      }
      // validar que la nueva contraseña tenga mas de 5 carac.
      if (this.newPass.length < 6) {
        this.claseInputNewPass = "inputError";
        this.newPassMessage = "Error: Contraseña debe ser mayor a 5 caracteres";
        this.newPassMessageClass = "messageError";
        errores++;
      } else {
        if (errores === 0) {
          this.claseInputNewPass = "";
          this.newPassMessage = "";
          this.newPassMessageClass = "";
        }
      }
      if (errores > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.InfoCuenta {
  padding: 20px;
  color: #35495e;
}
.InfoCuenta h2 {
  font-weight: bolder;
  margin-bottom: 50px;
}
.InfoCuenta .FormInfo {
  display: flex;
  justify-content: flex-start;
}
.InputContainer {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  max-width: 170px;
}
.InputContainer label {
  padding: 5px;
}
.InputContainer label span {
  color: #42b883;
  font-size: 20px;
  padding: 1px;
}
.InputCambiarPass {
  padding: 50px 0 20px 0;
}
.InputSubmit {
  display: flex;
  justify-content: flex-end;
}
.InputSubmit input {
  padding: 12px;
  background: #42b883;
  color: white;
  border: 0;
  cursor: pointer;
}
.inputSuccess {
  border: 2px solid #4bb543;
}
.inputSuccess:focus {
  outline: none !important;
  border: 2px solid #4bb543;
}
.inputError:focus {
  outline: none !important;
  border: 2px solid #ff0000;
}
.inputError {
  border: 2px solid #ff0000;
}
.messageSuccess {
  color: #4bb543;
}
.messageError {
  color: #ff0000;
  font-size: 12px;
  width: 100%;
}
</style>
