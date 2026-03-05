import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { ROUTES } from '../../utils';

import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff5f9" />

      <View style={styles.glowCircle1} />
      <View style={styles.glowCircle2} />

      <View style={styles.headerContainer}>
        <Text style={styles.kpopLabel}>✦ KPOP PORTAL ✦</Text>
        <Text style={styles.title}>CREATE{'\n'}ACCOUNT</Text>
        <View style={styles.titleUnderline} />
      </View>

      <View style={styles.card}>
        <CustomTextInput
          label={'Full Name'}
          placeholder={'Enter your Full Name'}
          value={name}
          onChangeText={setName}
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          textStyle={styles.inputText}
        />

        <CustomTextInput
          label={'Email'}
          placeholder={'Enter your Email'}
          value={email}
          onChangeText={setEmail}
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          textStyle={styles.inputText}
        />

        <CustomTextInput
          label={'Confirm Email'}
          placeholder={'Confirm your Email'}
          value={emailConfirm}
          onChangeText={setEmailConfirm}
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          textStyle={styles.inputText}
        />

        <CustomTextInput
          label={'Password'}
          placeholder={'Enter your Password'}
          value={password}
          onChangeText={setPassword}
          containerStyle={[styles.inputContainer, { marginBottom: 0 }]}
          labelStyle={styles.inputLabel}
          textStyle={styles.inputText}
        />

        <CustomButton
          label={'REGISTER'}
          containerStyle={styles.registerButton}
          textStyle={styles.registerButtonText}
          onPress={async () => {
            // dispatch registration
          }}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>✦</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity
            style={{ marginLeft: 6 }}
            onPress={() => navigation.navigate(ROUTES.LOGIN)}
          >
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footerText}>✦ KPOP UNIVERSE ✦</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  glowCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#ff1493',
    opacity: 0.12,
    top: -60,
    right: -80,
  },
  glowCircle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#ffc0cb',
    opacity: 0.15,
    bottom: 40,
    left: -60,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  kpopLabel: {
    color: '#ff1493',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 10,
  },
  title: {
    color: '#d946ef',
    fontSize: 44,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 48,
    letterSpacing: 2,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: '#ff1493',
    marginTop: 12,
    borderRadius: 2,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    borderWidth: 2,
    borderColor: '#ffc0cb',
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d946ef',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  inputText: {
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  registerButton: {
    marginTop: 10,
    marginBottom: 24,
    width: '100%',
    backgroundColor: '#ff1493',
    borderRadius: 14,
    paddingVertical: 16,
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  registerButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 4,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffc0cb',
  },
  dividerText: {
    color: '#ff1493',
    marginHorizontal: 10,
    fontSize: 12,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#666666',
    fontSize: 14,
  },
  loginLink: {
    color: '#ff1493',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1,
  },
  footerText: {
    color: '#d946ef',
    fontSize: 10,
    letterSpacing: 4,
    marginTop: 32,
    fontWeight: '700',
  },
});

export default Register;
