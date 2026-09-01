import { useAppearancePreferences } from '@/providers/opencode-provider';

export function useFontScale() {
  return useAppearancePreferences().appearancePreferences.fontScale;
}