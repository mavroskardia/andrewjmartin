import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("app"));
router.setRoutes([
  {
    path: "/",
    component: "ajm-home",
    action: () => import("./views/ajm-home"),
  },
  {
    path: "/about",
    component: "ajm-about",
    action: () => import("./views/ajm-about"),
  },
  {
    path: "/work",
    component: "ajm-work",
    action: () => import("./views/ajm-work"),
  },
  {
    path: "/tinkerings",
    component: "ajm-tinkerings",
    action: () => import("./views/ajm-tinkerings"),
  },
  {
    path: "/technologist",
    component: "ajm-technologist",
    action: () => import("./views/ajm-technologist"),
  },
  {
    path: "/classicist",
    component: "ajm-classicist",
    action: () => import("./views/ajm-classicist"),
  },
  {
    path: "/futurist",
    component: "ajm-futurist",
    action: () => import("./views/ajm-futurist"),
  },
  {
    path: "/anachronist",
    component: "ajm-anachronist",
    action: () => import("./views/ajm-anachronist"),
  },
  {
    path: "(.*)",
    component: "ajm-404",
    action: () => import("./views/ajm-404"),
  },
]);
