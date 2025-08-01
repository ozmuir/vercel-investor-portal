<template>
  <div :class="[s.cell, s.y_end, s.x_mid, 'text-upper']">
    <Navigation />
  </div>
</template>

<script setup>
import Navigation from "../components/Navigation";
import s from "../styles/grid.module.scss";
</script>
