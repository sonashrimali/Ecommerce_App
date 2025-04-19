import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import SplashScreen from 'react-native-splash-screen';

// Screens
import HomeScreen from './Src/screen/HomeScreen';
import ProductDetailsScreen from './Src/screen/ProductDetailsScreen';
import CartScreen from './Src/screen/CartScreen';
import ProfileScreen from './Src/screen/ProfileScreen';
import ReorderScreen from './Src/screen/ReorderScreen';
import OrderScreen from './Src/screen/OrderScreen';
import P_DetailsScreen from './Src/screen/P_DetailsScreen';

import Login from './Src/screen/Login';
import Signup from './Src/screen/Signup';


// Context
import { CartProvider, CartContext } from './Src/context/CartContext';

const CartIcon = ({ size, color, cartCount }) => (
  <View style={{ position: 'relative' }}>
    <MaterialCommunityIcons name="cart" size={size} color={color} />
    {cartCount > 0 && (
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
          {cartCount > 9 ? '9+' : cartCount}
        </Text>
      </View>
    )}
  </View>
);

const Tab = createBottomTabNavigator();
const MainTabs = () => {
  const { carts } = React.useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={{
	 headerShown: false, 
	tabBarShowLabel: false, 
	tabBarActiveTintColor: '#660066'
            }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({
	 size, color
	 }) => <Entypo name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="REORDER"
        component={ReorderScreen}
        options={{
          tabBarIcon: ({ size, color }) => <MaterialIcons name="reorder" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ size, color }) => <CartIcon size={size} color={color} cartCount={carts.length} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => <FontAwesome6 name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const RootStack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="MainTabs" component={MainTabs} />
          <RootStack.Screen name="Product_Details" component={ProductDetailsScreen} />
          <RootStack.Screen name="OrderScreen" component={OrderScreen} />
           <RootStack.Screen name="Login" component={Login} />
             <RootStack.Screen name="Signup" component={Signup} />
             <RootStack.Screen name="PDetails" component={P_DetailsScreen} />


        </RootStack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
