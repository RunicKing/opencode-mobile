import {
  MD3DarkTheme,
  MD3LightTheme,
  type MD3Theme,
} from 'react-native-paper';

import type { AccentColorId } from '@/constants/appearance';
import { mixHex, STOCK_MD3_ROLES_DARK, STOCK_MD3_ROLES_LIGHT, deriveTertiaryAndInverseRoles } from '@/constants/m3-colors';
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
  const stock = colorScheme === 'dark' ? STOCK_MD3_ROLES_DARK : STOCK_MD3_ROLES_LIGHT;
  const derived = deriveTertiaryAndInverseRoles(colorScheme, palette.tint);
  const onAccentDark = '#08110F';

  return {
    ...base,
    roundness: 3,
    fonts,
    colors: {
      ...stock,
      primary: palette.tint,
      onPrimary: colorScheme === 'dark' ? onAccentDark : '#FFFFFF',
      primaryContainer: palette.surfaceAlt,
      onPrimaryContainer: palette.text,
      secondary: palette.accent,
      onSecondary: colorScheme === 'dark' ? onAccentDark : '#FFFFFF',
      secondaryContainer: palette.surfaceAlt,
      onSecondaryContainer: palette.text,
      tertiary: derived.tertiary,
      onTertiary: derived.onTertiary,
      tertiaryContainer: derived.tertiaryContainer,
      onTertiaryContainer: derived.onTertiaryContainer,
      error: palette.danger,
      surface: palette.surface,
      surfaceVariant: palette.surfaceAlt,
      surfaceDisabled: mixHex(palette.surface, palette.text, 0.12),
      background: palette.background,
      onSurface: palette.text,
      onSurfaceVariant: palette.muted,
      onSurfaceDisabled: mixHex(palette.surface, palette.text, 0.38),
      onBackground: palette.text,
      outline: palette.border,
      outlineVariant: palette.border,
      inverseSurface: derived.inverseSurface,
      inverseOnSurface: derived.inverseOnSurface,
      inversePrimary: derived.inversePrimary,
      elevation: {
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
