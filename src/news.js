import { Fragment, h } from "vue";

const p = (it) => h("p", it);

export default [
  {
    date: "2025-07-08T19:20:33.277Z",
    title: "Welcome to the Ei.Ventures Investor Portal!",
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
