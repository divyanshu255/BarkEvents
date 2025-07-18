// import React, { useState, useCallback } from 'react';
// import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
// import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
// import { auth, db } from '../../firebaseConfig';
// import { useFocusEffect } from 'expo-router';

// export default function HomeScreen() {
//   const [todayEvents, setTodayEvents] = useState([]);
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [bookedEventIds, setBookedEventIds] = useState([]);

//   const fetchEvents = async () => {
//     const user = auth.currentUser;
//     if (!user) return;

//     try {
//       const snap = await getDocs(collection(db, 'events'));
//       const now = new Date();
//       const todayStr = now.toISOString().split('T')[0]; // yyyy-mm-dd

//       const allEvents = snap.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       const today = [];
//       const upcoming = [];

//       for (const event of allEvents) {
//         const eventDate = new Date(event.date);
//         const eventStr = event.date; // assuming 'YYYY-MM-DD' string

//         if (eventStr === todayStr) {
//           today.push(event);
//         } else if (new Date(eventStr) > now) {
//           upcoming.push(event);
//         }
//       }

//       setTodayEvents(today.sort((a, b) => new Date(a.date) - new Date(b.date)));
//       setUpcomingEvents(upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)));

//       // Fetch user bookings
//       const bookingsSnap = await getDocs(
//         query(collection(db, 'bookings'), where('userId', '==', user.uid))
//       );
//       const bookedIds = bookingsSnap.docs.map(doc => doc.data().eventId);
//       setBookedEventIds(bookedIds);
//     } catch (error) {
//       console.error('Error fetching events:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchEvents();
//     }, [])
//   );

//   const bookEvent = async (event) => {
//     const user = auth.currentUser;
//     if (!user) return alert('Please login');

//     try {
//       await addDoc(collection(db, 'bookings'), {
//         userId: user.uid,
//         eventId: event.id,
//         title: event.title,
//         date: event.date,
//       });

//       setBookedEventIds(prev => [...prev, event.id]);
//     } catch (err) {
//       alert('Booking failed');
//       console.error(err);
//     }
//   };

//   const renderEvent = (item) => {
//     const isBooked = bookedEventIds.includes(item.id);

//     return (
//       <View style={styles.card}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text>{item.bio}</Text>
//         <Text style={styles.date}>📅 {item.date}</Text>
//         {isBooked ? (
//           <Text style={styles.booked}>✅ Booked</Text>
//         ) : (
//           <Button title="Book Now" onPress={() => bookEvent(item)} />
//         )}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>🎯 Today's Dog Events</Text>
//       {todayEvents.length === 0 ? (
//         <Text style={styles.emptyText}>No events today</Text>
//       ) : (
//         <FlatList
//           data={todayEvents}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => renderEvent(item)}
//         />
//       )}

//       <Text style={styles.header}>📆 Upcoming Dog Events</Text>
//       {upcomingEvents.length === 0 ? (
//         <Text style={styles.emptyText}>No upcoming events</Text>
//       ) : (
//         <FlatList
//           data={upcomingEvents}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => renderEvent(item)}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1, backgroundColor: '#fff' },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginTop: 20,
//     textAlign: 'center',
//   },
//   card: {
//     backgroundColor: '#f9f9f9',
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   title: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
//   date: { marginVertical: 6, fontStyle: 'italic', color: '#666' },
//   booked: { color: 'green', fontWeight: 'bold', marginTop: 10 },
//   emptyText: { textAlign: 'center', fontStyle: 'italic', marginTop: 10, color: '#999' },
// });
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useFocusEffect } from 'expo-router';

export default function HomeScreen() {
  const [todayEvents, setTodayEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [bookedEventIds, setBookedEventIds] = useState([]);

  const fetchEvents = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const snap = await getDocs(collection(db, 'events'));
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];

      const allEvents = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const today = [];
      const upcoming = [];

      for (const event of allEvents) {
        const eventDate = new Date(event.date);
        const eventStr = event.date;
        if (eventStr === todayStr) {
          today.push(event);
        } else if (new Date(eventStr) > now) {
          upcoming.push(event);
        }
      }

      setTodayEvents(today.sort((a, b) => new Date(a.date) - new Date(b.date)));
      setUpcomingEvents(upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)));

      // Fetch user bookings
      const bookingsSnap = await getDocs(
        query(collection(db, 'bookings'), where('userId', '==', user.uid))
      );
      const bookedIds = bookingsSnap.docs.map(doc => doc.data().eventId);
      setBookedEventIds(bookedIds);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  const bookEvent = async (event) => {
    const user = auth.currentUser;
    if (!user) return alert('Please login');

    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        eventId: event.id,
        title: event.title,
        date: event.date,
      });

      setBookedEventIds(prev => [...prev, event.id]);
    } catch (err) {
      alert('Booking failed');
      console.error(err);
    }
  };

  const renderEvent = (item) => {
    const isBooked = bookedEventIds.includes(item.id);

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>🐶</Text>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Text style={styles.bio}>{item.bio}</Text>
        <Text style={styles.date}>📅 {item.date}</Text>
        {isBooked ? (
          <View style={styles.bookedBadge}>
            <Text style={styles.bookedBadgeText}>Booked!</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.bookButton}
            activeOpacity={0.9}
            onPress={() => bookEvent(item)}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.screenTitle}>🐾 Dog Event Booking</Text>
      <Text style={styles.sectionHeader}>🎯 Today's Dog Events</Text>
      {todayEvents.length === 0 ? (
        <Text style={styles.emptyText}>No events today</Text>
      ) : (
        <FlatList
          data={todayEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderEvent(item)}
          scrollEnabled={false}
        />
      )}

      <Text style={styles.sectionHeader}>📆 Upcoming Dog Events</Text>
      {upcomingEvents.length === 0 ? (
        <Text style={styles.emptyText}>No upcoming events</Text>
      ) : (
        <FlatList
          data={upcomingEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderEvent(item)}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
}

const ACCENT = '#ff914d';
const CARD_BG = '#fff7f2';
const CARD_BORDER = '#ffe0c2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f3',
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: ACCENT,
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 8,
    letterSpacing: 1.3,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 14,
    marginTop: 28,
    textAlign: 'center',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: CARD_BORDER,
    padding: 18,
    marginBottom: 18,
    marginHorizontal: 18,
    shadowColor: '#ff914d',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  bio: {
    color: '#555',
    marginBottom: 9,
    marginLeft: 2,
    fontSize: 15.5,
    fontStyle: 'italic',
  },
  date: {
    marginVertical: 5,
    fontStyle: 'italic',
    color: '#b86c2c',
    fontWeight: '600',
    fontSize: 15,
  },
  bookedBadge: {
    backgroundColor: '#d0f5c8',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 14,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'flex-end',
  },
  bookedBadgeText: {
    color: '#2e8b57',
    fontWeight: 'bold',
    fontSize: 15.5,
  },
  bookButton: {
    backgroundColor: ACCENT,
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 2,
    elevation: 2,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16.5,
    letterSpacing: 0.4,
  },
  emptyText: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
    color: '#b8b8b8',
    fontSize: 15.5,
    marginBottom: 12,
  },
});