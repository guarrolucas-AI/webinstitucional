const config = {
  plugins: {
    "@tailwindcss/postcss":{
      theme: {
        extend: {
          fontFamily: {
            gotham: ['var(--font-gotham)', 'sans-serif'],
            intel: ['var(--font-intel)', 'sans-serif'],
          },
        },
      },
    },
  }
};

export default config;
