import { ref, watch } from "vue";
import { sessionRef } from "../state/session.js";
import { digestMessage } from "../utils/index.js";
import { isOT, isEI } from "../state/host.js";
import { COLORS_EI, COLORS_OT } from "../variables.js";

export const avatarUrlRef = ref("");

const colorsEI = {
  shape1Color: COLORS_EI.pink.slice(1),
  shape2Color: COLORS_EI.purple.slice(1),
  shape3Color: COLORS_EI.cyan.slice(1),
};
const colorsOT = {
  shape1Color: COLORS_OT.high.slice(1),
  shape2Color: COLORS_OT.mid.slice(1),
  shape3Color: COLORS_OT.low.slice(1),
};

watch(sessionRef, (session) => {
  const email = session?.user?.email.toLowerCase();
  if (!email) return;
  digestMessage(email).then((digest) => {
    const params = new URLSearchParams({
      seed: digest,
      size: 32,
      backgroundColor: "transparent",
      ...(isOT ? colorsOT : isEI ? colorsEI : {}),
    });
    avatarUrlRef.value = `https://api.dicebear.com/9.x/shapes/svg?${params}`;
    // https://www.dicebear.com/how-to-use/http-api/
  });
});
