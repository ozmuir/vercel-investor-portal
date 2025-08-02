<template>
  <div class="layout">
    <div :class="s.grid">
      <div :class="[s.cell, s.y_start, s.x_start, 'text-nowrap text-upper']">
        {{ date }}
      </div>
      <div :class="[s.cell, s.y_start, s.x_mid, 'text-nowrap text-upper']">
        {{ place }}
      </div>
      <div :class="[s.cell, s.y_start, s.x_end, 'text-nowrap text-upper']">
        {{ time }}
      </div>
      <main :class="[s.cell, s.y_mid, s.x_mid, s.main]">
        <div class="width-60rem margin-auto flex-col gap-1">
          <RouterView />
        </div>
      </main>
      <CopyRightCell />
      <NavigationCell />
      <!-- <ContactUsCell /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
// import ContactUsCell from "../components/ContactUsCell";
import CopyRightCell from "../components/CopyRightCell";
import NavigationCell from "../components/NavigationCell";
import s from "../styles/grid.module.scss";

const place = "O‘AHU HAWAII";
const locale = "en-US";
const dateFormat = {
  timeZone: "Pacific/Honolulu",
  year: "numeric",
  month: "numeric",
  day: "numeric",
};
const timeFormat = {
  timeZone: "Pacific/Honolulu",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
};

const datetime = new Date();
const date = ref(datetime.toLocaleDateString(locale, dateFormat));
const time = ref(datetime.toLocaleTimeString(locale, timeFormat));

let timeUpdate;

onMounted(() => {
  timeUpdate = setInterval(() => {
    const datetime = new Date();
    date.value = datetime.toLocaleDateString(locale, dateFormat);
    time.value = datetime.toLocaleTimeString(locale, timeFormat);
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timeUpdate);
});
</script>
