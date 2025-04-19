import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const CartCard = ({ item, addToCart, deleteItemfromCart }) => {
  const [selectedSize, setSelectedSize] = useState(item.size || null);
  const [selectedColor, setSelectedColor] = useState(item.color || null);

  const fallbackImage = "https://via.placeholder.com/150";

  const imageSource = item.image?.startsWith("http") ? { uri: item.image } : { uri: fallbackImage };

  const handleSelection = (size, color) => {
    setSelectedSize(size);
    setSelectedColor(color);
    addToCart?.({ ...item, size, color }); // addToCart might be undefined here
  };

  return (
    <View style={styles.container}>
      <Image
  source={{
    uri:
      item.image && item.image.trim().length > 0
        ? item.image.trim()
        : fallbackImage,
  }}
  style={styles.coverImage}
  resizeMode="cover"
  onError={(e) => console.log("Image failed to load:", e.nativeEvent.error)}
/>


      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title || "Untitled"}</Text>
        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.circleSizeContainer}>
          {item.colors?.map((color, index) => (
            <TouchableOpacity key={index} onPress={() => handleSelection(selectedSize, color)}>
              <View style={[styles.circle, { backgroundColor: color }, selectedColor === color && styles.selectedBorder]} />
            </TouchableOpacity>
          ))}

          {item.sizes?.map((size, index) => (
            <TouchableOpacity key={index} onPress={() => handleSelection(size, selectedColor)}>
              <View style={[styles.sizecircle, selectedSize === size && styles.selectedBorder]}>
                <Text style={styles.sizeText}>{size}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={() => deleteItemfromCart(item)}>
        <FontAwesome6 name={"trash"} color={"#F68CB5"} size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  coverImage: {
    height: 120,
    width: 100,
    borderRadius: 12,
    backgroundColor: "#ddd",
  },
  cardContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    color: "#444",
    fontWeight: "500",
  },
  price: {
    fontSize: 16,
    color: "#797979",
    marginVertical: 5,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  circleSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  sizecircle: {
    backgroundColor: "#F68CB5",
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: "red",
  },
});
