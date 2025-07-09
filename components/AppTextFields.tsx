import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface AppTextFieldProps extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  prefixIcon?: keyof typeof Feather.glyphMap;
  suffixIcon?: React.ReactNode;
  error?: string; // Explicitly expect only strings
}

const AppTextField: React.FC<AppTextFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  prefixIcon,
  suffixIcon,
  error,
  secureTextEntry,
  editable = true,
  keyboardType = "default",
  returnKeyType = "done",
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, !editable && styles.disabled]}>
        {prefixIcon && (
          <Feather
            name={prefixIcon}
            size={20}
            color="#777"
            style={styles.icon}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          editable={editable}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          {...props}
        />

        {suffixIcon && <View style={styles.suffixIcon}>{suffixIcon}</View>}
      </View>

      {/* Safely render error only if it's a non-empty string */}
      {typeof error === "string" && error.trim() !== "" && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 12,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 12,
  },
  icon: {
    marginRight: 8,
  },
  suffixIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 4,
    marginLeft: 12,
  },
  disabled: {
    backgroundColor: "#E5E7EB",
  },
});

export default AppTextField;
