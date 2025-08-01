<template>
  <NButton
    round
    primary
    type="default"
    @click.prevent="router.push(to)"
    attr-type="button"
    tag="a"
    :href="router.resolve(to).fullPath"
  >
    <slot />
  </NButton>
</template>

<script setup>
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";

defineProps({ to: { type: Object, required: true } });

const router = useRouter();
</script>
