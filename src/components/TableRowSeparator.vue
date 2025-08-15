<script setup>
defineProps({ colspan: { type: Number, required: true } });
</script>

<template>
  <tr>
    <td :colspan="colspan" style="border-bottom: 2px solid transparent"></td>
  </tr>
</template>
