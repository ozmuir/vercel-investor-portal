import { supabase } from "../actions/supabase";
import { ROUTE_HOME, ROUTE_INVESTOR, ROUTE_INVESTOR_SIGN_IN } from "../routing";

export default function setupRedirects(router) {
  let _session;

  const newRoute = (route) => {
    if (typeof _session === "undefined") {
      // console.log("No redirect until the session is resolved");
      return;
    }
    const name = route.name;
    if (!_session) {
      if (name !== ROUTE_INVESTOR_SIGN_IN && name !== ROUTE_HOME) {
        // console.log("Redirect to", ROUTE_INVESTOR_SIGN_IN);
        return { name: ROUTE_INVESTOR_SIGN_IN };
      }
    } else {
      if (name === ROUTE_INVESTOR_SIGN_IN) {
        // console.log("Redirect to", ROUTE_INVESTOR);
        return { name: ROUTE_INVESTOR };
      }
    }
  };

  supabase.auth.onAuthStateChange((event, session) => {
    // console.log("onAuthStateChange");
    _session = session;
    router.replace(newRoute(router.currentRoute.value));
  });

  router.beforeEach((to, from) => {
    // console.log("beforeEach", { to, from });
    return newRoute(to);
  });
}
