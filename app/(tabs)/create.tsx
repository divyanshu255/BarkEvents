import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [date, setDate] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const router = useRouter();

  const onDateChange = (event, selected) => {
    setShowPicker(false);
    if (selected) {
      const iso = selected.toISOString().split('T')[0];
      setSelectedDate(selected);
      setDate(iso);
    }
  };

  const createEvent = async () => {
    const user = auth.currentUser;
    if (!user) return alert('You must be logged in.');

    if (!title || !bio || !date) return alert('Please fill all fields');

    try {
      await addDoc(collection(db, 'events'), {
        title,
        bio,
        date,
        creatorId: user.uid,
      });
      alert('🎉 Event created!');
      setTitle('');
      setBio('');
      setDate('');
      router.push('./home');
    } catch (error) {
      alert('Error creating event');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: BG }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.header}>📅 Create New Event</Text>

          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#888"
          />
          <TextInput
            style={[styles.input, { minHeight: 60 }]}
            placeholder="Event Description"
            value={bio}
            onChangeText={setBio}
            multiline
            placeholderTextColor="#888"
          />

          <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
            <Text style={{ color: date ? '#000' : '#999', fontSize: 16 }}>
              {date || 'Select Date'}
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              minimumDate={new Date()}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={createEvent} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Create Event</Text>
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
    paddingVertical: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 26,
    width: '92%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: ACCENT,
    marginBottom: 22,
    textAlign: 'center',
    letterSpacing: 1,
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
    color: '#111',
  },
  button: {
    width: '100%',
    backgroundColor: ACCENT,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2,
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
});