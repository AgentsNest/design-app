import { createApp } from "vue";
import App from "./App.vue";
import router from "./Router";
import "./index.css";
import VueLazyLoad from "vue3-lazyload";
const loadimage = "/src/assets/loading.gif";
const errorimage = "/src/assets/loading.gif";

createApp(App)
  .use(router)
  .use(VueLazyLoad, {
    log: true,
    preLoad: 1.3,
    error: errorimage,
    loading: loadimage,
    attempt: 1,
  })
  .mount("#app");
