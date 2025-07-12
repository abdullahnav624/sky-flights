import store from "@/redux/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/home" options={{ headerShown: false }} />
        <Stack.Screen
          name="(app)/airport-result"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(app)/flights-result"
          options={{ headerShown: false }}
        />
      </Stack>
    </Provider>
  );
}
