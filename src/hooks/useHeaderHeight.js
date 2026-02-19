import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_CONTENT_HEIGHT = 52; // 40px back button + 12px paddingBottom

export const useHeaderHeight = () => {
  const insets = useSafeAreaInsets();
  return insets.top + HEADER_CONTENT_HEIGHT;
};
