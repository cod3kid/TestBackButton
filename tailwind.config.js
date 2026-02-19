/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./App.jsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6539b5',
        'text-light': '#000000',
        'text-dark': '#ffffff',
        'bg-light': '#F9FAFC',
        'bg-dark': '#212231',
        'gray-light': '#FFFFFF',
        'gray-dark': '#2c334f',
        'border-light': '#d4d4d4',
        'border-dark': '#2c334f',
      },
    },
  },
  plugins: [],
};
