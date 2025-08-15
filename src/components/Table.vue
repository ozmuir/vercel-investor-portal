<script setup>
defineOptions({ name: "MyTable" });
import { NTable } from "naive-ui";
import $table from "../styles/table.module.scss";
</script>

<template>
  <NTable
    :bordered="false"
    :bottom-bordered="false"
    :single-line="true"
    :size="'small'"
    :class="$table.table"
    v-bind="$attrs"
  >
    <slot />
  </NTable>
</template>
