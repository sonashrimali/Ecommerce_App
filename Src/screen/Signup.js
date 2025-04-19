import React, { useState } from 'react';
import {
  View, Text, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Background from './Background';
import { darkGreen } from './Constants';
import Field from './Field';
import Btn from './Btn';

const Signup = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async () => {
    const { firstName, lastName, email, contact, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !contact || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Invalid email format.");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      Alert.alert("Error", "Contact must be a valid 10-digit number.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      console.log("Creating user with:", email, password);
      await auth().createUserWithEmailAndPassword(email.trim(), password);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate('Login');
    } catch (error) {
      console.log("Signup error:", error.code);

      let errorMessage = "Something went wrong. Please try again.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "This email is already in use.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password is too weak.";
          break;
        case 'auth/invalid-credential':
          errorMessage = "Invalid credentials supplied.";
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert("Signup Error", errorMessage);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background>
        <View style={{ alignItems: "center", width: 460 }}>
          <Text style={{ color: 'white', fontSize: 66, fontWeight: 'bold', marginTop: 20 }}>
            Register
          </Text>
          <Text style={{ color: "white", fontSize: 19, fontWeight: "bold", marginBottom: 20 }}>
            Create a new account
          </Text>
          <View style={{
            backgroundColor: "white",
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center'
          }}>
            <Field placeholder="First Name" value={formData.firstName} onChangeText={(text) => handleChange('firstName', text)} />
            <Field placeholder="Last Name" value={formData.lastName} onChangeText={(text) => handleChange('lastName', text)} />
            <Field placeholder="Email" keyboardType="email-address" value={formData.email} onChangeText={(text) => handleChange('email', text)} />
            <Field placeholder="Contact Number" keyboardType="number-pad" value={formData.contact} onChangeText={(text) => handleChange('contact', text)} />
            <Field placeholder="Password" secureTextEntry={true} value={formData.password} onChangeText={(text) => handleChange('password', text)} />
            <Field placeholder="Confirm Password" secureTextEntry={true} value={formData.confirmPassword} onChangeText={(text) => handleChange('confirmPassword', text)} />

            <View style={{ flexDirection: 'row', width: '78%', paddingRight: 16 }}>
              <Text style={{ color: 'grey', fontSize: 16 }}>By signing in, you agree to our </Text>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Terms & Conditions</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '78%', paddingRight: 16, marginBottom: 10 }}>
              <Text style={{ color: 'grey', fontSize: 16 }}> and </Text>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Privacy Policy</Text>
            </View>

            <Btn textColor="white" bgColor={darkGreen} btnLabel="Signup" Press={handleSignup} />

            <View style={{ flexDirection: 'row', justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
