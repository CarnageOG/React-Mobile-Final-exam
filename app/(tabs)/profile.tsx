import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/appButton/AppButton";

export default function TabTwoScreen() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await AsyncStorage.getItem("user");

      if (data) {
        setUser(JSON.parse(data));
      }
    };

    getUser();
  }, []);

  const handleLougOut = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      {user?.data && (
        <View style={styles.profile}>
          <Text>
            Name: {user.data.name.firstname} {user.data.name.lastname}
          </Text>

          <Text>Username: {user.data.username}</Text>

          <Text>Email: {user.data.email}</Text>

          <Text>Phone: {user.data.phone}</Text>

          <Text>City: {user.data.address.city}</Text>
        </View>
      )}

      <AppButton title="Logout" handlePress={handleLougOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  profile: {
    gap: 10,
    marginBottom: 30,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});
