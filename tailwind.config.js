/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
primary: '#5B4CFF',
        secondary: '#FF6B9D',
        accent: '#FFC837',
        surface: '#FFFFFF',
        background: '#2563EB',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'game': '0 8px 32px rgba(91, 76, 255, 0.15)',
        'celebration': '0 12px 48px rgba(255, 107, 157, 0.25)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      backgroundImage: {
        'gradient-game': 'linear-gradient(135deg, #5B4CFF 0%, #FF6B9D 100%)',
        'gradient-reward': 'linear-gradient(135deg, #FFC837 0%, #FF6B9D 100%)',
        'gradient-surface': 'linear-gradient(135deg, #FFFFFF 0%, #F0F4FF 100%)',
      },
      animation: {
        'bounce-gentle': 'bounce 1s infinite ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'confetti': 'confetti 0.6s ease-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}