<template>
  <div>
    <NButton text @click="handle">
      {{ expandedRef ? lessText : moreText }}
    </NButton>
    <div
      :style="{
        overflow: 'hidden',
        maxHeight: expandedRef ? '99vh' : `calc(1.5rem * ${lines})`,
        transition: 'max-height var(--fx_duration) linear',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "CCollapse" });
defineProps({
  lines: { type: Number, default: 3 },
  lessText: { type: String, default: "Less" },
  moreText: { type: String, default: "More" },
  contentHeight: { type: Number, default: 0 },
});

import { NButton } from "naive-ui";
import { ref } from "vue";

const expandedRef = ref(false);
function handle() {
  expandedRef.value = !expandedRef.value;
}
</script>
