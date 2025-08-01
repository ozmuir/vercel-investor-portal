import { ref } from "vue";
import { server } from "../../actions/api.js";

export const useAdminRequestsRef = () => {
  const iRef = ref([]);
  const iLoadingRef = ref(false);
  const iTotalRef = ref(0);
  const iLoad = async (params) => {
    iLoadingRef.value = true;
    const { data, error } = await server("GET", "/api/request/list", params);
    if (error) {
      console.error(`Error fetching requests (admin):`, error.message);
      iRef.value = [];
      iTotalRef.value = 0;
    } else {
      console.log(`Fetched requests (admin):`, data);
      iRef.value = data.items;
      iTotalRef.value = data.total;
    }
    iLoadingRef.value = false;
  };
  return [iRef, iLoadingRef, iTotalRef, iLoad];
};
