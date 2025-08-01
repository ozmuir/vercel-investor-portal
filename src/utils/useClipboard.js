import { useMessage } from "naive-ui";
import { shrink } from "../utils/index.js";

export const useClipboard = () => {
  const toast = useMessage();
  return async function copyToClipboard(text, message = "") {
    await navigator.clipboard.writeText(text);
    toast.success(message || `Copied: ${shrink(text, 30)}`);
  };
};
