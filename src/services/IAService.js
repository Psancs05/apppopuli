import axios from 'axios';
require('dotenv').config();

const API_URL = process.env.API_URL;

class IAService {
  async analizarImagen(imageFile) {
    try {
      // Convertir la imagen a base64
      const mybase64 = await this.convertFileToBase64(imageFile);

      // Crear el objeto de datos a enviar
      const data = {
        image: mybase64,
      };

      // Configurar la solicitud
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Enviar la solicitud
      return axios.post(API_URL, data, config);
    } catch (error) {
      console.error('Error al convertir la imagen a base64:', error);
      throw error;
    }
  }

  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result.split(',')[1]); // Obtener solo la parte base64 de la cadena
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  }
}

export default new IAService();