import http from "../http-common";

class SintomaDataService {

  getAll(lang) {
    return http.get(`/sintomas/${lang}`);
  }

}

export default new SintomaDataService();
