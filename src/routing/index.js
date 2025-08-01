import { createWebHistory as createHistory, createRouter } from "vue-router";
import setupMetaTags from "../routing/metaTags";
import setupRedirects from "../routing/redirects";
import routes from "../routing/routes";
export * from "../routing/routes";

const router = createRouter({
  history: createHistory(),
  routes: routes,
});

setupMetaTags(router);
setupRedirects(router);

export default router;
