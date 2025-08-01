<template>
  <NText v-if="filesLoadingRef" class="flex-line">
    Loading your documents… <Loader type="pulse" />
  </NText>
  <NEmpty
    v-else-if="!filesRef.length"
    :description="messages.empty.documents"
    class="empty"
  />
  <NSelect
    v-else
    :multiple="multiple"
    :placeholder="placeholder"
    :options="filesToOptions(filesRef)"
    :value="value"
    @update:value="$emit('update:value', $event)"
  />
</template>

<script setup>
defineProps({
  multiple: { type: Boolean, default: false },
  placeholder: { type: String, default: "Select from your documents…" },
  value: Object,
});
defineEmits(["update:value"]);

import { NEmpty, NSelect, NText } from "naive-ui";
import { onMounted } from "vue";
// import FileTypeIcon from "../components/File/FileTypeIcon";
import Loader from "../../components/Loader";
import messages from "../../messages.json";
import { filesRef, filesLoadingRef, filesLoad } from "../../state/files";
import { filesToOptions } from "../../utils";

onMounted(() => {
  filesLoad();
});
</script>

<style scoped>
.file-type-icon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
}
</style>
