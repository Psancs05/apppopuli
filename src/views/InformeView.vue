<template>
  <div id="informe">
    <IconoUsuario />

    <div class="titulo">{{this.$t("informe.titulo")}}</div>

    <div class="cuerpo">
      <v-container fluid style="width: 95%; max-width: 500px">
        <div class="asterisco">
          {{$t("informe.campoAsteriscos")}}
          <lab style="color: #ff5d55">{{$t("informe.msgObligatorios")}}</lab>
        </div>

        <br />

        <v-form>
          <v-select
            v-model="informe.patogeno"
            clearable
            :label="$t('informe.labelEnfermedad')"
            color="#178649"
            :items="patogenos"
            item-value="nombre_cientifico"
            item-text="nombre_cientifico"
          >
            <template v-slot:item="{ item }">
              <i>{{ item.nombre_cientifico }}</i> &nbsp; ({{
                item.nombre_vulgar
              }})
            </template>
            <template v-slot:selection="{ item }">
              <i>{{ item.nombre_cientifico }}</i> &nbsp; ({{
                item.nombre_vulgar
              }})
            </template>

            <v-tooltip top slot="append-outer">
              <template v-slot:activator="{ on }">
                <router-link :to="{ name: 'ayuda', query: { tab: '1' } }">
                  <v-icon v-on="on" size="20" color="#178649">
                    mdi-help
                  </v-icon>
                </router-link>
              </template>
              <span>
                {{$t("informe.msgAyuda")}}
              </span>
            </v-tooltip>
          </v-select>
        </v-form>

        <upload-files />

        <v-form v-model="valid" ref="form">
          <v-menu
            v-model="menuDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                :label="$t('informe.labelFecha')"
                color="#178649"
                hint="DD/MM/AA"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="date"
              no-title
              :first-day-of-week="1"
              locale="es-es"
              color="#178649"
              @input="menuDate = false"
            />
          </v-menu>

          <v-dialog v-model="dialog" width="800">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                required
                :rules="reglaObligatorio"
                :value="location.address"
                :label="$t('informe.labelLocalizacion')"
                color="#178649"
                readonly
                v-bind="attrs"
                v-on="on"
              />
            </template>

            <v-card>
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
                <InformeMapa v-model="location" />
              </div>

              <v-card-actions class="justify-center">
                <v-btn
                  dark
                  width="100%"
                  max-width="500px"
                  height="50"
                  color="#ff5d55"
                  @click="dialog = false"
                >
                {{$t("informe.btnAceptar")}}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-select
            v-model="informe.extension_arboles"
            required
            :rules="reglaObligatorio"
            :label="$t('informe.labelArbolesDaniados')"
            color="#178649"
            :suffix="$t('informe.suffixArboles')"
            :items="extension"
          >
            <v-tooltip top slot="append-outer">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" size="20" color="#178649"> mdi-help </v-icon>
              </template>
              <span>{{$t("informe.ayuda1")}}</span> 
            </v-tooltip>
          </v-select>

          <v-text-field
            v-model="informe.extension_pies"
            required
            :label="$t('informe.labelPorcentajeAfectados')"
            color="#178649"
            suffix="%"
            :rules="reglasExtension"
          >
            <v-tooltip top slot="append-outer">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" size="20" color="#178649"> mdi-help </v-icon>
              </template>
              <span>{{$t("informe.ayuda2")}}</span>
            </v-tooltip>
          </v-text-field>

          <v-select
            v-model="informe.severidad"
            :label="$t('informe.labelSeveridad')"
            color="#178649"
            suffix="%"
            :items="severidadOpciones"
          >
            <v-tooltip top slot="append-outer">
              <template v-slot:activator="{ on }">
                <v-icon v-on="on" size="20" color="#178649"> mdi-help </v-icon>
              </template>
              <span>{{$t("informe.ayuda3")}}</span>
            </v-tooltip>
          </v-select>

          <v-textarea v-model="informe.observaciones" color="#178649" auto-grow>
            <template v-slot:label> {{$t("informe.labelObservaciones")}} </template>
            <v-tooltip top slot="append-outer">
              <template v-slot:activator="{ on }">
                <v-icon
                  v-on="on"
                  size="20"
                  color="#178649">
                  mdi-help
                </v-icon>
              </template>
              <span>{{$t("informe.ayuda4")}}</span>
            </v-tooltip>
          </v-textarea>

          <v-text-field
            v-model="informe.contacto"
            required
            :rules="reglaObligatorio"
            :label="$t('informe.labelCorreoTelefono')"
            color="#178649"
          >
          </v-text-field>

          <v-switch
              v-model="informe.isPublic"  
              :label="`${$t('informe.msgPublico')} ${informe.isPublic ? $t('informe.publico') : $t('informe.privado')}`"
              color="#178649"
          ></v-switch>

          <v-divider />

          <v-btn
            class="white--text"
            width="100%"
            height="50"
            color="#ff5d55"
            :disabled="!valid"
            @click="validar"
          >
          {{$t("informe.botonEnviar")}}
          </v-btn>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script>
import i18n from "@/i18n";
import IconoUsuario from "../components/IconoUsuario";
import InformeMapa from "../components/InformeMapa";
import UploadFiles from "../components/UploadFiles";
import InformeDataService from "../services/InformeDataService";
import PatogenoDataService from "../services/PatogenoDataService.js";

export default {
  components: {
    IconoUsuario,
    InformeMapa,
    UploadFiles,
  },

  data: (vm) => ({
    informe: {
      id: null,
      patogeno: "",
      extension_arboles: "",
      extension_pies: "",
      severidad: "",
      observaciones: "",
      contacto: "",
      isPublic: true,
      userId: null,
    },

    valid: false,

    // campo plaga/enfermedad
    patogenos: [],

    // campo fotografias
    selectedFile: null,

    // campo fecha
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menuDate: false,

    // campo localizacion
    dialog: false,
    location: {},

    // campo extension del daño
    // extension: ["1", "2-10", "10-100", "Más de 100"],

    // campo severidad del daño
    // severidadOpciones: ["0-25", "25-75", "Más del 75"],

    // reglas
    // reglaObligatorio: [(v) => !!v || "Este campo es obligatorio"],

    // reglasExtension: [
    //   (v) => !!v || "Este campo es obligatorio",
    //   (v) =>
    //     /^[1-9][0-9]?$|^100$/.test(v) ||
    //     "Introduce un valor numérico entre 1 y 100",
    // ],
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
    currentUser() {
      return this.$store.state.auth.user;
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    ayudaPath() {
      return `/${i18n.locale}/ayuda`;
    },
    // campo extension del daño
    extension(){
      return ["1", "2-10", "10-100", this.$t('informe.dropDownExtension')]
    },
    // campo severidad del daño
    severidadOpciones(){
      return ["0-25", "25-75", this.$t('informe.dropDownSeveridad')]
    },
    // reglas
    reglaObligatorio() {
      return [(v) => !!v || this.$t('informe.msgCampoObligatorio')]
    },
    reglasExtension() {
      return [
      (v) => !!v || this.$t('informe.msgCampoObligatorio'),
      (v) =>
        /^[1-9][0-9]?$|^100$/.test(v) ||
        this.$t('informe.msgValorIncorrecto'),
    ]
    }
  },

  methods: {
    mostrarPatogenos() {
      PatogenoDataService.getAll(this.$i18n.locale)
        .then((response) => {
          this.patogenos = response.data.map(this.getMostrarPatogeno);
          this.patogenos.unshift({
            nombre_cientifico: this.$t("informe.plagaNoIdentificadaTile.nombre_c"),
            nombre_vulgar: this.$t("informe.plagaNoIdentificadaTile.nombre_v")
          });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getMostrarPatogeno(patogeno) {
      return {
        nombre_cientifico: patogeno.nombre_cientifico,
        nombre_vulgar: patogeno.nombre_vulgar,
      };
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    guardarInforme() {
      let userId = null;
      if (this.$store.state.auth.user) {
        userId = this.$store.state.auth.user.id;
      }

      // Todos los informes sin identificar se guardan con el nombre cientifico "unidentified"
      if (this.informe.patogeno === this.$t("informe.plagaNoIdentificadaTile.nombre_c")) {
        this.informe.patogeno = "Unknown";
      }

      var data = {
        patogeno: this.informe.patogeno,
        fecha: this.date,
        localizacion: this.location.address,
        lat: this.location.lat,
        lng: this.location.lng,
        extension_arboles: this.informe.extension_arboles,
        extension_pies: this.informe.extension_pies,
        severidad: this.informe.severidad,
        observaciones: this.informe.observaciones,
        contacto: this.informe.contacto,
        isPublic: this.informe.isPublic,
        userId: userId,
      };

      InformeDataService.create(data)
        .then((response) => {
          this.informe.id = response.data.id;
          console.log(response.data);
          this.$router.push(`/${i18n.locale}/gracias`);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    validar() {
      this.$refs.form.validate();
      this.guardarInforme();
    },
  },

  mounted() {
    this.mostrarPatogenos();
  },
};
</script>

<style>
.direccion {
  font-size: 10px;
  color: #178649;
}

.asterisco {
  text-align: center;
  font-size: 12px;
  color: #686868;
}
</style>
