<template>
  <div class="view-30rem">
    <!-- <Heading as="h2">{{ messages.heading.investors_portal }}</Heading> -->
    <Heading as="h3">{{ messages.heading.investor_documents }}</Heading>
    <FileList />
    <ButtonLink2
      :to="{ name: ROUTE_FILE_NEW }"
      :content="messages.action.upload_files"
    />
  </div>
</template>

<script setup>
defineOptions({ name: "ViewFileList" });
import ButtonLink2 from "../../components/Button/ButtonLink2";
import FileList from "../../components/File/FileList";
import Heading from "../../components/Heading";
import messages from "../../messages.json";
import { ROUTE_FILE_NEW } from "../../routing";
</script>
