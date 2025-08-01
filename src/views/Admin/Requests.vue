<template>
  <Loader
    v-if="sessionRef === undefined"
    type="bounce"
    class="justify-center"
  />
  <div v-else-if="sessionRef?.profile.is_admin === true" class="view-60rem">
    <Heading as="h3">Admin | Requests</Heading>
    <Loader
      v-if="adminRequestsLoadingRef"
      type="bounce"
      class="justify-center"
    />
    <template v-if="adminRequestsRef.length">
      <NModal v-model:show="showModalRef">
        <NCard
          style="width: 600px"
          :title="`Edit Request ${requestModelRef.req_id}`"
          :bordered="false"
          role="dialog"
          aria-modal="true"
        >
          <template #header>Request {{ requestModelRef.req_id }}</template>
          <NForm
            :model="requestModelRef"
            @submit.prevent="handleRequestEditSubmit"
          >
            <NFormItem path="res_note" label="Response Note">
              <NInput
                type="textarea"
                v-model:value="requestModelRef.res_note"
                :maxlength="LENGTH_MAX_RESPONSE_NOTE"
                :rows="10"
              />
            </NFormItem>
            <!--
            <NFormItem path="res_status" label="Response Status">
              <NSelect
                :options="statusOptions"
                v-model:value="requestModelRef.res_status"
              />
            </NFormItem>
            -->
            <ButtonSubmit>Submit</ButtonSubmit>
          </NForm>
        </NCard>
      </NModal>
      <!--
      <NForm>
        <NInput />
      </NForm>
      -->

      <RequestPagination
        :page="pageRef"
        :total="adminRequestsTotalRef"
        :perPage="perPageRef"
        @update:page="setPage($event)"
        @update:page-size="setPerPage($event)"
      />
      <NCheckboxGroup :class="$table.table_container">
        <NTable :bordered="true" :single-line="true" :class="$table.table">
          <thead>
            <tr>
              <th></th>
              <TableLabels :labels="labels" />
            </tr>
          </thead>
          <tbody>
            <template v-for="request in adminRequestsRef" :key="request.id">
              <tr>
                <td :rowspan="2 + (request.res_note ? 1 : 0)">
                  <div class="flex-col gap-1" style="align-items: center">
                    <!-- <NCheckbox :value="request.id" /> -->
                    <ButtonButton @click="handleRequestEditOpen(request)">
                      <NIcon><IconStatus /></NIcon>
                    </ButtonButton>
                  </div>
                </td>
                <TableCells
                  :contents="request"
                  :labels="labels"
                  :pickers="pickers"
                />
              </tr>
              <tr>
                <td :colspan="labels.length">
                  <Heading as="h6">
                    {{ request.req_summary }}
                  </Heading>
                  <div style="white-space: pre-wrap">
                    {{ request.req_details }}
                  </div>
                </td>
              </tr>
              <tr v-if="request.res_note">
                <td :colspan="labels.length">
                  <div style="white-space: pre-wrap">
                    {{ request.res_note }}
                  </div>
                </td>
              </tr>
              <TableSeparator />
            </template>
          </tbody>
        </NTable>
      </NCheckboxGroup>
      <RequestPagination
        :page="pageRef"
        :total="adminRequestsTotalRef"
        :perPage="perPageRef"
        @update:page="setPage($event)"
        @update:page-size="setPerPage($event)"
      />
    </template>
  </div>
</template>

<script setup>
defineOptions({ name: "ViewAdminRequests" });

import {
  NCard,
  NCheckbox,
  NCheckboxGroup,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NModal,
  NPagination,
  // NSelect,
  NTable,
  NTag,
  useMessage,
} from "naive-ui";
import { Fragment, h, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAdminRequestsRef } from "../../actions/admin/data.js";
import { server } from "../../actions/api.js";
import { useOnSession } from "../../actions/session.js";
import ButtonButton from "../../components/Button/ButtonButton.vue";
import ButtonSubmit from "../../components/Button/ButtonSubmit.vue";
import { renderCopyButton } from "../../components/Button/copyButton.js";
import FileOpener from "../../components/File/FileOpener.vue";
import Heading from "../../components/Heading.vue";
import Loader from "../../components/Loader.vue";
// import RequestStatus from "../../components/Request/Status.vue";
import RequestStatusSelect from "../../components/Request/StatusSelect.vue";
import RequestPagination from "../../components/Request/Pagination.vue";
import TableCells from "../../components/TableCells.vue";
import TableLabels from "../../components/TableLabels.vue";
import TableSeparator from "../../components/TableSeparator.vue";
import { IconStatus } from "../../components/icons.js";
import { renderEllipsis } from "../../components/ellipsis.js";
import { ROUTE_INVESTOR } from "../../routing/routes.js";
import { sessionRef } from "../../state/session.js";
import { lock } from "../../state/ui.js";
import $table from "../../styles/table.module.scss";
import { formatDateLong, formatInvestmentName } from "../../utils";
import { LENGTH_MAX_RESPONSE_NOTE } from "../../variables.js";

const pageRef = ref(1);
const setPage = (value) => (pageRef.value = value);
const perPageRef = ref(10);
const setPerPage = (value) => (perPageRef.value = value);
const showModalRef = ref(false);
const newResponseModel = (
  req_id = null,
  // res_status = null,
  res_note = null
) => ({
  req_id,
  // res_status,
  res_note,
});
const requestModelRef = ref(newResponseModel());

function handleRequestEditOpen(request) {
  showModalRef.value = true;
  requestModelRef.value = newResponseModel(
    request.id,
    // request.res_status,
    request.res_note
  );
}

const labels = [
  "Request ID",
  "Profile ID",
  "Email",
  "Created At",
  "Status",
  "Investments",
  "Documents",
];

const pickers = [
  (request) =>
    h(Fragment, null, [
      renderEllipsis(request.id),
      renderCopyButton(request.id, { class: "inline" }),
    ]),
  (request) =>
    h(Fragment, null, [
      renderEllipsis(request.profile_id),
      renderCopyButton(request.profile_id, { class: "inline" }),
    ]),
  (request) =>
    h(Fragment, null, [
      h(
        "a",
        { class: "inline", href: `mailto:${request.email}` },
        request.email
      ),
      renderCopyButton(request.email, { class: "inline" }),
    ]),
  (request) => formatDateLong(request.created_at),
  (request) =>
    h(RequestStatusSelect, {
      status: request.res_status,
      onChange: onSelectChange.bind(null, request.id),
    }),
  (request) =>
    h(
      Fragment,
      null,
      request.investments?.map((invt) =>
        h(NTag, { key: invt, size: "small" }, () => formatInvestmentName(invt))
      )
    ),
  (request) =>
    h(
      Fragment,
      null,
      request.files?.map((file) =>
        h(NTag, { key: file, size: "small" }, () =>
          h(FileOpener, {
            filePath: file.name,
            mimetype: file.mimetype,
            is_admin: true,
          })
        )
      )
    ),

  // (request) =>
  //   h(
  //     ButtonButton,
  //     {
  //       onClick: () => {
  //         showModalRef.value = true;
  //         requestModelRef.value = newResponseModel(
  //           request.id,
  //           request.res_status,
  //           request.res_note
  //         );
  //       },
  //     },
  //     () => h(NIcon, null, () => h(IconStatus))
  //   ),
];

const router = useRouter();
const toast = useMessage();

useOnSession((session) => {
  if (session === null || (session && session.profile.is_admin !== true)) {
    toast.error("You need to be an admin to access this page.");
    router.push({ name: ROUTE_INVESTOR });
  }
});

const [
  adminRequestsRef,
  adminRequestsLoadingRef,
  adminRequestsTotalRef,
  adminRequestsLoad,
] = useAdminRequestsRef();

onMounted(() => {
  adminRequestsLoad({ page: pageRef.value, perPage: perPageRef.value });
});

watch([pageRef, perPageRef], ([page, perPage], [prev_page, prev_perPage]) => {
  adminRequestsLoad({
    page,
    // :
    //   perPage !== prev_perPage
    //     ? Math.ceil(page / (perPage / prev_perPage))
    //     : page
    perPage,
  });
});

async function handleRequestEditSubmit() {
  lock("Updating…");
  const { data, error } = await server(
    "POST",
    "/api/request/response",
    requestModelRef.value
  );
  if (error) {
    console.error("Error updating the request:", error.message);
  } else {
    console.log("Updated the request:", data);

    // Update the view
    const req_id = requestModelRef.value.req_id;
    adminRequestsRef.value.forEach((item) => {
      if (item.id === req_id) {
        for (let prop in requestModelRef.value) {
          item[prop] = requestModelRef.value[prop];
        }
      }
    });

    // Reset the form and hide modal
    showModalRef.value = false;
    requestModelRef.value = newResponseModel();
  }
  lock();
}

async function onSelectChange(request_id, status) {
  lock("Updating…");
  const payload = { request_id, status };
  const { data, error } = await server("POST", "/api/request/status", payload);
  if (error) {
    console.error("Error updating the request's status:", error.message);
  } else {
    console.log("Updated the request's status:", data);

    // Update the view
    adminRequestsRef.value.forEach((item) => {
      if (item.id === request_id) {
        item.res_status = status;
      }
    });
  }
  lock();
}
</script>
