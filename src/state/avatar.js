import { ref, watch } from "vue";
import { sessionRef } from "../state/session";
import { digestMessage } from "../utils";

export const avatarUrlRef = ref("");

watch(sessionRef, (session) => {
  const email = session?.user?.email.toLowerCase();
  if (!email) return;
  digestMessage(email).then((digest) => {
    const { pink, purple, cyan } = window.eivColors;
    const params = new URLSearchParams({
      seed: digest,
      size: 32,
      backgroundColor: "transparent",
      shape1Color: pink.slice(1),
      shape2Color: purple.slice(1),
      shape3Color: cyan.slice(1),
    });
    avatarUrlRef.value = `https://api.dicebear.com/9.x/shapes/svg?${params}`;
    // https://www.dicebear.com/how-to-use/http-api/
  });
});
