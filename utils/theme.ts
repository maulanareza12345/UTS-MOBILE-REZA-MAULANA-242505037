// utils/theme.ts
// Desain sistem modern terinspirasi Vercel & Tailwind UI (Clean, Minimalist, High Contrast)

export interface ThemeColors {
  isDark: boolean;
  background: string;
  surface: string;
  surfaceSubtle: string;
  card: string;
  cardBorder: string;
  cardBorderHover: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  success: string;
  successBg: string;
  warning: string;
  warningBg: string;
  danger: string;
  dangerBg: string;
  tagBg: string;
  tagBorder: string;
  progressTrack: string;
  shadowColor: string;
  headerBorder: string;
  tabActiveBg: string;
}

export const lightTheme: ThemeColors = {
  isDark: false,
  background: '#f8fafc', // Slate 50
  surface: '#ffffff',
  surfaceSubtle: '#f1f5f9', // Slate 100
  card: '#ffffff',
  cardBorder: '#e2e8f0', // Slate 200
  cardBorderHover: '#cbd5e1',
  textPrimary: '#0f172a', // Slate 900
  textSecondary: '#334155', // Slate 700
  textMuted: '#64748b', // Slate 500
  primary: '#2563eb', // Blue 600
  primaryLight: '#eff6ff', // Blue 50
  primaryDark: '#1d4ed8', // Blue 700
  accent: '#4f46e5', // Indigo 600
  accentLight: '#eef2ff',
  success: '#10b981', // Emerald 500
  successBg: '#ecfdf5',
  warning: '#f59e0b', // Amber 500
  warningBg: '#fffbeb',
  danger: '#ef4444', // Red 500
  dangerBg: '#fef2f2',
  tagBg: '#f1f5f9',
  tagBorder: '#e2e8f0',
  progressTrack: '#e2e8f0',
  shadowColor: '#0f172a',
  headerBorder: '#e2e8f0',
  tabActiveBg: '#ffffff',
};

export const darkTheme: ThemeColors = {
  isDark: true,
  background: '#030712', // Zinc 950 (Vercel Midnight)
  surface: '#0b0f19', // Elevated surface
  surfaceSubtle: '#111827', // Slate 900
  card: '#0d1322', // Card background
  cardBorder: '#1e293b', // Slate 800
  cardBorderHover: '#334155',
  textPrimary: '#f8fafc', // Slate 50
  textSecondary: '#cbd5e1', // Slate 300
  textMuted: '#94a3b8', // Slate 400
  primary: '#3b82f6', // Blue 500
  primaryLight: '#172554', // Blue 950
  primaryDark: '#60a5fa',
  accent: '#6366f1',
  accentLight: '#1e1b4b',
  success: '#34d399',
  successBg: '#064e3b',
  warning: '#fbbf24',
  warningBg: '#78350f',
  danger: '#f87171',
  dangerBg: '#7f1d1d',
  tagBg: '#111827',
  tagBorder: '#1f2937',
  progressTrack: '#1f2937',
  shadowColor: '#000000',
  headerBorder: '#1f2937',
  tabActiveBg: '#1e293b',
};
