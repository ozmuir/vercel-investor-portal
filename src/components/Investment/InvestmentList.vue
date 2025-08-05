<script setup>
defineOptions({ name: "C_Investments" });

import { IconRequest } from "../../components/icons.js";
import { NEmpty, NTable } from "naive-ui";
import { h, onMounted } from "vue";
import ButtonLink2 from "../../components/Button/ButtonLink2.vue";
import CopyButton from "../../components/Button/CopyButton.vue";
import Ellipsis from "../../components/Ellipsis.vue";
import InfoPopover from "../../components/InfoPopover.vue";
// import InvestmentMeta from "../../components/Investment/InvestmentMeta.vue";
import Loader from "../../components/Loader.vue";
import TableCells from "../../components/TableCells.vue";
import TableLabels from "../../components/TableLabels.vue";
import TableSeparator from "../../components/TableSeparator.vue";
import { normalAndDealmaker } from "../../components/normalAndDealmaker.js";
import messages from "../../messages.json";
import { ROUTE_REQUEST_NEW } from "../../routing";
import {
  investmentsRef,
  investmentsLoadingRef,
  investmentsLoad,
} from "../../state/investments";
import $table from "../../styles/table.module.scss";
import {
  SHARE_PRICE_EI_VENTURES,
  SHARE_PRICE_ORTHOGONAL,
} from "../../variables.js";

const labels = [
  messages.investment.holder_name,
  messages.investment.holder_address,
  messages.investment.amount_paid,
  messages.investment.amount_purchased,
  // "",
];

const pickers = [
  (invt) => normalAndDealmaker([invt.holder_name, invt.holder_name_dm]),
  (invt) => normalAndDealmaker([invt.holder_address, invt.holder_address_dm]),
  (invt) =>
    normalAndDealmaker([
      invt.invt_shares
        ? (
            (invt.entity_name === "Ei.Ventures, Inc."
              ? SHARE_PRICE_EI_VENTURES
              : invt.entity_name === "Orthogonal Thinker, Inc."
              ? SHARE_PRICE_ORTHOGONAL
              : 0) * invt.invt_shares
          ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : null,
      invt.invt_shares_dm
        ? (
            (invt.entity_name === "Ei.Ventures, Inc."
              ? SHARE_PRICE_EI_VENTURES
              : invt.entity_name === "Orthogonal Thinker, Inc."
              ? SHARE_PRICE_ORTHOGONAL
              : 0) * invt.invt_shares_dm
          ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : null,
    ]),
  (invt) =>
    normalAndDealmaker([
      invt.invt_shares?.toLocaleString("en-US"),
      invt.invt_shares_dm?.toLocaleString("en-US"),
    ]),
  // (investment) => h(InfoPopover, () => h(InvestmentMeta, { investment })),
];

onMounted(() => {
  investmentsLoad();
});
</script>

<template>
  <div v-if="investmentsLoadingRef" class="flex-line">
    {{ messages.progress.loading }} <Loader type="pulse" />
  </div>
  <div v-else>
    <div v-if="investmentsRef.length" :class="$table.table_container">
      <NTable :bordered="true" :single-line="true" :class="$table.table">
        <thead>
          <tr>
            <TableLabels :labels="labels" />
          </tr>
        </thead>
        <tbody>
          <template v-for="investment in investmentsRef" :key="investment.id">
            <tr>
              <td :colspan="labels.length">
                <div style="display: flex; justify-content: space-between">
                  <div>
                    <!-- <span class="inline">{{ messages.investment.name }}:</span> -->
                    <!-- <b class="inline">{{ investment.entity_name }} {{ investment.invt_name }}</b> -->
                    {{ investment.entity_name }}
                    <br />
                    {{ investment.invt_name }}
                  </div>
                  <div class="text-small faded">
                    <span class="inline valign-middle">ID: </span>
                    <b class="inline valign-middle">
                      <Ellipsis class="inline valign-middle">
                        {{ investment.id }}
                      </Ellipsis>
                    </b>
                    <CopyButton
                      class="inline valign-middle"
                      :text="investment.id"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <TableCells
                :contents="investment"
                :labels="labels"
                :pickers="pickers"
              />
            </tr>
            <TableSeparator />
          </template>
        </tbody>
      </NTable>
    </div>
    <template v-else>
      <NEmpty :description="messages.empty.investments" class="empty" />
      <ButtonLink2
        :to="{ name: ROUTE_REQUEST_NEW }"
        :Icon="IconRequest"
        :content="messages.action.request_a_new"
      />
    </template>
  </div>
</template>
