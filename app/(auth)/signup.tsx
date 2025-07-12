/**
 * FILE: app/signup.js (or your actual file path)
 * PURPOSE:
 *   Provides a user registration screen with form validation.
 *   Handles user sign-up with name, email, and password fields,
 *   and navigation to login screen after successful submission.
 */

import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import { Formik } from "formik"; // Form handling library
import * as Yup from "yup"; // Validation library
import { router } from "expo-router"; // Navigation router

// Custom components
import PrimaryButton from "@/components/PrimaryButton";
import CustomAppBar from "@/components/CustomAppBar";
import AppTextField from "@/components/AppTextFields";

/**
 * Validation schema using Yup.
 * Defines requirements for:
 * - name: Required field
 * - email: Must be valid email format
 * - password: Minimum 6 characters
 */
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

/**
 * Signup Screen Component
 * Features:
 * - Form with validation
 * - Keyboard-aware layout
 * - Navigation to login screen
 */
export default function Signup() {
  return (
    <>
      {/* Custom header with title */}
      <CustomAppBar title="Sign Up" showBackButton={false} />

      {/* Handles keyboard behavior on iOS/Android */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header section */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to explore flights and travel deals
          </Text>
        </View>

        {/* Formik form wrapper */}
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log("Form submitted:", values);
            // In a real app, you would:
            // 1. Send data to backend
            // 2. Handle response
            // 3. Navigate on success
            router.push("/login");
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
              {/* Name Input */}
              <AppTextField
                placeholder="Full Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                error={touched.name && errors.name ? errors.name : undefined}
              />

              {/* Email Input */}
              <AppTextField
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={touched.email && errors.email ? errors.email : undefined}
              />

              {/* Password Input */}
              <AppTextField
                placeholder="Password"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
                error={
                  touched.password && errors.password
                    ? errors.password
                    : undefined
                }
              />

              {/* Submit Button */}
              <PrimaryButton text="Sign Up" onPress={handleSubmit} />

              {/* Login redirect */}
              <Text style={styles.loginText}>
                Don't have an account?{"  "}
                <Text
                  style={styles.loginLink}
                  onPress={() => router.push("/login")}
                >
                  Login
                </Text>
              </Text>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
}

// StyleSheet for component styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 32,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2937", // Dark gray
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280", // Medium gray
    textAlign: "center",
    marginTop: 8,
  },
  form: {
    flex: 1,
    gap: 16, // Space between form elements
    marginTop: 24,
  },
  loginText: {
    textAlign: "center",
    color: "#6B7280", // Medium gray
    fontSize: 15,
    marginTop: 20,
  },
  loginLink: {
    color: "#2563EB", // Blue
    fontWeight: "600",
  },
});
