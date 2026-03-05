import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { IMG } from '../utils';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('posts');

  const userStats = {
    followers: '12.5K',
    following: '890',
    products: '45'
  };

  const posts = [
    { id: 1, image: IMG.LOGO, type: 'product', likes: 234, comments: 12 },
    { id: 2, image: IMG.LOGO, type: 'review', likes: 456, comments: 23 },
    { id: 3, image: IMG.LOGO, type: 'product', likes: 189, comments: 8 },
    { id: 4, image: IMG.LOGO, type: 'review', likes: 321, comments: 15 },
    { id: 5, image: IMG.LOGO, type: 'product', likes: 567, comments: 28 },
    { id: 6, image: IMG.LOGO, type: 'review', likes: 198, comments: 9 },
  ];

  const reviews = [
    { id: 1, product: 'BTS Album', rating: 5, comment: 'Amazing quality! Fast shipping too! 💜', date: '2 days ago' },
    { id: 2, product: 'Blackpink Lightstick', rating: 5, comment: 'Perfect for concerts! Love it! ✨', date: '1 week ago' },
    { id: 3, product: 'Twice Photobook', rating: 4, comment: 'Beautiful photos, great packaging!', date: '2 weeks ago' },
  ];

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: IMG.LOGO }} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.username}>@kpopfan123</Text>
              <Text style={styles.bio}>K-pop enthusiast | Music lover | Fan since 2018 🎵✨</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verified Buyer</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userStats.products}</Text>
              <Text style={styles.statLabel}>Products</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareProfileButton}>
              <Text style={styles.shareProfileText}>Share Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
              Reviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
            onPress={() => setActiveTab('favorites')}
          >
            <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>
              Favorites
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'posts' && (
          <View style={styles.postsGrid}>
            {posts.map((post) => (
              <TouchableOpacity key={post.id} style={styles.postItem}>
                <Image source={{ uri: post.image }} style={styles.postImage} />
                <View style={styles.postOverlay}>
                  <Text style={styles.postType}>
                    {post.type === 'product' ? '🛍️' : '⭐'}
                  </Text>
                  <View style={styles.postStats}>
                    <Text style={styles.postStat}>❤️ {post.likes}</Text>
                    <Text style={styles.postStat}>💬 {post.comments}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.reviewsContainer}>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewProduct}>{review.product}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewRating}>{renderStars(review.rating)}</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
                <View style={styles.reviewActions}>
                  <TouchableOpacity style={styles.reviewAction}>
                    <Text style={styles.reviewActionText}>👍 Helpful</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reviewAction}>
                    <Text style={styles.reviewActionText}>💬 Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'favorites' && (
          <View style={styles.favoritesContainer}>
            <Text style={styles.comingSoonText}>Favorites coming soon! 💖</Text>
            <Text style={styles.comingSoonSubtext}>Save your favorite K-pop products here</Text>
          </View>
        )}
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
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ffc0cb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#d946ef',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ff1493',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    fontSize: 20,
    fontWeight: '900',
    color: '#d946ef',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 18,
  },
  verifiedBadge: {
    backgroundColor: '#ffe0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#ffb6c1',
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ff1493',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#d946ef',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: '#ff1493',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  editProfileText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  shareProfileButton: {
    flex: 1,
    backgroundColor: '#ffe0f0',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffb6c1',
  },
  shareProfileText: {
    color: '#d946ef',
    fontSize: 14,
    fontWeight: '800',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ffe0f0',
  },
  activeTab: {
    borderBottomColor: '#ff1493',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#666666',
  },
  activeTabText: {
    color: '#ff1493',
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 1,
  },
  postItem: {
    width: '33.333%',
    aspectRatio: 1,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: 8,
  },
  postType: {
    fontSize: 16,
  },
  postStats: {
    alignItems: 'flex-end',
  },
  postStat: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '700',
  },
  reviewsContainer: {
    paddingHorizontal: 20,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ffb6c1',
    shadowColor: '#ff1493',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewProduct: {
    fontSize: 16,
    fontWeight: '800',
    color: '#d946ef',
  },
  reviewDate: {
    fontSize: 12,
    color: '#666666',
  },
  reviewRating: {
    fontSize: 14,
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 12,
    lineHeight: 20,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 15,
  },
  reviewAction: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ffe0f0',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffb6c1',
  },
  reviewActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#d946ef',
  },
  favoritesContainer: {
    padding: 40,
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#d946ef',
    marginBottom: 10,
  },
  comingSoonSubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});

export default ProfileScreen;
