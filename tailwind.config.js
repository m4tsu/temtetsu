/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // colors: {
      //   border: 'hsl(var(--border))',
      //   input: 'hsl(var(--input))',
      //   ring: 'hsl(var(--ring))',
      //   background: 'hsl(var(--background))',
      //   foreground: 'hsl(var(--foreground))',
      //   primary: {
      //     DEFAULT: 'hsl(var(--primary))',
      //     foreground: 'hsl(var(--primary-foreground))',
      //   },
      //   secondary: {
      //     DEFAULT: 'hsl(var(--secondary))',
      //     foreground: 'hsl(var(--secondary-foreground))',
      //   },
      //   destructive: {
      //     DEFAULT: 'hsl(var(--destructive))',
      //     foreground: 'hsl(var(--destructive-foreground))',
      //   },
      //   muted: {
      //     DEFAULT: 'hsl(var(--muted))',
      //     foreground: 'hsl(var(--muted-foreground))',
      //   },
      //   accent: {
      //     DEFAULT: 'hsl(var(--accent))',
      //     foreground: 'hsl(var(--accent-foreground))',
      //   },
      //   popover: {
      //     DEFAULT: 'hsl(var(--popover))',
      //     foreground: 'hsl(var(--popover-foreground))',
      //   },
      //   card: {
      //     DEFAULT: 'hsl(var(--card))',
      //     foreground: 'hsl(var(--card-foreground))',
      //   },
      // },
      // borderRadius: {
      //   lg: 'var(--radius)',
      //   md: 'calc(var(--radius) - 2px)',
      //   sm: 'calc(var(--radius) - 4px)',
      // },
      // keyframes: {
      //   'accordion-down': {
      //     from: { height: 0 },
      //     to: { height: 'var(--radix-accordion-content-height)' },
      //   },
      //   'accordion-up': {
      //     from: { height: 'var(--radix-accordion-content-height)' },
      //     to: { height: 0 },
      //   },
      // },
      // animation: {
      //   'accordion-down': 'accordion-down 0.2s ease-out',
      //   'accordion-up': 'accordion-up 0.2s ease-out',
      // },
    },
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')],
  daisyui: {
    themes: [
      {
        tt: {
          primary: '#0077b6',
          secondary: '#f000b8',
          accent: '#1dcdbc',
          neutral: '#2b3440',
          'base-100': '#fcf9ff',
          info: '#3abff8',
          success: '#36d399',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
      'dark',
    ],
    // themes: ['cupcake', 'night'], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
  // theme https://colormagic.app/palette/qiP16WiSEPvlLeIOcV4t
}