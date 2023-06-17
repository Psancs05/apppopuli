import http from "../http-common";

class PatogenoDataService {

  getAll(lang) {
    return http.get(`/patogenos/${lang}`);
  }

  get(id_sintoma, lang) {
    return http.get(`/patogenos/${id_sintoma}/${lang}`);
  }

}

export default new PatogenoDataService();
