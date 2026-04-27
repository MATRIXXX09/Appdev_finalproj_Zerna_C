import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN, USER_LOGIN_RESET } from '../../app/actions';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage, data } = useSelector(state => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertShown, setAlertShown] = useState(false);

{/*useEffect(() => {
  if (isError && errorMessage && !alertShown) {
    Alert.alert('Login Failed', errorMessage);
    setAlertShown(true);
  }
}, [isError, errorMessage, alertShown]);*/}

  useEffect(() => {
    dispatch({ type: USER_LOGIN_RESET });
    setAlertShown(false);
  }, [dispatch]);

  // Auto-navigate when login is successful
  useEffect(() => {
    if (data?.token) {
      navigation.replace('MainApp');
    }
  }, [data, navigation]);

  const handleLogin: FC = () => {
    setAlertShown(false); // Reset alert flag for next attempt
    
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Dispatch login action to Redux/Saga
    dispatch({
      type: USER_LOGIN,
      payload: { email: email.trim(), password },
    });
  };

  // Show error alert when login fails (only once per error)
  useEffect(() => {
    if (isError && errorMessage && !alertShown) {
      Alert.alert('Login Failed', errorMessage);
      setAlertShown(true);
    }
  }, [isError, errorMessage, alertShown]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.glowCircle1} />
      <View style={styles.glowCircle2} />

      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/HABAL.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>WELCOME{'\n'}BACK</Text>
        <View style={styles.titleUnderline} />
      </View>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>LOGIN</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  glowCircle1: {
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    position: 'absolute',
    top: -100,
    left: -100,
  },
  glowCircle2: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(220, 20, 60, 0.1)',
    position: 'absolute',
    top: 200,
    right: -80,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 36,
    marginTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    color: '#22C55E',
    fontSize: 44,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 52,
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: '#22C55E',
    borderRadius: 2,
    marginTop: 16,
  },
  card: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#999',
    fontSize: 14,
  },
  signupLink: {
    color: '#22C55E',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Login;




