<script setup>
defineOptions({ name: "CompEllipsis" });
defineProps({ maxWidth: { default: "8em" } });
</script>

<template>
  <div class="ellipsis" :style="{ maxWidth }"><slot /></div>
</template>
