import { useMessage } from "naive-ui";
import { supabase } from "../actions/supabase";
import { AccountError } from "../errors";
import { sessionRef } from "../state/session";
import { nullify } from "../utils";

export async function getProfile(user_id) {
  console.log("Fetching profile of the user", user_id);
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .limit(1)
    .single();
  if (error) {
    console.log("Error fetching user profile:", error.message);
    throw new AccountError(`Error fetching user profile: ${error.message}`);
  }
  console.log("Fetched user profile:", data);
  return data;
}

export const useUpdateProfile = () => {
  return async (values) => {
    const session = sessionRef.value;
    const profile = session.profile;
    // https://supabase.com/docs/reference/javascript/update
    const { error } = await supabase
      .from("profiles")
      .update(nullify(values))
      .eq("id", profile.id);
    if (error) {
      console.error("Error updating the profile:", error.message);
    } else {
      console.log("Updated the profile.");
    }
    return { error };
  };
};

export function useAfter_updateProfile() {
  const toast = useMessage();
  // const router = useRouter();
  return ({ error }) => {
    if (error) {
      toast.error(`There was an error updating your profile: ${error.message}`);
    } else {
      toast.success("Your profile was updated.");
    }
  };
}
