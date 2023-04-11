import { Router } from "@vaadin/router";
import './views/ajm-home'

const router = new Router(document.getElementById("app"));
router.setRoutes([
  {
    path: "/",
    component: "ajm-home",
  },
]);
