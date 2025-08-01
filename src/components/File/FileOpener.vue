<template>
  <NButton text @click="handleFileOpen(filePath, is_admin)" class="block">
    <div class="flex-line">
      <FileTypeIcon :mimetype="mimetype" />
      {{ filePath.split("/").pop() }}
    </div>
  </NButton>
</template>

<script setup>
defineProps({ filePath: String, mimetype: String, is_admin: Boolean });

import { NButton } from "naive-ui";
import FileTypeIcon from "../../components/File/FileTypeIcon";
import { lock } from "../../state/ui";
import { fileOpen } from "../../actions/storage";

const handleFileOpen = async (filePath, is_admin) => {
  lock("");
  await fileOpen(filePath, { is_admin });
  lock();
};
</script>
