import { readonly, ref } from "vue";
import { getProfile } from "../actions/profile";
import { supabase } from "../actions/supabase";

// TODO Do not expose the ref, use hooks
const _sessionRef = ref(undefined); // undefined|null|Object
export const sessionRef = readonly(_sessionRef);

let getSessionP = null;
let getProfileP = null;

let callback_id = 0;
const callbacks = {};
export const addSessionCallback = (callback) => {
  callback_id += 1;
  return ((cb_id) => {
    callbacks[cb_id] = callback;
    return () => {
      delete callbacks[cb_id];
    };
  })(callback_id);
};

function afterSession(session) {
  _sessionRef.value = session;
  for (let cb_id in callbacks) {
    callbacks[cb_id](session);
  }
  return session;
}

export function getSession() {
  if (!getSessionP) {
    getSessionP = supabase.auth
      .getSession() // https://supabase.com/docs/reference/javascript/auth-getsession
      .then(({ data: { session } }) => session)
      .then(addProfile)
      .then(afterSession)
      .finally(() => {
        getSessionP = null;
      });
  }
  return getSessionP;
}

async function addProfile(session) {
  if (!session) {
    getProfileP = null;
    return null; // this is session value
  }
  if (!getProfileP) {
    getProfileP = getProfile(session.user.id);
  }
  const profile = await getProfileP;
  if (!getProfileP) {
    return null; // this is session value
  }
  session.profile = profile;
  return session; // this is session value
}

// https://supabase.com/docs/reference/javascript/auth-onauthstatechange
supabase.auth.onAuthStateChange((event, session) => {
  // console.log(event, session);
  addProfile(session).then(afterSession);
});
