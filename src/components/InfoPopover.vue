<template>
  <NPopover trigger="click" style="padding: 0">
    <template #trigger>
      <NButton text>
        <NIcon size="24" depth="5">
          <IconInfo />
        </NIcon>
      </NButton>
    </template>
    <slot />
  </NPopover>
</template>

<script setup>
import { IconInfo } from "../components/icons";
import { NButton, NIcon, NPopover } from "naive-ui";
</script>
