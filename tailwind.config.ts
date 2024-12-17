import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        shade: {
          '01': '#FFFFFF',
          '02': '#222222',
          '02-5': 'rgba(34, 34, 34, 0.05)',
          '02-30': 'rgba(34, 34, 34, 0.3)',
        },
        neutral: {
          '01': '#F7F7F7',
          '02': '#EBEBEB',
          '03': '#DDDDDD',
          '04': '#D3D3D3',
          '05': '#C2C2C2',
          '06': '#B0B0B0',
          '07': '#717171',
          '08': '#5E5E5E',
        },
        primary: {
          '01': '#F6475F',
          '02': '#FF385C',
        },
        error: {
          '01': '#FEF8F6',
          '02': '#C13515',
        },
        accent: {
          '01': '#F6D7DF',
          '02': '#D03660',
          discount: '#008A05',
          link: '#004CC4',
        },
        button: {
          '01': '#EB4C60',
          '02': '#D03661',
          '03': '#C72D64',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
