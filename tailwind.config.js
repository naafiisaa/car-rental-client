module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myText: '#dce2ef',
        myBackground: '#080c17',
        myPrimary: '#8fa5e5',
        mySecondary: '#14318a',
        myAccent: '#3564f3',
      
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 15s linear infinite",
      },
    },
  },
  plugins: [],

 daisyui: {
    themes: [
      {
        light: {
          primary: "#1a3070",
          secondary: "#7592eb",
          accent: "#0c3bca",
          neutral: "#141e39",
          "base-100": "#e8ecf7",
        },
        dark: {
          primary: "#8fa5e5",
          secondary: "#14318a",
          accent: "#3564f3",
          neutral: "#141e39",
          "base-100": "#080c17",
        },
      },
    ],
  },
};


// // tailwind.config.js
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "var(--primary)",
//         secondary: "var(--secondary)",
//         accent: "var(--accent)",
//         text: "var(--text)",
//         background: "var(--background)",
//       },
//     },
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         light: {
//           primary1: "var(--primary)",
//           secondary1: "var(--secondary)",
//           accent: "var(--accent)",
//           neutral: "var(--background)",
//           "base-100": "var(--background)",
//           info: "#2094f3",
//           success: "#009485",
//           warning: "#ff9900",
//           error: "#ff5724",
//         },
//       },
//       {
//         dark: {
//           primary1: "var(--primary)",
//           secondary1: "var(--secondary)",
//           accent1: "var(--accent)",
//           neutral1: "var(--background)",
//           "base-100": "var(--background)",
//           info: "#2094f3",
//           success: "#009485",
//           warning: "#ff9900",
//           error: "#ff5724",
//         },
//       },
//     ],
//   },
// };
