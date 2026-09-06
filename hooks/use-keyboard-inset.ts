import { useEffect, useRef } from 'react';
import { Animated, Keyboard, Platform } from 'react-native';

const ANDROID_ANIMATION_DURATION = 180;
const IOS_ANIMATION_DURATION = 220;

function animateTo(value: Animated.Value, toValue: number, duration: number) {
  Animated.timing(value, { toValue, duration, useNativeDriver: false }).start();
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

    // Android has no reliable "will" events and the heights reported by them can
    // race/short-report, leaving the composer partially covered. Only "did" events
    // report the final keyboard height, so we animate from them.
    const didShow = Keyboard.addListener('keyboardDidShow', (event) => {
      animateTo(inset, event.endCoordinates.height, ANDROID_ANIMATION_DURATION);
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
