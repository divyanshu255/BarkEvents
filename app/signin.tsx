import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { auth } from '../firebaseConfig';

export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/home');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: BG}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.logo}>🐶</Text>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to book your next dog event</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Pressable style={styles.button} onPress={handleSignin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
          <TouchableOpacity onPress={() => router.push('/signup')} style={styles.signinContainer}>
            <Text style={styles.link}>
              Don't have an account? <Text style={styles.signup}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const ACCENT = '#ff914d';
const BG = '#f9f9f9';

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 28,
    width: '92%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
  },
  logo: {
    fontSize: 52,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#333',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 22,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1.2,
    borderColor: '#ececec',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: BG,
  },
  button: {
    width: '100%',
    backgroundColor: ACCENT,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 10,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  link: {
    marginTop: 8,
    color: '#888',
    textAlign: 'center',
    fontSize: 15,
  },
  signup: {
    color: ACCENT,
    fontWeight: 'bold',
  },
  signinContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 2,
  },
});