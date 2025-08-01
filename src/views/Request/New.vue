<template>
  <div class="view-30rem">
    <Heading as="h3">New Request</Heading>
    <RequestForm />
  </div>
</template>

<script setup>
defineOptions({ name: "ViewRequestNew" });
import Heading from "../../components/Heading";
import RequestForm from "../../components/Request/Form.vue";
</script>
