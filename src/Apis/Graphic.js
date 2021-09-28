import Api from "./Api";

export default {
  all() {
    return Api().get("/graphics");
  },

  downloadCount(graphic, form) {
    return Api().patch("/graphic/" + graphic, form);
  },

  details(params) {
    return Api().get("/graphics/" + params);
  },
};
