import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";



// URL for the product image
const ImageUrl = "https://res.cloudinary.com/doirsw63f/image/upload/v1739025208/img7_fjp7c1.jpg";

// Available sizes for the product
const sizes = ["S", "M", "L", "XL", "XXL"];

// Color options for selection
const colorsArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const route = useRoute();
  const item = route.params?.item || {};  // Extract product details from navigation parameters

  // State for selected size and color
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const handleAddToCart = (item) => {
    const productWithSelection = {
      ...item,
      size: selectedSize,
      color: selectedColor,
    };
  
    addToCart(productWithSelection);
    navigation.navigate("MainTabs", { screen: "Cart" });
  };
  
  
  return (
    <LinearGradient
      colors={["#FDF0F3", "#FFFBFC"]}
      style={styles.container}
    >
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Product Image */}
      <Image source={{ uri: item.image?.trim() }} style={styles.coverImage} />


      {/* Product Title & Price */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.title, styles.price]}>${item.price}
        </Text>
      </View>

      {/* Size Selection */}
      <Text style={[styles.title, styles.sizeText]}>Size</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size, index) => {
          return (
            <TouchableOpacity
              key={index} // Added key prop to prevent React warning
              style={[styles.sizeValueContainer, selectedSize === size && styles.selectedSize]}
              onPress={() => {
                setSelectedSize(size);
              }}
            >
              <Text style={[
                styles.sizeValue,
                selectedSize === size && { color: "#E55B5B" }, // Highlight selected size
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Color Selection */}
      <Text style={[styles.title, styles.colorText]}>Colors</Text>
      <View style={styles.colorContainer}>
        {colorsArray.map((color, index) => {
          return (
            <TouchableOpacity
              key={index} // Added key prop to prevent React warning
              onPress={() => {
                setSelectedColor(color)
              }}
              style={[
                styles.circleBorder,
                selectedColor === color && {
                  borderColor: color,
                  borderWidth: 2, // Highlight selected color
                },
              ]}
            >
              <View style={[styles.circle, { backgroundColor: color }]} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.button} onPress={() => {
        handleAddToCart(item);
      }}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up full screen
  },
  headerContainer: {
    padding: 20, // Adds padding around header
  },
  coverImage: {
    width: "100%", // Full width of the screen
    height: 420, // Fixed height for image
  },
  contentContainer: {
    flexDirection: "row", // Aligns title & price in a row
    justifyContent: "space-between", // Spaces them apart
    marginHorizontal: 20, // Adds horizontal margin
    marginVertical: 20, // Adds vertical margin
  },
  title: {
    fontSize: 20, // Font size
    color: "#444444", // Dark gray color
    fontWeight: "500", // Medium font weight
  },
  price: {
    color: "#4D4C4C", // Slightly lighter gray for price
  },
  sizeText: {
    marginHorizontal: 20, // Proper alignment
  },
  sizeContainer: {
    flexDirection: "row", // Align sizes in a row
    marginHorizontal: 20, // Adds margin on sides
  },
  sizeValueContainer: {
    height: 36,
    width: 36, // Fixed incorrect "Width" to "width"
    borderRadius: 18, // Rounded corners
    backgroundColor: "#FFFFFF", // White background
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10, // Spacing between sizes
  },
  sizeValue: {
    fontSize: 18, // Font size for sizes
    fontWeight: "600", // Bold text
  },
  colorText: {
    marginHorizontal: 20, // Align with other elements
    marginTop: 10, // Add spacing from sizes
  },
  colorContainer: {
    flexDirection: "row", // Arrange colors in a row
    marginHorizontal: 20, // Align colors properly
  },
  circle: {
    height: 36, // Circle size
    width: 36,
    borderRadius: 20, // Fully rounded
  },
  circleBorder: {
    marginHorizontal: 5, // Space between color options
    height: 48,
    width: 48,
    borderRadius: 24, // Rounded border
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#E96E6E",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    elevation: 4, // Optional shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  
});
