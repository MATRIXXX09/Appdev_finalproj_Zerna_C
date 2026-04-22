// Import navigation components
import { NavigationContainer } from '@react-navigation/native';
// Import React hooks
import { useEffect } from 'react';
// Import React Native components
import { Platform, StatusBar, useColorScheme } from 'react-native';

// Import navigation screens
import AuthNav from './AuthNav';       // Login/Register screens
import MainNav from './MainNav';       // Home/Profile/Booking screens
// Import Redux hook
import { useSelector } from 'react-redux';

// ROOT NAVIGATION: Decides which screens to show based on auth state
export default () => {
  // Get current color scheme (dark/light mode)
  const isDarkMode = useColorScheme() === 'dark';
  
  // Read auth state from Redux
  // data contains { token, user } when logged in, null when logged out
  const { data } = useSelector(state => state.auth);
  
  // Check if user is logged in
  // !! converts to boolean: data?.token exists = true, null = false
  const isLoggedIn = !!(data?.token);

  // useEffect: Set Android status bar color when component mounts
  // Runs once on component load
  useEffect(() => {
    // Check if running on Android platform
    if (Platform.OS === 'android') {
      // Set status bar background color to black
      StatusBar.setBackgroundColor('#000', true);
    }
    // Set status bar text color to light (white)
    StatusBar.setBarStyle('light-content', true);
  }, [isDarkMode]);

  // Log navigation state for debugging
  console.log('[Navigation] auth.data:', data ? { hasToken: !!data.token, user: data.user?.email } : null, '| isLoggedIn:', isLoggedIn);

  // RETURN: Conditional navigation based on isLoggedIn
  // If isLoggedIn = true → show MainNav (main app screens)
  // If isLoggedIn = false → show AuthNav (login/register screens)
  return (
    <NavigationContainer>
      {/* Conditional rendering: ternary operator */}
      {isLoggedIn ? <MainNav /> : <AuthNav />}
    </NavigationContainer>
  );
};
