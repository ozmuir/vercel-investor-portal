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
  ROUTE_INVESTOR_ACCOUNT,
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
      label: messages.menu.account,
      key: "changeEmail",
      icon: renderIcon(IconEdit),
      props: {
        onClick: () => {
          router.push({ name: ROUTE_INVESTOR_ACCOUNT });
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

// function addHead(options, email) {
//   return [
//     {
//       label: email,
//       key: "id",
//       icon: IconAvatar,
//     },
//     {
//       type: "divider",
//     },
//     ...options,
//   ];
// }

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

// const options = [
//   {
//     label: messages.menu.investments,
//     key: "investments",
//     icon: IconInvestment,
//     props: {
//       onClick: () => {
//         router.push({ name: ROUTE_INVESTMENT_LIST });
//       },
//     },
//   },
//   {
//     label: messages.menu.documents,
//     key: "documents",
//     icon: IconDocument,
//     props: {
//       onClick: () => {
//         router.push({ name: ROUTE_FILE_LIST });
//       },
//     },
//   },
//   {
//     label: messages.menu.requests,
//     key: "requests",
//     icon: IconRequest,
//     props: {
//       onClick: () => {
//         router.push({ name: ROUTE_REQUEST_LIST });
//       },
//     },
//   },
//   {
//     type: "divider",
//   },
//   {
//     label: messages.menu.account,
//     key: "changeEmail",
//     icon: IconEdit,
//     props: {
//       onClick: () => {
//         router.push({ name: ROUTE_INVESTOR_ACCOUNT });
//       },
//     },
//   },
//   {
//     type: "divider",
//   },
//   {
//     label: messages.menu.sign_out,
//     key: "logout",
//     icon: IconLogout,
//     props: {
//       onClick() {
//         signOut().then(afterSignOut);
//       },
//     },
//   },
// ];

// function greeting(name = "friend") {
//   const hour = new Date().getHours();
//   if (hour < 2) return `Still up, ${name}? You're a night owl.`;
//   if (hour < 4) return `Midnight musings, ${name}? Hope you're dreaming big.`;
//   if (hour < 6) return `Too early to function — but hello anyway, ${name}.`;
//   if (hour < 8) return `Rise and shine, ${name}! Coffee is calling.`;
//   if (hour < 10) return `Good morning, bright spark ${name}!`;
//   if (hour < 12) return `Almost lunch — stay strong, ${name}.`;
//   if (hour < 14) return `Good afternoon, ${name}! Hydrate and dominate.`;
//   if (hour < 16)
//     return `Snack time, ${name}? You're in the mid-afternoon zone.`;
//   if (hour < 18) return `Good evening vibes incoming, ${name}.`;
//   if (hour < 20) return `Dinner time greetings, ${name}!`;
//   if (hour < 22) return `Evening chill mode activated, ${name}.`;
//   return `Late night thoughts, ${name}? You're in good company.`;
// }
</script>
