import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';

import AuthNav from './AuthNav';
import MainNav from './MainNav';
import { useSelector } from 'react-redux';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { data } = useSelector(state => state.auth);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fff5f9', true); // Changed to match K-pop theme
    }

    StatusBar.setBarStyle('dark-content', true);
  }, [isDarkMode]);

  console.log('TEST: ', JSON.stringify(data, null, 2));

  // TEMPORARILY DISABLED AUTH - Always show MainNav (Home Screen)
  // To enable authentication later, uncomment the line below and comment out the next line:
  // let isLoggedIn = !!data;
  let isLoggedIn = false; // Always true for development

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};
