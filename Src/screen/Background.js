import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/ss.png')} // Adjusted path to match your structure
        style={styles.background}
      >
        <View style={styles.overlay}>
          {children}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the View takes up the full screen
  },
  background: {
    flex: 1,
    width: '100%', // Ensure the background takes up the full width
    height: '100%', // Ensure the background takes up the full height
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Ensures child content is overlaid on top of the background image
    justifyContent: 'center', // You can adjust this to center or align children differently
  },
});

export default Background;
