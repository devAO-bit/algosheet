/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: { DEFAULT: '#0d0d0f', 2: '#141417', 3: '#1c1c21' },
        surface: { DEFAULT: '#1f1f25', 2: '#27272e', 3: '#2f2f38' },
        tx: { DEFAULT: '#e8e8ed', 2: '#8888a0', 3: '#55556a' },
        accent: { DEFAULT: '#6366f1', 2: '#818cf8', 3: '#a5b4fc' },
        ok: { DEFAULT: '#22c55e' },
        warn: { DEFAULT: '#f59e0b' },
        danger: { DEFAULT: '#ef4444' },
      },
      animation: {
        'fade-in': 'fadeIn 0.18s ease-out',
        'slide-up': 'slideUp 0.22s ease-out',
        'skeleton': 'skeleton 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        skeleton: { '0%,100%': { opacity: 0.35 }, '50%': { opacity: 0.7 } },
      },
    },
  },
  plugins: [],
}
