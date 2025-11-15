import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const Dropdown = ({ label, items, selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  // theme-based values
  const bg = theme.colors.surface;
  const text = theme.colors.onSurface;
  const border = theme.colors.outlineVariant ?? theme.colors.outline;
  const iconColor = theme.colors.onSurface;

  return (
    <View style={styles.container}>
      {/* DROPDOWN BUTTON */}
      <Pressable
        style={[
          styles.button,
          { backgroundColor: bg, borderColor: border },
          open && { borderColor: theme.colors.primary },
        ]}
        onPress={() => setOpen(!open)}
      >
        <Text style={[styles.buttonText, { color: text }]}>{selected}</Text>
        <MaterialIcons 
          name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={22} 
          color={iconColor} 
        />
      </Pressable>

      {/* DROPDOWN LIST */}
      {open && (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: bg,
              borderColor: border,
            },
          ]}
        >
          <FlatList
            data={items}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                style={styles.item}
                onPress={() => {
                  setOpen(false);
                  onSelect(item);
                }}
              >
                <Text style={[styles.itemText, { color: text }]}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
  },
  button: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
  },
  dropdown: {
    marginTop: 6,
    borderRadius: 8,
    paddingVertical: 6,
    borderWidth: 1,
    elevation: 3,
    maxHeight: 160,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  itemText: {
    fontSize: 14,
  },
});

export default Dropdown;
