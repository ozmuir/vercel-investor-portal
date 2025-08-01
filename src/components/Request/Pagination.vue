<script setup>
defineOptions({ name: "RequestPagination" });
defineProps({
  page: { required: true, type: Number },
  total: { required: true, type: Number },
  perPage: { required: true, type: Number },
});
import { NPagination } from "naive-ui";
</script>

<template>
  <NPagination
    v-if="total > perPage || perPage > 10"
    :page-slot="5"
    :page="page"
    :page-size="perPage"
    :page-count="Math.ceil(total / perPage)"
    show-size-picker
    :page-sizes="[10, 100, 1000]"
    @update:page="$emit('update:page', $event)"
    @update:page-size="$emit('update:page-size', $event)"
  />
  <!-- v-model:page="page" -->
  <!-- v-model:page-size="perPage" -->
</template>
