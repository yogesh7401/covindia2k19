module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screen: {
      '3xl': '2000px'
    },
    extend: {},
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': "#3d5a80",
      'secondary': "#98c1d9",
      'light': "#e0fbfc",
      'tomato': "#ee6c4d",
      'dark': "#293241",
      'danger': '#ffedea'
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'primary': "#3d5a80",
      'secondary': "#98c1d9",
      'light': "#e0fbfc",
      'tomato': "#ee6c4d",
      'dark': "#293241",
      'danger': '#F32013'
    }),
    textColor: theme => ({
      ...theme('colors'),
      'primary': '#3d5a80',
      'secondary': '#98c1d9',
      'light': '#e0fbfc',
      'tomato': '#ee6c4d',
      'dark': '#293241',
      'danger': '#F32013'
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
