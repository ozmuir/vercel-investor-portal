import { ref } from "vue";

export const lockRef = ref(undefined);

export const lock = (value) => {
  lockRef.value = value;
};
