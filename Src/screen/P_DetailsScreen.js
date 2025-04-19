import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const P_DetailsScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(require("../assets/sona.jpg"));
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [pin, setPin] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
  
    if (currentUser) {
      console.log("User found immediately:", currentUser.uid);
      setUser(currentUser);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User found from onAuthStateChanged:", user.uid);
          setUser(user);
        } else {
          Alert.alert("User not logged in");
        }
      });
  
      return () => unsubscribe();
    }
  }, []);
  
  
  const openGallery = () => {
    launchImageLibrary({}, (response) => {
      if (!response.didCancel && !response.errorCode && response.assets?.length > 0) {
        setProfileImage({ uri: response.assets[0].uri });
      }
    });
  };

  const saveProfileToFirebase = async () => {
    if (!user) {
      Alert.alert("User not logged in");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        phone,
        name,
        email,
        gender,
        pin,
      });
      Alert.alert("Profile saved!");
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error saving profile");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={openGallery}>
        <Image source={profileImage} style={styles.profileImage} />
      </TouchableOpacity>
      <Text style={styles.header}>Profile Details</Text>
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, { backgroundColor: gender === "Male" ? '#ddd' : '#fff' }]}
          onPress={() => setGender("Male")}
        >
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, { backgroundColor: gender === "Female" ? '#ddd' : '#fff' }]}
          onPress={() => setGender("Female")}
        >
          <Text>Female</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="PIN" value={pin} onChangeText={setPin} keyboardType="numeric" secureTextEntry />
      <TouchableOpacity style={styles.logoutButton} onPress={() => auth.signOut()}>
        <Text style={{ color: 'red' }}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={saveProfileToFirebase}>
        <Text style={styles.saveText}>SAVE DETAILS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    width: '85%',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  logoutButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#f07',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default P_DetailsScreen;
