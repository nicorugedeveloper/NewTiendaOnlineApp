import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../types";

interface ProductModalProps {
  product: Product | null;
  visible: boolean;
  onClose: () => void;
  onAddToWishlist: (product: Product) => void;
}

const { width, height } = Dimensions.get("window");

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  visible,
  onClose,
  onAddToWishlist,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const handleAddToWishlist = () => {
    console.log("Adding to wishlist:", product.title);
    onAddToWishlist(product);
    onClose(); // Cierra el modal después de añadir a la lista de deseos
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            {product.images.length > 0 ? (
              <Image
                source={{ uri: product.images[currentImageIndex] }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text>No image available</Text>
              </View>
            )}
            {product.images.length > 1 && (
              <View style={styles.imageNavigation}>
                <TouchableOpacity
                  onPress={() =>
                    setCurrentImageIndex((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentImageIndex === 0}
                >
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={currentImageIndex === 0 ? "#ccc" : "black"}
                  />
                </TouchableOpacity>
                <Text>{`${currentImageIndex + 1}/${product.images.length}`}</Text>
                <TouchableOpacity
                  onPress={() =>
                    setCurrentImageIndex((prev) =>
                      Math.min(product.images.length - 1, prev + 1)
                    )
                  }
                  disabled={currentImageIndex === product.images.length - 1}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={
                      currentImageIndex === product.images.length - 1
                        ? "#ccc"
                        : "black"
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
            <Text style={styles.modalTitle}>{product.title}</Text>
            <Text style={styles.modalPrice}>${product.price}</Text>
            <Text style={styles.modalDescription}>{product.description}</Text>
            <TouchableOpacity
              style={styles.wishlistButton}
              onPress={handleAddToWishlist}
            >
              <Text style={styles.wishlistButtonText}>Add to Wishlist</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: width * 0.9,
    maxHeight: height * 0.8,
  },
  modalContent: {
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  modalImage: {
    borderRadius: 8,
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  placeholderImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  imageNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalPrice: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  modalDescription: {
    marginBottom: 15,
  },
  wishlistButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  wishlistButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductModal;
