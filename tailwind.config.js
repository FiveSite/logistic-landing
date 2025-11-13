module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
