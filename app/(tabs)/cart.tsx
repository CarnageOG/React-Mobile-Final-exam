import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

import {
    addToCart,
    decreaseQuantity,
    deleteFromCart,
    selectCartTotal,
} from "../lib/slices/cartSlice";

export default function CartScreen() {
  const dispatch = useAppDispatch();

  const { cartProducts } = useAppSelector((state) => state.cart);
  const total = useAppSelector(selectCartTotal);

  return (
    <ScrollView style={styles.container}>
      {cartProducts.map((item) => (
        <View key={item.id} style={styles.cartItem}>
          <View style={styles.product}>
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.image}
            />

            <Text style={styles.name} numberOfLines={2}>
              {item.title}
            </Text>
          </View>

          <View style={styles.quantity}>
            <Pressable onPress={() => dispatch(addToCart(item))}>
              <Ionicons name="add-circle-outline" size={28} color="#000" />
            </Pressable>

            <Text>{item.quantity}</Text>

            <Pressable
              onPress={() =>
                dispatch(
                  decreaseQuantity({
                    id: item.id,
                  }),
                )
              }
            >
              <Ionicons name="remove-circle-outline" size={28} color="#000" />
            </Pressable>
          </View>

          <View style={styles.price}>
            <Text>{(item.price * item.quantity).toFixed(2)} $</Text>

            <Pressable
              onPress={() =>
                dispatch(
                  deleteFromCart({
                    id: item.id,
                  }),
                )
              }
            >
              <Ionicons name="trash-outline" size={22} color="red" />
            </Pressable>
          </View>
        </View>
      ))}

      <View style={styles.totalBox}>
        <Text style={styles.totalTitle}>Total</Text>

        <Text style={styles.totalPrice}>{total.toFixed(2)} $</Text>
      </View>

      <Pressable style={styles.buyButton}>
        <Text style={styles.buyText}>BUY</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  product: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 55,
    height: 55,
    borderRadius: 8,
  },

  name: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },

  quantity: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 15,
    gap: 8,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: "600",
  },

  price: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  delete: {
    fontSize: 18,
  },

  totalBox: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
  },

  buyButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
  },

  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
