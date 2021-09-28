import Api from "./Api";

export default {
  new(form) {
    return Api().post("/leads", form);
  },
  bulk(form) {
    return Api().post("/upload", form);
  },
  delete(id) {
    return Api().delete("/lead/" + id);
  },

  edit(id) {
    return Api().get("/leads/" + id);
  },

  auth() {
    return Api().get("/leads/by/user");
  },

  details(id) {
    return Api().get("/leads/" + id);
  },
};
