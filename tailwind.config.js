const { omit } = require('lodash')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
const VITE_FONT_SANS = process.env.VITE_FONT_SANS

const sizeStep = (
  startSize = 0.25,
  stepSize = 0.25,
  unit = 'rem',
  step = 1,
  startStep = 1,
  lastStep = 96
) => {
  return omit(
    Array.from({ length: lastStep - startStep }, (_, i) => i + startStep + 1).reduce(
      (res, currentStep) => {
        return {
          ...res,
          current: res?.current + step,
          size: res?.size + stepSize,
          [currentStep]: `${res.size + stepSize}${unit}`,
        }
      },
      {
        current: startStep,
        size: startSize,
        [startStep]: `${startSize}${unit}`,
      }
    ),
    ['current', 'size']
  )
}

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{html,jsx,ts,tsx,js,css}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    borderWidth: {
      ...defaultTheme.borderWidth,
    },
    minWidth: {
      ...sizeStep(0.25, 0.25, 'rem', 1, 1, 96),
      ...defaultTheme.minWidth,
    },
    screens: {
      xs: '0px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        since: 'var(--text-since)',
        red: 'var(--red)',
        gray: 'var(--gray)',
        grey: 'var(--grey)',
        'greeen-1': 'var(--green-1)',
        cyan: 'var(--cyan)',
        'light-blue': 'var(--light-blue)',
        'sub-light-blue': 'var(--sub-light-blue)',
        'light-gray': 'var(--bg-light-gray)',
        'light-background': 'var(--bg-light)',
        'light-background-1': 'var(--bg-light-1)',
        'light-background-2': 'var(--bg-light-2)',
        'main-background': 'var(--bg-main)',
        accents: 'var(--accents-0)',
        'accents-1': 'var(--accents-1)',
        'accents-2': 'var(--accents-2)',
        'green-button': 'var(--text-since)',
        'main-black': 'var(--main-black)',

        'light-green-4': 'var(--light-green-4)',
        'light-green-3': 'var(--light-green-3)',
        'light-green-2': 'var(--light-green-2)',
        'light-green-1': 'var(--light-green-1)',

        'dark-green-4': 'var(--dark-green-4)',
        'dark-green-3': 'var(--dark-green-3)',
        'dark-green-2': 'var(--dark-green-2)',
        'dark-green-1': 'var(--dark-green-1)',

        theme: 'var(--theme)',
        theme_hover: 'var(--theme-hover)',
        theme_active: 'var(--theme-active)',
        theme_light_orange: 'var(--theme_light_orange)',
        theme_orange: 'var(--theme_orange)',
        theme_blue: 'var(--theme_blue)',
        theme_red: 'var(--theme_red)',
        logo: 'var(--logo)',
      },
      flex: {
        '1/2': '0 0 calc(50% - 10px)',
        '1/3': '0 0 calc(33.333% - 10px)',
      },
      boxShadow: {
        base: '0px 4px 10px 4px var(--box-shadow)',
        lite: '0px 4px 10px var(--box-shadow-lite)',
        table: '0px 4px 10px 4px var(--box-shadow-table)',
      },
      borderColor: {
        active: 'var(--boder-active)',
        primary: 'var(--gray)',
      },
      keyframes: {
        'scale-in': {
          '0%': { opacity: 0, transform: 'scale(0)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: `translateX(calc(100% + 1rem))` },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'scale-in': 'scale-in 0.2s ease-in-out',
        'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
    fontFamily: {
      sans: [VITE_FONT_SANS],
      serif: [VITE_FONT_SANS],
    },
  },
  variants: {},
  corePlugins: {
    preflight: false, // AntD and Tailwind: fix CSS conflicts!
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    // require('tailwind-scrollbar'),
    require('tailwindcss-radix'),
    plugin(({ addVariant }) => {
      addVariant('mac', '.mac &')
      addVariant('windows', '.windows &')
      addVariant('ios', '.ios &')
    }),
  ],
}
