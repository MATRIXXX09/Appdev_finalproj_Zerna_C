import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { IMG } from '../utils';

const ShopScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const products = [
    { id: 1, title: 'BTS - Map of the Soul: 7', price: '$29.99', originalPrice: '$39.99', discount: '25%', image: IMG.LOGO, rating: 4.8, reviews: 1247 },
    { id: 2, title: 'Blackpink - Born Pink Album', price: '$24.99', originalPrice: '$34.99', discount: '29%', image: IMG.LOGO, rating: 4.9, reviews: 2156 },
    { id: 3, title: 'Twice - Formula of Love', price: '$26.99', originalPrice: '$36.99', discount: '27%', image: IMG.LOGO, rating: 4.7, reviews: 987 },
    { id: 4, title: 'Stray Kids - ODDINARY', price: '$22.99', originalPrice: '$32.99', discount: '30%', image: IMG.LOGO, rating: 4.6, reviews: 1543 },
    { id: 5, title: 'TXT - The Chaos Chapter', price: '$21.99', originalPrice: '$31.99', discount: '31%', image: IMG.LOGO, rating: 4.5, reviews: 876 },
    { id: 6, title: 'ITZY - Crazy in Love', price: '$23.99', originalPrice: '$33.99', discount: '29%', image: IMG.LOGO, rating: 4.8, reviews: 1234 },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search K-pop merchandise..."
          placeholderTextColor="#d9a6d4"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Categories Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {['All', 'Albums', 'Merch', 'Lightsticks', 'Photobooks', 'Accessories'].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryFilter, index === 0 && styles.activeCategory]}
            >
              <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productsContainer}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}</Text>
              </View>

              <Image source={{ uri: product.image }} style={styles.productImage} />

              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {product.title}
                </Text>

                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingStars}>{renderStars(product.rating)}</Text>
                  <Text style={styles.ratingText}>
                    {product.rating} ({product.reviews})
                  </Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>{product.price}</Text>
                  <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                </View>

                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ffc0cb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#d946ef',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffe0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    borderWidth: 2,
    borderColor: '#ffb6c1',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#ff1493',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  categoryFilter: {
    backgroundColor: '#ffe0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#ffb6c1',
  },
  activeCategory: {
    backgroundColor: '#ff1493',
    borderColor: '#ff1493',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#d946ef',
  },
  activeCategoryText: {
    color: '#ffffff',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ffb6c1',
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ff1493',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 1,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  productImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingStars: {
    fontSize: 12,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#666666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: '#ff1493',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999999',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#ff1493',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default ShopScreen;