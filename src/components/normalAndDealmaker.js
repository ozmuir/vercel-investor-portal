import { NTooltip } from "naive-ui";
import { h } from "vue";
import dealmakerIconSrc from "../assets/dealmaker-icon.svg";

export const normalAndDealmaker = ([item1, item2]) =>
  h(
    "div",
    { class: "flex-col gap-1" },
    [
      [item1, null],
      [
        item2,
        {
          src: dealmakerIconSrc,
          width: "128",
          height: "128",
          alt: "DealMaker Logo",
          style: "width: 1em; height: 1em",
        },
      ],
    ]
      .filter((it) => !!it[0])
      .map(([name, imgProps]) =>
        h("div", [
          imgProps
            ? h(
                NTooltip,
                { trigger: "hover" },
                {
                  trigger: () => h("img", { ...imgProps, class: "inline" }),
                  default: () => "According to Dealmaker",
                }
              )
            : null,
          h("span", { class: "inline" }, name),
        ])
      )
  );
