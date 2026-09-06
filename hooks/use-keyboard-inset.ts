import { useEffect, useRef } from 'react';
import { Animated, Keyboard, Platform } from 'react-native';

const ANDROID_ANIMATION_DURATION = 180;
const IOS_ANIMATION_DURATION = 220;

export function useKeyboardInset() {
  const inset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const willShow = Keyboard.addListener('keyboardWillShow', (event) => {
      Animated.timing(inset, {
        toValue: event.endCoordinates.height,
        duration: Platform.OS === 'ios' ? (event.duration ?? IOS_ANIMATION_DURATION) : ANDROID_ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    });
    const willHide = Keyboard.addListener('keyboardWillHide', () => {
      Animated.timing(inset, {
        toValue: 0,
        duration: Platform.OS === 'ios' ? IOS_ANIMATION_DURATION : ANDROID_ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    });
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
      willShow.remove();
      willHide.remove();
      didShow.remove();
      didHide.remove();
    };
  }, [inset]);

  return inset;
}
