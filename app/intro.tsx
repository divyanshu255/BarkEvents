import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');
const ACCENT = '#ff914d';
const ACCENT_DARK = '#ff6a00';
const BG = '#f9f9f9';

export default function IntroScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.emoji}>🐶</Text> BarkEvents
      </Text>
      <Image
        source={require('../assets/images/dog.gif')}
        style={styles.gif}
        contentFit="contain"
      />
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() => router.push('/signup')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: ACCENT_DARK,
    textShadowColor: ACCENT,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 10,
    marginBottom: 18,
    letterSpacing: 1.5,
  },
  emoji: {
    fontSize: 50,
    marginRight: 8,
    textShadowColor: ACCENT,
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 10,
  },
  gif: {
    width: 700,
    height: 600,
    marginBottom: 24,
  },
  button: {
    backgroundColor: ACCENT,
    paddingVertical: 15,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: ACCENT_DARK,
    shadowOpacity: 0.20,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: ACCENT_DARK,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textShadowColor: ACCENT_DARK,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
});