import React, { useState } from 'react';
import {
  View, Text, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import Background from './Background';
import Field from './Field';
import Btn from './Btn';
import { darkGreen } from './Constants';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Error', 'Please enter both email and password.');
      return;
    }

    const isValidEmail = email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!isValidEmail) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email.trim(), password);
      Alert.alert('Login Successful', 'Welcome back!');
      // ✅ NO need to call navigation.navigate here
      // App.js will detect login and show MainTabs (Home tab)
    } catch (error) {
      Alert.alert('Login Error', error.message || 'Something went wrong.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Background>
        <View style={{ alignItems: "center", width: '100%' }}>
          <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginTop: 20 }}>
            Welcome Back
          </Text>
          <Text style={{ color: "white", fontSize: 19, fontWeight: "bold", marginBottom: 20 }}>
            Login to your account
          </Text>
          <View style={{
            backgroundColor: "white",
            height: 500,
            width: '100%',
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center'
          }}>
            <Field
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Field
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            <Btn textColor="white" bgColor={darkGreen} btnLabel="Login" Press={handleLogin} />
            <View style={{ flexDirection: 'row', justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </TouchableWithoutFeedback>
  );
};

export default Login;
