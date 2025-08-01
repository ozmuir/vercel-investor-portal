<template>
  <NForm
    class="root flex-col gap-1"
    ref="formRef"
    :model="modelRef"
    :rules="rules"
    @submit.prevent="handleSubmit"
    :disabled="!enabledRef"
  >
    <div>
      {{ messages.account_login_intro }}
    </div>
    <NFormItem
      path="email"
      :label="messages.field_label.email"
      :show-label="false"
    >
      <NInput
        required
        type="email"
        v-model:value="modelRef.email"
        :placeholder="messages.field_hint.email"
      />
    </NFormItem>
    <FormButtons
      :submit="{
        // Icon2: IconLogin,
        content: messages.action.account_log_in,
        disabled: !enabledRef || modelRef.email === '',
      }"
      style="justify-content: center"
    />
    <FeedBack :success="successRef" :error="errorRef" />
  </NForm>
</template>

<script setup>
// import { IconLogin } from "../components/icons";
import { NForm, NFormItem, NInput } from "naive-ui";
import { ref } from "vue";
import { useSignIn, useAfter_signIn } from "../actions/session";
import FormButtons from "../components/Button/FormButtons";
import FeedBack from "../components/FeedBack.vue";
import messages from "../messages.json";
import { lock } from "../state/ui";

const formRef = ref(null);
const modelRef = ref({ email: "" });

const enabledRef = ref(true);

const successRef = ref("");
const errorRef = ref("");

const rules = {
  email: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error(messages.feedback.email_required);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return new Error(messages.feedback.email_invalid);
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

const signIn = useSignIn();
const afterSignIn = useAfter_signIn();

async function _signIn(email) {
  lock(messages.progress.emailing_verification);
  enabledRef.value = false;
  const { error } = await signIn(email);
  if (error) {
    console.error("Error signing in:", error.message);
    enabledRef.value = true; // allow resubmit
    successRef.value = "";
    errorRef.value = error.message;
  } else {
    successRef.value = messages.feedback.log_in.email_sent;
    errorRef.value = "";
  }
  lock();
  return afterSignIn({ error });
}

function handleSubmit() {
  formRef.value
    ?.validate((errors) => {
      if (errors) {
        console.log("Validation errors:", errors);
        successRef.value = "";
        errorRef.value = `Validation errors: ${JSON.stringify(errors)}`;
      } else {
        _signIn(modelRef.value.email);
        successRef.value = "";
        errorRef.value = "";
      }
    })
    .catch((err) => {
      console.error("Error during validation:", err);
      successRef.value = "";
      errorRef.value = `Error during validation: ${err.message}`;
    });
}
</script>
