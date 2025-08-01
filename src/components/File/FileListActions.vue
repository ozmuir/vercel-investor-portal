<template>
  <NButtonGroup>
    <NPopconfirm v-model:show="showDeleteConfirmRef" :show-icon="false">
      <template #icon>
        <NIcon><IconDelete /></NIcon>
      </template>
      <template #trigger>
        <ButtonButton2 :Icon="IconDelete" content="Delete Files" />
      </template>
      <!-- Confirm deletion of these files? -->
      <template #action>
        <div class="flex-row">
          Please confirm the deletion
          <ButtonButton2
            :Icon="IconDelete"
            content="OK"
            @click="
              showDeleteConfirmRef = false;
              handleFilesDelete();
            "
          />
        </div>
      </template>
    </NPopconfirm>
  </NButtonGroup>
</template>

<script setup>
defineProps({
  handleFilesDelete: Function,
});
import { IconDelete } from "../../components/icons.js";
import { NButtonGroup, NIcon, NPopconfirm } from "naive-ui";
import { ref } from "vue";
import ButtonButton2 from "../../components/Button/ButtonButton2";

const showDeleteConfirmRef = ref(false);
</script>
