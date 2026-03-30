import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'cat-grid',
    'brand-grid', 
    'model-grid',
    'hero-grid',
    'page-pad',
    'hero-illustration',
    'card-hover',
    'contact-banner',
    'contact-banner-msg',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
