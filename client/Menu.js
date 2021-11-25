import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addToCart } from "./actions";

const Menu = ({ result }) => {
  const dispatch = useDispatch();
  var menuItems = result.data.find((item) => item);
  const handleSubmit = (key, title, price) => {
    dispatch(addToCart({ key, title, price, quantity: 1 }));
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        style={{
          width: "100%",
          height: 200,
          resizeMode: "cover",
        }}
        source={{ uri: menuItems?.url }}
        resizeMode="cover"
      ></Image>
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.title}>Menu</Text>
        </View>
        {menuItems?.menu.map((item) => (
          <View style={styles.menu} key={item._id}>
            <View style={styles.foodImage}>
              <Image
                source={{ uri: item?.uri }}
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "cover",
                  borderRadius: 50,
                }}
              ></Image>
            </View>
            <View style={styles.foodTitle}>
              <Text style={styles.text}>{item.title}</Text>
            </View>
            <View style={styles.foodPrice}>
              <Text style={styles.text}>Rs.{item.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.foodAdd}
              onPress={() => handleSubmit(item._id, item.title, item.price)}
            >
              <Icon
                name="cart-plus"
                type="font-awesome-5"
                color="#00A145"
              ></Icon>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  mainContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 10,
  },
  menu: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  foodImage: {
    width: 50,
    height: 50,
    backgroundColor: "#ccc",
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
  },
  foodAdd: {
    width: 50,
    height: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
