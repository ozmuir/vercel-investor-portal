<template>
  <NTable
    :bordered="false"
    :bottom-bordered="false"
    :single-column="true"
    :single-line="true"
    :class="[$table.transparent, 'text-small']"
  >
    <tbody>
      <template v-for="item in items" :key="item.title">
        <tr>
          <td>{{ formatDateShort(item.date) }}</td>
          <td>
            <NThing v-for="item in items" :key="item.title" class="text-small">
              <template #header>
                <div class="text-small">
                  {{ item.title }}
                </div>
              </template>
              <!-- <Collapse :lines="2"> -->
              <component :is="item.body" />
              <!-- </Collapse> -->
            </NThing>
          </td>
        </tr>
      </template>
    </tbody>
  </NTable>
</template>

<script setup>
defineOptions({ name: "CNews" });

import { NTable, NThing } from "naive-ui";
// import Collapse from "../components/Collapse";
import items from "../news.js";
import $table from "../styles/table.module.scss";
import { formatDateShort } from "../utils";

const onerem = parseFloat(getComputedStyle(document.documentElement).fontSize);
</script>
