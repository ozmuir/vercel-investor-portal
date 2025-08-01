<template>
  <div class="view-30rem">
    <!-- <Heading as="h2">{{ messages.heading.investors_portal }}</Heading> -->
    <Heading as="h3">{{ messages.heading.request_list }}</Heading>
    <RequestList />
    <ButtonLink2
      :to="{ name: ROUTE_REQUEST_NEW }"
      :content="messages.action.request_a_new"
    />
  </div>
</template>

<script setup>
defineOptions({ name: "ViewRequestList" });
import ButtonLink2 from "../../components/Button/ButtonLink2.vue";
import Heading from "../../components/Heading.vue";
import RequestList from "../../components/Request/List.vue";
import messages from "../../messages.json";
import { ROUTE_REQUEST_NEW } from "../../routing/index.js";
</script>
