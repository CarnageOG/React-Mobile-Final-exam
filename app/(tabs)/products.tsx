import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text } from "react-native";

const Index = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
      });
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list_content}
      renderItem={({ item: product }) => (
        <Pressable
          style={styles.product_card}
          onPress={() => router.push(`/details/${product.id}`)}
        >
          <Image source={{ uri: product.image }} style={styles.product_img} />

          <Text style={styles.product_title}>{product.title}</Text>

          <Text style={styles.product_price}>Price: {product.price} $</Text>
        </Pressable>
      )}
    />
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  list_content: {
    padding: 16,
  },

  product_card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },

  product_img: {
    width: "100%",
    height: 220,
    resizeMode: "contain",
    marginBottom: 12,
  },

  product_title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#070D0D",
  },

  product_price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#070D0D",
  },
});
