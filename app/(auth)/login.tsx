/**
 * Login.tsx
 * --------------------------
 * This screen allows users to log in using their email and password.
 * It uses Formik for form handling and Yup for validation.
 * Upon successful login, the user is navigated to the home screen.
 */

import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";

// Custom UI components
import CustomAppBar from "@/components/CustomAppBar";
import AppTextField from "@/components/AppTextFields";
import PrimaryButton from "@/components/PrimaryButton";

// Yup validation schema for login form
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter(); // Used for navigation

  return (
    <>
      {/* Top app bar without a back button */}
      <CustomAppBar title="Login" showBackButton={false} />

      {/* Adjusts UI when keyboard is open (iOS specific behavior) */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Heading and subheading */}
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Log in to continue your journey</Text>

        {/* Formik handles form state, validation, and submission */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log("Login values:", values);
            // Navigate to home screen on successful login
            router.navigate("/(app)/home");
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              {/* Email input field with validation error display */}
              <AppTextField
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email ? errors.email : undefined}
                keyboardType="email-address"
              />

              {/* Password input field with secure entry */}
              <AppTextField
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={
                  touched.password && errors.password
                    ? errors.password
                    : undefined
                }
                secureTextEntry
              />

              {/* Submit button triggers form validation and submission */}
              <PrimaryButton text="Log In" onPress={handleSubmit} />

              {/* Link to sign up screen */}
              <Text style={styles.signupText}>
                Don’t have an account?{" "}
                <Text
                  style={styles.signupLink}
                  onPress={() => router.push("/signup")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
}

// Styles for the Login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 16,
  },
  signupText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 15,
    marginTop: 24,
  },
  signupLink: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
