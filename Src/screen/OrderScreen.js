import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.warn('No user is logged in.');
        return;
      }

      try {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          console.log('No orders found.');
          setOrders([]);
          return;
        }

        const fetchedOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderTitle}>Order ID: {item.id}</Text>
      <Text>Date: {item.orderDate?.toDate().toDateString()}</Text>
      <Text>Total: ₹{item.totalAmount}</Text>
      {item.items?.map((product, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.details}>
            <Text>Name: {product.name}</Text>
            <Text>Size: {product.size}</Text>
            <Text>Color: {product.color}</Text>
            <Text>Qty: {product.quantity}</Text>
            <Text>Price: ₹{product.price}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>My Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.empty}>Loading or No orders yet...</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backText: { fontSize: 16, marginLeft: 6 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontStyle: 'italic', marginTop: 20 },
  orderContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9'
  },
  orderTitle: { fontWeight: 'bold', marginBottom: 8 },
  itemContainer: { flexDirection: 'row', marginTop: 8 },
  image: { width: 60, height: 60, marginRight: 10, borderRadius: 4 },
  details: { flex: 1 }
});

export default OrderScreen;
