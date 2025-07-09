import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface CustomAppBarProps {
  title: string;
  showBackButton?: boolean;
  customColor?: string;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({
  title,
  showBackButton = true,
  customColor = "#F3F4F6", // backgroundLight
}) => {
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: customColor }]}>
      <View style={styles.innerRow}>
        {showBackButton ? (
          <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
            <Ionicons name="arrow-back" size={20} color="#1F2937" />
          </TouchableOpacity>
        ) : (
          <View style={styles.icon} />
        )}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.icon} /> {/* right-side space for symmetry */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height:
      Platform.OS === "android" ? 56 + (StatusBar.currentHeight ?? 0) : 56,
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  innerRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 8,
  },
  icon: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937", // backgroundDark
  },
});

export default CustomAppBar;
