import { useMessage } from "naive-ui";
import { watch } from "vue";
import { useRoute } from "vue-router";

const decode = (it) => decodeURIComponent(it.replace(/\+/g, " "));

export function useUrlMessage() {
  const toast = useMessage(); // requires the calling component to be wrapped in <NMessageProvider>
  const route = useRoute();
  watch(
    () => route.hash,
    // eslint-disable-next-line no-unused-vars
    (newHash, oldHash) => {
      // #error=server_error&error_code=unexpected_failure&error_description=Error+confirming+user
      const params = new URLSearchParams(newHash.slice(1));
      const message = params.get("message");
      if (message) {
        toast.info(decode(message));
      }
      const error = params.get("error_description");
      if (error) {
        toast.error(decode(error));
      }
    }
  );
}
