<template>
  <div class="view-30rem">
    <!-- <Heading as="h2">{{ messages.heading.investors_portal }}</Heading> -->
    <Heading as="h3">{{ messages.heading.investment_list }}</Heading>
    <InvestmentList />
  </div>
</template>

<script setup>
import Heading from "../components/Heading";
import InvestmentList from "../components/Investment/InvestmentList.vue";
import messages from "../messages.json";
</script>
