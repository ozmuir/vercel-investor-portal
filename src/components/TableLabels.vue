<template>
  <th v-for="label in labels" :key="label">
    {{ label }}
  </th>
</template>

<script setup>
defineProps({
  labels: { required: true },
});
</script>
