<template>
  <NButtonGroup>
    <ButtonSubmit v-if="submit" v-bind="omitter(submit)">
      <div class="flex-line">
        <NIcon v-if="submit.Icon"><component :is="submit.Icon" /></NIcon>
        <template v-if="submit.content">
          {{ submit.content }}
        </template>
        <NIcon v-if="submit.Icon2"><component :is="submit.Icon2" /></NIcon>
      </div>
    </ButtonSubmit>
  </NButtonGroup>
</template>

<script setup>
defineProps({
  submit: {
    required: false,
    type: Object,
    // validator(value, props) {
    //   // The value must match one of these strings
    //   return ["success", "warning", "danger"].includes(value);
    // },
  },
});
import { NButtonGroup, NIcon } from "naive-ui";
import { omit } from "rambda";
import ButtonSubmit from "../../components/Button/ButtonSubmit.vue";

const omitter = omit(["Icon", "Icon2", "content"]);
</script>
