<template>
  <NTable :bottom-bordered="false" :bordered="false" size="small">
    <tbody>
      <template
        v-for="[label, value] in [['Record ID', investment.id]]"
        :key="label"
      >
        <tr>
          <th>{{ label }}</th>
          <td>{{ value }}</td>
        </tr>
      </template>
    </tbody>
  </NTable>
</template>

<script setup>
defineProps({ investment: Object });

import { NTable } from "naive-ui";
</script>
