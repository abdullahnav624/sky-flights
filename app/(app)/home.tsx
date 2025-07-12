/**
 * FILE: app/(tabs)/home.js (or your actual file path)
 * PURPOSE:
 *   Main flight search screen with:
 *   - Trip type selection (Round-trip/One-way/Multi-city)
 *   - Location inputs (From/To)
 *   - Date pickers (Departure/Return)
 *   - Traveler/class selection
 *   - Integration with Redux for location management
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Date picker component
import { router } from "expo-router"; // Navigation
import moment from "moment"; // Date formatting
import { useDispatch, useSelector } from "react-redux"; // State management

// Components
import CustomAppBar from "@/components/CustomAppBar";
import AppTextField from "@/components/AppTextFields";
import PrimaryButton from "@/components/PrimaryButton";
import TravelerClassSelector from "@/components/TravelerClassSelector";

// Redux actions and types
import { getLocations } from "@/services/locationService";
import {
  setFromLocations,
  setToLocations,
} from "@/redux/actions/locationActions";
import { RootState } from "@/redux/store";

// Constants
const tripTypes = ["Round-trip", "One-way", "Multi-city"];

/**
 * HomeScreen Component
 * Core flight search functionality with:
 * - Location search
 * - Date selection
 * - Traveler configuration
 * - Redux integration for state management
 */
export default function HomeScreen() {
  // Redux setup
  const dispatch = useDispatch();
  const fromLocations = useSelector(
    (state: RootState) => state.location.fromLocations
  );

  // Form state
  const [selectedTrip, setSelectedTrip] = useState("Round-trip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Error handling
  const [errors, setErrors] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
  });

  // Date picker controls
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateType, setDateType] = useState<"departure" | "return">("departure");

  // Traveler configuration
  const [travelerModalVisible, setTravelerModalVisible] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");

  // Loading state
  const [loading, setLoading] = useState(false);

  /**
   * Handles date picker visibility
   * @param type - Whether selecting departure or return date
   */
  const showDatePicker = (type: "departure" | "return") => {
    setDateType(type);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  /**
   * Handles date selection confirmation
   * @param date - Selected Date object
   */
  const handleConfirm = (date: Date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");

    if (dateType === "departure") {
      setDepartureDate(formattedDate);
      setErrors((prev) => ({ ...prev, departureDate: "" }));
    } else {
      setReturnDate(formattedDate);
      setErrors((prev) => ({ ...prev, returnDate: "" }));
    }

    hideDatePicker();
  };

  // Input change handlers with error clearing
  const handleFromChange = (text: string) => {
    setFrom(text);
    if (text.trim()) setErrors((prev) => ({ ...prev, from: "" }));
  };

  const handleToChange = (text: string) => {
    setTo(text);
    if (text.trim()) setErrors((prev) => ({ ...prev, to: "" }));
  };

  /**
   * Validates and submits search form
   * - Checks all required fields
   * - Fetches location data
   * - Navigates to results
   */
  const handleSearch = async () => {
    // Validate inputs
    const newErrors = {
      from: !from.trim() ? "Please enter a departure city." : "",
      to: !to.trim() ? "Please enter a destination city." : "",
      departureDate: !departureDate ? "Please select a departure date." : "",
      returnDate:
        selectedTrip === "Round-trip" && !returnDate
          ? "Please select a return date."
          : "",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((msg) => msg !== "")) return;

    setLoading(true);

    try {
      // Fetch location data
      const fromRes = await getLocations(from);
      if (fromRes.status) dispatch(setFromLocations(fromRes.data));

      const toRes = await getLocations(to);
      if (toRes.status) dispatch(setToLocations(toRes.data));

      // Navigate to results
      router.push({
        pathname: "/airport-result",
        params: { date: departureDate },
      });
    } catch (err) {
      console.warn("Location fetching failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Generate traveler summary text
  const travelerSummary = `${adults + children + infants} traveler${
    adults + children + infants > 1 ? "s" : ""
  }, ${travelClass}`;

  return (
    <View style={styles.container}>
      <CustomAppBar title="Search Flights" showBackButton={false} />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Trip Type Selector */}
        <View style={styles.tripTypeRow}>
          {tripTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.tripTypeButton,
                selectedTrip === type && styles.tripTypeSelected,
              ]}
              onPress={() => setSelectedTrip(type)}
            >
              <Text
                style={[
                  styles.tripTypeText,
                  selectedTrip === type && styles.tripTypeTextSelected,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* From Location */}
        <AppTextField
          placeholder="From"
          value={from}
          onChangeText={handleFromChange}
        />
        {errors.from && <Text style={styles.errorText}>{errors.from}</Text>}

        {/* To Location */}
        <AppTextField
          placeholder="To"
          value={to}
          onChangeText={handleToChange}
        />
        {errors.to && <Text style={styles.errorText}>{errors.to}</Text>}

        {/* Departure Date */}
        <AppTextField
          placeholder="Departure Date"
          value={departureDate}
          onPressIn={() => showDatePicker("departure")}
        />
        {errors.departureDate && (
          <Text style={styles.errorText}>{errors.departureDate}</Text>
        )}

        {/* Return Date (only for Round-trip) */}
        {selectedTrip === "Round-trip" && (
          <>
            <AppTextField
              placeholder="Return Date"
              value={returnDate}
              onPressIn={() => showDatePicker("return")}
            />
            {errors.returnDate && (
              <Text style={styles.errorText}>{errors.returnDate}</Text>
            )}
          </>
        )}

        {/* Traveler/Class Selector */}
        <AppTextField
          placeholder="Travelers & Class"
          value={travelerSummary}
          onPressIn={() => setTravelerModalVisible(true)}
        />

        {/* Search Button */}
        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" />
        ) : (
          <PrimaryButton text="Search Airports" onPress={handleSearch} />
        )}
      </ScrollView>

      {/* Modals */}
      <TravelerClassSelector
        visible={travelerModalVisible}
        onClose={() => setTravelerModalVisible(false)}
        adults={adults}
        children={children}
        infants={infants}
        setAdults={setAdults}
        setChildren={setChildren}
        setInfants={setInfants}
        travelClass={travelClass}
        setTravelClass={setTravelClass}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />
    </View>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
    gap: 16, // Consistent spacing between elements
  },
  tripTypeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tripTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E5E7EB", // Light gray background
  },
  tripTypeSelected: {
    backgroundColor: "#2563EB", // Blue background for selected
  },
  tripTypeText: {
    color: "#374151", // Dark gray text
    fontWeight: "500",
  },
  tripTypeTextSelected: {
    color: "#FFFFFF", // White text for selected
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 4,
  },
});
