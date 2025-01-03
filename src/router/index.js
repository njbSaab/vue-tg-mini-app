import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/HomeVue.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; // Экспорт по умолчанию
