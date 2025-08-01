<template>
  <div class="view-30rem">
    <!-- <Heading as="h2">{{ messages.heading.investors_portal }}</Heading> -->
    <Heading as="h3">Upload Investor Documents</Heading>
    <FileUpload />
  </div>
</template>

<script setup>
defineOptions({ name: "ViewFileNew" });
import FileUpload from "../../components/File/FileUpload.vue";
import Heading from "../../components/Heading.vue";
</script>
