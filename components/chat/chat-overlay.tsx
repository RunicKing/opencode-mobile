import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { scaleTextSize } from '@/constants/appearance';
import { mixHex } from '@/constants/m3-colors';
import { Fonts, getColors } from '@/constants/theme';
import { useFontScale } from '@/hooks/use-font-scale';
import { useAppearancePreferences } from '@/providers/opencode-provider';

export function ConversationOverlay({
  connectionStatus,
  insetsTop,
  latestUserText,
  onStop,
  phase,
  sessionTitle,
}: {
  connectionStatus?: 'idle' | 'connecting' | 'connected' | 'error';
  insetsTop: number;
  latestUserText?: string;
  onStop: () => void;
  phase: 'off' | 'listening' | 'submitting' | 'waiting' | 'speaking';
  sessionTitle: string;
}) {
  const fontScale = useFontScale();
  const { appearancePreferences } = useAppearancePreferences();
  const palette = getColors('dark', appearancePreferences.accentColor);
  const orbScale = useRef(new Animated.Value(1)).current;
  const orbOpacity = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    const targetScale = phase === 'speaking' ? 1.03 : phase === 'listening' ? 1.015 : 1;
    const targetOpacity = phase === 'speaking' ? 1 : phase === 'listening' ? 0.96 : 0.9;

    Animated.parallel([
      Animated.timing(orbScale, {
        toValue: targetScale,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(orbOpacity, {
        toValue: targetOpacity,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [orbOpacity, orbScale, phase]);

  const accent = palette.tint;
  const electric = '#2C8CFF';
  const overlayBackground = mixHex(palette.background, '#000000', 0.5);
  const overlaySurface = mixHex(palette.surface, '#000000', 0.12);
  const overlayText = palette.text;
  const overlayMuted = mixHex(palette.text, palette.background, 0.5);
  const orbRing = phase === 'speaking' ? `${electric}30` : `${accent}24`;
  const phaseLabel = phase.charAt(0).toUpperCase() + phase.slice(1);
  const connectionEmoji = connectionStatus === 'error' ? '⚠️' : connectionStatus === 'connecting' ? '🔄' : undefined;

  return (
    <View style={[styles.voiceOverlay, { backgroundColor: overlayBackground, paddingTop: insetsTop + 14 }]}> 
      <View style={styles.voiceOverlayContent}>
        <View style={styles.voiceOverlayHeader}>
          <View style={styles.voiceOverlayHeaderCopy}>
            <Text variant="labelLarge" style={[styles.voiceOverlayEyebrow, { color: overlayMuted }]}>Conversation mode</Text>
            <Text numberOfLines={1} variant="headlineMedium" style={[styles.voiceOverlayTitle, { color: overlayText }]}> 
              {sessionTitle}
            </Text>
          </View>
          {connectionEmoji ? <Text style={[styles.voiceOverlayConnectionEmoji, { fontSize: scaleTextSize(26, fontScale), lineHeight: scaleTextSize(30, fontScale) }]}>{connectionEmoji}</Text> : null}
        </View>

        <View style={styles.voiceOverlayCenter}>
          <Animated.View style={[styles.voiceOrbShell, { borderColor: orbRing, opacity: orbOpacity, transform: [{ scale: orbScale }] }]}> 
            <View style={[styles.voiceOrbCore, { backgroundColor: mixHex(palette.tint, '#FFFFFF', 0.72) }]}>
              <View style={[styles.voiceOrbBlobTop, { backgroundColor: mixHex(palette.tint, '#FFFFFF', 0.35) }]} />
              <View style={[styles.voiceOrbBlobBottom, { backgroundColor: electric }]} />
              <View style={[styles.voiceOrbHighlight, { backgroundColor: 'rgba(255,255,255,0.36)' }]} />
            </View>
          </Animated.View>

          <View style={styles.voiceOverlayMeta}>
            <Text variant="headlineSmall" style={[styles.voiceOverlayPhaseTitle, { color: overlayText }]}> 
              {phaseLabel}
            </Text>
          </View>
        </View>

        <View style={styles.voiceOverlayFooter}>
          <View style={[styles.voiceOverlaySnippetCard, { backgroundColor: overlaySurface, borderColor: 'rgba(255,255,255,0.06)' }]}>
            <Text variant="labelMedium" style={{ color: overlayMuted }}>Last heard</Text>
            <Text numberOfLines={3} variant="bodyLarge" style={{ color: overlayText }}>
              {latestUserText?.trim() || 'Start speaking naturally. What you say in the last round will appear here.'}
            </Text>
          </View>
          <Button
            mode="contained"
            icon="phone-hangup"
            buttonColor="#E8ECEA"
            textColor="#0F1715"
            contentStyle={styles.voiceOverlayDoneContent}
            labelStyle={[styles.voiceOverlayDoneLabel, { fontSize: scaleTextSize(16, fontScale) }]}
            onPress={onStop}>
            Done
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  voiceOverlay: { ...StyleSheet.absoluteFillObject, zIndex: 12 },
  voiceOverlayContent: { flex: 1, paddingHorizontal: 22, paddingBottom: 22 },
  voiceOverlayHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, paddingHorizontal: 4 },
  voiceOverlayHeaderCopy: { flex: 1, minWidth: 0, gap: 4 },
  voiceOverlayConnectionEmoji: { fontSize: 26, lineHeight: 30 },
  voiceOverlayEyebrow: { letterSpacing: 0.6, textTransform: 'uppercase' },
  voiceOverlayTitle: { fontFamily: Fonts.display, fontWeight: '700' },
  voiceOverlayCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 },
  voiceOrbShell: {
    width: 252,
    height: 252,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  voiceOrbCore: {
    width: 212,
    height: 212,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: '#DDF7F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceOrbBlobTop: {
    position: 'absolute',
    top: 18,
    width: 126,
    height: 126,
    borderRadius: 999,
    opacity: 0.95,
  },
  voiceOrbBlobBottom: {
    position: 'absolute',
    bottom: 8,
    width: 188,
    height: 122,
    borderRadius: 999,
    opacity: 0.88,
  },
  voiceOrbHighlight: {
    position: 'absolute',
    top: 30,
    left: 36,
    width: 42,
    height: 42,
    borderRadius: 999,
  },
  voiceOverlayMeta: { alignItems: 'center', gap: 12, paddingHorizontal: 14, maxWidth: 320 },
  voiceOverlayPhaseTitle: { fontFamily: Fonts.display, fontWeight: '700', textAlign: 'center' },
  voiceOverlayFooter: { gap: 18 },
  voiceOverlaySnippetCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    gap: 10,
  },
  voiceOverlayDoneContent: { minHeight: 52 },
  voiceOverlayDoneLabel: { fontWeight: '700', fontSize: 16 },
});
