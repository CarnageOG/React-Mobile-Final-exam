import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import AppButton from "../components/appButton/AppButton";
import AppInput from "../components/appInput/AppInput";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "johnd",
      password: "m38rmF$",
    },
  });

  const handleLogin = async (data: FormData) => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!response.ok) {
        setSubmitError("Invalid username or password");
        return;
      }

      const result = await response.json();

      if (result?.token) {
        const userResponse = await fetch("https://fakestoreapi.com/users/1");
        const user = await userResponse.json();
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            token: result.token,
            data: user,
          }),
        );
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <AppInput
            placeholder="username"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <AppInput
            placeholder="password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />

      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {submitError && <Text style={styles.error}>{submitError}</Text>}

      <AppButton
        title="Log In"
        handlePress={handleSubmit(handleLogin)}
        hitSlop={20}
      />

      <Link style={styles.link} href="/(auth)/register">
        Don't have an account? Register
      </Link>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  link: {
    marginTop: 20,
    alignSelf: "center",
    color: "#070D0D",
  },
});
