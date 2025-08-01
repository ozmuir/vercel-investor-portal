<template>
  <div class="flex-col gap-1">
    <TextMute>
      You have the option to delete your account from the Investor Portal. This
      will not affect your investment data, and you may re-register using the
      same email address at any time.
    </TextMute>
    <!--
    <NAlert v-if="filesLoadingRef">
      Counting your documents… <Loader type="pulse" />
    </NAlert>
    <NAlert type="warning" v-else-if="filesRef.length">
      You must delete any
      <RouterLink :to="{ name: ROUTE_FILE_LIST }"
        >uploaded documents</RouterLink
      >
      before deleting your account.
    </NAlert>
    -->
    <NForm
      ref="formRef"
      :model="modelRef"
      :rules="rules"
      @submit.prevent="handleSubmit"
      :disabled="!enabledRef"
      v-if="visibleRef"
    >
      <NFormItem path="confirm" :label="messages.field_label.delete_confirm">
        <!-- v-if="!filesRef.length" -->
        <NInput
          required
          type="text"
          v-model:value="modelRef.confirm"
          placeholder="DELETE"
        />
        <!-- @keydown.enter.prevent -->
      </NFormItem>
      <FormButtons
        :submit="{
          // Icon: IconUpload,
          content: messages.action.account_delete,
          disabled: !enabledRef || modelRef.confirm.toUpperCase() !== 'DELETE',
        }"
      />
      <FeedBack :success="successRef" :error="errorRef" />
    </NForm>
    <!-- </div> -->
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput } from "naive-ui";
import { ref } from "vue";
import { signOut, useAfter_signOut } from "../actions/session";
import { deleteUser, useAfter_deleteUser } from "../actions/account";
import FormButtons from "../components/Button/FormButtons.vue";
import FeedBack from "../components/FeedBack.vue";
import TextMute from "../components/TextMute.vue";
import messages from "../messages.json";
import { lock } from "../state/ui";

const formRef = ref(null);
const modelRef = ref({ confirm: "" });
const enabledRef = ref(true);
const visibleRef = ref(true);

const successRef = ref("");
const errorRef = ref("");

const rules = {};

const after_deleteUser = useAfter_deleteUser();
const afterSignOut = useAfter_signOut();

async function handleSubmit() {
  lock("…");
  enabledRef.value = false;
  const { data, error } = await deleteUser();
  if (error) {
    console.error("Error deleting user:", error.message);
    enabledRef.value = true;
    successRef.value = "";
    errorRef.value = error.message;
  } else {
    visibleRef.value = false;
    successRef.value = JSON.stringify(data);
    errorRef.value = "";
    signOut().then(afterSignOut);
  }
  lock();
  return after_deleteUser({ data, error });
}
</script>
