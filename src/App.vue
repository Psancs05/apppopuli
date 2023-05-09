<template>
  <v-app>
    <v-main>
      <v-footer app fixed padless color="white">
        <v-card color="#178649" width="100%" height="100%">
          <v-tabs
            v-model="activeTab"
            background-color="#178649"
            centered
            fixed-tabs
            dark
            icons-and-text
            optional
          >
            <v-tab
              style="text-decoration: none"
              v-for="icon in icons"
              :key="icon"
              :to="icon.ruta"
            >
              <div class="texto_iconos">
                {{ icon.nombre }}
              </div>

              <v-icon>
                {{ icon.icono }}
              </v-icon>
            </v-tab>
          </v-tabs>
        </v-card>
      </v-footer>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import i18n from "./i18n";

export default {
  data: () => ({
    activeTab: 1,
  }),
  computed: {
    icons() {
      return [
        {
          nombre: this.$t("bottomBar.ayuda"),
          icono: "mdi-help",
          ruta: `/${i18n.locale}/ayuda`,
        },
        {
          nombre: this.$t("bottomBar.inicio"),
          icono: "mdi-home",
          ruta: `/${i18n.locale}/`,
        },
        {
          nombre: this.$t("bottomBar.explorar"),
          icono: "mdi-map-marker",
          ruta: `/${i18n.locale}/explorar`,
        },
      ];
    },
  },
};
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
}

.texto_iconos {
  margin-top: 5px;
  font-size: 12px;
  font-weight: bold;
}
</style>
