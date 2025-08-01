import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import messages from "../messages.json";
import { ROUTE_INVESTOR } from "../routing";
import { server } from "../actions/api.js";
import { supabase } from "../actions/supabase";

const BASE_URL = process.env.VUE_APP_BASE_URL;
if (!BASE_URL) throw new Error("VUE_APP_BASE_URL not set.");

// By default, email updates sends a confirmation link to both the user's current
// and new email. To only send a confirmation link to the user's new email,
// disable **Secure email change** in your project's email auth provider settings.
export const SECURE_EMAIL_CHANGE = false;

export const useChangeEmail = () => {
  const router = useRouter();
  return async (email) => {
    const redirectPath = router.resolve({ name: ROUTE_INVESTOR }).fullPath;

    // https://supabase.com/docs/reference/javascript/auth-updateuser
    const { data, error } = await supabase.auth.updateUser(
      { email },
      // Redirect URLs: https://supabase.com/dashboard/project/_/auth/url-configuration
      // Documentation: https://supabase.com/docs/guides/auth/redirect-urls
      // Allowed Redirect URLs must *fully* match the `emailRedirectTo` URL,
      // or it will redirect to Site URL (default: http://localhost:3000)
      { emailRedirectTo: `${BASE_URL}${redirectPath}` } // https://*.ei.ventures/*
    );
    if (error) {
      console.error("Error updating the user:", error.message);
    } else {
      console.log("Updated the user:", data);
    }
    return { data, error };
  };
};

export function useAfter_changeEmail() {
  const toast = useMessage();
  // const router = useRouter();
  return ({ data, error }) => {
    if (error) {
      toast.error(`Error updating the user: ${error.message}`);
    } else {
      toast.success(
        SECURE_EMAIL_CHANGE
          ? messages.feedback.email_change.email_confirm_old_and_new
          : messages.feedback.email_change.email_confirm_new_only
      );
    }
  };
}

export const deleteUser = async () => {
  const { data, error } = await server("POST", "/api/user/delete");
  if (error) {
    console.error("Error deleting the user:", error.message);
  } else {
    console.log("Deleted the user:", data);
  }
  return { data, error };
};

export function useAfter_deleteUser() {
  const toast = useMessage();
  const router = useRouter();
  return ({ data, error }) => {
    if (error) {
      toast.error(`Error deleting the user: ${error.message}`);
    } else {
      toast.success(messages.toast.account_deleted);
      router.push({ name: ROUTE_INVESTOR });
    }
  };
}
