<template>
  <NButton text :title="title" @click="copyToClipboard(text, message)">
    <NIcon><IconCopy /></NIcon>
  </NButton>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
  title: { type: String, default: "Copy to clipboard" },
  message: { type: String, default: "" },
});
import { IconCopy } from "../../components/icons.js";
import { NButton, NIcon } from "naive-ui";
import { useClipboard } from "../../utils/useClipboard";

const copyToClipboard = useClipboard();
</script>
