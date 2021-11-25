import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Badge } from "react-native-elements";
import Menu from "./Menu";
import Cart from "./Cart";
import Search from "./Search";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const Navigation = ({ route }) => {
  const result = route.params;
  const [cart, setCart] = React.useState([]);
  const items = useSelector((state) => state.reducer);
  const index = cart.length;
  useEffect(() => {
    setCart(items);
  }, [items]);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Menu"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                type="font-awesome-5"
                name="utensils"
                color={focused ? "#1777F2" : "#757575"}
                size={25}
              />
            </View>
          ),
        }}
      >
        {(props) => <Menu {...props} result={result} />}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name="search"
                type="font-awesome-5"
                color={focused ? "#1777F2" : "#757575"}
                size={25}
              />
            </View>
          ),
        }}
      >
        {(props) => <Search {...props} result={result} />}
      </Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name="shopping-cart"
                type="font-awesome-5"
                color={focused ? "#1777F2" : "#757575"}
                size={25}
              ></Icon>
              <Badge
                status="error"
                containerStyle={{ position: "absolute", top: -4, right: -4 }}
                value={index}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
