import { h } from "vue";
import CopyButton from "../../components/Button/CopyButton.vue";

export const renderCopyButton = (text, props) =>
  h(CopyButton, { text, ...props });
