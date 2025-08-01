<template>
  <div class="view-30rem">
    <Heading as="h3">Edit Request</Heading>
    <RequestForm :request_id="$route.params.request_id" />
  </div>
</template>

<script setup>
defineOptions({ name: "ViewRequestEdit" });
import Heading from "../../components/Heading.vue";
import RequestForm from "../../components/Request/Form.vue";
</script>
