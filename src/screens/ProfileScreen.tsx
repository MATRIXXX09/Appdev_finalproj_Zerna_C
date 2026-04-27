import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGOUT } from '../app/actions';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data: authData, isLoading } = useSelector(state => state.auth);

  const userProfile = {
    name: authData?.user?.firstName && authData?.user?.lastName
      ? `${authData.user.firstName} ${authData.user.lastName}`
      : authData?.user?.email || 'User',
    email: authData?.user?.email || 'user@example.com',
    phone: authData?.user?.phoneNumber || 'Not provided',
    avatar: '👤',
    rating: 4.8,
    rides: 0,
    joinDate: 'Joined March 2024',
  };

  const handleLogout: FC = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            dispatch({ type: USER_LOGOUT, payload: authData?.token });
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/HABAL.png')}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{userProfile.avatar}</Text>
        </View>
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userEmail}>{userProfile.email}</Text>
        <Text style={styles.joinDate}>{userProfile.joinDate}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>⭐ {userProfile.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.dividerVertical} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>🚗 {userProfile.rides}</Text>
            <Text style={styles.statLabel}>Rides</Text>
          </View>
        </View>
      </View>

      {/* Account Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={styles.infoValue}>{userProfile.phone}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Email Address</Text>
          <Text style={styles.infoValue}>{userProfile.email}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Account Status</Text>
          <Text style={styles.infoValue}>✓ Active</Text>
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>🔐 Change Password</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>🔔 Notifications</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>❓ Help & Support</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.logoutButton, isLoading && styles.logoutButtonDisabled]}
        onPress={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.logoutButtonText}>LOGOUT</Text>
        )}
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
  profileCard: {
    margin: 16,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  avatar: {
    fontSize: 40,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    color: '#22C55E',
    fontSize: 12,
    marginBottom: 4,
  },
  joinDate: {
    color: '#999',
    fontSize: 11,
    marginBottom: 16,
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(34, 197, 94, 0.2)',
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#999',
    fontSize: 11,
  },
  dividerVertical: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
  },
  infoItem: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  infoLabel: {
    color: '#999',
    fontSize: 11,
    marginBottom: 4,
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  settingItem: {
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  settingLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  arrow: {
    color: '#22C55E',
    fontSize: 18,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#DC143C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  spacer: {
    height: 40,
  },
});

export default ProfileScreen;



