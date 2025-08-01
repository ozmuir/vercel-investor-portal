For some reason calling this as a component raises an error on unmount

<template>
  <template v-for="it in [content]" :key="it">
    <component v-if="typeof it === 'function'" :is="it()" />
    <component v-else-if="isVNode(it)" :is="it" />
    <template v-else>{{ it }}</template>
  </template>
</template>

<script setup>
defineProps({ content: { required: true } });
import { isVNode } from "vue";
</script>
