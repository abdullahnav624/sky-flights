import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";

interface TravelerClassSelectorProps {
  visible: boolean;
  onClose: () => void;
  adults: number;
  children: number;
  infants: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  setInfants: React.Dispatch<React.SetStateAction<number>>;
  travelClass: string;
  setTravelClass: React.Dispatch<React.SetStateAction<string>>;
}

const TravelerClassSelector: React.FC<TravelerClassSelectorProps> = ({
  visible,
  onClose,
  adults,
  children,
  infants,
  setAdults,
  setChildren,
  setInfants,
  travelClass,
  setTravelClass,
}) => {
  const classes = ["Economy", "Premium Economy", "Business", "First"];

  const renderCounter = (
    label: string,
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>,
    min: number = 0,
    max: number = 9
  ) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counter}>
        <TouchableOpacity
          onPress={() => setCount(Math.max(min, count - 1))}
          style={styles.counterBtn}
        >
          <Text style={styles.counterText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{count}</Text>
        <TouchableOpacity
          onPress={() => setCount(Math.min(max, count + 1))}
          style={styles.counterBtn}
        >
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.sheet}>
        <Text style={styles.title}>Travelers & Class</Text>

        {renderCounter("Adult", adults, setAdults, 1)}
        {renderCounter("Children (2–12 yrs)", children, setChildren)}
        {renderCounter("Infant (Below 2 yrs)", infants, setInfants)}

        <Text style={styles.classTitle}>Class</Text>
        <FlatList
          data={classes}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.classOption,
                travelClass === item && styles.classSelected,
              ]}
              onPress={() => setTravelClass(item)}
            >
              <Text
                style={[
                  styles.classText,
                  travelClass === item && styles.classTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000099",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  counterText: {
    color: "#fff",
    fontSize: 20,
  },
  counterValue: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  classTitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  classOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  classSelected: {
    backgroundColor: "#DBEAFE",
    borderRadius: 8,
  },
  classText: {
    fontSize: 16,
  },
  classTextSelected: {
    color: "#1D4ED8",
    fontWeight: "bold",
  },
  doneBtn: {
    marginTop: 16,
    backgroundColor: "#2563EB",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  doneText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TravelerClassSelector;
