<template>
  <NText v-if="investmentsLoadingRef" class="flex-line">
    {{ loadingText }} <Loader type="pulse" />
  </NText>
  <NEmpty
    v-else-if="!investmentsRef.length"
    :description="messages.empty.investments"
    class="empty"
  />
  <NSelect
    v-else
    :multiple="multiple"
    :placeholder="placeholder"
    :options="investmentsToOptions(investmentsRef)"
    :value="value"
    @update:value="$emit('update:value', $event)"
  />
</template>

<script setup>
defineProps({
  multiple: { type: Boolean, default: false },
  loadingText: { type: String, default: "Loading your investments…" },
  placeholder: { type: String, default: "Select from your investments…" },
  value: Object,
});
defineEmits(["update:value"]);

import { NEmpty, NSelect, NText } from "naive-ui";
import { onMounted } from "vue";
import Loader from "../../components/Loader";
import {
  investmentsRef,
  investmentsLoadingRef,
  investmentsLoad,
} from "../../state/investments";
import messages from "../../messages.json";
import { investmentsToOptions } from "../../utils";

onMounted(() => {
  investmentsLoad();
});
</script>
