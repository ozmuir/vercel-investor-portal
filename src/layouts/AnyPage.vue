<template>
  <div class="layout">
    <div :class="s.grid">
      <div :class="[s.cell, s.y_start, s.x_start]">
        <RouterLink to="/">
          <!-- <Logo style="width: 50%; max-width: var(--logo-size)" /> -->
          <LogoEI
            animated
            v-if="isEI"
            style="width: var(--logo-size); height: var(--logo-size)"
          />
          <LogoOT
            animated
            v-if="isLocal || isOT"
            style="width: var(--logo-size); height: var(--logo-size)"
          />
        </RouterLink>
      </div>
      <div :class="[s.cell, s.y_start, s.x_mid]">
        <Breadcrumb />
      </div>
      <div :class="[s.cell, s.y_start, s.x_end]">
        <UserMenu />
      </div>
      <main
        :class="[s.cell, s.y_mid, s.x_mid, s.main]"
        style="grid-column: var(--first) / span var(--last); width: 100%"
      >
        <div class="width-60rem margin-auto flex-col gap-1">
          <!-- <div class="view-30rem">
            <Breadcrumb />
          </div> -->
          <RouterView />
        </div>
      </main>
      <CopyRightCell />
      <!-- <NavigationCell /> -->
      <!-- <ContactUsCell /> -->
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "../components/Breadcrumb.vue";
// import ContactUsCell from "../components/ContactUsCell.vue";
import CopyRightCell from "../components/CopyRightCell.vue";
import NavigationCell from "../components/NavigationCell.vue";
import LogoEI from "../components/LogoEI.vue";
import LogoOT from "../components/LogoOT.vue";
import UserMenu from "../components/UserMenu.vue";
import { isLocal, isOT, isEI } from "../state/environment.js";
import s from "../styles/grid.module.scss";
</script>
