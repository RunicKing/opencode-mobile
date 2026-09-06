import { useEffect, useRef } from 'react';
import { Animated, Keyboard, Platform } from 'react-native';

const ANDROID_ANIMATION_DURATION = 180;
const IOS_ANIMATION_DURATION = 220;

export function useKeyboardInset() {
  const inset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const willShow = Keyboard.addListener('keyboardWillShow', (event) => {
        const next = event.endCoordinates.height;
        Animated.timing(inset, {
          toValue: next,
          duration: event.duration ?? IOS_ANIMATION_DURATION,
          useNativeDriver: false,
        }).start();
      });
      const willHide = Keyboard.addListener('keyboardWillHide', (event) => {
        Animated.timing(inset, {
          toValue: 0,
          duration: event.duration ?? IOS_ANIMATION_DURATION,
          useNativeDriver: false,
        }).start();
      });
      return () => {
        willShow.remove();
        willHide.remove();
      };
    }

    const didShow = Keyboard.addListener('keyboardDidShow', (event) => {
      Animated.timing(inset, {
        toValue: event.endCoordinates.height,
        duration: ANDROID_ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    });
    const didHide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(inset, {
        toValue: 0,
        duration: ANDROID_ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, [inset]);

  return inset;
}
