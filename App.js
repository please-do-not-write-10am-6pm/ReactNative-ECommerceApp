import React, { useContext } from "react";

import { StyleSheet, Text, View, TextInput } from "react-native";

import CartContext, { CartProvider } from "./src/store/CartContext";
import TabNavigator from "./src/navigations/tab/TabNavigator";
export default function App() {
  return (
    <>
      <CartProvider>
        <TabNavigator></TabNavigator>
      </CartProvider>
    </>
  );
}
