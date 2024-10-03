import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getProducts, getCategories } from "../services/api.service";
import { addToWishlist, loadWishlist } from "../utils/wishlistStorage";
import { Product, Category } from "../types";
import { Ionicons } from "@expo/vector-icons";
import ProductItem from "../components/ProductItem";
import ProductModal from "../components/ProductModal";
import { useFocusEffect } from "@react-navigation/native";

const ITEMS_PER_PAGE = 10;

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const loadSavedWishlist = useCallback(async () => {
    const savedWishlist = await loadWishlist();
    console.log('HomeScreen: Loaded wishlist', savedWishlist);
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    fetchData();
    loadSavedWishlist();
  }, [loadSavedWishlist]);

  useFocusEffect(
    useCallback(() => {
      loadSavedWishlist();
    }, [loadSavedWishlist])
  );

  const handleAddToWishlist = useCallback(async (product: Product) => {
    console.log('HomeScreen: Adding to wishlist', product.title);
    await addToWishlist(product);
    await loadSavedWishlist();
  }, [loadSavedWishlist]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedCategory
        ? product.category.id.toString() === selectedCategory
        : true
    );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.categoryPicker}
      >
        <Picker.Item label="All Categories" value="" />
        {categories.map((category) => (
          <Picker.Item
            key={category.id}
            label={category.name}
            value={category.id.toString()}
          />
        ))}
      </Picker>
      <FlatList
        data={paginatedProducts}
        renderItem={({ item }) => (
          <ProductItem item={item} onPress={() => setSelectedProduct(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={currentPage === 1 ? "#ccc" : "#000"}
          />
        </TouchableOpacity>
        <Text>{currentPage}</Text>
        <TouchableOpacity
          onPress={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * ITEMS_PER_PAGE >= filteredProducts.length}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={
              currentPage * ITEMS_PER_PAGE >= filteredProducts.length
                ? "#ccc"
                : "#000"
            }
          />
        </TouchableOpacity>
      </View>
      <ProductModal 
        product={selectedProduct} 
        visible={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onAddToWishlist={handleAddToWishlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  categoryPicker: {
    height: 50,
    marginBottom: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default HomeScreen;