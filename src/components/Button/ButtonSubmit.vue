<template>
  <NButton round secondary type="primary" attr-type="submit">
    <slot />
  </NButton>
</template>

<script setup>
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
