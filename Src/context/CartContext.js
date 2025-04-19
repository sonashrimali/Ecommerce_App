import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from storage on first render
  useEffect(() => {
    loadCartItems();
  }, []);

  // Recalculate total on cart update
  useEffect(() => {
    totalSum(carts);
  }, [carts]);

  const loadCartItems = async () => {
    try {
      const storedCarts = await AsyncStorage.getItem("carts");
      const parsedCarts = storedCarts ? JSON.parse(storedCarts) : [];
      setCarts(parsedCarts);
    } catch (error) {
      console.error("Error loading carts:", error);
    }
  };

  const addToCart = async (item) => {
    const itemExist = carts.findIndex((cart) => cart.id === item.id);

    if (itemExist === -1) {
      const newCartItem = {
        ...item,
        image: item.image?.trim() || "", // ensure valid image URL
        size: item.size || null,
        color: item.color || null,
      };

      const updatedCart = [...carts, newCartItem];
      await AsyncStorage.setItem("carts", JSON.stringify(updatedCart));
      setCarts(updatedCart);
    }
  };

  const deleteItemfromCart = async (item) => {
    const updatedCart = carts.filter((cart) => cart.id !== item.id);
    await AsyncStorage.setItem("carts", JSON.stringify(updatedCart));
    setCarts(updatedCart);
  };

  const totalSum = (cartsArray) => {
    const sum = cartsArray.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(sum);
  };

  return (
    <CartContext.Provider
      value={{ carts, addToCart, deleteItemfromCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
