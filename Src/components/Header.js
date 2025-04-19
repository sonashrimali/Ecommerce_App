import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ isCart }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Back Button / Menu Icon */}
            <TouchableOpacity 
                onPress={() => isCart ? navigation.goBack() : navigation.navigate("Home_Stack")}
                style={styles.menuContainer}
            >
                {isCart ? (
                    <Ionicons name="chevron-back" color="#E96E6E" size={24} />
                ) : (
                    <Image source={require("../assets/menu.png")} style={styles.menu} />
                )}
            </TouchableOpacity>

            {/* Page Title (Only for Cart Page) */}
            {isCart && <Text style={styles.myCart}>My Cart</Text>}
            
            {/* Profile Image */}
            <Image source={require("../assets/sona.jpg")} style={styles.sona} />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#fff",
    },
    menuContainer: {
        backgroundColor: "#FFFFFF",
        height: 50,
        width: 50,
        borderRadius: 25, // Perfect Circle
        alignItems: "center",
        justifyContent: "center",
        elevation: 3, // Slight shadow effect
    },
    menu: {
        height: 28,
        width: 28,
        resizeMode: "contain",
    },
    sona: {
        height: 50,
        width: 50,
        borderRadius: 25, // Perfect Circular Profile Picture
    },
    myCart: {
        fontSize: 22,
        fontWeight: "600",
        color: "black",
    },
});
