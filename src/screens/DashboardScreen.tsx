import React, { FC, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';

const DashboardScreen = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [selectedMode, setSelectedMode] = useState(null);

  const transportModes = [
    { id: 1, name: 'Delivery', icon: '🚚' },
    { id: 2, name: 'Habal-Habal', icon: '🏍️' },
    { id: 3, name: 'Logistics', icon: '📦' },
  ];

  const handleBookRide: FC = () => {
    if (!pickupLocation || !dropoffLocation || !selectedMode) {
      alert('Please fill in all fields');
      return;
    }
    // TODO: Navigate to booking confirmation or payment
    navigation.navigate('BookingDetails', {
      pickup: pickupLocation,
      dropoff: dropoffLocation,
      mode: selectedMode,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image
            source={require('../assets/HABAL.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationTabs}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Tracker</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Route Section */}
      <View style={styles.routeSection}>
        <Text style={styles.sectionTitle}>Route (Max. 20 Stops)</Text>
        
        <View style={styles.locationInputGroup}>
          <View style={styles.locationInput}>
            <Text style={styles.locationIcon}>📍</Text>
            <TextInput
              style={styles.input}
              placeholder="Pick-up location"
              placeholderTextColor="#666"
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.locationInput}>
            <Text style={styles.locationIcon}>📍</Text>
            <TextInput
              style={styles.input}
              placeholder="Drop-off location"
              placeholderTextColor="#666"
              value={dropoffLocation}
              onChangeText={setDropoffLocation}
            />
          </View>
        </View>
      </View>

      {/* Transportation Mode Section */}
      <View style={styles.modeSection}>
        <Text style={styles.sectionTitle}>Select mode of Transportation:</Text>
        
        <View style={styles.modesGrid}>
          {transportModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.modeCard,
                selectedMode === mode.id && styles.modeCardActive,
              ]}
              onPress={() => setSelectedMode(mode.id)}
            >
              <Text style={styles.modeIcon}>{mode.icon}</Text>
              <Text style={styles.modeName}>{mode.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Map Section */}
      <View style={styles.mapSection}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>📍 Map View</Text>
          <Text style={styles.mapSubtext}>Route visualization will appear here</Text>
        </View>
      </View>

     
      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
        <Text style={styles.bookButtonText}>BOOK NOW</Text>
      </TouchableOpacity>

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
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  logoutButton: {
    backgroundColor: '#DC143C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  navigationTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  activeTab: {
    backgroundColor: '#DC143C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  inactiveTab: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  inactiveTabText: {
    color: '#fff',
    fontSize: 12,
  },
  routeSection: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  locationInputGroup: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  locationIcon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    padding: 0,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
  },
  modeSection: {
    margin: 16,
  },
  modesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  modeCard: {
    flex: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.5)',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
  },
  modeCardActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.3)',
    borderColor: '#22C55E',
  },
  modeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  modeName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  mapSection: {
    margin: 16,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.5)',
    borderRadius: 12,
    overflow: 'hidden',
    height: 250,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#22C55E',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  mapSubtext: {
    color: '#999',
    fontSize: 12,
  },
  descriptionSection: {
    margin: 16,
    padding: 12,
    backgroundColor: 'rgba(220, 20, 60, 0.1)',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#DC143C',
  },
  descriptionTitle: {
    color: '#22C55E',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#999',
    fontSize: 12,
    lineHeight: 18,
  },
  bookButton: {
    marginHorizontal: 16,
    marginBottom: 32,
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  spacer: {
    height: 40,
  },
});

export default DashboardScreen;



