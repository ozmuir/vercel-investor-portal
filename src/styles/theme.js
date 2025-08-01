// #26427e blue
// #ff0088 pink
// #7766ff purple
// #00ffee cyan

export const primaryColor = "#00ffee";

const style = document.createElement("style");
style.textContent = `

:root {
  font-size: calc(var(--font_size_factor) * (1vw + 1vh));
  --font_size_factor: 0.6;
}
@media screen and (max-width: 1280px) { :root { --font_size_factor: 0.7; } }
@media screen and (max-width: 1024px) { :root { --font_size_factor: 0.8; } }
@media screen and (max-width: 768px) { :root { --font_size_factor: 0.9; } }
@media screen and (max-width: 512px) { :root { --font_size_factor: 1; } }

  `;
document.head.appendChild(style);

// NOTE This does not updates on window resize!
const onerem = parseFloat(getComputedStyle(document.documentElement).fontSize);

// https://www.naiveui.com/en-US/light/docs/theme#use-theme-vars
export default {
  common: {
    baseColor: "#ffffff",
    primaryColor,
    // infoColor: "#2080f0",
    // successColor: "#18a058",
    // warningColor: "#f0a020",
    // errorColor: "#d03050",

    // NOT SURE IF THIS NEEDS TO BE IN PX...
    // fontSize: 1 * onerem + "px", // 14px
    // fontSizeMini: 0.8 * onerem + "px", // 12px
    // fontSizeTiny: 0.8 * onerem + "px", // 12px
    // fontSizeSmall: 0.9 * onerem + "px", // 14px
    // fontSizeMedium: 1 * onerem + "px", // 14px
    // fontSizeLarge: 1.1 * onerem + "px", // 15px
    // fontSizeHuge: 1.2 * onerem + "px", // 16px
    fontSize: "1rem", // 14px
    fontSizeMini: "0.8rem", // 12px
    fontSizeTiny: "0.8rem", // 12px
    fontSizeSmall: "0.9rem", // 14px
    fontSizeMedium: "1rem", // 14px
    fontSizeLarge: "1.1rem", // 15px
    fontSizeHuge: "1.2rem", // 16px

    lineHeight: "inherit",

    // MUST BE IN PX, else Naive-UI elements may collapse (for example NSelect dropdown list)
    heightMini: 1 * onerem + "px", // 16px
    heightTiny: 1.66 * onerem + "px", // 22px
    heightSmall: 2.33 * onerem + "px", // 28px
    heightMedium: 3.0 * onerem + "px", // 34px
    heightLarge: 3.5 * onerem + "px", // 40px
    heightHuge: 4.0 * onerem + "px", // 46px
  },
  BreadcrumbItem: {
    colorHover: "initial",
  },
};
