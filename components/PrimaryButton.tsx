import React from "react";
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
  isLoading?: boolean;
  buttonColor?: string;
  textColor?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onPress,
  isLoading = false,
  buttonColor = "#1F2937", // AppColors.backgroundDark
  textColor = "#F3F4F6", // AppColors.backgroundLight
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: buttonColor },
        isLoading && styles.disabled,
      ]}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: "100%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PrimaryButton;
