import { Fragment, h } from "vue";

export const renderInvestmentName = (invt) =>
  h(Fragment, [
    h("span", { class: "faded" }, invt.entity_name),
    h(
      "span",
      {},
      `${invt.invt_name} (${invt.invt_shares || invt.invt_shares_dm} shs)`
    ),
  ]);
