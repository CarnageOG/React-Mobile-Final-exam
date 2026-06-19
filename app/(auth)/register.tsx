import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import * as yup from "yup";
import AppButton from "../components/appButton/AppButton";
import AppInput from "../components/appInput/AppInput";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async (data: FormData) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();
      console.log("Registered:", result);
      reset();
      router.push("/");
    } catch (error) {
      console.log("Register error:", error);
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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <AppInput
            placeholder="confirm password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />

      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      <AppButton
        title="Register"
        handlePress={handleSubmit(handleRegister)}
        hitSlop={20}
      />

      <Link style={styles.link} href="/(auth)/login">
        Already have an account? Log In
      </Link>
    </View>
  );
};

export default Register;

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
