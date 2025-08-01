import { h } from "vue";
import Ellipsis from "../components/Ellipsis.vue";

export const renderEllipsis = (text) => h(Ellipsis, () => text);
