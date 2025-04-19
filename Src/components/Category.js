import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Category = ({ item, selectedCategory, setSelectedCategory }) => {
    return (
        <TouchableOpacity onPress={() => setSelectedCategory(item)}>
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === item && styles.selectedCategoryText
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );
};

export default Category;

const styles = StyleSheet.create({
    categoryText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#938F8F", // ✅ Fixed case issue
        backgroundColor: "#DFDCDC", // ✅ Ensure this is properly applied
        textAlign: "center",
        borderRadius: 16,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    selectedCategoryText: {
        color: "#FFFFFF",
        backgroundColor: "#E96E6E",
    }
});
