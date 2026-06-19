import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppButton from "../components/appButton/AppButton";

export default function TabTwoScreen() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await AsyncStorage.getItem("user");
      const image = await AsyncStorage.getItem("profileImage");
      if (data) {
        setUser(JSON.parse(data));
      }
      if (image) {
        setProfileImage(image);
      }
    };
    getUser();
  }, []);

  const pickProfileImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Please allow photo access from settings.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri);
      await AsyncStorage.setItem("profileImage", imageUri);
    }
  };

  const removeProfileImage = async () => {
    setProfileImage(null);

    await AsyncStorage.removeItem("profileImage");
  };

  const handleLougOut = async () => {
    await AsyncStorage.removeItem("user");
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pickProfileImage}
        style={styles.avatarContainer}
      >
        {profileImage ? (
          <Image
            source={{
              uri: profileImage,
            }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.placeholder}>
            <Text>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {profileImage && (
        <TouchableOpacity
          onPress={removeProfileImage}
          style={styles.removeButton}
        >
          <Text style={styles.removeText}>Remove Photo</Text>
        </TouchableOpacity>
      )}

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
  avatarContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    alignSelf: "center",
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#FF4444",
    borderRadius: 8,
  },
  removeText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});
