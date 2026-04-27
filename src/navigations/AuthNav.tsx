import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../utils';

import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
{/*import ErrorScreen from '..screens/ErrorScreen';*/}

const Stack = createStackNavigator();

const AuthNavigation: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOGIN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      {/* <Stack.Screen name="ErrorScreen" component={ErrorScreen} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;



