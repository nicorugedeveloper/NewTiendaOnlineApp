import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../types";
import { Ionicons } from "@expo/vector-icons";

interface ProductItemProps {
  item: Product;
  onPress: (product: Product) => void;
  onRemove?: (productId: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, onPress, onRemove  }) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <View style={styles.productItem}>
      <Image
        source={{
          uri:
            item.images.find((img) => img) || "https://via.placeholder.com/150",
        }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text
          style={styles.productTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      {onRemove && (
        <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(item.id)}>
          <Ionicons name="close-circle" size={24} color="red" />
        </TouchableOpacity>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  productItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  productItemTitel: {
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 5,
    marginLeft: 5,
  },
  productItemText: {
    padding: 8,
    gap: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    margin: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    flexShrink: 1,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default ProductItem;
