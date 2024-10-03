import React, { useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Product } from '../types';
import ProductItem from '../components/ProductItem';
import { loadWishlist, removeFromWishlist } from '../utils/wishlistStorage';
import { useFocusEffect } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;

const WishlistScreen: React.FC<Props> = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSavedWishlist = useCallback(async () => {
    setIsLoading(true);
    try {
      const savedWishlist = await loadWishlist();
      console.log('WishlistScreen: Loaded wishlist', savedWishlist);
      setWishlist(savedWishlist);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log('WishlistScreen: Screen focused, loading wishlist');
      loadSavedWishlist();
    }, [loadSavedWishlist])
  );

  const handleRemoveFromWishlist = async (productId: number) => {
    console.log('WishlistScreen: Removing product from wishlist', productId);
    try {
      await removeFromWishlist(productId);
      await loadSavedWishlist();
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          renderItem={({ item }) => (
            <ProductItem
              item={item}
              onPress={() => console.log('Product pressed:', item.title)}
              onRemove={() => handleRemoveFromWishlist(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>Your wishlist is empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});

export default WishlistScreen;