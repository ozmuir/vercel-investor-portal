<template>
  <div class="root" @click="logoinfoToggle">
    <div
      :class="['item', !logoinfoStateRef ? 'active' : '']"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      "
    >
      <div
        style="
          /* display: flex; */
          /* flex-direction: column; */
          /* gap: 0.5em; */
          font-size: 1.5rem;
        "
      >
        Inspired by the raw beauty of Kaʻena Point and shaped by founder David
        Nikzad’s personal wellness journey,
        <strong class="fx-text-background">
          Emotional Intelligence Ventures
        </strong>
        is pioneering mental wellness innovations rooted in nature,
        neuroscience, and emotional intelligence.
      </div>
    </div>
    <div
      :class="['item', logoinfoStateRef ? 'active' : '']"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3rem;
      "
    >
      <Logo animated style="width: 100%; max-width: 10rem" />
      <Heading as="h1" style="font-weight: normal">
        Welcome to
        <div class="DISABLED-fx-text-background">
          Emotional Intelligence Ventures
        </div>
      </Heading>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "V_Home" });

import { onMounted } from "vue";
import Logo from "../components/LogoAnimated";
import Heading from "../components/Heading";
import { logoinfoStateRef, logoinfoToggle } from "../state/logoinfo"

//
//
//

// TODO Start MANA FLUID on Home mounted, stop it on Home unmounted
onMounted(() => {
  return;

  if (!window.isHardwareAccelerated()) return;

  window.mana_fluid = {
    container: document.querySelector(".layout"),
    // color_1_hue: 0.85,
    // color_2_hue: 0.51,
  };

  window.createScript({
    src: "/mana-fluid-fx.js",
    id: "mana-fluid-fx",
    async: true,
  });
});

//
//
//

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = (hex) => {
  const _hex =
    hex.length === 4 ? hex.replace(/^#(\w)(\w)(\w)/, "#$1$1$2$2$3$3") : hex;
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
  return match
    ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
      }
    : null;
};

const eivColors = (() => {
  /*
  const style = window.getComputedStyle(document.documentElement);
  const colors = ["--eiv-pink", "--eiv-purple", "--eiv-cyan"].map((prop) =>
    style.getPropertyValue(prop)
  );
  */

  return Object.fromEntries(
    Object.entries(window.eivColors).map(([k, v]) => [k, hexToRgb(v)])
  );
})();

function animateTextBackground(elements) {
  const { pink, purple, cyan } = eivColors;

  for (let element of elements) {
    const style = element.style;
    style.animation = `bg-anim 3s linear infinite`;
    style.background = `linear-gradient(90deg,
      rgba(${pink.r},${pink.g},${pink.b},1) 0%,
      rgba(${purple.r},${purple.g},${purple.b},1) 25%,
      rgba(${cyan.r},${cyan.g},${cyan.b},1) 50%,
      rgba(${purple.r},${purple.g},${purple.b},1) 75%,
      rgba(${pink.r},${pink.g},${pink.b},1) 100%
    )`;
    style.backgroundSize = `200% auto`;
    style.setProperty("-webkit-background-clip", "text");
    style.setProperty("-webkit-text-fill-color", "transparent");
  }
}

onMounted(() => {
  animateTextBackground(document.querySelectorAll(".fx-text-background"));
});
</script>

<style scoped>
.root {
  display: flex;
  align-items: stretch;
  cursor: pointer;
}
.root > * {
  min-width: 100%;
}
.root > :first-child {
  margin-right: -100%;
}

.item {
  position: relative;
  opacity: 0;
  z-index: 0;
  transition: opacity 1s ease;
}
.item.active {
  opacity: 1;
  z-index: 1;
}
</style>
