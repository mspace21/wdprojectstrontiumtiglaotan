module.exports = {
  darkMode: 'selector',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "// Include app folder in purge paths",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {
      keyframes: {
        expand: {
          '0%': { letterSpacing: '0px' },
          '100%': { letterSpacing: '8px'},
        },
        link: {
          '0%': { fontWeight: 100 },
          '100%': { fontWeight: 700 },
        },
        colors: {
          'background': '#1B1B1B',
          'foreground': '#F8FAFC',
          'primary': '#F1F1F1',
          'primary_foreground': '#505050',
          'secondary': '#F0F0FF',
          'secondary_foreground': '#171717',
          'muted': '#646464',
          'muted_foreground': '#DBDCDD',
        }
      },
    },
    animation: {
      expand: 'expand 6s ease-in forwards',
      link: 'link 0.1s ease-in forwards',  
    },
  },
  plugins: [nextui()],
};