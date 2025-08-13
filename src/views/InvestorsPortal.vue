<template>
  <div class="view-30rem">
    <!-- <Heading as="h2">{{ messages.heading.investors_portal }}</Heading> -->
    <Loader v-if="sessionRef === undefined" type="bounce" />
    <template v-else-if="sessionRef === null">
      <ButtonLink :to="{ name: ROUTE_INVESTOR_SIGN_IN }">Log in</ButtonLink> to
      access the portal.
    </template>
    <template v-else>
      <Actions />
      <News />
    </template>
  </div>
</template>

<script setup>
defineOptions({ name: "V_Investors" });

import Actions from "../components/Actions.vue";
import News from "../components/News.vue";
import Loader from "../components/Loader.vue";
import { ROUTE_INVESTOR_SIGN_IN } from "../routing";
import { sessionRef } from "../state/session";
import ButtonLink from "../components/Button/ButtonLink.vue";
</script>
