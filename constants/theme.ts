import { Platform } from 'react-native';

import { getAccentPalette, type AccentColorId } from '@/constants/appearance';

export const tintColorLight = '#0F8A6C';
export const tintColorDark = '#7AE7C0';

export type Palette = {
  text: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  card: string;
  tint: string;
  accent: string;
  muted: string;
  border: string;
  icon: string;
  success: string;
  warning: string;
  danger: string;
  bubbleUser: string;
  onBubbleUser: string;
  bubbleAssistant: string;
  onBubbleAssistant: string;
  tabBackground: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

type ThemeNeutralPalette = Omit<
  Palette,
  'tint' | 'accent' | 'bubbleUser' | 'onBubbleUser' | 'tabIconSelected'
>;

const brandLight: ThemeNeutralPalette = {
  text: '#172126',
  background: '#F4F7F4',
  surface: '#FCFDFC',
  surfaceAlt: '#E7EFEA',
  card: '#FFFFFF',
  muted: '#667874',
  border: '#D6E1DC',
  icon: '#8B989B',
  success: '#147D64',
  warning: '#A56A0D',
  danger: '#B64545',
  bubbleAssistant: '#EEF4F1',
  onBubbleAssistant: '#182320',
  tabBackground: '#F9FBFA',
  tabIconDefault: '#8B989B',
};

const brandDark: ThemeNeutralPalette = {
  text: '#EAF3EF',
  background: '#0F1614',
  surface: '#16201D',
  surfaceAlt: '#20302C',
  card: '#16201D',
  muted: '#9AADA8',
  border: '#2B3C38',
  icon: '#839793',
  success: '#63D9B1',
  warning: '#E6B35A',
  danger: '#F08A8A',
  bubbleAssistant: '#182320',
  onBubbleAssistant: '#EAF3EF',
  tabBackground: '#121A18',
  tabIconDefault: '#839793',
};

const oceanLight: ThemeNeutralPalette = {
  text: '#15222E',
  background: '#F3F7FB',
  surface: '#FBFDFF',
  surfaceAlt: '#E6EEF7',
  card: '#FFFFFF',
  muted: '#5E7280',
  border: '#D4E0EA',
  icon: '#8596A3',
  success: '#1F7A54',
  warning: '#B26A1F',
  danger: '#C63B4E',
  bubbleAssistant: '#EAF1F8',
  onBubbleAssistant: '#16212B',
  tabBackground: '#F8FBFD',
  tabIconDefault: '#8596A3',
};

const oceanDark: ThemeNeutralPalette = {
  text: '#E7F0F7',
  background: '#0B1420',
  surface: '#101B29',
  surfaceAlt: '#1A2A3D',
  card: '#101B29',
  muted: '#8EA3B5',
  border: '#22384C',
  icon: '#7C90A3',
  success: '#59C9A0',
  warning: '#E3A83F',
  danger: '#F08686',
  bubbleAssistant: '#131F2E',
  onBubbleAssistant: '#E7F0F7',
  tabBackground: '#0D1723',
  tabIconDefault: '#7C90A3',
};

const violetLight: ThemeNeutralPalette = {
  text: '#1D1A2E',
  background: '#F6F4FB',
  surface: '#FCFBFE',
  surfaceAlt: '#E9E4F5',
  card: '#FFFFFF',
  muted: '#6F6A86',
  border: '#DAD5E8',
  icon: '#8D87A3',
  success: '#3E7D63',
  warning: '#A06A2C',
  danger: '#BC3E52',
  bubbleAssistant: '#ECE7F7',
  onBubbleAssistant: '#191726',
  tabBackground: '#FAF8FD',
  tabIconDefault: '#8D87A3',
};

const violetDark: ThemeNeutralPalette = {
  text: '#EBE8F7',
  background: '#120F1F',
  surface: '#181526',
  surfaceAlt: '#242039',
  card: '#181526',
  muted: '#9D94BD',
  border: '#2E2A45',
  icon: '#817AA0',
  success: '#67C9A0',
  warning: '#E0AA4C',
  danger: '#F08892',
  bubbleAssistant: '#1A1730',
  onBubbleAssistant: '#EBE8F7',
  tabBackground: '#141120',
  tabIconDefault: '#817AA0',
};

const roseLight: ThemeNeutralPalette = {
  text: '#2A1620',
  background: '#FBF4F5',
  surface: '#FEFCFC',
  surfaceAlt: '#F1E3E6',
  card: '#FFFFFF',
  muted: '#86626B',
  border: '#EBD4D9',
  icon: '#9C7C84',
  success: '#2E7D5C',
  warning: '#A4681F',
  danger: '#BA3A46',
  bubbleAssistant: '#F3E6E9',
  onBubbleAssistant: '#231119',
  tabBackground: '#FDF9FA',
  tabIconDefault: '#9C7C84',
};

const roseDark: ThemeNeutralPalette = {
  text: '#F6E7EB',
  background: '#1B0D13',
  surface: '#231319',
  surfaceAlt: '#331C26',
  card: '#231319',
  muted: '#BDA0A6',
  border: '#3D2430',
  icon: '#A4828C',
  success: '#66C89A',
  warning: '#E0A94E',
  danger: '#F2888E',
  bubbleAssistant: '#2A1620',
  onBubbleAssistant: '#F6E7EB',
  tabBackground: '#1E0F15',
  tabIconDefault: '#A4828C',
};

const amberLight: ThemeNeutralPalette = {
  text: '#2B2213',
  background: '#FBF7EE',
  surface: '#FEFDF8',
  surfaceAlt: '#F1E9D6',
  card: '#FFFFFF',
  muted: '#877A63',
  border: '#EAE0CA',
  icon: '#9D9179',
  success: '#3E7A4E',
  warning: '#A4651A',
  danger: '#BC4147',
  bubbleAssistant: '#F4ECD9',
  onBubbleAssistant: '#211B10',
  tabBackground: '#FDFAF3',
  tabIconDefault: '#9D9179',
};

const amberDark: ThemeNeutralPalette = {
  text: '#F7EFDC',
  background: '#181206',
  surface: '#211A0C',
  surfaceAlt: '#302614',
  card: '#211A0C',
  muted: '#C1B392',
  border: '#3B311B',
  icon: '#A39674',
  success: '#6AC48A',
  warning: '#E3B04E',
  danger: '#EF8E72',
  bubbleAssistant: '#2A2416',
  onBubbleAssistant: '#F7EFDC',
  tabBackground: '#1B150A',
  tabIconDefault: '#A39674',
};

export const THEMES: Record<AccentColorId, { light: ThemeNeutralPalette; dark: ThemeNeutralPalette }> = {
  brand: { light: brandLight, dark: brandDark },
  ocean: { light: oceanLight, dark: oceanDark },
  violet: { light: violetLight, dark: violetDark },
  rose: { light: roseLight, dark: roseDark },
  amber: { light: amberLight, dark: amberDark },
};

function buildPalette(colorScheme: 'light' | 'dark', accentColor: AccentColorId): Palette {
  const neutrals = THEMES[accentColor]?.[colorScheme] ?? THEMES.brand[colorScheme];
  const accent = getAccentPalette(colorScheme, accentColor);
  return {
    ...neutrals,
    tint: accent.tint,
    accent: accent.accent,
    bubbleUser: accent.bubbleUser,
    onBubbleUser: accent.onBubbleUser,
    tabIconSelected: accent.tint,
  };
}

export const Colors = {
  light: buildPalette('light', 'brand'),
  dark: buildPalette('dark', 'brand'),
};

export const Fonts = Platform.select({
  ios: {
    sans: 'Avenir Next',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
    display: 'Avenir Next',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
    display: 'normal',
  },
  web: {
    sans: "'Avenir Next', 'Segoe UI', 'Trebuchet MS', sans-serif",
    serif: "Charter, 'Iowan Old Style', Georgia, serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    display: "'Avenir Next', 'Segoe UI', 'Trebuchet MS', sans-serif",
  },
});

export function getColors(colorScheme: 'light' | 'dark', accentColor: AccentColorId): Palette {
  return buildPalette(colorScheme, accentColor);
}