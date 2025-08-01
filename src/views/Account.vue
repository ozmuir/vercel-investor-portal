<template>
  <div class="view-30rem view-align-left">
    <!-- <Heading as="h2">{{ messages.heading.investors_portal }}</Heading> -->
    <Heading as="h3">{{ messages.heading.account }}</Heading>
    <div class="flex-col gap-2">
      <Loader v-if="sessionRef === undefined" type="bounce" />
      <template v-else-if="sessionRef === null">
        {{ $router.push({ name: ROUTE_INVESTOR }) }}
      </template>
      <div v-else class="flex-col gap-1 align-start">
        <Heading as="h4">Profile ID</Heading>
        <div class="flex-line">
          <NTag
            style="font-family: monospace; font-weight: bold; cursor: inherit"
          >
            {{ sessionRef.profile.id }}
          </NTag>
          <NButton
            text
            @click="
              copyToClipboard(sessionRef.profile.id, 'Profile ID Copied!')
            "
          >
            <NIcon><IconCopy /></NIcon>
          </NButton>
          <div class="flex-grow"></div>
          <NTag v-if="sessionRef.profile.is_admin" type="info" round>
            Admin
          </NTag>
        </div>
      </div>
      <div class="flex-col gap-1">
        <Heading as="h4">Profile Update</Heading>
        <ProfileForm />
      </div>
      <div class="flex-col gap-1">
        <Heading as="h4">Email Change</Heading>
        <EmailChangeForm />
      </div>
      <div class="flex-col gap-1">
        <Heading as="h4">Account Deletion</Heading>
        <AccountDeleteForm />
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "V_Account" });

import { IconCopy } from "../components/icons";
import { NButton, NIcon, NTag, useMessage } from "naive-ui";
import EmailChangeForm from "../components/EmailChangeForm.vue";
import Loader from "../components/Loader";
import ProfileForm from "../components/ProfileForm.vue";
import AccountDeleteForm from "../components/AccountDeleteForm.vue";
import Heading from "../components/Heading";
import messages from "../messages.json";
import { sessionRef } from "../state/session";
import { ROUTE_INVESTOR } from "../routing";
import { useClipboard } from "../utils/useClipboard";

const copyToClipboard = useClipboard();
</script>
