import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/todos",
    name: "todos",
    component: () => import("./components/todolist/listdata")
  },
  {
    path: "/todo/:id",
    name: "todo-details",
    component: () => import("./components/todolist/view")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/todolist/addform")
  },
  {
    path: "/todo/summary",
    alias: "/todo/summary",
    name: "todo-summary",
    component: () => import("./components/todolist/summary")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;