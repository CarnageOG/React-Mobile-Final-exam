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
          <Text style={styles.text}>
            Name: {user.data.name.firstname} {user.data.name.lastname}
          </Text>

          <Text style={styles.text}>Username: {user.data.username}</Text>

          <Text style={styles.text}>Email: {user.data.email}</Text>

          <Text style={styles.text}>Phone: {user.data.phone}</Text>

          <Text style={styles.text}>City: {user.data.address.city}</Text>
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

  text: {
    fontSize: 16,
  },
  profile: {
    gap: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
});
