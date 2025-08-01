<template>
  <NBreadcrumb separator="" class="breadcrumb">
    <NBreadcrumbItem
      v-for="r of breadcrumbs"
      :key="r.name"
      :href="r.fullPath"
      @click.prevent="router.push(r)"
    >
      <div
        :class="
          r.name !== route.name
            ? 'fx_outline fx_outline_2'
            : 'fx_outline--padding'
        "
      >
        {{ r.name }}
      </div>
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>

<script setup>
defineOptions({ name: "CBreadcrumb" });
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { ROUTE_NOT_FOUND } from "../routing";

const route = useRoute();
const router = useRouter();
const breadcrumbs = computed(() => {
  const routes = [];
  const fragments = route.fullPath.split("/").filter((it) => !!it);
  fragments.unshift(""); // return "Home"
  while (fragments.length) {
    const path = fragments.join("/");
    const route = router.resolve({ path }, "/");
    if (route.name !== ROUTE_NOT_FOUND) {
      routes.push(route);
    }
    fragments.pop();
  }
  routes.reverse();
  return routes;
});
</script>

<style>
.n-breadcrumb {
  margin-left: -4px;
  white-space: normal;
}
.n-breadcrumb-item__separator[class][class] {
  /* display: none; */
  margin: 0;
  padding: 2px;
}
.n-breadcrumb-item__link[class][class] {
  padding: 0;
}
.n-breadcrumb-item__link:hover {
  --n-item-color-hover: initial;
}
</style>
