import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("app"));
router.setRoutes([
  {
    path: "/",
    component: "ajm-home",
    // @ts-ignore
    action: () => import("./views/ajm-home"),
  },
  {
    path: "/about",
    component: "ajm-about",
    // @ts-ignore
    action: () => import("./views/ajm-about"),
  },
  {
    path: "/work",
    component: "ajm-work",
    // @ts-ignore
    action: () => import("./views/ajm-work"),
  },
  {
    path: "/tinkerings",
    component: "ajm-tinkerings",
    // @ts-ignore
    action: () => import("./views/ajm-tinkerings"),
  },
  {
    path: "/technologist",
    component: "ajm-technologist",
    // @ts-ignore
    action: () => import("./views/ajm-technologist"),
  },
  {
    path: "/classicist",
    component: "ajm-classicist",
    // @ts-ignore
    action: () => import("./views/ajm-classicist"),
  },
  {
    path: "/futurist",
    component: "ajm-futurist",
    // @ts-ignore
    action: () => import("./views/ajm-futurist"),
  },
  {
    path: "/anachronist",
    component: "ajm-anachronist",
    // @ts-ignore
    action: () => import("./views/ajm-anachronist"),
  },
  {
    path: "(.*)",
    component: "ajm-404",
    // @ts-ignore
    action: () => import("./views/ajm-404"),
  },
]);
