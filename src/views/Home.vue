<script setup>
defineOptions({ name: "ViewHome" });

import Actions from "../components/Actions.vue";
import News from "../components/News.vue";
import Loader from "../components/Loader.vue";
import { ROUTE_INVESTOR_SIGN_IN } from "../routing";
import { sessionRef } from "../state/session";
import ButtonLink from "../components/Button/ButtonLink.vue";
</script>

<template>
  <div class="view-30rem">
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
