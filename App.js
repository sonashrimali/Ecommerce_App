// Import necessary modules and components from React and React Native
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Provides navigation container for the app
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // For creating bottom tab navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // For creating stack-based navigation
import { View, Text } from 'react-native'; // Basic React Native components
import Entypo from 'react-native-vector-icons/Entypo'; // Entypo icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Material icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Material Community icons
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; // Font Awesome 6 icons
import SplashScreen from 'react-native-splash-screen'; // Used to hide the splash screen after app loads

// Import screen components used in the app
import HomeScreen from './Src/screen/HomeScreen';
import ProductDetailsScreen from './Src/screen/ProductDetailsScreen';
import CartScreen from './Src/screen/CartScreen';
import ProfileScreen from './Src/screen/ProfileScreen';
import ReorderScreen from './Src/screen/ReorderScreen';
import OrderScreen from './Src/screen/OrderScreen';
import P_DetailsScreen from './Src/screen/P_DetailsScreen';

import Login from './Src/screen/Login';
import Signup from './Src/screen/Signup';

// Import context for managing cart state
import { CartProvider, CartContext } from './Src/context/CartContext';

// Component to display the cart icon with a badge showing item count
const CartIcon = ({ size, color, cartCount }) => (
  <View style={{ position: 'relative' }}>
    <MaterialCommunityIcons name="cart" size={size} color={color} />
    {cartCount > 0 && ( // Show badge only if cart has items
      <View
        style={{
          height: 16,
          width: 16,
          borderRadius: 8,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: -5,
          right: -5,
        }}
      >
        <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>
          {cartCount > 9 ? '9+' : cartCount} {/* Show 9+ if more than 9 items */}
        </Text>
      </View>
    )}
  </View>
);

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// MainTabs component defines the bottom tab navigation structure
const MainTabs = () => {
  const { carts } = React.useContext(CartContext); // Access cart data from context

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hides header from tabs
        tabBarShowLabel: false, // Hides text labels from tabs
        tabBarActiveTintColor: '#660066' // Active tab icon color
      }}
      initialRouteName="Home" // Set default screen to Home
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => <Entypo name="home" size={size} color={color} />, // Home icon
        }}
      />
      <Tab.Screen
        name="REORDER"
        component={ReorderScreen}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons name="reorder" size={size} color={color} />, // Reorder icon
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ size, color }) => <CartIcon size={size} color={color} cartCount={carts.length} />, // Custom cart icon with badge
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => <FontAwesome6 name="user" size={size} color={color} />, // Profile icon
        }}
      />
    </Tab.Navigator>
  );
};

// Create root stack navigator
const RootStack = createNativeStackNavigator();

// App component is the main entry point of the app
const App = () => {
  useEffect(() => {
    SplashScreen.hide(); // Hides the splash screen once the app is ready
  }, []);

  return (
    <CartProvider> {/* Provides cart context to the entire app */}
      <NavigationContainer> {/* Manages navigation tree and linking */}
        <RootStack.Navigator screenOptions={{ headerShown: false }}> {/* Hides stack screen headers */}
          <RootStack.Screen name="MainTabs" component={MainTabs} /> {/* Tabs navigation screen */}
          <RootStack.Screen name="Product_Details" component={ProductDetailsScreen} /> {/* Product details screen */}
          <RootStack.Screen name="OrderScreen" component={OrderScreen} /> {/* Orders screen */}
          <RootStack.Screen name="Login" component={Login} /> {/* Login screen */}
          <RootStack.Screen name="Signup" component={Signup} /> {/* Signup screen */}
          <RootStack.Screen name="PDetails" component={P_DetailsScreen} /> {/* Another product details screen */}
        </RootStack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App; // Exports the App component as default
