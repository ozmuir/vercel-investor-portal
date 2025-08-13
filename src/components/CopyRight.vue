<script setup>
import { ENTITY_OT, ENTITY_EI } from "../variables.js";
</script>

<template>
  <div class="text-small muted" style="margin-bottom: -1em">
    © 2019-{{ new Date().getFullYear() }} {{ ENTITY_OT }} and {{ ENTITY_EI }}
  </div>
</template>
