import axios from "axios";

let BaseApi = axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: "https://dev.realtsafe.com/api",
});

let Api = function () {
  let token = localStorage.getItem("token");

  if (token) {
    BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return BaseApi;
};

export default Api;