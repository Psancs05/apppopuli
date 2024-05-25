<template>
  <div>
    <div v-if="progressInfos">
      <div class="mb-2"
        v-for="(progressInfo, index) in progressInfos"
        :key="index">
        <span>{{progressInfo.fileName}}</span>
        <div class="progress">
          <div class="progress-bar progress-bar-info"
            role="progressbar"
            :aria-valuenow="progressInfo.percentage"
            aria-valuemin="0"
            aria-valuemax="100"
            style="background-color: #178649"
            :style="{ width: progressInfo.percentage + '%' }">
            {{progressInfo.percentage}}%
          </div>
        </div>
      </div>
    </div>


    <label class="boton_examinar btn">
        <v-icon color="#178649" size=17>mdi-camera</v-icon>
        {{$t("componenteSubirArchivos.labelSeleccionarArchivos")}}
        <input style="display: none" type="file" multiple @change="selectFile">
    </label>

    <button  class="boton_subir btn"
      :disabled="!selectedFiles"
      @click="uploadFiles">
      {{$t("componenteSubirArchivos.labelSubirArchivos")}}
    </button>

    <div style="height: 10px;"></div>

    <button class="boton_analizar btn"
            :disabled="!selectedFiles"
            @click="analizarConIA">
      <div v-if="!cargandoIA" >
        {{ resultadoIA || $t("componenteSubirArchivos.labelAnalizarIA") }}
      </div>
      <div v-else class="spinner"></div>
    </button>


    <br><br>

    <div v-if="message" class="alert alert-light" role="alert">
      <ul>
        <li v-for="(ms, i) in message.split('\n')" :key="i">
          {{ ms }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

    import FileService from "../services/FileService";
    import IAService from '../services/IAService';

    export default {
    name: "upload-files",
    data() {
        return {
        selectedFiles: undefined,
        progressInfos: [],
        message: "",
        fileInfos: [],

        cargandoIA: false,
        resultadoIA: ""
        };
    },
    methods: {
      selectFile(event) {
        this.progressInfos = [];
        this.selectedFiles = event.target.files;
      },

      upload(idx, file) {
        this.progressInfos[idx] = { percentage: 0, fileName: file.name };

        FileService.upload(file, (event) => {
        this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        })
            .then((response) => {
            let prevMessage = this.message ? this.message + "\n" : "";
            this.message = prevMessage + response.data.message;

            return FileService.getFiles(this.$i18n.locale);
            })
            .then((files) => {
            this.fileInfos = files.data;
            })
            .catch(() => {
            this.progressInfos[idx].percentage = 0;
            this.$t('componenteSubirArchivos.msgError') + file.name;
            });
      },

      uploadFiles() {
        this.message = "";

        for (let i = 0; i < this.selectedFiles.length; i++) {
            this.upload(i, this.selectedFiles[i]);
        }
      },

      analizarConIA() {
        if (this.selectedFiles && this.selectedFiles.length > 0) {
          const primeraImagen = this.selectedFiles[0];
          // console.log(`Analizando imagen: ${primeraImagen.name}`);

          this.cargandoIA = true;

          // Llama al servicio IA
          IAService.analizarImagen(primeraImagen)
            .then(resultado => {
              if (resultado.data.estado === "ok") {
                this.resultadoIA = resultado.data.resultado;
              } else {
                this.resultadoIA = this.$t("componenteSubirArchivos.msgErrorIA");
              }
            })
            .catch(error => {
              console.error('Error al analizar la imagen', error);
            })
            .finally(() => {
              this.cargandoIA = false;
            });
        }
      }


      
    },
    mounted() {
        FileService.getFiles(this.$i18n.locale).then((response) => {
        this.fileInfos = response.data;
        });
    }
    };

</script>

<style>

    .boton_examinar {
        font-size: 15px;
        width: 100%;
        color: #178649;
        background-color: white;
        border-color: #178649;
    }

    .boton_examinar:hover {
        color: #178649;
    }

    .boton_subir {
        font-size: 15px;
        width: 100%;
        color: white;
        background-color: #178649;
    }

    .boton_subir:hover {
        color: white;
    }

    .boton_analizar {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      width: 100%;
      color: white;
      background-color: rgb(100, 100, 252);

    }

    .boton_analizar:hover {
      color: white;
    }

    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border-top-color: #178649;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

</style>
