<template>
  <div class="view-30rem">
    <Heading as="h2">Not Found</Heading>
    <ButtonLink :to="{ name: ROUTE_HOME }">
      {{ messages.navigation.back_home }}
    </ButtonLink>
  </div>
</template>

<script setup>
import ButtonLink from "../components/Button/ButtonLink.vue";
import Heading from "../components/Heading";
import { ROUTE_HOME } from "../routing";
import messages from "../messages.json";
</script>
