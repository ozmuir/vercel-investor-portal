<script setup>
import {
  IconAdmin,
  IconAvatar,
  IconDocument,
  IconRequest,
  IconLogout,
  IconInvestment,
  IconEdit,
} from "../components/icons.js";
import { NAvatar, NButton, NDropdown, NIcon } from "naive-ui";
import { h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { signOut, useAfter_signOut } from "../actions/session";
import Loader from "../components/Loader";
import messages from "../messages.json";
import {
  ROUTE_ADMIN_REQUESTS,
  ROUTE_FILE_LIST,
  ROUTE_SETTINGS,
  ROUTE_INVESTMENT_LIST,
  ROUTE_REQUEST_LIST,
  ROUTE_INVESTOR_SIGN_IN,
} from "../routing";
import { avatarUrlRef } from "../state/avatar.js";
import { sessionRef } from "../state/session";

function getOptions(session) {
  const { email } = session.profile;
  const options = [];
  options.push(
    {
      label: email,
      key: "id",
      icon: renderIcon(IconAvatar),
    },
    {
      type: "divider",
    }
  );
  if (session.profile.is_admin) {
    options.push(
      {
        label: "Admin",
        key: "admin",
        icon: renderIcon(IconAdmin),
        children: [
          {
            label: "Requests",
            key: "admin-requests",
            icon: renderIcon(IconRequest),
            props: {
              onClick: () => {
                router.push({ name: ROUTE_ADMIN_REQUESTS });
              },
            },
          },
        ],
      },
      {
        type: "divider",
      }
    );
  }
  options.push(
    {
      label: messages.menu.investments,
      key: "investments",
      icon: renderIcon(IconInvestment),
      props: {
        onClick: () => {
          router.push({ name: ROUTE_INVESTMENT_LIST });
        },
      },
    },
    {
      label: messages.menu.documents,
      key: "documents",
      icon: renderIcon(IconDocument),
      props: {
        onClick: () => {
          router.push({ name: ROUTE_FILE_LIST });
        },
      },
    },
    {
      label: messages.menu.requests,
      key: "requests",
      icon: renderIcon(IconRequest),
      props: {
        onClick: () => {
          router.push({ name: ROUTE_REQUEST_LIST });
        },
      },
    },
    {
      type: "divider",
    },
    {
      label: messages.menu.settings,
      key: "settings",
      icon: renderIcon(IconEdit),
      props: {
        onClick: () => {
          router.push({ name: ROUTE_SETTINGS });
        },
      },
    },
    {
      type: "divider",
    },
    {
      label: messages.menu.sign_out,
      key: "logout",
      icon: renderIcon(IconLogout),
      props: {
        onClick() {
          signOut().then(afterSignOut);
        },
      },
    }
  );
  return options;
}

const route = useRoute();
const router = useRouter();
const afterSignOut = useAfter_signOut();

function renderIcon(Icon) {
  return () => {
    return h(
      NIcon,
      { size: "1rem" },
      {
        default: () => h(Icon),
      }
    );
  };
}
</script>

<template>
  <Loader v-if="sessionRef === undefined" type="bounce" />
  <template v-else-if="sessionRef === null">
    <RouterLink
      v-if="route.name !== ROUTE_INVESTOR_SIGN_IN"
      :to="{ name: ROUTE_INVESTOR_SIGN_IN }"
      class="fx_outline text-upper"
    >
      Log in
    </RouterLink>
  </template>
  <NDropdown v-else :options="getOptions(sessionRef)">
    <NButton text>
      <NAvatar
        round
        :src="avatarUrlRef"
        color="transparent"
        style="
          width: var(--logo-size);
          height: var(--logo-size);
          box-shadow: 1px 1px rgba(255, 255, 255, 0.5);
        "
      >
        <Loader v-if="!avatarUrlRef" type="bounce" />
      </NAvatar>
    </NButton>
  </NDropdown>
</template>
