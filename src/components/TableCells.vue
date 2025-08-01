<template>
  <td
    v-for="[label, picker] in zip(labels, pickers)"
    :key="label"
    :data-label="label"
  >
    <!-- Throws when in a separate file -->
    <!-- <PolyMorph :content="picker(contents)" /> -->
    <template v-for="it in [picker(contents)]" :key="it">
      <component v-if="typeof it === 'function'" :is="it()" />
      <component v-else-if="isVNode(it)" :is="it" />
      <template v-else>{{ it }}</template>
    </template>
  </td>
</template>

<script setup>
defineProps({
  contents: { required: true },
  labels: { required: true },
  pickers: { required: true },
});

import { isVNode } from "vue";
import { zip } from "../utils";
</script>
