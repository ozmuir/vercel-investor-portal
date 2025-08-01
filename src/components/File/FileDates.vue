<template>
  <NPopover trigger="click" style="padding: 0">
    <template #trigger>
      <NButton text>
        <NIcon><IconInfo /></NIcon>
      </NButton>
    </template>
    <NTable :bottom-bordered="false" :bordered="false" size="small">
      <tbody>
        <template
          v-for="item in [
            ['Created At', formatDateLong(file.created_at)],
            ['Updated At', formatDateLong(file.updated_at)],
            ['Last Accessed At', formatDateLong(file.last_accessed_at)],
          ]"
          :key="item[0]"
        >
          <tr>
            <th>{{ item[0] }}</th>
            <td>{{ item[1] }}</td>
          </tr>
        </template>
      </tbody>
    </NTable>
  </NPopover>
</template>

<script setup>
defineProps({ file: Object });

import { IconInfo } from "../../components/icons.js";
import { NButton, NIcon, NPopover, NTable } from "naive-ui";
import { formatDateLong } from "../../utils";
</script>
