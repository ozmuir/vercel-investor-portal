import { useMessage } from "naive-ui";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../actions/supabase";
import messages from "../messages.json";
import { ROUTE_INVESTOR_SIGN_IN } from "../routing";
import { addSessionCallback } from "../state/session.js";

const BASE_URL = process.env.VUE_APP_BASE_URL;
if (!BASE_URL) throw new Error("VUE_APP_BASE_URL not set.");

export function useOnSession(callback = null) {
  let unlisten;
  onMounted(() => {
    if (callback) unlisten = addSessionCallback(callback);
  });
  onUnmounted(() => {
    if (unlisten) unlisten();
  });
}

export const useSignIn = () => {
  const router = useRouter();
  return async (email) => {
    // Requirements for redirects to work properly:
    //  - Add to allowed redirects URL at https://supabase.com/dashboard/project/_/auth/url-configuration
    //    Allowed Redirect URLs must *fully* match the `emailRedirectTo` URL,
    //    or it will redirect to Site URL (default: http://localhost:3000)
    //  - The redirect path should be orchestrated with VueJS navigation guards.
    //    Target PATH_INVESTOR_SIGN_IN, else the navigation guard will
    //    redirects there anyway and breaks the login flow.

    // The below redirect path is allowed by the pattern https://*.ei.ventures/**
    // and a navigation guard redirecting unauthenticated to ROUTE_INVESTOR_SIGN_IN
    const redirectRoute = router.resolve({ name: ROUTE_INVESTOR_SIGN_IN });
    const emailRedirectTo = `${BASE_URL}${redirectRoute.fullPath}`;

    // https://supabase.com/docs/reference/javascript/auth-signinwithotp
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo,
        // shouldCreateUser: false, // Keeping this `true` allows for password-less sign-ups
      },
    });
    if (error) {
      console.error("Error sending a one-time login link:", error.message);
    } else {
      console.log("Sent a one-time login link.", data);
    }
    return { error };
  };
};

export function useAfter_signIn() {
  const toast = useMessage();
  // const router = useRouter();
  return ({ error }) => {
    if (error) {
      toast.error(`Error sending you a one-time login link: ${error.message}`);
    } else {
      toast.success(messages.toast.email_confirmation);
    }
  };
}

// TODO Support redirect to an URL
export async function signOut() {
  const { error } = await supabase.auth.signOut(); // { scope: "local" }
  if (error) {
    console.error("Error signing out the user:", error.message);
  } else {
    console.log("Signed out the user.");
  }
  return { error };
}

export function useAfter_signOut() {
  const toast = useMessage();
  const router = useRouter();
  return ({ error }) => {
    if (error) {
      toast.error(`Error signing you out: ${error.message}`);
    } else {
      toast.success(messages.toast.account_signed_out);
    }
    router.push({ name: ROUTE_INVESTOR_SIGN_IN });
  };
}
