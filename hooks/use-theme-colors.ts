import { getColors, type Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppearancePreferences } from '@/providers/opencode-provider';

export function useThemeColors(): Palette {
  const colorScheme = useColorScheme() ?? 'light';
  const { appearancePreferences } = useAppearancePreferences();
  return getColors(colorScheme, appearancePreferences.accentColor);
}