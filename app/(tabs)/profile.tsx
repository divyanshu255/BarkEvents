import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { useFocusEffect } from 'expo-router';
import profileImage from '../../assets/images/demo.jpg'; // replace with your actual path

export default function ProfileScreen() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setUserInfo({
      name: user.displayName || 'Anonymous',
      email: user.email,
    });

    try {
      // 🔖 Booked Events
      const bookingQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
      const bookingSnap = await getDocs(bookingQuery);
      const bookings = bookingSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // ✏️ Created Events
      const createdQuery = query(collection(db, 'events'), where('creatorId', '==', user.uid));
      const createdSnap = await getDocs(createdQuery);
      const created = createdSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookedEvents(bookings);
      setCreatedEvents(created);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // 🔄 Fetch data every time screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  const deleteCreatedEvent = async (id) => {
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'events', id));
              setCreatedEvents(prev => prev.filter(item => item.id !== id));
            } catch (error) {
              console.error('Error deleting event:', error);
            }
          }
        }
      ]
    );
  };

  const cancelBooking = async (id) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'bookings', id));
              setBookedEvents(prev => prev.filter(item => item.id !== id));
            } catch (error) {
              console.error('Error cancelling booking:', error);
            }
          }
        }
      ]
    );
  };

  const renderEventCard = (item, isCreated = false) => (
    <View style={styles.card} key={item.id}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.date}>📅 {item.date}</Text>
      <TouchableOpacity
        style={isCreated ? styles.deleteBtn : styles.cancelBtn}
        onPress={() => isCreated ? deleteCreatedEvent(item.id) : cancelBooking(item.id)}
        activeOpacity={0.8}
      >
        <Text style={isCreated ? styles.deleteBtnText : styles.cancelBtnText}>
          {isCreated ? "Delete Event" : "Cancel Booking"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileBox}>
        <Image source={profileImage} style={styles.profilePic} />
        {/* <Text style={styles.profileName}>{userInfo?.name}</Text> */}
        <Text style={styles.profileText}>{userInfo?.email}</Text>
      </View>

      <Text style={styles.sectionHeader}>✏️ Events You Created</Text>
      {createdEvents.length > 0 ? (
        createdEvents.map(event => renderEventCard(event, true))
      ) : (
        <Text style={styles.noText}>You haven’t created any events.</Text>
      )}

      <Text style={styles.sectionHeader}>🔖 Events You Booked</Text>
      {bookedEvents.length > 0 ? (
        bookedEvents.map(event => renderEventCard(event, false))
      ) : (
        <Text style={styles.noText}>You haven’t booked any events.</Text>
      )}
    </ScrollView>
  );
}

const ACCENT = '#ff914d';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff9f3',
    alignItems: 'center',
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    color: '#1a1a1a',
    alignSelf: 'flex-start',
  },
  noText: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 10,
    fontSize: 15.5,
    alignSelf: 'flex-start',
  },
  profileBox: {
    alignItems: 'center',
    marginBottom: 26,
    width: '100%',
  },
  profilePic: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor: ACCENT,
    backgroundColor: '#fff6ed',
  },
  profileName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  profileText: {
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff7f2',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#ff914d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1.2,
    borderColor: '#ffe0c2',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e2e2e',
    marginBottom: 3,
  },
  date: {
    fontStyle: 'italic',
    color: '#b86c2c',
    marginBottom: 10,
    fontSize: 15,
  },
  deleteBtn: {
    backgroundColor: '#ffeded',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteBtnText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 15.5,
  },
  cancelBtn: {
    backgroundColor: '#ffe9d9',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelBtnText: {
    color: ACCENT,
    fontWeight: 'bold',
    fontSize: 15.5,
  },
});