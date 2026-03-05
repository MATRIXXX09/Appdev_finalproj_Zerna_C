import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { IMG, ROUTES } from '../utils';

import { useDispatch } from 'react-redux';
import { resetLogin } from '../app/reducers/auth';

const HomeScreen = () => {
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
      {/* Header */}
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
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.subtitleText}>Discover the latest K-pop trends</Text>
        </View>

        {/* Categories */}
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

        {/* Featured Products */}
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

        {/* Trending Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <View style={styles.trendingCard}>
            <Image source={{ uri: IMG.LOGO }} style={styles.trendingImage} />
            <View style={styles.trendingInfo}>
              <Text style={styles.trendingTitle}>New BTS Album Drop!</Text>
              <Text style={styles.trendingSubtitle}>Limited edition available now</Text>
              <TouchableOpacity style={styles.shopNowButton}>
                <Text style={styles.shopNowText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
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
    color: '#666666',
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333333',
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
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffb6c1',
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#d946ef',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ffb6c1',
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ff1493',
  },
  addToCartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff1493',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  trendingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffc0cb',
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  trendingImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  trendingInfo: {
    flex: 1,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#d946ef',
    marginBottom: 5,
  },
  trendingSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  shopNowButton: {
    backgroundColor: '#ff1493',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
});

export default HomeScreen;
