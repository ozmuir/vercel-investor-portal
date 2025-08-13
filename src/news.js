import { Fragment, h } from "vue";
import { NAME_OT, NAME_EI } from "./variables.js";

const p = (...its) => h("p", its);

export default [
  {
    date: "2025-08-12T11:00:00.000Z",
    title: "Summer 2025 Consolidation Update.",
    body: h(Fragment, [
      p(
        "Dear Investors,",
        h("br"),
        "As you may know, Orthogonal Thinker, Inc. has announced plans to acquire and consolidate Ei.Ventures, Inc., our majority-owned subsidiary, into Orthogonal. Here is the official press release: ",
        h(
          "a",
          {
            class: "underline",
            href: "https://www.newsfilecorp.com/release/262252/",
            target: "_blank",
          },
          "Orthogonal Thinker to Acquire Ei.Ventures, Unifying Vision Across Consciousness, Wellness, and AI"
        )
      ),
      p("Here’s where things stand:"),
      h("ul", [
        h("li", [
          h("b", "Cap Table & Legal Status"),
          " – We are working closely with securities counsel to verify every Ei.Ventures share as we consolidate into Orthogonal Thinker, Inc. Once verification is complete, DRS statements will be hosted with Endeavor Trust. Until then, you can confirm your holdings through the Orthogonal Investor Portal.",
        ]),
        h("li", [
          h("b", "Liquidity Timeline"),
          " – We are targeting the close of this transaction by the end of Q1 2026. Any liquidity events will be communicated promptly once timing and compliance are finalized.",
        ]),
        h("li", [
          h("b", "Valuation"),
          " – Your final exchange ratio—and exact value—will be detailed in the formal offer documents this fall. We intend to provide a premium over relative valuation, aligning all shareholders for long-term growth.",
        ]),
        h("li", [
          h("b", "Next Action"),
          " – No action is required at this time. You will receive formal transaction documents in October 2025 with timelines, instructions, and the final exchange ratio.",
        ]),
      ]),
      p(
        "We appreciate your continued trust and patience as we complete this important step in building a stronger, more unified company. Our focus remains on executing with precision, protecting shareholder interests, and positioning Orthogonal for sustained success in the years ahead."
      ),
    ]),
  },
  {
    date: "2025-08-01T12:30:00.000Z",
    title: "Orthogonal Thinker Investments added to the Portal.",
    body: h(Fragment, [
      p(
        "We've added Orthogonal Thinker investments to the Portal. You can now access and review your investments across both entities."
      ),
      p(
        "We’re actively responding to all investor inquiries. If there’s a delay, please know we’re taking the extra time to verify all data privately and securely—ensuring no sensitive information is ever visible to the wrong party."
      ),
      p(
        "Everything is safe. Thank you for your trust and patience as we grow this together."
      ),
    ]),
  },
  {
    date: "2025-07-08T19:20:33.277Z",
    title: `Welcome to the ${NAME_OT} and ${NAME_EI} Investor Portal!`,
    body: h(Fragment, [
      p("You can now:"),
      h("ul", [
        h("li", "View and verify your investment details"),
        h("li", "Upload supporting documents securely"),
        h("li", "Submit support requests for any discrepancies"),
      ]),
      p("Please explore the options below to get started."),
      p(
        "This is an early-stage rollout, and you may notice occasional bugs or missing data. Response times may be limited as we continue refining the experience."
      ),
      p("Thank you for being part of this journey."),
    ]),
  },
];
