<template>
  <NTooltip trigger="focus">
    <template #trigger>
      <NButton text style="font-size: inherit">
        <img v-bind="img" style="width: auto; height: 1em" />
      </NButton>
    </template>
    {{ text }}
  </NTooltip>
</template>

<script setup>
defineProps({
  text: String,
  img: Object,
});

import { NButton, NTooltip } from "naive-ui";

/*

<IconTooltip
  text="This information was sourced from DealMaker and can be inaccurate."
  :img="{
    src: '/dealmaker-icon.svg',
    width: '128',
    height: '128',
    alt: 'DealMaker Logo',
  }"
/>

const Tooltip = (props) =>
  h(
    NTooltip,
    { trigger: "focus" },
    {
      default: () => props.text,
      trigger: () =>
        h(NButton, { text: true, style: "font-size: inherit; " }, () =>
          h("img", {
            src: props.src,
            width: props.width,
            height: props.height,
            alt: props.alt || "",
            style: "width: auto; height: 1em;",
          })
        ),
    }
  );
Tooltip.props = {
  text: String,
  src: String,
  width: String,
  height: String,
  alt: String,
};

*/
</script>
