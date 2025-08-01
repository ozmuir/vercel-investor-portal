<template>
  <NButton text :title="title" @click="copyToClipboard(text)">
    <NIcon><IconCopy /></NIcon>
  </NButton>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
  title: { type: String, default: "Copy to clipboard" },
});
import { IconCopy } from "../../components/icons.js";
import { NButton, NIcon } from "naive-ui";
import { useClipboard } from "../../utils/useClipboard";

const copyToClipboard = useClipboard();
</script>
