<template>
  <div id="informe">
    <IconoUsuario />

    <div class="titulo">{{this.$t("registro.titulo")}}</div>

    <div class="cuerpo">
      <v-container fluid style="width: 95%; max-width: 500px">
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            v-model="user.contact"
            required
            :rules="reglaObligatorio"
            append-outer-icon="mdi-account"
            :label="$t('registro.labelCorreo')"
            color="#178649"
          >
          </v-text-field>

          <v-text-field
            v-model="user.password"
            required
            :rules="reglaObligatorio"
            :append-outer-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :label="$t('registro.labelContrasena')"
            color="#178649"
            @click:append-outer="show = !show"
          >
          </v-text-field>

          <v-divider />

          <v-btn
            class="white--text"
            width="100%"
            height="50"
            color="#178649"
            :disabled="!valid"
            @click="register"
          >
          {{this.$t("registro.botonRegistro")}}
          </v-btn>

          <br /><br />

          <div v-if="message" class="alert alert-danger">
            {{ message }}
          </div>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script>
import i18n from "@/i18n";
import IconoUsuario from "../components/IconoUsuario";
import User from "../models/user";

export default {
  components: {
    IconoUsuario,
  },

  data() {
    return {
      valid: false,
      show: false,

      reglaObligatorio: [(v) => !!v || this.$t("registro.reglaObligatorio")],

      user: new User("", ""),
      message: "",
    };
  },

  computed: {
    loggedIn() {
      //return this.$store.state.auth.status.loggedIn;
      return false;
    },
  },

  methods: {
    register() {
      this.$refs.form.validate();

      if (this.user.contact && this.user.password) {
        this.$store.dispatch("auth/register", this.user).then(
          () => {
            // al registrar un usuario válido 'loguea' con el automaticamente
            // y redirecciona a inicio
            this.$store.dispatch("auth/login", this.user).then(() => {
              this.$router.push(`/${i18n.locale}/`);
            });
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },

  mounted() {
    if (this.loggedIn) {
      this.$router.push("/"); // TODO: Check if this is the correct path or should be /{i18n.locale}/
    }
  },
};
</script>

<style>
.direccion {
  font-size: 10px;
  color: #178649;
}
</style>
