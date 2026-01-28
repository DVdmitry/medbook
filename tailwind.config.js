/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary - Deep Ocean Blue (Medical Trust)
        primary: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcdcff',
          300: '#8ec7ff',
          400: '#59a6ff',
          500: '#3381ff',
          600: '#1a5ff7',
          700: '#144ae3',
          800: '#173db8',
          900: '#193891',
          950: '#142358',
        },
        // Accent - Vibrant Teal (Health & Vitality)
        accent: {
          50: '#edfcf9',
          100: '#d2f7f0',
          200: '#a9ede3',
          300: '#72ddd1',
          400: '#3ac5b9',
          500: '#21a99f',
          600: '#178883',
          700: '#176d6b',
          800: '#175756',
          900: '#174948',
          950: '#072b2b',
        },
        // Success - Fresh Green
        success: {
          50: '#f0fdf5',
          100: '#dcfce8',
          200: '#bbf7d1',
          300: '#86efad',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803c',
          800: '#166533',
          900: '#14532b',
          950: '#052e14',
        },
        // Warning - Warm Amber
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Error - Refined Red
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // Neutral - Refined Slate (better for dark mode)
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      backgroundImage: {
        // Gradient Mesh Backgrounds
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-light': 'radial-gradient(at 40% 20%, rgb(59, 130, 246, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(34, 197, 94, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgb(168, 85, 247, 0.1) 0px, transparent 50%)',
        'mesh-dark': 'radial-gradient(at 40% 20%, rgb(59, 130, 246, 0.2) 0px, transparent 50%), radial-gradient(at 80% 0%, rgb(34, 197, 94, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgb(168, 85, 247, 0.15) 0px, transparent 50%)',
        'hero-gradient': 'linear-gradient(135deg, #1a5ff7 0%, #21a99f 50%, #3ac5b9 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #142358 0%, #072b2b 50%, #174948 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      boxShadow: {
        // Soft shadows for depth
        'soft-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        'soft': '0 4px 16px -4px rgba(0, 0, 0, 0.08), 0 2px 8px -4px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 8px 24px -6px rgba(0, 0, 0, 0.1), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 16px 48px -12px rgba(0, 0, 0, 0.12), 0 8px 24px -8px rgba(0, 0, 0, 0.06)',
        'soft-xl': '0 24px 64px -16px rgba(0, 0, 0, 0.15), 0 12px 32px -8px rgba(0, 0, 0, 0.08)',
        // Glow shadows for interactive elements
        'glow-primary': '0 0 20px rgba(26, 95, 247, 0.3), 0 0 40px rgba(26, 95, 247, 0.15)',
        'glow-accent': '0 0 20px rgba(58, 197, 185, 0.3), 0 0 40px rgba(58, 197, 185, 0.15)',
        'glow-success': '0 0 20px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.15)',
        // Inner shadows for inset effect
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        // Dark mode shadows
        'dark-soft': '0 4px 16px -4px rgba(0, 0, 0, 0.4), 0 2px 8px -4px rgba(0, 0, 0, 0.3)',
        'dark-glow': '0 0 30px rgba(59, 130, 246, 0.2)',
      },
      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        // Continuous animations
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        // Micro-interactions
        'wiggle': 'wiggle 0.5s ease-in-out',
        'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1)',
        // Progress animations
        'progress': 'progress 1s ease-out',
        'checkmark': 'checkmark 0.5s ease-out forwards',
        // Skeleton loading
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width, 100%)' },
        },
        checkmark: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
        skeleton: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
}
