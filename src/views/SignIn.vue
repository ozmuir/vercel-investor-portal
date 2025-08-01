<template>
  <div class="view-30rem">
    <!-- <Heading as="h2">{{ messages.heading.investors_portal }}</Heading> -->
    <Heading as="h3">{{ messages.heading.investor_login }}</Heading>
    <SignInForm />
  </div>
</template>

<script setup>
import Heading from "../components/Heading";
import SignInForm from "../components/SignInForm";
import messages from "../messages.json";
</script>
