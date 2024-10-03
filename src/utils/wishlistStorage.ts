import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types';

const WISHLIST_KEY = 'user_wishlist';

export const saveWishlist = async (wishlist: Product[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(wishlist);
    await AsyncStorage.setItem(WISHLIST_KEY, jsonValue);
    console.log('Wishlist saved:', wishlist);
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
};

export const loadWishlist = async (): Promise<Product[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(WISHLIST_KEY);
    const wishlist = jsonValue != null ? JSON.parse(jsonValue) : [];
    console.log('Wishlist loaded:', wishlist);
    return wishlist;
  } catch (error) {
    console.error('Error loading wishlist:', error);
    return [];
  }
};

export const addToWishlist = async (product: Product): Promise<void> => {
  try {
    const currentWishlist = await loadWishlist();
    if (!currentWishlist.some(item => item.id === product.id)) {
      const newWishlist = [...currentWishlist, product];
      await saveWishlist(newWishlist);
      console.log('Product added to wishlist:', product.title);
    } else {
      console.log('Product already in wishlist:', product.title);
    }
  } catch (error) {
    console.error('Error adding to wishlist:', error);
  }
};

export const removeFromWishlist = async (productId: number): Promise<void> => {
  try {
    const currentWishlist = await loadWishlist();
    const newWishlist = currentWishlist.filter(item => item.id !== productId);
    await saveWishlist(newWishlist);
    console.log('Product removed from wishlist:', productId);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
  }
};