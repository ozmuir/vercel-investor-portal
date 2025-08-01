<template>
  <div :class="[s.cell, s.y_end, s.x_end, 'text-upper']">
    <ContactUs v-if="route.name === ROUTE_HOME" />
  </div>
</template>

<script setup>
import ContactUs from "../components/ContactUs";
import s from "../styles/grid.module.scss";
import { useRoute } from "vue-router";
import { ROUTE_HOME } from "../routing";

const route = useRoute();
</script>
