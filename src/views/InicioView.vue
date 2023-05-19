<template>
  <v-app>
    <IconoUsuario />
    <LanguageSelector />

    <div class="titulo">
      <img src="../assets/logo.png" width="180" height="144" />
    </div>

    <div class="cuerpo">
      <v-container fluid style="width: 95%; max-width: 500px">
        <v-btn
          style="text-decoration: none"
          dark
          width="100%"
          height="50"
          color="#ff5d55"
          :to="informePath"
        >
          {{ this.$t("inicio.botonInforme") }}
        </v-btn>

        <v-divider></v-divider>

        <v-btn
          style="text-decoration: none"
          v-if="!currentUser"
          dark
          width="100%"
          height="50"
          color="#178649"
          :to="loginPath"
        >
        {{ this.$t("inicio.botonLogin") }}
        </v-btn>

        <v-btn
          v-else
          dark
          width="100%"
          height="50"
          color="#178649"
          @click="logout"
        >
        {{ this.$t("inicio.botonLogout") }}
        </v-btn>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import i18n from "@/i18n";
import IconoUsuario from "../components/IconoUsuario";
import LanguageSelector from "../components/LanguageSelector.vue";

export default {
  components: {
    IconoUsuario,
    LanguageSelector,
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    informePath() {
      return `/${i18n.locale}/informe`;
    },
    loginPath() {
      return `/${i18n.locale}/login`;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap");

.titulo {
  text-align: center;
  padding-bottom: 25px;
  font-family: "Quicksand", sans-serif;
  font-size: 40px;
  color: #178649;
}

.cuerpo {
  text-align: center;
}
</style>
