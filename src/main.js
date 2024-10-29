import { createApp } from "vue";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { store } from "./store/index";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

createApp(App).use(router).use(store).mount("#app");
// createApp(App).mount("#app");
import "bootstrap/dist/js/bootstrap.js";
