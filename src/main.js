import { createApp } from "vue";
import App from "./App";
import { signOut } from "./actions/session.js";
import { AccountError } from "./errors.js";
import router from "./routing/index.js";

const app = createApp(App);

window.onunhandledrejection = (event) => {
  const err = event.reason;
  if (err instanceof AccountError) {
    console.error(err.message);
    console.log("Signing out");
    signOut(); // TODO Redirect to an URL with the error message
  } else {
    console.error("Unhandled Promise Rejection:", event.reason);
  }
};

app.use(router).mount("#app");
