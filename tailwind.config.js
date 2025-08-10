// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
theme: {
  extend: {
    keyframes: {
      colors: {
 'text': 'var(--text)',
 'background': 'var(--background)',
 'primary': 'var(--primary)',
 'secondary': 'var(--secondary)',
 'accent': 'var(--accent)',
},

      marquee: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(-100%)' },
      },
    },
    animation: {
      marquee: 'marquee 15s linear infinite',
    },
  },
}
}
