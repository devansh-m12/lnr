import type { Config } from 'tailwindcss';
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Dark mode specific colors
        dark: {
          // Background variations
          bg: {
            DEFAULT: '#121212',
            secondary: '#1E1E1E',
            tertiary: '#2D2D2D',
          },
          // Text variations
          text: {
            primary: '#FFFFFF',
            secondary: '#E0E0E0',
            tertiary: '#BDBDBD',
            muted: '#757575',
          },
          // Brand colors with dark mode variants
          brand: {
            primary: {
              DEFAULT: '#2563EB',
              hover: '#1D4ED8',
              muted: '#1E40AF',
            },
            secondary: {
              DEFAULT: '#4F46E5',
              hover: '#4338CA',
              muted: '#3730A3',
            },
          },
          // Accent colors
          accent: {
            purple: {
              DEFAULT: '#8B5CF6',
              hover: '#7C3AED',
              muted: '#6D28D9',
            },
            blue: {
              DEFAULT: '#3B82F6',
              hover: '#2563EB',
              muted: '#1D4ED8',
            },
            green: {
              DEFAULT: '#10B981',
              hover: '#059669',
              muted: '#047857',
            },
            red: {
              DEFAULT: '#EF4444',
              hover: '#DC2626',
              muted: '#B91C1C',
            },
            yellow: {
              DEFAULT: '#F59E0B',
              hover: '#D97706',
              muted: '#B45309',
            },
          },
          // Surface colors for different elevations
          surface: {
            DEFAULT: '#1E1E1E',
            raised: '#2D2D2D',
            overlay: '#383838',
          },
          // Border colors
          border: {
            DEFAULT: '#2D2D2D',
            hover: '#404040',
            muted: '#1E1E1E',
          },
          // Status colors
          status: {
            success: {
              DEFAULT: '#10B981',
              hover: '#059669',
              foreground: '#ECFDF5',
            },
            error: {
              DEFAULT: '#EF4444',
              hover: '#DC2626',
              foreground: '#FEF2F2',
            },
            warning: {
              DEFAULT: '#F59E0B',
              hover: '#D97706',
              foreground: '#FFFBEB',
            },
            info: {
              DEFAULT: '#3B82F6',
              hover: '#2563EB',
              foreground: '#EFF6FF',
            },
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-4px)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        aurora: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.2) rotate(45deg)' },
        },
        'subtle-drift': {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.05) translate(1%, 1%)' },
        },
        'matrix-fade': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-5px)',
          },
          '50%': {
            opacity: '0.5',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        float: 'float 6s ease-in-out infinite',
        aurora: 'aurora 15s ease infinite',
        'aurora-delayed': 'aurora 15s ease infinite 5s',
        'subtle-drift': 'subtle-drift 20s ease-in-out infinite',
        'subtle-drift-delayed': 'subtle-drift 20s ease-in-out infinite 10s',
        'matrix-fade': 'matrix-fade 0.5s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), addVariablesForColors],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ':root': newVars,
  });
}

export default config;
