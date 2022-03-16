import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableHighlight,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import ImageZoom from "react-native-image-pan-zoom";
import { transform } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import CartContext, { CartProvider } from "../../store/CartContext";

//https://www.korezin.com/wp-content/uploads/2020/02/download-36.jpg

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  const AddCart = (item) => {
    var cartItem = cart.find((q) => q.id == item.id);
    if (cartItem == undefined) {
      item.quantity = 1;
      setCart([...cart, item]);
    } else {
      cartItem.quantity = cartItem.quantity + 1;
      setCart([...cart]);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.box2_box} key={item.id}>
        <View style={styles.box2_box_element_image}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.box2_box_image}
          ></Image>
        </View>

        <View style={styles.box2_box_element_detail}>
          <Text style={styles.box2_detail_name}>{item.title}</Text>
          <View style={styles.box2_box_element_detail_star}>
            <AntDesign name="star" size={18}></AntDesign>
            <AntDesign name="star" size={18}></AntDesign>
            <AntDesign name="star" size={18}></AntDesign>
            <AntDesign name="star" size={18}></AntDesign>
            <AntDesign name="star" size={18}></AntDesign>
          </View>
        </View>
        <View style={styles.box2_box_element_price}>
          <Text style={styles.box2_price_name}>{item.description}</Text>
        </View>
        <View style={styles.box2_box_element_button}>
          <View style={styles.box2_box_element_pricebox}>
            <Text style={styles.box2_price_number}>
              {item.price.toFixed(2)}
              <Text style={{ fontSize: 14, fontWeight: "bold" }}> TL</Text>
            </Text>
          </View>

          <View style={styles.box2_box_element_buttons}>
            <Pressable style={styles.fav_pressable}>
              {/* <Text style={styles.cart_pressable_text}>Sepete Ekle</Text> */}
              <MaterialCommunityIcons
                name="heart-outline"
                size={40}
              ></MaterialCommunityIcons>
            </Pressable>
            <Pressable
              style={styles.cart_pressable}
              onPress={() => AddCart(item)}
            >
              {/* <Text style={styles.cart_pressable_text}>Sepete Ekle</Text> */}
              <MaterialCommunityIcons
                name="cart"
                size={40}
              ></MaterialCommunityIcons>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, height: "100%" }}>
        <View style={styles.header}>
          <Pressable style={styles.header_pressable}>
            <MaterialCommunityIcons name="menu" size={45} />
          </Pressable>
          <Pressable style={styles.header_pressable}>
            <Ionicons name="notifications" size={30} />
          </Pressable>
        </View>
        <View style={styles.box1}>
          <Text style={styles.box1_text}>New Arrival</Text>
          <Pressable>
            <MaterialCommunityIcons
              name="arrow-right"
              size={26}
            ></MaterialCommunityIcons>
          </Pressable>
        </View>
        <View style={styles.box2}>
          <FlatList
            data={products}
            renderItem={renderItem}
            horizontal
            style={styles.flatlist}
          ></FlatList>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#EBECF4",
  },

  flatlist: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  header: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header_pressable: {
    backgroundColor: "#F0F0FF",
    height: 50,
    width: 50,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cart_pressable: {
    backgroundColor: "#FFA07A", //"#F0F0FF" grey
    height: 60,
    width: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  cart_pressable_text: {
    fontWeight: "700",
  },
  box1: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box1_text: {
    fontSize: 35,
    fontWeight: "bold",
    fontFamily: "Helvetica Neue",
  },
  box2: {
    flex: 15,
    flexDirection: "row",
  },
  box2_box: {
    flex: 2,
    borderStyle: "solid",
    backgroundColor: "#FFFFFF",
    marginRight: 20,
    borderRadius: 15,
    width: 300,
  },
  box2_box_element_image: {
    flex: 5,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
  },
  box2_box_element_button: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 12,
    paddingLeft: 12,
    alignItems: "flex-end",
    marginBottom: 12,
  },
  box2_box_element_detail: {
    flex: 2,
    justifyContent: "flex-start",
    paddingLeft: 12,
  },
  box2_box_element_detail_star: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  box2_detail_name: {
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 12,
    textAlign: "justify",
  },
  box2_price_name: {
    fontSize: 12,
    fontWeight: "600",
    paddingBottom: 12,
    color: "#708090",
    textAlign: "justify",
  },
  box2_price_number: {
    color: "#32CD32", //"#D1D1DF" grey
    fontWeight: "bold",
    fontSize: 30,
  },
  box2_box_element_price: {
    flex: 2,
    alignItems: "flex-start",
    paddingLeft: 12,
    paddingRight: 12,
  },
  box2_box_image: {
    flex: 1,
    width: "100%",
    height: 200,
    borderRadius: 15,
    resizeMode: "contain",
  },
  box2_box_button: {
    flex: 1,
    borderStyle: "solid",
  },
  box2_box_element_buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
  },
  box2_box_element_pricebox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  fav_pressable: {
    backgroundColor: "#F0F0FF", //"#F0F0FF" grey
    height: 60,
    width: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
