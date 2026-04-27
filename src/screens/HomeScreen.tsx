import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { IMG, ROUTES } from '../utils';
import { useDispatch } from 'react-redux';
import { resetLogin } from '../app/reducers/auth';

const HomeScreen: FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const featuredItems = [
    { id: 1, title: 'BTS Album', price: '$29.99', image: IMG.LOGO },
    { id: 2, title: 'Blackpink Merch', price: '$19.99', image: IMG.LOGO },
    { id: 3, title: 'Twice Photobook', price: '$39.99', image: IMG.LOGO },
    { id: 4, title: 'Stray Kids Lightstick', price: '$49.99', image: IMG.LOGO },
  ];

  const categories = [
    { id: 1, name: 'Albums', icon: '💿' },
    { id: 2, name: 'Merch', icon: '👕' },
    { id: 3, name: 'Lightsticks', icon: '✨' },
    { id: 4, name: 'Photobooks', icon: '📖' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KPOP UNIVERSE</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => dispatch(resetLogin())}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subtitleText}>Discover the latest K-pop trends</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.productsGrid}>
            {featuredItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>+</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ffc0cb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#d946ef',
    letterSpacing: 1,
  },
  logoutButton: {
    backgroundColor: '#ff1493',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
  },
  scrollContainer: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ffc0cb',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#d946ef',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#333',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffc0cb',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ffc0cb',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ff1493',
    marginTop: 5,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#ff1493',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 18,
  },
  trendingCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ffc0cb',
  },
  trendingImage: {
    width: '40%',
    height: 150,
    backgroundColor: '#f0f0f0',
  },
  trendingInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#d946ef',
    marginBottom: 5,
  },
  trendingSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  shopNowButton: {
    backgroundColor: '#ff1493',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
  },
});

export default HomeScreen;


