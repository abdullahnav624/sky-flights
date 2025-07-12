/**
 * FILE: app/flights-result.js
 * PURPOSE:
 *   Displays flight search results with:
 *   - Flight cards showing carrier, timing, duration, and price
 *   - Error handling and retry mechanism
 *   - Loading states and empty results handling
 */

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import CustomAppBar from "@/components/CustomAppBar";
import { useLocalSearchParams } from "expo-router";
import { searchFlights } from "@/services/FlightsService";

const MAX_RETRIES = 2; // Maximum retry attempts for failed API calls

/**
 * FlightResultsScreen Component
 * Features:
 * - Displays flight itineraries with detailed information
 * - Automatic retry mechanism for failed requests
 * - Carrier logo and flight details presentation
 */
const FlightResultsScreen = () => {
  // Navigation parameters
  const {
    originSkyId,
    originEntityId,
    destinationSkyId,
    destinationEntityID,
    date,
    origin,
    destination,
  } = useLocalSearchParams();

  // State management
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);
  const [carriersMap, setCarriersMap] = useState<Record<string, any>>({});
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const hasFetchedRef = useRef(false); // Prevents duplicate initial fetches

  /**
   * Fetches flight data from API
   * Implements retry mechanism up to MAX_RETRIES
   */
  const loadFlights = async () => {
    if (retryCount >= MAX_RETRIES) return;

    setLoading(true);
    setError("");
    setFlights([]);

    try {
      const response = await searchFlights({
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId: destinationEntityID,
        date,
      });

      if (!response?.data?.itineraries) {
        throw new Error("No flights available");
      }

      setFlights(response.data.itineraries);

      // Create carrier lookup map for logos/names
      const map: Record<string, any> = {};
      response.data.filterStats?.carriers?.forEach((carrier: any) => {
        map[carrier.id] = carrier;
      });
      setCarriersMap(map);
    } catch (err: any) {
      console.warn("API call failed:", err.message);
      setError("No data available. You can try again.");
      setRetryCount((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      loadFlights();
    }
  }, []);

  /**
   * Renders individual flight card
   * @param item - Flight itinerary object
   */
  const renderFlight = ({ item }: any) => {
    const leg = item.legs[0];
    const carrier = leg.carriers.marketing[0];
    const carrierData = carrier ? carriersMap[carrier.id] : null;

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          {carrierData?.logoUrl && (
            <Image source={{ uri: carrierData.logoUrl }} style={styles.logo} />
          )}
          <Text style={styles.carrier}>{carrierData?.name}</Text>
        </View>

        <Text style={styles.time}>
          {leg.origin.displayCode} {formatTime(leg.departure)} →{" "}
          {leg.destination.displayCode} {formatTime(leg.arrival)}
        </Text>

        <Text style={styles.duration}>
          {formatDuration(leg.durationInMinutes)} •{" "}
          {leg.stopCount === 0 ? "Nonstop" : `${leg.stopCount} stop(s)`}
        </Text>

        <Text style={styles.price}>{item.price.formatted}</Text>
      </View>
    );
  };

  // Helper functions
  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.getUTCHours()}:${d
      .getUTCMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const formatDuration = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Searching for available flights...</Text>
      </View>
    );
  }

  return (
    <>
      <CustomAppBar title={"Available flights"} />
      <View style={styles.container}>
        <Text style={styles.label}>
          {origin} - {destination}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterBar}
        />

        {/* Error/Empty states */}
        {error ? (
          <View style={styles.center}>
            <Text style={styles.error}>{error}</Text>
            <Button
              title={
                retryCount >= MAX_RETRIES
                  ? "Retry Limit Reached"
                  : `Retry (${MAX_RETRIES - retryCount} left)`
              }
              onPress={loadFlights}
              disabled={retryCount >= MAX_RETRIES}
            />
          </View>
        ) : flights.length === 0 ? (
          <View style={styles.center}>
            <Text style={styles.error}>No flights found for your search.</Text>
            <Button
              title={
                retryCount >= MAX_RETRIES
                  ? "Reload Limit Reached"
                  : `Reload (${MAX_RETRIES - retryCount} left)`
              }
              onPress={loadFlights}
              disabled={retryCount >= MAX_RETRIES}
            />
          </View>
        ) : (
          // Results list
          <FlatList
            data={flights}
            renderItem={renderFlight}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  label: { fontSize: 16, fontWeight: "600", marginTop: 24 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    margin: 12,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#6F8CB069",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  row: { flexDirection: "row", alignItems: "center" },
  logo: { width: 30, height: 30, marginRight: 10 },
  carrier: { fontSize: 16, fontWeight: "600" },
  time: { fontSize: 18, marginTop: 10 },
  duration: { fontSize: 14, color: "#666" },
  price: { fontSize: 20, fontWeight: "bold", color: "#2196F3", marginTop: 10 },
  filterBar: { marginBottom: 10 },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
});

export default FlightResultsScreen;
