import { useRoute } from "vue-router";
import Api from "./Api";

export default {
  register(form) {
    return Api().post("/register", form);
  },

  login(form) {
    return Api().post("/login", form);
  },

  logout() {
    return Api().post("/logout");
  },

  auth() {
    return Api().get("/user");
  },

  verifyRera(form) {
    return Api().get("/verifyRera", form);
  },

  update(id, form) {
    return Api().put("/user/" + id, form);
  },

  updatelogo(id, data) {
    return Api().put("/agent-logo/" + id, data);
  },

  agentTeam() {
    return Api().get("/team/of/user");
  },

  assignLeadToTeam(lead, form) {
    return Api().patch("/asignLead/" + lead, form);
  },

  newTeamAdd(form) {
    return Api().post("/add-team", form);
  },
};
