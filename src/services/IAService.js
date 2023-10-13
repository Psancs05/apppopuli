import axios from 'axios';

const API_URL = 'https://cairns-bilby-rczk.1.ie-1.fl0.io/api';

class IAService {
  analizarImagen(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('ruta_model', "./data/models/modelo.h5");

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    return axios.post(API_URL, formData, config);
  }

}

export default new IAService();
