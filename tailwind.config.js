/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./content/**/*.md",
    "./static/js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base backgrounds
        'light-bg': '#fcfcfd',
        'dark-bg': '#161e32',
        // Text + links
        'light-text-primary': '#374151',
        'light-text-secondary': '#4b5563',
        'light-text-accent': '#00a3f1',
        'light-link': '#3b82f6',
        'dark-text-primary': '#cbd5e1',
        'dark-text-secondary': '#a1a1aa',
        'dark-text-accent': '#60a5fa',
        'dark-link': '#70acf6',
        // Borders
        'light-border': '#e5e7eb',
        'dark-border': '#334155',
        'dark-header-footer-border': '#1f2937',
        // Layout: header/footer backgrounds
        'dark-header-bg': '#0f172acc',
        // Catalogue / cards
        'light-catalogue-bg': '#fefefe',
        'light-catalogue-item-bg': '#ffffff',
        'dark-catalogue-bg': '#1b2638',
        'dark-catalogue-item-bg': '#1b2537',
        // Code blocks and inline code
        'light-code-bg': 'rgba(27,31,35,0.05)',
        'light-code-inline-bg': '#1b1f230d',
        'dark-code-bg': '#0f162b',
        'dark-code-inline-bg': '#2d2d2d',
        // Blockquotes
        'light-blockquote-bg': '#eff6ff',
        'light-blockquote-border': '#3b82f6',
        'dark-blockquote-bg': '#0f172a',
        'dark-blockquote-border': '#334155',
        // Timeline accents
        'light-timeline-bg': '#00a3f1',
        'dark-timeline-bg': '#3b82f6',
        // CV: current badge
        'light-current-badge-bg': 'rgba(34,197,94,0.2)',
        'light-current-badge-text': '#166534',
        'dark-current-badge-bg': 'rgb(20 83 45)',
        'dark-current-badge-text': '#73ffa9',
      },
      fontFamily: {
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem', 
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        'body': '1.125rem'
      },
      lineHeight: {
        'relaxed': '1.6'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '140': '35rem',
        '200': '50rem',
        '250': '62.5rem'
      },
      maxWidth: {
        'content': '56rem',
        'catalogue-image': '250px'
      },
      minHeight: {
        'catalogue-card': '140px',
        'catalogue-image-mobile': '200px'
      },
      height: {
        'book-cover': '380px',
        'book-cover-md': '450px', 
        'book-cover-sm': '500px'
      },
      width: {
        'catalogue-image': '250px'
      },
      backdropBlur: {
        'header': '6px'
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-dark-hover': '0 2px 4px rgba(0, 0, 0, .4), 0 4px 8px rgba(0, 0, 0, .2)',
        'button-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'button-secondary-hover': '0 4px 8px rgba(0, 0, 0, 0.1)'
      },
      transitionDuration: {
        '150': '150ms'
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  plugins: []
}
