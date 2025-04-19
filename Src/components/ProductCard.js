import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ item, handleLiked }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product_Details", { item })}
      style={styles.container}
    >
      {/* Product Image */}
      <Image
        source={{ uri: item.image?.trim() || "https://via.placeholder.com/256" }}
        style={styles.coverImage}
      />

      {/* Product Details */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      {/* Like Button */}
      <TouchableOpacity
        onPress={() => handleLiked(item)}
        style={styles.likeContainer}
      >
        <AntDesign
          name={item.isLiked ? "heart" : "hearto"}
          size={20}
          color={"#E55B5B"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    position: "relative",
  },
  coverImage: {
    height: 256,
    width: "90%",
    borderRadius: 20,
    marginVertical: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: "#444444",
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    color: "#9C9C9C",
    fontWeight: "600",
  },
  content: {
    paddingLeft: 15,
  },
  likeContainer: {
    height: 34,
    width: 34,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
    position: "absolute",
    top: 20,
    right: 20,
    elevation: 5, // shadow
  },
});
