import http from "../http-common";

class TodoDataService {
  /*getAll() {
    return http.get("/todos");
  }*/
  getAll(params) {
    return http.get("/todos", { params });
  }

  get(id) {
    return http.get(`/todos/${id}`);
  }

  create(data) {
    return http.post("/todos", data);
  }

  update(id, data) {
    return http.put(`/todos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/todos/${id}`);
  }

  deleteAll() {
    return http.delete(`/todos`);
  }

  findByTitle(title) {
    return http.get(`/todos?title=${title}`);
  }
  getTodo() {
    return http.get("/todo/gettodo");
  }
  getTodoPast() {
    return http.get("/todo/gettodopast");
  }
  getTodoFinish() {
    return http.get("/todo/gettodofinish");
  }
  finish(data) {
    return http.post("/todo/finish/", data);
  }
}

export default new TodoDataService();
