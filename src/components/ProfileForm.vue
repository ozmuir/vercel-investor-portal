<template>
  <NForm
    ref="formRef"
    :model="modelRef"
    :rules="rules"
    @submit.prevent="handleSubmit"
    :disabled="!enabledRef"
  >
    <NFormItem path="name" label="First and Last Name">
      <NInput
        required
        type="text"
        v-model:value="modelRef.name"
        placeholder=""
      />
    </NFormItem>
    <NFormItem path="address" label="Physical address">
      <NInput
        required
        type="text"
        v-model:value="modelRef.address"
        placeholder=""
      />
    </NFormItem>
    <NFormItem path="phone" label="Phone Number">
      <NInput
        required
        type="text"
        v-model:value="modelRef.phone"
        placeholder=""
      />
    </NFormItem>
    <NFormItem path="address_erc20" label="ERC20 wallet address">
      <NInput
        required
        type="text"
        v-model:value="modelRef.address_erc20"
        placeholder="e.g. 0x8ba1f109551bD432803012645Ac136ddd64DBA72"
      />
    </NFormItem>
    <FormButtons
      :submit="{
        content: 'Save',
        disabled: !enabledRef,
      }"
    />
    <FeedBack :success="successRef" :error="errorRef" />
  </NForm>
</template>

<script setup>
import { isAddress } from "ethers";
import { NForm, NFormItem, NInput } from "naive-ui";
import { pick } from "rambda";
import { ref, watch } from "vue";
import { useUpdateProfile, useAfter_updateProfile } from "../actions/profile";
import FormButtons from "../components/Button/FormButtons";
import FeedBack from "../components/FeedBack.vue";
import { sessionRef } from "../state/session";
import { lock } from "../state/ui";

const picker = pick(["name", "address", "address_erc20"]);
const createModel = () => picker(sessionRef.value?.profile || {});
watch(sessionRef, (session) => {
  modelRef.value = session.profile;
});

const rules = {
  name: [
    {
      required: false,
      trigger: ["input", "blur"],
    },
  ],
  address: [
    {
      required: false,
      trigger: ["input", "blur"],
    },
  ],
  address_erc20: [
    {
      required: false,
      validator(rule, value) {
        if (value && !isAddress(value)) {
          return new Error("Invalid ERC20 address");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};

const formRef = ref(null);
const modelRef = ref(createModel());

const enabledRef = ref(true);

const successRef = ref("");
const errorRef = ref("");

function handleSubmit() {
  formRef.value
    ?.validate((errors) => {
      if (errors) {
        console.log("Validation errors:", errors);
        successRef.value = "";
        errorRef.value = `Validation errors: ${JSON.stringify(errors)}`;
      } else {
        successRef.value = "Validation passed";
        errorRef.value = "";
        _submit(modelRef.value);
      }
    })
    .catch((err) => {
      console.error("Validation errors:", err);
    });
}

const updateProfile = useUpdateProfile();
const after_updateProfile = useAfter_updateProfile();

async function _submit(values) {
  lock("Saving your profile…");
  enabledRef.value = false;
  // eslint-disable-next-line no-unused-vars
  const { data, error } = await updateProfile(values);
  if (error) {
    console.error("Error updating profile:", error.message);
    enabledRef.value = true; // allow resubmit
    successRef.value = "";
    errorRef.value = error.message;
  } else {
    successRef.value = "Your profile was updated.";
    errorRef.value = "";
    modelRef.value = createModel();
    // for now users may update the page to be able to submit again
  }
  lock();
  return after_updateProfile({ data, error });
}
</script>
