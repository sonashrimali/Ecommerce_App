import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(require("../assets/sona.jpg"));
  const [name, setName] = useState("Sonal Shrimali");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const menuItems = [
    { id: "0", title: "Profile Details", icon: "person-circle-outline", screen: "PDetails" },
    { id: "1", title: "Order History", icon: "cart-outline", screen: "OrderScreen" },
    { id: "2", title: "Shipping Address", icon: "location-outline", screen: "ShippingAddressScreen" },
    { id: "3", title: "Create Request", icon: "create-outline", screen: "CreateRequestScreen" },
    { id: "4", title: "Privacy Policy", icon: "lock-closed-outline", screen: "PrivacyPolicyScreen" },
    { id: "5", title: "Settings", icon: "settings-outline", screen: "SettingsScreen" },
    { id: "6", title: "Login", icon: "log-in-outline", screen: "Login" },
    { id: "7", title: "Signup", icon: "person-add-outline", screen: "Signup" },
    { id: "8", title: "Log out", icon: "log-out-outline", screen: "Logout" },
  ];
  
  const saveProfileToFirebase = async (profile) => {
    try {
      await setDoc(doc(db, 'users', 'sonal-profile'), profile);
      console.log('Profile saved!');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const loadProfileFromFirebase = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'users', 'sonal-profile'));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        setPhone(data.phone);
        setEmail(data.email);
        setProfileImage(data.imageUri ? { uri: data.imageUri } : require("../assets/sona.jpg"));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  useEffect(() => {
    loadProfileFromFirebase();
  }, []);

  const handleMenuPress = (item) => {
    if (item.screen === "Logout") {
      handleLogout();
    } else {
      navigation.navigate(item.screen);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => console.log("User Logged Out") },
      ]
    );
  };

  const selectProfileImage = () => {
    launchImageLibrary({ mediaType: "photo" }, async (response) => {
      if (!response.didCancel && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        setProfileImage({ uri: imageUri });

        const newProfile = {
          name,
          phone,
          email,
          imageUri,
        };

        await saveProfileToFirebase(newProfile);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color="#333" />
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.editButton} onPress={selectProfileImage}>
            <Ionicons name="camera-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TextInput style={styles.name} value={name} onChangeText={setName} />
        <TextInput style={styles.phone} value={phone} onChangeText={setPhone} />
        <TextInput style={styles.email} value={email} onChangeText={setEmail} />
      </View>
      <TouchableOpacity
  style={{
    //backgroundColor: '#FF7F50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  }}
  onPress={() => navigation.navigate('PDetails')}
>
  <Text style={{ color: '#fff', fontWeight: 'bold' }}>View Profile Details</Text>
</TouchableOpacity>


      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress(item)}>
            <Ionicons name={item.icon} size={24} color="#FF7F50" />
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={24} color="#888" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10, // Increased slightly for breathing space before menu
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 10, // space between image and name
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FF7F50",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF7F50",
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "80%",
    textAlign: "center",
  },
  phone: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: "80%",
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: "80%",
    textAlign: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
});


export default ProfileScreen;