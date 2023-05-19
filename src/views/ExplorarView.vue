<template>
  <div class="ayuda">
    <IconoUsuario />

    <div class="titulo">{{this.$t("explorar.titulo")}}</div>

    <div style="padding-bottom: 15px">
      <v-card class="mx-auto" width="98%" max-width="800">
        <v-tabs v-model="tabModel" background-color="#178649" grow dark>
          <v-tab>
            <div class="texto_tab">{{this.$t("explorar.nombreTabla")}}</div>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabModel">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="informes"
                  :page.sync="page"
                  :items-per-page="10"
                  :header-props="headerProps"
                  class="elevation-2"
                  hide-default-footer
                  @page-count="pageCount = $event"
                />

                <div class="text-center pt-2">
                  <v-pagination
                    color="#178649"
                    v-model="page"
                    :length="pageCount"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>

    <v-dialog v-model="dialog" width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="boton_flotante"
          fab
          dark
          fixed
          bottom
          left
          color="#178649"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-map</v-icon>
        </v-btn>
      </template>
      <v-card flat>
        <v-btn
          fab
          dark
          fixed
          top
          right
          x-small
          color="#ff5d55"
          @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div style="height: 400px">
          <ExplorarMapa />
        </div>
      </v-card>
    </v-dialog>

    <v-btn
      class="boton_flotante"
      fab
      dark
      fixed
      bottom
      right
      color="#ff5d55"
      :to="informePath"
    >
      <v-icon>mdi-launch</v-icon>
    </v-btn>
  </div>
</template>

<script>
import IconoUsuario from "../components/IconoUsuario";
import ExplorarMapa from "../components/ExplorarMapa";
import InformeDataService from "../services/InformeDataService";
import i18n from "@/i18n";

export default {
  components: {
    IconoUsuario,
    ExplorarMapa,
  },

  data: () => ({
    tabModel: 0,
    dialog: false,

    informes: [],

    page: 1,
    pageCount: 0,
    headerProps: {
      sortByText: "Ordenar por",
    },
  }),

  watch: {
    /* cuando se abre el dialogo del campo localizacion
    redimensiona la ventana para que el mapa se ajuste
    al tamaño del cuadro de dialogo y se muestre correctamente */
    dialog(visible) {
      if (visible) {
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 100);
      }
    },
  },

  computed: {
    informePath() {
      return `/${i18n.locale}/informe`;
    },
    headers() {
    return [
      { text: this.$t("explorar.col1"), value: "patogeno", sortable: true },
      { text: this.$t("explorar.col2"), value: "fecha", sortable: true },
      {
        text: this.$t("explorar.col3"),
        value: "extension_arboles",
        sortable: false,
      },
      { text: this.$t("explorar.col4"), value: "severidad", sortable: true },
      { text: this.$t("explorar.col5"), value: "localizacion", sortable: true },
    ];
  },
  },

  methods: {
    mostrarInformes() {
      InformeDataService.getAll()
        .then((response) => {
          this.informes = response.data.map(this.getMostrarInforme);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getMostrarInforme(informe) {
      return {
        patogeno: informe.patogeno,
        fecha: this.formatDate(informe.fecha),
        extension_arboles: informe.extension_arboles,
        severidad: informe.severidad,
        localizacion: informe.localizacion,
      };
    },

    formatDate(date) {
      if (!date) return null;

      var fecha = new Date(date);

      var fechaString =
        ("0" + fecha.getDate()).slice(-2) +
        "/" +
        ("0" + (fecha.getMonth() + 1)).slice(-2) +
        "/" +
        fecha.getFullYear();

      return fechaString;
    },
  },

  mounted() {
    this.mostrarInformes();
  },
};
</script>

<style></style>
