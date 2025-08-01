import { ref } from "vue";

export const logoinfoStateRef = ref(true); // true = Logo, false = Info

export function logoinfoToggle() {
  logoinfoStateRef.value = !logoinfoStateRef.value;
}
