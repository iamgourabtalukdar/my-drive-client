export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        color: "rgba(var(--text-color))",
        "sub-color": "rgba(var(--text-sub-color))",
        primary: "rgba(var(--primary-color))",
      },
      backgroundColor: {
        color: "rgba(var(--bg-color))",
        "sub-color": "rgba(var(--bg-sub-color))",
        "alt-sub-color": "rgba(var(--bg-alt-sub-color))",
        primary: "rgba(var(--primary-color))",
        "primary-dark": "rgba(var(--primary-color-dark))",
        hover: "rgba(var(--bg-hover-color))",
      },
      borderColor: {
        primary: "rgba(var(--primary-color))",
        color: "rgba(var(--text-color))",
      },
      boxShadow: {
        "primary-sm": "0 0 6px 1px rgba(var(--primary-color), 0.2)",
        "primary-md": "0 0 6px 1px rgba(var(--primary-color), 0.3)",
        "color-sm": "0 0 1px 1px rgba(var(--text-color), 0.1)",
        "color-md": "0 0 3px 1px rgba(var(--text-color), 0.2)",
        "color-lg": "0 0 6px 1px rgba(var(--text-color), 0.2)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
  darkMode: "class",
};
