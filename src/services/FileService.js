import http from "../http-common";

class FileService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  download(lang, file) {
    return http.get(`/files/${lang}/${file}.pdf`, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      responseType: 'blob' 
    })
  }

  show(file) {
    return http.get(`/images/${file}.jpg`, {
      headers: {
        "Content-Type": "image/jpg"
      },
      responseType: 'blob' 
    })
  }

  getFiles(lang) {
    return http.get(`/files/${lang}`);
  }
}

export default new FileService();
