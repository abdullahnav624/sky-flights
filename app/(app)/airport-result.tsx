/**
 * FILE: app/airport-search.js (or your actual file path)
 * PURPOSE:
 *   Airport selection screen that allows users to:
 *   - Choose origin and destination airports from fetched locations
 *   - View airport details in modal dropdowns
 *   - Submit selections to navigate to flight results
 *   - Integrates with Redux for location data management
 */

import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useSelector } from "react-redux"; // Redux state access
import { router, useLocalSearchParams } from "expo-router"; // Navigation

// Types and Components
import { LocationItem } from "@/types";
import CustomAppBar from "@/components/CustomAppBar";
import { RootState } from "@/redux/store";

/**
 * LocationOptionsScreen Component
 * Features:
 * - Modal dropdown selectors for airports
 * - Validation for required selections
 * - Navigation with selected airport parameters
 */
const LocationOptionsScreen: React.FC = () => {
  // Get date parameter from navigation
  const { date } = useLocalSearchParams();

  // Get location data from Redux store
  const fromLocations = useSelector(
    (state: RootState) => state.location.fromLocations
  );
  const toLocations = useSelector(
    (state: RootState) => state.location.toLocations
  );

  // Selected airport state
  const [selectedFrom, setSelectedFrom] = useState<LocationItem | null>(null);
  const [selectedTo, setSelectedTo] = useState<LocationItem | null>(null);

  // Modal visibility control
  const [modalVisible, setModalVisible] = useState<"from" | "to" | null>(null);

  /**
   * Handles airport selection from modal
   * @param item - Selected LocationItem object
   */
  const handleSelect = (item: LocationItem) => {
    modalVisible === "from" ? setSelectedFrom(item) : setSelectedTo(item);
    setModalVisible(null);
  };

  /**
   * Validates and submits airport selections
   * - Requires both origin and destination selections
   * - Navigates to flight results with parameters
   */
  const handleSubmit = () => {
    if (selectedFrom && selectedTo) {
      router.push({
        pathname: "/flights-result",
        params: {
          // Selected airport IDs
          originSkyId: selectedFrom.skyId,
          originEntityId: selectedFrom.entityId,
          destinationSkyId: selectedTo.skyId,
          destinationEntityID: selectedTo.entityId,

          // Search parameters
          date: date,
          origin: fromLocations[0].skyId,
          destination: toLocations[0].skyId,
        },
      });
    } else {
      alert("Please select both From and To airports.");
    }
  };

  return (
    <>
      <CustomAppBar title="Select Airports" />
      <View style={styles.container}>
        {/* Route Header */}
        <Text style={styles.label}>
          {fromLocations[0].skyId} - {toLocations[0].skyId}
        </Text>

        {/* Origin Airport Selector */}
        <Text style={styles.label}>Origin Airport</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setModalVisible("from")}
        >
          <Text style={styles.selectorText}>
            {selectedFrom?.presentation.title || "Select Origin Airport"}
          </Text>
        </TouchableOpacity>

        {/* Destination Airport Selector */}
        <Text style={styles.label}>Destination Airport</Text>
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setModalVisible("to")}
        >
          <Text style={styles.selectorText}>
            {selectedTo?.presentation.title || "Select Destination Airport"}
          </Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={!selectedFrom || !selectedTo}
          />
        </View>

        {/* Airport Selection Modal */}
        <Modal
          visible={modalVisible !== null}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={modalVisible === "from" ? fromLocations : toLocations}
                keyExtractor={(item) => item.skyId}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleSelect(item)}
                  >
                    {/* Airport Name */}
                    <Text style={styles.modalText}>
                      {item.presentation.title}
                    </Text>
                    {/* Airport Code/Location */}
                    <Text style={styles.modalSub}>
                      {item.presentation.subtitle}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(null)}
                color="#999"
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default LocationOptionsScreen;

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
    color: "#333",
  },
  selector: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    backgroundColor: "#f9f9f9",
  },
  selectorText: {
    fontSize: 16,
    color: "#444",
  },
  buttonContainer: {
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    maxHeight: "60%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  modalSub: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
