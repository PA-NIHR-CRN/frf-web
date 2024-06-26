/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-primary)'],
    },
    // https://design-system.service.gov.uk/styles/spacing/
    spacing: {
      0: '0',
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '30px',
      7: '40px',
      8: '50px',
      9: '60px',
    },
    // https://design-system.service.gov.uk/styles/typography/
    fontSize: {
      xs: ['.875rem', '1.42'],
      sm: ['1rem', '1.25'],
      base: ['1.1875rem', '1.31'],
      lg: ['1.5rem', '1.25'],
    },
    colors: {
      text: 'var(--text-grey)',
      black: '#000000',
      white: '#ffffff',
      darkGrey: 'var(--dark-grey)',
      red: 'var(--red)',
      aqua: {
        100: 'var(--colour-aqua-100)',
        80: 'var(--colour-aqua-80)',
        60: 'var(--colour-aqua-60)',
        40: 'var(--colour-aqua-40)',
        20: 'var(--colour-aqua-20)',
      },
      coral: {
        140: 'var(--colour-coral-140)',
        120: 'var(--colour-coral-120)',
        100: 'var(--colour-coral-100)',
        80: 'var(--colour-coral-80)',
        60: 'var(--colour-coral-60)',
        40: 'var(--colour-coral-40)',
        20: 'var(--colour-coral-20)',
      },
      green: {
        140: 'var(--colour-green-140)',
        120: 'var(--colour-green-120)',
        100: 'var(--colour-green-100)',
        80: 'var(--colour-green-80)',
        60: 'var(--colour-green-60)',
        40: 'var(--colour-green-40)',
        20: 'var(--colour-green-20)',
      },
      grey: {
        120: 'var(--colour-grey-120)',
        100: 'var(--colour-grey-100)',
        80: 'var(--colour-grey-80)',
        50: 'var(--colour-grey-50)',
        40: 'var(--colour-grey-40)',
        60: 'var(--colour-grey-60)',
        30: 'var(--colour-grey-30)',
        20: 'var(--colour-grey-20)',
        10: 'var(--colour-grey-10)',
        5: 'var(--colour-grey-5)',
      },
      navy: {
        140: 'var(--colour-navy-140)',
        120: 'var(--colour-navy-120)',
        100: 'var(--colour-navy-100)',
        80: 'var(--colour-navy-80)',
        60: 'var(--colour-navy-60)',
        40: 'var(--colour-navy-40)',
        20: 'var(--colour-navy-20)',
      },
      orange: {
        100: 'var(--colour-orange-100)',
        80: 'var(--colour-orange-80)',
        60: 'var(--colour-orange-60)',
        40: 'var(--colour-orange-40)',
        20: 'var(--colour-orange-20)',
      },
      purple: {
        100: 'var(--colour-purple-100)',
        80: 'var(--colour-purple-80)',
        60: 'var(--colour-purple-60)',
        40: 'var(--colour-purple-40)',
        20: 'var(--colour-purple-20)',
      },
      yellow: {
        140: 'var(--colour-yellow-140)',
        120: 'var(--colour-yellow-120)',
        100: 'var(--colour-yellow-100)',
        80: 'var(--colour-yellow-80)',
        60: 'var(--colour-yellow-60)',
        40: 'var(--colour-yellow-40)',
        20: 'var(--colour-yellow-20)',
      },
    },
    extend: {},
  },
  plugins: [],
}
