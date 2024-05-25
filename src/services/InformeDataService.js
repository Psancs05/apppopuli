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
    return http.get(`/informes/${userId}`);
  }

  dowloadMyReports(userId) {
    return http.get(`/informes/download/${userId}`, { responseType: 'blob' });
  }
}

export default new InformeDataService();
