<template>
  <div class="ayuda">
    <IconoUsuario />

    <div class="titulo">{{this.$t("gracias.titulo")}}</div>

    <div class="cuerpo">
      <v-card class="mx-auto" width="90%" max-width="800" elevation="0">
        {{this.$t("gracias.informeEnviado")}}
        <br /><br />
        {{this.$t("gracias.msgFormulario1")}}

        <!--? Formulario en espanol -->
        <a
          v-if="$i18n.locale === 'es'"
          style="font-weight: bold; color: #ff5d55; text-decoration: none"
          href="https://forms.gle/ZnKkEdVEL6NtmBqRA"
        >{{this.$t("gracias.msgFormulario2_es")}}</a>

        <!--? Formulario en ingles -->
        <a
          v-else-if="$i18n.locale === 'en'"
          style="font-weight: bold; color: #ff5d55; text-decoration: none"
          href="https://forms.gle/utyGh8LENX6rLpeT7"
        >{{this.$t("gracias.msgFormulario2_en")}}</a>

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
