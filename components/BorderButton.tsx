import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  GestureResponderEvent,
} from "react-native";

interface BorderButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  buttonColor?: string;
  textColor?: string;
}

const BorderButton: React.FC<BorderButtonProps> = ({
  text,
  onPress,
  isLoading = false,
  buttonColor = "#F3F4F6", // default backgroundLight
  textColor = "#1F2937", // default backgroundDark
}) => {
  return (
    <TouchableOpacity
      onPress={isLoading ? undefined : onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        { backgroundColor: buttonColor, borderColor: textColor },
        isLoading && styles.disabled,
      ]}
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
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
});

export default BorderButton;
