import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Keyboard, Platform } from 'react-native';

const ANDROID_ANIMATION_DURATION = 180;
const IOS_ANIMATION_DURATION = 220;

function animateTo(value: Animated.Value, toValue: number, duration: number) {
  Animated.timing(value, { toValue, duration, useNativeDriver: false }).start();
}

// RN 0.81 can under-report `endCoordinates.height` on Android (edge-to-edge +
// the legacy IME detection path, fixed upstream only in 0.86). Cross-check with
// the keyboard's absolute `screenY` and take whichever estimate is larger so the
// composer is never left partially covered by the keyboard.
function androidKeyboardHeight(endCoordinates: { height: number; screenY: number }) {
  const { height, screenY } = endCoordinates;
  let estimate = Number.isFinite(height) && height > 0 ? height : 0;
  if (Number.isFinite(screenY) && screenY > 0) {
    const fromScreenY = Math.round(Dimensions.get('window').height - screenY);
    estimate = Math.max(estimate, fromScreenY);
  }
  return Math.max(0, estimate);
}

export function useKeyboardInset() {
  const inset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'ios') {
      // iOS reports the keyboard height before it moves, so animate with it.
      const willShow = Keyboard.addListener('keyboardWillShow', (event) => {
        animateTo(inset, event.endCoordinates.height, event.duration ?? IOS_ANIMATION_DURATION);
      });
      const willHide = Keyboard.addListener('keyboardWillHide', (event) => {
        animateTo(inset, 0, event.duration ?? IOS_ANIMATION_DURATION);
      });
      return () => {
        willShow.remove();
        willHide.remove();
      };
    }

    // Android has no reliable "will" events; only "did" events report the final
    // keyboard state, and their height can be under-reported, so we cross-check
    // it against the absolute `screenY` (see androidKeyboardHeight).
    const didShow = Keyboard.addListener('keyboardDidShow', (event) => {
      animateTo(inset, androidKeyboardHeight(event.endCoordinates), ANDROID_ANIMATION_DURATION);
    });
    const didHide = Keyboard.addListener('keyboardDidHide', () => {
      animateTo(inset, 0, ANDROID_ANIMATION_DURATION);
    });
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, [inset]);

  return inset;
}
