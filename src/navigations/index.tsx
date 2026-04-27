import { NavigationContainer } from '@react-navigation/native';
import { useEffect, FC } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import AuthNav from './AuthNav';
import MainNav from './MainNav';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

const AppNavigation: FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const { data } = useSelector((state: RootState) => state.auth);

  const isLoggedIn = !!(data?.token);

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#000', true);
    }
    StatusBar.setBarStyle('light-content', true);
  }, [isDarkMode]);

  console.log(
    '[Navigation] auth.data:',
    data ? { hasToken: !!data.token, user: data.user?.email } : null,
    '| isLoggedIn:',
    isLoggedIn
  );

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default AppNavigation;
