module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '512px',
      },
      maxHeight: {
        card: '20rem',
        guide: '30rem',
      },
      spacing: {
        'staff-height': '85px',
        'staff-width': '300px',
      },
    },
  },
  plugins: [],
};
