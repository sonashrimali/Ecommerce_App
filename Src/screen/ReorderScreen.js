import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"; 

const ReorderScreen = () => {
  const navigation = useNavigation();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Simulating API fetch
    const fetchData = async () => {
      const data = {
        products: [
          {
            id: 1,
            image: "https://res.cloudinary.com/doirsw63f/image/upload/v1739025209/img9_rvhe1v.jpg",
            title: "Wool Crop Jacket",
            price: 49.99,
          },
          {
            id: 2,
            image: "https://res.cloudinary.com/doirsw63f/image/upload/v1739025208/img7_fjp7c1.jpg",
            title: "Korean Style Jacket",
            price: 39.99,
          },
          {
            id: 3,
            image: "https://res.cloudinary.com/doirsw63f/image/upload/v1739025208/img6_uffhad.jpg",
            title: "Leather Jacket",
            price: 29.99,
          },
          {
            id: 4,
            image: "https://res.cloudinary.com/doirsw63f/image/upload/v1739025207/img4_og5xsu.jpg",
            title: "Long Coats",
            price: 99.99,
          },
        ],
      };
      setOrderHistory(data.products);
    };

    fetchData();
  }, []);

  const handleReorder = (item) => {
    alert(`Reordered: ${item.title} for $${item.price}`);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Reorder Your Favorites</Text>
      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.button} onPress={() => handleReorder(item)}>
                <Text style={styles.buttonText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCEEF5",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 50, // Adjusted for back button space
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#FF6699",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ReorderScreen;
