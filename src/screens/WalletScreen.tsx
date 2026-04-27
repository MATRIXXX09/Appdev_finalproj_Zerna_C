import React, { FC, useEffect } from 'react';
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
import { FETCH_WALLET } from '../app/actions';

const WalletScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { wallet } = useSelector(state => state.bookings);
  const { data: authData } = useSelector(state => state.auth);

  useEffect(() => {
    // Fetch wallet data when screen loads
    if (authData?.token) {
      dispatch({ type: FETCH_WALLET });
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
        <Text style={styles.headerTitle}>Wallet</Text>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        {wallet.isLoading ? (
          <ActivityIndicator color="#000" size="large" style={{ marginVertical: 20 }} />
        ) : (
          <>
            <Text style={styles.balanceAmount}>₱{wallet.balance.toFixed(2)}</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Add Funds</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Transactions */}
      <View style={styles.transactionsSection}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        {wallet.isLoading ? (
          <ActivityIndicator color="#22C55E" size="small" />
        ) : wallet.transactions.length > 0 ? (
          wallet.transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionType}>{transaction.type}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.amount > 0
                 ? styles.amountPositive
                    : styles.amountNegative,
                ]}
              >
                {transaction.amount > 0 ? '+' : ''}₱{Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No transactions yet</Text>
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
  balanceCard: {
    margin: 16,
    backgroundColor: 'linear-gradient(135deg, #22C55E, #10B981)',
    borderRadius: 16,
    padding: 24,
  },
  balanceLabel: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#000',
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  transactionsSection: {
    paddingHorizontal: 16,
  },
  transactionsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDate: {
    color: '#999',
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  amountPositive: {
    color: '#22C55E',
  },
  amountNegative: {
    color: '#DC143C',
  },
  noDataText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
  spacer: {
    height: 40,
  },
});

export default WalletScreen;



