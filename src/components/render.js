import { NTooltip } from "naive-ui";
import { Fragment, h } from "vue";
import dealmakerIconSrc from "../assets/dealmaker-icon.svg";

export const renderDealmaker = () =>
  h(
    NTooltip,
    { trigger: "hover" },
    {
      trigger: () =>
        h("img", {
          src: dealmakerIconSrc,
          width: "128",
          height: "128",
          alt: "DealMaker Icon",

          class: "inline",
          style: "width: 1em; height: 1em",
        }),
      default: () => "According to Dealmaker",
    }
  );

export const renderInvestmentName = (invt) =>
  h(Fragment, [
    h("span", { class: "muted" }, invt.entity_name),
    h(
      "div",
      {},
      // `${invt.invt_name} (${invt.invt_shares || invt.invt_shares_dm} shs)`
      invt.invt_name,
      " (",
      ...(invt.invt_shares
        ? [`${invt.invt_shares} shs`]
        : invt.invt_shares_dm
        ? [`${invt.invt_shares_dm} shs `, renderDealmaker()]
        : []),
      ")"
    ),
  ]);
