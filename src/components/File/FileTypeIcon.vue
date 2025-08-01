<template>
  <NIcon size="16" :title="mimetype">
    <IconFileTypeImage v-if="FILE_TYPES_IMAGE.includes(mimetype)" />
    <IconFileTypeDocument v-else-if="FILE_TYPES_DOCUMENT.includes(mimetype)" />
    <IconFileTypeUnknown v-else />
  </NIcon>
</template>

<script setup>
defineProps({ mimetype: String });

import {
  IconFileTypeImage,
  IconFileTypeDocument,
  IconFileTypeUnknown,
} from "../../components/icons.js";
import { NIcon } from "naive-ui";
import { FILE_TYPES_IMAGE, FILE_TYPES_DOCUMENT } from "../../variables";
</script>
