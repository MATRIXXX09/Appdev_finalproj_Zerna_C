import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';

import AuthNav from './AuthNav';
import MainNav from './MainNav';
import { useSelector } from 'react-redux';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { data } = useSelector(state => state.auth);
  const isLoggedIn = !!(data?.token);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff5f9', true);
    }
    StatusBar.setBarStyle('dark-content', true);
  }, [isDarkMode]);

  console.log('[Navigation] auth.data:', data ? { hasToken: !!data.token, user: data.user?.email } : null, '| isLoggedIn:', isLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};
