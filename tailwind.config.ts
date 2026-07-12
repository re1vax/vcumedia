import type { Config } from "tailwindcss";

/**
 * vcu media design tokens — derived from the brand reference (vcu-media.html).
 * Dark "night" ground, brand-yellow "ink" for text/borders, sticker-sheet cards.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#0e0e0a", // page ground
        "night-soft": "#17170f", // card surfaces
        ink: "#F6F1AC", // brand yellow — text, borders, fills
        khaki: "#aaa584", // muted copy
        pistachio: "#BFE3A0", // case accent 1
        lilac: "#CDB9F2", // case accent 2
        apricot: "#F2C9A0", // case accent 3
      },
      fontFamily: {
        display: ["var(--font-baloo)", "sans-serif"],
        body: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sticker: "22px",
      },
      boxShadow: {
        sticker: "6px 6px 0 0 #F6F1AC", // signature hard offset
        pop: "4px 4px 0 0 #F6F1AC",
        "pop-soft": "4px 4px 0 0 rgba(246,241,172,.3)",
        "focus-ink": "3px 3px 0 0 #F6F1AC",
      },
      maxWidth: {
        wrap: "1500px",
      },
    },
  },
  plugins: [],
};
export default config;
