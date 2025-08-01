<template>
  <NForm
    ref="formRef"
    :model="modelRef"
    :rules="rules"
    :disabled="submittingRef"
    @submit.prevent="handleSubmit"
  >
    <NFormItem path="files" label="Files:">
      <NUpload
        multiple
        :max="5"
        :default-upload="false"
        :accept="ACCEPT_TYPE.join(',')"
        v-model:file-list="modelRef.files"
        trigger-style="width: 100%"
      >
        <NUploadDragger>
          <NIcon size="3rem" :depth="3"><IconUpload /></NIcon>
          <br />
          <NText depth="3">
            Click or drag files to this area to prepare them for upload.
          </NText>
        </NUploadDragger>
      </NUpload>
    </NFormItem>
    <NFormItem path="investment_ids" label="Related Investments:">
      <div style="width: 100%">
        <InvestmentPicker
          multiple
          loadingText="Loading your investments…"
          placeholder="Select the investments these documents are related to"
          v-model:value="modelRef.investment_ids"
        />
      </div>
    </NFormItem>
    <NFormItem path="comment" label="Comment:">
      <NInput
        type="text"
        v-model:value="modelRef.comment"
        :maxlength="LENGTH_MAX_COMMENT"
      />
    </NFormItem>
    <FormButtons
      :submit="{
        // Icon: IconUpload,
        content: messages.action.upload_the_files,
        disabled: !modelRef.files.length,
      }"
    />
    <FeedBack :success="successRef" :error="errorRef" />
  </NForm>
</template>

<script setup>
import {
  NIcon,
  NForm,
  NFormItem,
  NInput,
  NText,
  NUpload,
  NUploadDragger,
} from "naive-ui";
import { ref } from "vue";
import FormButtons from "../../components/Button/FormButtons.vue";
import FeedBack from "../../components/FeedBack.vue";
import InvestmentPicker from "../../components/Investment/InvestmentPicker.vue";
import { IconUpload } from "../../components/icons.js";
import messages from "../../messages.json";
import { filesLoad } from "../../state/files";
import { lock } from "../../state/ui";
import { fileUpload } from "../../actions/storage.js";
import { ACCEPT_TYPE, LENGTH_MAX_COMMENT } from "../../variables.js";

const successRef = ref("");
const errorRef = ref("");

const formRef = ref(null);
const createModel = () => ({
  files: [],
  investment_ids: [],
  comment: "",
});
const modelRef = ref(createModel());
const rules = {
  comment: {
    validator(rule, value) {
      if (value.length > LENGTH_MAX_COMMENT) {
        return new Error("File comment is too long");
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
};

const submittingRef = ref(false);

async function handleSubmit() {
  lock("Uploading the documents...");
  submittingRef.value = true;

  // const folder = filesInvestmentIdRef.value; // investment ID = folder name
  const folder = "";

  const model = modelRef.value;
  let files = model.files;
  const errors = [];
  while (files.length) {
    const file = files.shift();
    const metadata = {
      investment_ids: model.investment_ids,
      comment: model.comment,
    };
    const { data, error } = await fileUpload(file.file, folder, metadata);
    if (error) {
      // TODO Handle error: return the file to the queue, highlight it in red, and show a message.
      errors.push(error.message);
    } else {
      modelRef.value = {
        ...model,
        files: [...files],
      };
    }
  }
  if (errors.length) {
    // TODO Handle errors
    successRef.value = "";
    errorRef.value = `Error uploading the documents: ${JSON.stringify(errors)}`;
  } else {
    successRef.value = "The documents have been uploaded.";
    errorRef.value = "";
    modelRef.value = createModel();
  }
  submittingRef.value = false;
  lock();

  await filesLoad(folder); // Reload files
}
</script>
