<template>
  <div class="ayuda">
    <IconoUsuario />

    <div class="titulo">{{this.$t("gracias.titulo")}}</div>

    <div class="cuerpo">
      <v-card class="mx-auto" width="90%" max-width="800" elevation="0">
        {{this.$t("gracias.informeEnviado")}}
        <br /><br />
        {{this.$t("gracias.msgFormulario1")}}
        <a
          style="font-weight: bold; color: #ff5d55; text-decoration: none"
          href="url"
          >{{this.$t("gracias.msgFormulario2")}}</a
        >
        {{this.$t("gracias.msgFormulario3")}}
      </v-card>

      <br /><br />

      <v-btn
        class="white--text"
        style="text-decoration: none"
        width="275"
        height="50"
        color="#178649"
        :to="inicioPath"
      >
        {{this.$t("gracias.msgNo")}}
      </v-btn>
    </div>
  </div>
</template>

<script>
import i18n from "@/i18n";
import IconoUsuario from "../components/IconoUsuario";

export default {
  components: {
    IconoUsuario,
  },

  computed: {
    inicioPath() {
      return `/${i18n.locale}/`;
    },
  },
};
</script>
