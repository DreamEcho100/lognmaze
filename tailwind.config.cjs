/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Using modern `rgb`
        // 'theme-special-1': 'rgb(--color-theme-special-1) / <alpha-value>)',

        'theme-primary-bg-50':
          'rgb(var(--color-theme-primary-bg-50) / <alpha-value>)',
        'theme-primary-bg-100':
          'rgb(var(--color-theme-primary-bg-100) / <alpha-value>)',
        'theme-primary-bg-200':
          'rgb(var(--color-theme-primary-bg-200) / <alpha-value>)',
        'theme-primary-bg-300':
          'rgb(var(--color-theme-primary-bg-300) / <alpha-value>)',
        'theme-primary-bg-400':
          'rgb(var(--color-theme-primary-bg-400) / <alpha-value>)',
        'theme-primary-bg-500':
          'rgb(var(--color-theme-primary-bg-500) / <alpha-value>)',
        'theme-primary-bg-600':
          'rgb(var(--color-theme-primary-bg-600) / <alpha-value>)',
        'theme-primary-bg-700':
          'rgb(var(--color-theme-primary-bg-700) / <alpha-value>)',
        'theme-primary-bg-800':
          'rgb(var(--color-theme-primary-bg-800) / <alpha-value>)',
        'theme-primary-bg-900':
          'rgb(var(--color-theme-primary-bg-900) / <alpha-value>)',

        'theme-primary-text-50':
          'rgb(var(--color-theme-primary-text-50) / <alpha-value>)',
        'theme-primary-text-100':
          'rgb(var(--color-theme-primary-text-100) / <alpha-value>)',
        'theme-primary-text-200':
          'rgb(var(--color-theme-primary-text-200) / <alpha-value>)',
        'theme-primary-text-300':
          'rgb(var(--color-theme-primary-text-300) / <alpha-value>)',
        'theme-primary-text-400':
          'rgb(var(--color-theme-primary-text-400) / <alpha-value>)',
        'theme-primary-text-500':
          'rgb(var(--color-theme-primary-text-500) / <alpha-value>)',
        'theme-primary-text-600':
          'rgb(var(--color-theme-primary-text-600) / <alpha-value>)',
        'theme-primary-text-700':
          'rgb(var(--color-theme-primary-text-700) / <alpha-value>)',
        'theme-primary-text-800':
          'rgb(var(--color-theme-primary-text-800) / <alpha-value>)',
        'theme-primary-text-900':
          'rgb(var(--color-theme-primary-text-900) / <alpha-value>)',

        'theme-bg-50': 'rgb(var(--color-theme-bg-50) / <alpha-value>)',
        'theme-bg-100': 'rgb(var(--color-theme-bg-100) / <alpha-value>)',
        'theme-bg-200': 'rgb(var(--color-theme-bg-200) / <alpha-value>)',
        'theme-bg-300': 'rgb(var(--color-theme-bg-300) / <alpha-value>)',
        'theme-bg-400': 'rgb(var(--color-theme-bg-400) / <alpha-value>)',
        'theme-bg-500': 'rgb(var(--color-theme-bg-500) / <alpha-value>)',
        'theme-bg-600': 'rgb(var(--color-theme-bg-600) / <alpha-value>)',
        'theme-bg-700': 'rgb(var(--color-theme-bg-700) / <alpha-value>)',
        'theme-bg-800': 'rgb(var(--color-theme-bg-800) / <alpha-value>)',
        'theme-bg-900': 'rgb(var(--color-theme-bg-900) / <alpha-value>)',

        'theme-text-50': 'rgb(var(--color-theme-text-50) / <alpha-value>)',
        'theme-text-100': 'rgb(var(--color-theme-text-100) / <alpha-value>)',
        'theme-text-200': 'rgb(var(--color-theme-text-200) / <alpha-value>)',
        'theme-text-300': 'rgb(var(--color-theme-text-300) / <alpha-value>)',
        'theme-text-400': 'rgb(var(--color-theme-text-400) / <alpha-value>)',
        'theme-text-500': 'rgb(var(--color-theme-text-500) / <alpha-value>)',
        'theme-text-600': 'rgb(var(--color-theme-text-600) / <alpha-value>)',
        'theme-text-700': 'rgb(var(--color-theme-text-700) / <alpha-value>)',
        'theme-text-800': 'rgb(var(--color-theme-text-800) / <alpha-value>)',
        'theme-text-900': 'rgb(var(--color-theme-text-900) / <alpha-value>)',
      },
      spacing: {
        'primary-header': 'var(--primary-header-h)',
      },
      fontSize: {
        h1: 'var(--font-size-h1)',
        h2: 'var(--font-size-h2)',
        h3: 'var(--font-size-h3)',
        h4: 'var(--font-size-h4)',
        h5: 'var(--font-size-h5)',
        h6: 'var(--font-size-h6)',
      },
      maxWidth: {
        primary: 'var(--primary-max-w)',
      },
      minHeight: {
        'primary-screen': 'var(--primary-h-screen)',
      },
      /*
			typography: ({ theme }) => ({
        pink: {
          css: {
            '--tw-prose-body': theme('colors.pink[800]'),
            '--tw-prose-headings': theme('colors.pink[900]'),
            '--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': theme('colors.pink[900]'),
            '--tw-prose-bold': theme('colors.pink[900]'),
            '--tw-prose-counters': theme('colors.pink[600]'),
            '--tw-prose-bullets': theme('colors.pink[400]'),
            '--tw-prose-hr': theme('colors.pink[300]'),
            '--tw-prose-quotes': theme('colors.pink[900]'),
            '--tw-prose-quote-borders': theme('colors.pink[300]'),
            '--tw-prose-captions': theme('colors.pink[700]'),
            '--tw-prose-code': theme('colors.pink[900]'),
            '--tw-prose-pre-code': theme('colors.pink[100]'),
            '--tw-prose-pre-bg': theme('colors.pink[900]'),
            '--tw-prose-th-borders': theme('colors.pink[300]'),
            '--tw-prose-td-borders': theme('colors.pink[200]'),
            '--tw-prose-invert-body': theme('colors.pink[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.pink[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.pink[400]'),
            '--tw-prose-invert-bullets': theme('colors.pink[600]'),
            '--tw-prose-invert-hr': theme('colors.pink[700]'),
            '--tw-prose-invert-quotes': theme('colors.pink[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
            '--tw-prose-invert-captions': theme('colors.pink[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.pink[600]'),
            '--tw-prose-invert-td-borders': theme('colors.pink[700]'),
          },
        },
			}),
			*/
      /*
			typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
			},
			*/
    },
    // debugScreens: {
    //   position: ["bottom", "left"],
    //   style: {
    //     backgroundColor: "#C0FFEE",
    //     color: "black",
    //   },
    //   style: {
    //     backgroundColor: "#C0FFEE",
    //     color: "black",
    //   },
    //   selector: ".debug-screens",
    // },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
    },
    screens: {
      'xl-3-sm': '250px',
      // // => @media (min-width: 250px) { ... }
      'xl-2-sm': '400px',
      // // => @media (min-width: 400px) { ... }
      'xl-sm': '512px',
      // => @media (min-width: 512px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      // ...defaultTheme,

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    // https://github.com/jorenvanhee/tailwindcss-debug-screens
    // class="{{ devMode ? 'debug-screens' : '' }}"
    require('tailwindcss-debug-screens'),
    // https://github.com/praveenjuge/tailwindcss-brand-colors
    require('tailwindcss-brand-colors'),
    // https://github.com/tailwindlabs/tailwindcss-line-clamp
    require('@tailwindcss/line-clamp'),
    // https://tailwindcss.com/docs/typography-plugin
    // <article class="prose lg:prose-xl"></article>
    require('@tailwindcss/typography'),
    // https://github.com/mertasan/tailwindcss-variables
    // require('@mertasan/tailwindcss-variables'),
  ],
}

//
// tailwindcss-custom-forms
// https://github.com/tailwindlabs/tailwindcss-custom-forms
// https://tailwindcss-custom-forms.netlify.app/
//
// tailwindcss-accessibility
// https://github.com/jack-pallot/tailwindcss-accessibility
//
// tailwindcss-background-extended
// https://github.com/hacknug/tailwindcss-background-extended
//
// tailwindcss-blend-mode
// https://github.com/hacknug/tailwindcss-blend-mode
//
// tailwindcss-border-gradients
// https://github.com/cossssmin/tailwindcss-border-gradients
//
// tailwindcss-gradients
// https://github.com/benface/tailwindcss-gradients
//
//
// tailwindcss-border-styles
// https://github.com/log1x/tailwindcss-border-styles
//

// Animation
// https://tailwindcss.com/docs/animation
//
