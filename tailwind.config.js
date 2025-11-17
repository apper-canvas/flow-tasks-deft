/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        surface: '#ffffff',
        background: '#f8fafc'
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '32px'
      },
      animation: {
        'complete': 'complete 0.6s ease-out forwards',
        'lift': 'lift 0.15s ease-out forwards',
        'bounce-in': 'bounceIn 0.3s ease-out'
      },
      keyframes: {
        complete: {
          '0%': { opacity: '1', transform: 'translateX(0) scale(1)' },
          '50%': { opacity: '0.5', transform: 'translateX(8px) scale(0.98)' },
          '100%': { opacity: '0.6', transform: 'translateX(12px) scale(0.96)' }
        },
        lift: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-2px) scale(1.01)' }
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}