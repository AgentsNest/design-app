import { createWebHistory, createRouter } from "vue-router";
import Index from "../views/Index.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Auth/Login.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Auth/Register.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/profile",
    component: () => import("../views/Auth/Profile.vue"),
    name: "profile",
    meta: { authOnly: true },
  },
  {
    path: "/refer",
    component: () => import("../views/Pages/Refer.vue"),
    name: "refer",
    meta: { authOnly: true },
  },
  {
    path: "/feedback",
    component: () => import("../views/Pages/Feedback.vue"),
    name: "feedback",
    meta: { authOnly: true },
  },
  // Leads
  {
    path: "/leads",
    component: () => import("../views/Leads/Index.vue"),
    name: "allLeads",
    meta: { authOnly: true },
  },
  {
    path: "/add-lead",
    component: () => import("../views/Leads/New.vue"),
    name: "addLead",
    meta: { authOnly: true },
  },
  // Design Graphics Routes
  {
    path: "/graphics",
    component: () => import("../views/Designs/Index.vue"),
    name: "graphics",
    meta: { authOnly: true },
  },
  {
    path: "/graphic/:id",
    component: () => import("../views/Designs/Preview.vue"),
    name: "previewGraphic",
    meta: { authOnly: true },
  },
  // My Clients
  {
    path: "/clients",
    component: () => import("../views/Clients/Index.vue"),
    name: "myclients",
    meta: { authOnly: true },
  },
  {
    path: "/clients/:id",
    component: () => import("../views/Clients/Single.vue"),
    name: "singleClient",
    meta: { authOnly: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "router-link-active",
  routes,
});

function isLoggedIn() {
  return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authOnly)) {
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guestOnly)) {
    if (isLoggedIn()) {
      next({
        path: "/graphics",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
