import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import { CartContext } from "../context/CartContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

const CartScreen = () => {
  const { carts, totalPrice, deleteItemfromCart } = useContext(CartContext);
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleCheckout = async () => {
    if (!currentUser) {
      Alert.alert("Error", "User not logged in.");
      return;
    }

    if (!carts || carts.length === 0) {
      Alert.alert(
        "Cart Empty",
        "Please add items to your cart before checking out."
      );
      return;
    }

    try {
      const orderItems = carts.map(({ firestoreId, ...item }) => ({
        name: item.name ?? "Unknown",
        image: item.image ?? null,
        price: item.price ?? 0,
        quantity: item.quantity ?? 1,
        color: item.color ?? "N/A",
        size: item.size ?? "N/A",
      }));

      await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        items: orderItems,
        totalAmount: parseFloat(totalPrice),
        orderDate: Timestamp.now(),
      });

      console.log("Order placed by:", currentUser.email);

      Alert.alert("Success", "Your order has been placed successfully.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("OrderScreen"),
        },
      ]);
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert(
        "Error",
        "There was an issue placing your order. Please try again."
      );
    }
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header isCart={true} />
      </View>

      <FlatList
        data={carts}
        ListHeaderComponent={
          !carts || carts.length === 0 ? (
            <Text style={styles.emptyCartText}>Your cart is empty.</Text>
          ) : null
        }
        renderItem={({ item }) => (
          <CartCard item={item} deleteItemfromCart={deleteItemfromCart} />
        )}
        keyExtractor={(item, index) =>
          item.firestoreId || item.id?.toString() || `cart-${index}`
        }
        ListFooterComponent={
          <>
            <View style={styles.priceContainer}>
              <View style={styles.priceandTitle}>
                <Text style={styles.Text}>Total:</Text>
                <Text style={styles.Text}>${totalPrice}</Text>
              </View>
              <View style={styles.priceandTitle}>
                <Text style={styles.Text}>Shipping:</Text>
                <Text style={styles.Text}>$0.0</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceandTitle}>
              <Text style={styles.Text}>Grand Total:</Text>
              <Text
                style={[styles.Text, { color: "black", fontWeight: "700" }]}
              >
                ${totalPrice}
              </Text>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={[styles.checkoutContainer, { opacity: currentUser ? 1 : 0.6 }]}
        onPress={handleCheckout}
        disabled={!currentUser}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    color: "#757575",
    marginTop: 50,
    marginBottom: 20,
  },
  priceContainer: {
    marginTop: 30,
  },
  priceandTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 8,
  },
  Text: {
    color: "#757575",
    fontSize: 17,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  checkoutContainer: {
    backgroundColor: "#E96E6E",
    marginVertical: 15,
    marginHorizontal: 10,
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    padding: 10,
  },
});
