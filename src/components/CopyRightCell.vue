<template>
  <div :class="[s.cell, s.y_end, s.x_start]" style="grid-column: 1 / -1">
    <CopyRight />
  </div>
</template>

<script setup>
import CopyRight from "../components/CopyRight";
import s from "../styles/grid.module.scss";
</script>
