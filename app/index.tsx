import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Flight App!</Text>
      <Link href="/signup">
        <Text>Go to Sign Up</Text>
      </Link>
    </View>
  );
}
