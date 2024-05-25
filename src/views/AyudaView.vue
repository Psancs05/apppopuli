<template>
  <div class="ayuda">
    <IconoUsuario />

    <div class="titulo">{{this.$t("ayuda.titulo")}}</div>

    <div style="padding-bottom: 10px">
      <v-card class="mx-auto" width="98%" max-width="800">
        <v-tabs v-model="activeTab" background-color="#178649" grow dark>
          <v-tab v-for="tab in tabs" :key="tab">
            <div class="texto_tab">
              {{ tab }}
            </div>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item>
  <v-card flat>
    <v-card-text style="text-align: justify">
      {{ $t("ayuda.introduccion.acceso_aplicacion_web") }}
      <br><br>
      <div style="text-align: center">
        <img :src="require(`../assets/ayuda/i1_${$i18n.locale}.png`)" alt="homePage" width="80%" height="80%">
      </div>
      <br><br>
      <strong>{{ $t("ayuda.paso1.titulo") }}</strong> {{ $t("ayuda.paso1.descripcion") }}
      <br><br>
      <strong>{{ $t("ayuda.paso2.titulo") }}</strong> {{ $t("ayuda.paso2.descripcion") }}
      <br><br>
      <div style="text-align: center">
        <img :src="require(`../assets/ayuda/i2_${$i18n.locale}.png`)" alt="homePage" width="80%" height="80%">
      </div>
      <br><br> 
      <strong>{{ $t("ayuda.paso3.titulo") }}</strong> {{ $t("ayuda.paso3.descripcion") }}
      <br><br>
      {{ $t("ayuda.paso3.campos.plaga_o_enfermedad1") }} <img src="../assets/ayuda/image4.png" alt="homePage" width="3%" height="3%"> {{ $t("ayuda.paso3.campos.plaga_o_enfermedad2") }}
      <br><br>
      {{ $t("ayuda.paso3.campos.fotografias") }}
      <br><br>
      {{ $t("ayuda.paso3.campos.fecha") }}
      <br><br>
      {{ $t("ayuda.paso3.campos.localizacion") }}
      <br><br>
      <div style="text-align: center">
        <img :src="require(`../assets/ayuda/i3_${$i18n.locale}.png`)" alt="homePage" width="80%" height="80%">
      </div>
      <br><br>
      {{ $t("ayuda.paso3.campos.total_arboles") }}
      <br><br>
      {{ $t("ayuda.paso3.campos.porcentaje_afectado") }}
      <br><br>
      {{ $t("ayuda.paso3.campos.severidad_dano") }}
      <br><br>
      {{ $t("ayuda.paso3.campos.observaciones") }}
      <br><br>
      <strong>{{ $t("ayuda.paso4.titulo") }}</strong> {{ $t("ayuda.paso4.descripcion") }}
      <br><br>
    </v-card-text>
  </v-card>
</v-tab-item>

          <v-tab-item>
            <v-card class="mx-auto" width="98%" flat>
              <v-card
                style="padding-top: 10px"
                class="mx-auto"
                width="90%"
                flat
              >
                <v-select
                  v-model="selectedSintoma"
                  clearable
                  :label="$t('ayuda.labelFiltro')"
                  color="#178649"
                  :items="sintomas"
                  :item-text="'descripcion'"
                  :item-value="'id'"
                  @input="filtrarPatogenos"
                >
                </v-select>
              </v-card>

              <v-list>
                <v-list-group
                  v-for="patogeno in patogenos"
                  :key="patogeno"
                  color="#178649"
                  no-action
                >
                  <template v-slot:activator>
                    <v-list-item-title
                      style="color: #178649; font-weight: bold"
                    >
                      <i>{{ patogeno.nombre_cientifico }}</i> ({{
                        patogeno.nombre_vulgar
                      }})
                    </v-list-item-title>
                  </template>

                  <v-card flat>
                    <v-list-item>
                      <v-list-item-content style="text-align: justify">
                        <div class="titulo_patogeno">
                          {{$t("ayuda.desc1")}}
                          <br /><br />
                        </div>
                        {{ patogeno.parrafo_quien }}

                        <div class="titulo_patogeno">
                          <br />
                          {{$t("ayuda.desc2")}}
                          <br /><br />
                        </div>
                        {{ patogeno.parrafo_como }}

                        <div class="cuerpo" style="display: flex; justify-content: space-around; flex-wrap: wrap;">
                          <img
                            v-for="i in 3"
                            :key="i"
                            :src="`/plagas/${patogeno.id}_${i}.jpg`"
                            @error="handleImageError"
                            :alt="`Image ${i}`"
                            class="patogeno-image"
                          />
                        </div>

                        <div class="titulo_patogeno">
                          <br />
                          {{$t("ayuda.desc3")}}
                          <br /><br />
                        </div>
                        {{ patogeno.parrafo_que }}

                        <div class="titulo_patogeno">
                          <br />
                          {{$t("ayuda.desc4")}}
                          <br /><br />
                        </div>
                        {{ patogeno.parrafo_cuando }}

                        <div class="cuerpo">
                          <v-btn
                            style="margin-top: 30px"
                            dark
                            width="100%"
                            max-width="500px"
                            height="50"
                            color="#ff5d55"
                            @click="download($i18n.locale, patogeno.id)"
                          >
                          {{$t("ayuda.descargarPDFBoton")}}
                          </v-btn>
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                </v-list-group>
              </v-list>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>

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
import PatogenoDataService from "../services/PatogenoDataService";
import SintomaDataService from "../services/SintomaDataService";
import FileService from "../services/FileService";
import i18n from "@/i18n";

export default {
  components: {
    IconoUsuario,
  },

  data: () => ({
    activeTab: 0,
    // tabs: ["CÓMO USAR LA APLICACIÓN", "PLAGAS Y ENFERMEDADES"],

    patogenos: [],
    sintomas: [],
  }),

  created() {
      if (this.$route.query.tab) {
        this.activeTab = Number(this.$route.query.tab);
      }
  },

  computed: {
    informePath() {
      return `/${i18n.locale}/informe`;
    },
    tabs() {
    return [
      this.$t("ayuda.tabAyuda"),
      this.$t("ayuda.tabEnfermedades")
    ];
  },
  },

  methods: {
    mostrarPatogenos() {
      PatogenoDataService.getAll(this.$i18n.locale)
        .then((response) => {
          // this.patogenos = response.data;
          this.patogenos = response.data.sort((a, b) =>
            a.nombre_cientifico.localeCompare(b.nombre_cientifico)
          );
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    filtrarPatogenos() {
      if (this.selectedSintoma == null) {
        // si se limpia la entrada de v-select busca patogenos cuyo
        // id_sintoma sea null, entonces llamo al metodo mostrarPatogenos
        // que muestra todos
        this.mostrarPatogenos();
      } else {
        PatogenoDataService.get(this.selectedSintoma, this.$i18n.locale)
          .then((response) => {
            this.patogenos = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },

    getMostrarPatogeno(patogeno) {
      return {
        id: patogeno.id,
        nombre_cientifico: patogeno.nombre_cientifico,
        nombre_vulgar: patogeno.nombre_vulgar,
        parrafo_quien: patogeno.parrafo_quien,
        parrafo_como: patogeno.parrafo_como,
        parrafo_que: patogeno.parrafo_que,
        parrafo_cuando: patogeno.parrafo_cuando,
        parrafo_confundir: patogeno.parrafo_confundir,
      };
    },

    mostrarSintomas() {
      SintomaDataService.getAll(this.$i18n.locale)
        .then((response) => {         
          this.sintomas = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getMostrarSintoma(sintoma) {
      return {
        id: sintoma.id,
        descripcion: sintoma.descripcion,
      };
    },

    download(lang, file) {
      FileService.download(lang, file)
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", `${file}.pdf`);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    show(file) {
      FileService.show(file)
        .then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("display", `${file}.jpg`);
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handleImageError(event) {
      event.target.style.display = 'none'; // esconde la imagen si no puede ser cargada
    }

  },

  mounted() {
    this.mostrarPatogenos();
    this.mostrarSintomas();
  },
};
</script>

<style>
.texto_tab {
  font-size: 9px;
}

.boton_flotante {
  margin: 0 0 70px 0;
}

.titulo_patogeno {
  text-align: center;
  font-family: "Quicksand", sans-serif;
  font-size: 25px;
  color: #178649;
}

.patogeno-image {
  object-fit: contain;
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-top: 30px;
}
</style>
