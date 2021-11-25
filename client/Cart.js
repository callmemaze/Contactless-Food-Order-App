import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const items = useSelector((state) => state.reducer);

  console.log(items);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
