<template>
  <NTable :bottom-bordered="false" :bordered="false" size="small">
    <tbody>
      <template
        v-for="item in [
          ['ID', file.id],
          ['Size', file.size.toLocaleString('en-US')],
          ['Type', file.mimetype],
          ['Created At', new Date(file.created_at).toLocaleString('en-US')],
          ['Updated At', new Date(file.updated_at).toLocaleString('en-US')],
          [
            'Last Accessed At',
            new Date(file.last_accessed_at).toLocaleString('en-US'),
          ],
          // ['Investment ID', file.investment_id],
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
</template>

<script setup>
defineProps({
  file: {
    type: Object,
  },
});
import { NTable } from "naive-ui";
</script>
