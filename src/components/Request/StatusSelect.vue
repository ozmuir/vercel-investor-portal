<template>
  <div class="wrapper">
    <RequestStatus :status="status" />
    <select
      class="select"
      @change="$emit('change', $event.stopPropagation() || $event.target.value)"
    >
      <option
        v-for="{ value, label } in statusOptions"
        :key="value"
        :selected="value === status"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({ status: { required: true, type: String } });
import RequestStatus from "../../components/Request/Status.vue";
import { statusOptions } from "../../variables.js";
</script>

<style scoped>
.wrapper {
  position: relative;
}
.select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.status_select:focus {
  opacity: 1;
}
</style>
