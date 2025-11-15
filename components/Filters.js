import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Dropdown from "./Dropdown.js";
import { useTheme } from "react-native-paper";

const FilterBar = ({ types, statuses, onFilterChange }) => {
  const theme = useTheme();

  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const update = (type, status) => {
    onFilterChange(type, status);
  };

  // Theme colors
  const bg = theme.colors.surface;
  const textColor = theme.colors.onSurface;
  const faded = theme.colors.onSurfaceDisabled ?? theme.colors.onSurface;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bg,
          shadowColor: theme.colors.shadow ?? "#000",
        },
      ]}
    >
      <Text style={[styles.title, { color: textColor }]}>Filters</Text>

      <View style={styles.row}>
        <Dropdown
          label="Type"
          items={types}
          selected={selectedType}
          onSelect={(value) => {
            setSelectedType(value);
            update(value, selectedStatus);
          }}
        />

        <Dropdown
          label="Status"
          items={statuses}
          selected={selectedStatus}
          onSelect={(value) => {
            setSelectedStatus(value);
            update(selectedType, value);
          }}
        />
      </View>

      <Text
        style={[styles.reset, { color: faded }]}
        onPress={() => {
          setSelectedType("All Types");
          setSelectedStatus("All Status");
          update("All Types", "All Status");
        }}
      >
        Reset Filters
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginHorizontal: 16,
    borderRadius: 14,
    elevation: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reset: {
    marginTop: 10,
    textAlign: "right",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});

export default FilterBar;
