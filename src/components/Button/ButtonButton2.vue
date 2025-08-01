<template>
  <ButtonButton v-bind="omitter($attrs)">
    <div class="flex-line">
      <NIcon v-if="$attrs.Icon"><component :is="$attrs.Icon" /></NIcon>
      <template v-if="$attrs.content">
        {{ $attrs.content }}
      </template>
      <NIcon v-if="$attrs.Icon2"><component :is="$attrs.Icon2" /></NIcon>
    </div>
  </ButtonButton>
</template>

<script setup>
import { NIcon } from "naive-ui";
import { omit } from "rambda";
import ButtonButton from "../../components/Button/ButtonButton.vue";
const omitter = omit(["Icon", "Icon2", "content"]);
</script>
