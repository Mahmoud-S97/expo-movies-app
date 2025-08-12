// __mocks__/expo-router.tsx
import React from 'react';
import { Pressable, PressableProps, GestureResponderEvent } from 'react-native';
import type { LinkProps } from 'expo-router';

export const push = jest.fn();
export const replace = jest.fn();
export const back = jest.fn();

export const Link = jest.fn(({ children, onPress, href, ...props }: PressableProps & LinkProps) => {
  return (
    <Pressable
      onPress={(event: GestureResponderEvent) => {
        if(href) push(href);
        if(onPress) onPress(event);
      }}
      {...props}
    >
      {children}
    </Pressable>
  )
});
export const useRouter = jest.fn(() => ({
  push,
  replace,
  back,
}));
export const useLocalSearchParams = () => ({});
export const useGlobalSearchParams = () => ({});