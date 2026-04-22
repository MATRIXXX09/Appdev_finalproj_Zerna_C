import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

const BookingDetailsScreen = ({ navigation, route }) => {
  const { pickup, dropoff, mode } = route.params;
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmBooking = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
      </View>

      <View style={styles.contentCard}>
        <View style={styles.routeDetails}>
          <View style={styles.routeItem}>
            <Text style={styles.routeLabel}>Pick-up Location</Text>
            <Text style={styles.routeValue}>{pickup}</Text>
          </View>

          <View style={styles.routeConnector}>
            <View style={styles.connectorDot} />
            <View style={styles.connectorLine} />
            <View style={styles.connectorDot} />
          </View>

          <View style={styles.routeItem}>
            <Text style={styles.routeLabel}>Drop-off Location</Text>
            <Text style={styles.routeValue}>{dropoff}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.transportMode}>
          <Text style={styles.modeLabel}>Transportation Mode</Text>
          <View style={styles.modeDisplay}>
            <Text style={styles.modeEmoji}>
              {mode === 1 ? '🚚' : mode === 2 ? '🏍️' : '📦'}
            </Text>
            <Text style={styles.modeName}>
              {mode === 1 ? 'Delivery' : mode === 2 ? 'Habal-Habal' : 'Logistics'}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.priceEstimate}>
          <Text style={styles.priceLabel}>Estimated Price</Text>
          <Text style={styles.priceValue}>₱599.00</Text>
        </View>
      </View>

      {isConfirmed && (
        <View style={styles.successMessage}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successText}>Booking Confirmed!</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
        disabled={isConfirmed}
      >
        <Text style={styles.confirmButtonText}>
          {isConfirmed ? 'Confirmed!' : 'CONFIRM BOOKING'}
        </Text>
      </TouchableOpacity>
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
  },
  backButton: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
  },
  headerTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  contentCard: {
    margin: 16,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  routeDetails: {
    marginBottom: 16,
  },
  routeItem: {
    marginBottom: 12,
  },
  routeLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  routeValue: {
    color: '#22C55E',
    fontSize: 14,
    fontWeight: '600',
  },
  routeConnector: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  connectorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  connectorLine: {
    width: 2,
    height: 30,
    backgroundColor: '#22C55E',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    marginVertical: 16,
  },
  transportMode: {
    marginBottom: 16,
  },
  modeLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 8,
  },
  modeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  modeEmoji: {
    fontSize: 24,
  },
  modeName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  priceEstimate: {
    marginBottom: 16,
  },
  priceLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  priceValue: {
    color: '#DC143C',
    fontSize: 24,
    fontWeight: '700',
  },
  successMessage: {
    alignItems: 'center',
    marginVertical: 20,
  },
  successIcon: {
    fontSize: 48,
    color: '#22C55E',
    marginBottom: 8,
  },
  successText: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    marginHorizontal: 16,
    marginBottom: 32,
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default BookingDetailsScreen;
