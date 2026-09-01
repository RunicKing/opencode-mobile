export type AccentColorId = 'brand' | 'ocean' | 'violet' | 'rose' | 'amber';

export type AccentOption = {
  id: AccentColorId;
  label: string;
  light: { tint: string; accent: string; bubbleUser: string; onBubbleUser: string };
  dark: { tint: string; accent: string; bubbleUser: string; onBubbleUser: string };
};

export const ACCENT_OPTIONS: readonly AccentOption[] = [
  {
    id: 'brand',
    label: 'Brand green',
    light: { tint: '#0F8A6C', accent: '#125F53', bubbleUser: '#135C4E', onBubbleUser: '#F5FFFB' },
    dark: { tint: '#7AE7C0', accent: '#58D4AB', bubbleUser: '#1C6B5C', onBubbleUser: '#F3FFFB' },
  },
  {
    id: 'ocean',
    label: 'Ocean blue',
    light: { tint: '#2563EB', accent: '#1E40AF', bubbleUser: '#1E40AF', onBubbleUser: '#F5F9FF' },
    dark: { tint: '#7CA5FF', accent: '#A9C4FF', bubbleUser: '#2A55C9', onBubbleUser: '#F5F9FF' },
  },
  {
    id: 'violet',
    label: 'Violet',
    light: { tint: '#7C3AED', accent: '#5B21B6', bubbleUser: '#6D28D9', onBubbleUser: '#FBF7FF' },
    dark: { tint: '#B794FF', accent: '#D6C3FF', bubbleUser: '#7B4BD6', onBubbleUser: '#FBF7FF' },
  },
  {
    id: 'rose',
    label: 'Rose',
    light: { tint: '#E11D48', accent: '#9F1239', bubbleUser: '#BE123C', onBubbleUser: '#FFF7F8' },
    dark: { tint: '#FF7A95', accent: '#FFB3C1', bubbleUser: '#D63A5E', onBubbleUser: '#FFF7F8' },
  },
  {
    id: 'amber',
    label: 'Amber',
    light: { tint: '#D97706', accent: '#92400E', bubbleUser: '#A16207', onBubbleUser: '#FFFBF0' },
    dark: { tint: '#FFC257', accent: '#FFDE9E', bubbleUser: '#C98A1B', onBubbleUser: '#FFFBF0' },
  },
];

export const ACCENT_COLOR_IDS = ACCENT_OPTIONS.map((option) => option.id);

export function isAccentColorId(value: string | undefined): value is AccentColorId {
  return ACCENT_COLOR_IDS.includes(value as AccentColorId);
}

export const DEFAULT_FONT_SCALE = 1;
export const FONT_SCALE_MIN = 0.8;
export const FONT_SCALE_MAX = 1.4;
export const FONT_SCALE_STEP = 0.1;

export function clampFontScale(value: number) {
  if (!Number.isFinite(value)) {
    return DEFAULT_FONT_SCALE;
  }

  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, value));
}

export function getAccentPalette(colorScheme: 'light' | 'dark', accentColor: AccentColorId) {
  const option = ACCENT_OPTIONS.find((item) => item.id === accentColor) ?? ACCENT_OPTIONS[0];
  return colorScheme === 'dark' ? option.dark : option.light;
}