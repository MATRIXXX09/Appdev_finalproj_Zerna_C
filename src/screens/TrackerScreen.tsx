import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_ACTIVE_BOOKINGS, FETCH_COMPLETED_BOOKINGS } from '../app/actions';

const TrackerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { activeBookings, completedBookings } = useSelector(state => state.bookings);
  const { data: authData } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    if (authData?.token) {
      dispatch({ type: FETCH_ACTIVE_BOOKINGS });
      dispatch({ type: FETCH_COMPLETED_BOOKINGS });
    }
  }, [authData?.token, dispatch]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/HABAL.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Tracker</Text>
      </View>

      <View style={styles.tabGroup}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'active' ? (
          <>
            {activeBookings.isLoading ? (
              <ActivityIndicator color="#22C55E" size="large" style={{ marginTop: 20 }} />
            ) : activeBookings.data && activeBookings.data.length > 0 ? (
              activeBookings.data.map((booking) => (
                <TouchableOpacity key={booking.id} style={styles.bookingCard}>
                  <View style={styles.bookingHeader}>
                    <View style={styles.routeInfo}>
                      <Text style={styles.location}>{booking.pickupLocation || booking.from}</Text>
                      <Text style={styles.arrow}>⟶</Text>
                      <Text style={styles.location}>{booking.dropoffLocation || booking.to}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        booking.status === 'In Transit'
                          ? styles.statusActive
                          : styles.statusPending,
                      ]}
                    >
                      <Text style={styles.statusText}>{booking.status}</Text>
                    </View>
                  </View>

                  <View style={styles.progressBar}>
                    <View style={[styles.progress, { width: `${booking.progress || 50}%` }]} />
                  </View>

                  <View style={styles.bookingDetails}>
                    <View style={styles.detail}>
                      <Text style={styles.detailLabel}>Driver</Text>
                      <Text style={styles.detailValue}>{booking.driverName || 'N/A'}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.detailLabel}>Mode</Text>
                      <Text style={styles.detailValue}>{booking.transportMode || booking.mode}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.trackButton}>
                    <Text style={styles.trackButtonText}>View on Map</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>No active bookings</Text>
            )}
          </>
        ) : (
          <>
            {completedBookings.isLoading ? (
              <ActivityIndicator color="#22C55E" size="large" style={{ marginTop: 20 }} />
            ) : completedBookings.data && completedBookings.data.length > 0 ? (
              completedBookings.data.map((booking) => (
                <View key={booking.id} style={styles.bookingCard}>
                  <View style={styles.bookingHeader}>
                    <View style={styles.routeInfo}>
                      <Text style={styles.location}>{booking.pickupLocation || booking.from}</Text>
                      <Text style={styles.arrow}>⟶</Text>
                      <Text style={styles.location}>{booking.dropoffLocation || booking.to}</Text>
                    </View>
                    <View style={[styles.statusBadge, styles.statusCompleted]}>
                      <Text style={styles.statusText}>✓ {booking.status}</Text>
                    </View>
                  </View>

                  <View style={styles.bookingDetails}>
                    <View style={styles.detail}>
                      <Text style={styles.detailLabel}>Date Completed</Text>
                      <Text style={styles.detailValue}>{booking.completedDate || booking.date}</Text>
                    </View>
                    <View style={styles.detail}>
                      <Text style={styles.detailLabel}>Mode</Text>
                      <Text style={styles.detailValue}>{booking.transportMode || booking.mode}</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No completed bookings</Text>
            )}
          </>
        )}
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerLogo: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  tabGroup: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  activeTab: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  tabText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#000',
  },
  content: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  routeInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  location: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  arrow: {
    color: '#22C55E',
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
  },
  statusPending: {
    backgroundColor: 'rgba(220, 20, 60, 0.3)',
  },
  statusCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
  },
  statusText: {
    color: '#22C55E',
    fontSize: 10,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progress: {
    height: '100%',
    backgroundColor: '#22C55E',
  },
  bookingDetails: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  detail: {
    flex: 1,
  },
  detailLabel: {
    color: '#999',
    fontSize: 11,
    marginBottom: 4,
  },
  detailValue: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  trackButton: {
    backgroundColor: '#22C55E',
  noDataText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  spacer: {
    height: 40,
  },
});

export default TrackerScreen;



