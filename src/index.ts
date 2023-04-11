import { Router } from "@vaadin/router";
import "./views";

const router = new Router(document.getElementById("app"));
router.setRoutes([
  { path: "/", component: "ajm-home" },
  { path: "/about", component: "ajm-about" },
  { path: "/work", component: "ajm-work" },
  { path: "/tinkerings", component: "ajm-tinkerings" },
  { path: "/technologist", component: "ajm-technologist" },
  { path: "/classicist", component: "ajm-classicist" },
  { path: "/futurist", component: "ajm-futurist" },
  { path: "/anachronist", component: "ajm-anachronist" },
  { path: "(.*)", component: "ajm-404" },
]);
