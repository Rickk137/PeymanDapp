module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      cta: '#FEC004',
      input: '#2274A5',
      tradingLong: '#17C3B2',
      tradingShort: '#D74E09',
      white: '#E9EAE9',
      black: '#000000',
      overlay: '#707070',
      daapBackground: '#191919',
      warningRed: '#A52222',

      gray: {
        100: '#686868',
        200: '#575757',
        300: '#383838',
      },
    },
  },
  variants: {
    opacity: ({ after }) => after(['disabled']),
  },
  plugins: [],
};
