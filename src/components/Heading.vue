<template>
  <component :is="as" v-bind="$attrs" :class="[as, 'heading']">
    <slot />
  </component>
</template>

<script setup>
defineOptions({ name: "C_Heading", inheritAttrs: false });

defineProps({
  as: { type: String, default: "h1" },
});

import { IconLeft } from "../components/icons";
import { NButton, NIcon } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style lang="scss" scoped>
.heading {
  margin: 0;
  font-weight: bold;
  opacity: 0.75;
}
.h1 {
  font-size: 1.5rem;
}
.h2 {
  font-size: 1.3rem;
}
.h3 {
  font-size: 1.15rem;
}
.h4,
.h5,
.h6 {
  font-size: 1rem;
}
.h4 {
}
.h5 {
}
.h6 {
}

// .back {
//   position: absolute;
//   top: -5rem;
//   // right: 100%;
//   // margin-top: -0.2em;
//   // margin-right: 0.8em;
// }
</style>
