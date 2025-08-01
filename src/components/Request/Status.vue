<template>
  <NTag :type="toTagType[status]" size="small">{{ STATUS[status] }}</NTag>
</template>

<script setup>
defineOptions({ name: "CompRequestStatus" });
defineProps({
  status: {
    required: true,
    type: String,
    validator: (status) => Object.keys(STATUS).includes(status),
  },
});

const toTagType = {
  CREATED: "default",
  WAITING: "warning",
  IN_PROGRESS: "info",
  RESOLVED: "success",
  REJECTED: "error",
};

import { NTag } from "naive-ui";
import { STATUS } from "../../variables.js";
</script>
