import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { getPaperTheme } from '@/constants/paper-theme';
import { getColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { OpencodeProvider, useAppearancePreferences } from '@/providers/opencode-provider';

export const unstable_settings = {
  anchor: '(tabs)',
};

function ThemedApp() {
  const colorScheme = useColorScheme();
  const scheme: 'light' | 'dark' = colorScheme === 'dark' ? 'dark' : 'light';
  const { appearancePreferences } = useAppearancePreferences();
  const palette = useMemo(
    () => getColors(scheme, appearancePreferences.accentColor),
    [appearancePreferences.accentColor, scheme],
  );
  const paperTheme = useMemo(
    () => getPaperTheme(scheme, appearancePreferences.accentColor, appearancePreferences.fontScale),
    [appearancePreferences.accentColor, appearancePreferences.fontScale, scheme],
  );
  const navigationTheme = useMemo(() => {
    const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: palette.background,
        card: palette.surface,
        text: palette.text,
        border: palette.border,
        primary: palette.tint,
        notification: palette.tint,
      },
    };
  }, [palette, scheme]);

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  const isE2EMode = Boolean(Constants.expoConfig?.extra?.e2eMode);

  useEffect(() => {
    if (Platform.OS === 'web' || isE2EMode) {
      return;
    }

    void import('@/lib/notifications')
      .then(({ initializeNotifications }) => initializeNotifications())
      .catch(() => undefined);

    void import('@/lib/voice/speech-output')
      .then(({ initializeVoiceAudioAsync }) => initializeVoiceAudioAsync())
      .catch(() => undefined);
  }, [isE2EMode]);

  return (
    <SafeAreaProvider>
      <OpencodeProvider>
        <ThemedApp />
      </OpencodeProvider>
    </SafeAreaProvider>
  );
}
