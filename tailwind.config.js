/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-20deg)" },
        },
        pulseSlow: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "wave-slow": "wave 1s infinite ease-in-out",
        "pulse-slow": "pulseSlow 2.5s infinite ease-in-out",
      },
    },
  },
};
