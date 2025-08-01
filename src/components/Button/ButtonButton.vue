<template>
  <NButton round secondary type="default" attr-type="button">
    <slot />
  </NButton>
</template>

<script setup>
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";

const router = useRouter();
</script>
