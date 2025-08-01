<template>
  <div>
    <NText v-if="success" type="success">
      {{ success }}
    </NText>
    <NText v-if="error" type="error">
      {{ error }}
    </NText>
  </div>
</template>

<script setup>
defineProps({ success: { required: true }, error: { required: true } });
import { NText } from "naive-ui";
</script>
