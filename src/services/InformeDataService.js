import http from "../http-common";

class InformeDataService {

  create(data) {
    console.log('data', data);
    return http.post("/informes", data);
  }

  getAll() {
    return http.get("/informes");
  }

  getMyReports(userId) {
    console.log('sada', userId);

    return http.get(`/informes/${userId}`);
  }
}

export default new InformeDataService();
