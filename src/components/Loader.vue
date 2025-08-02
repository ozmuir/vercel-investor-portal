<template>
  <TheLoader :size="size" :color="color" v-bind="$attrs" />
</template>

<script setup>
defineOptions({ name: "C_Spinner" });
const props = defineProps({ type: { type: String, required: true } });

const color = "#ffffff";

// https://www.npmjs.com/package/vue-spinner
// https://github.com/yuanyan/halogen
// https://yuanyan.github.io/halogen/

// import Loader from "vue-spinner/src/BounceLoader"; // BounceLoader // PulseLoader
import BounceLoader from "vue-spinner/src/BounceLoader"; // BounceLoader // PulseLoader
import PulseLoader from "vue-spinner/src/PulseLoader"; // BounceLoader // PulseLoader

const [TheLoader, size] = {
  bounce: [BounceLoader, "1.5rem"],
  pulse: [PulseLoader, ".5rem"],
}[props.type];

if (props.type && !TheLoader) {
  throw new Error(`Unknown Loader type "${props.type}"`);
}
</script>
