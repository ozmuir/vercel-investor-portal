import { Fragment, h } from "vue";

const p = (it) => h("p", it);

export default [
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
    title: "Welcome to the Orthogonal Thinker and Ei.Ventures Investor Portal!",
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
