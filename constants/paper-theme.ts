import {
  MD3DarkTheme,
  MD3LightTheme,
  type MD3Theme,
} from 'react-native-paper';

import type { AccentColorId } from '@/constants/appearance';
import { getColors } from '@/constants/theme';

export function getPaperTheme(
  colorScheme: 'light' | 'dark',
  accentColor: AccentColorId,
  fontScale: number,
): MD3Theme {
  const palette = getColors(colorScheme, accentColor);
  const base = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const fonts = Object.fromEntries(
    Object.entries(base.fonts).map(([variant, font]) => {
      const scaled = font as { fontSize?: number; lineHeight?: number };
      return [
        variant,
        {
          ...font,
          fontSize: typeof scaled.fontSize === 'number' ? Math.round(scaled.fontSize * fontScale) : scaled.fontSize,
          lineHeight: typeof scaled.lineHeight === 'number' ? Math.round(scaled.lineHeight * fontScale) : scaled.lineHeight,
        },
      ];
    }),
  ) as unknown as MD3Theme['fonts'];

  return {
    ...base,
    roundness: 3,
    fonts,
    colors: {
      ...base.colors,
      primary: palette.tint,
      onPrimary: colorScheme === 'dark' ? '#08110F' : '#FFFFFF',
      primaryContainer: palette.surfaceAlt,
      onPrimaryContainer: palette.text,
      secondary: palette.accent,
      onSecondary: colorScheme === 'dark' ? '#08110F' : '#FFFFFF',
      secondaryContainer: palette.surfaceAlt,
      onSecondaryContainer: palette.text,
      error: palette.danger,
      background: palette.background,
      onBackground: palette.text,
      surface: palette.surface,
      onSurface: palette.text,
      surfaceVariant: palette.surfaceAlt,
      onSurfaceVariant: palette.muted,
      outline: palette.border,
      outlineVariant: palette.border,
      elevation: {
        ...base.colors.elevation,
        level0: palette.background,
        level1: palette.surface,
        level2: palette.card,
        level3: palette.surfaceAlt,
        level4: palette.surfaceAlt,
        level5: palette.surfaceAlt,
      },
    },
  };
}
