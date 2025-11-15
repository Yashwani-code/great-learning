import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { Appbar, Dialog, Portal, Button, Text, useTheme } from 'react-native-paper';
import Card from '../components/Card';
import Filters from '../components/Filters';
import ThemeToggle from '../components/ThemeToggle';
import { mockData, activityTypes, activityStatuses } from '../data/mockData';

const CardListScreen = ({ isDarkMode, onToggleTheme }) => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");


  const filteredActivities = useMemo(() => {
    return mockData.filter((activity) => {
      const matchesType =
        selectedType === 'All Types' || activity.type === selectedType;
      const matchesStatus =
        selectedStatus === 'All Status' || activity.status === selectedStatus;
      return matchesType && matchesStatus;
    });
  }, [selectedType, selectedStatus]);

  const handleFilterChange = (type, status) => {
    setSelectedType(type);
    setSelectedStatus(status);
  };

  const handleActionPress = (activity) => {
    let message;
    switch (activity.status) {
      case 'Not Started':
        message = `Getting started with "${activity.title}"`;
        break;
      case 'In Progress':
        message = `Resuming "${activity.title}"`;
        break;
      case 'Completed':
        message = `Reviewing "${activity.title}"`;
        break;
      default:
        message = activity.title;
    }
    setDialogMessage(message);
    setDialogVisible(true);

  };

  const renderActivity = ({ item }) => (
    <Card activity={item} onActionPress={handleActionPress} />
  );

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Appbar.Header
        mode="center-aligned"
        elevated
        statusBarHeight={Platform.OS === 'android' ? 0 : undefined}
      >
        <Appbar.Content
          title="Online Courses"
          subtitle="Track your learning"
        />
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
      </Appbar.Header>

      <View style={styles.content}>
        <Filters
          types={activityTypes}
          statuses={activityStatuses}
          onFilterChange={handleFilterChange}
        />

        <View style={styles.summaryRow}>
          <Text variant="labelMedium">
            {filteredActivities.length} activities
          </Text>
          {selectedType !== 'All Types' || selectedStatus !== 'All Status' ? (
            <Text variant="labelSmall" style={styles.summaryFilter}>
              Showing: {selectedType} · {selectedStatus}
            </Text>
          ) : null}
        </View>

        <FlatList
          data={filteredActivities}
          keyExtractor={(item) => item.id}
          renderItem={renderActivity}
          contentContainerStyle={
            filteredActivities.length === 0
              ? styles.emptyListContent
              : styles.listContent
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text variant="titleMedium" style={styles.emptyTitle}>
                Nothing matches your filters
              </Text>
              <Text variant="bodySmall" style={styles.emptySubtitle}>
                Try selecting a different type or status to see more activities.
              </Text>
            </View>
          }
        />
      </View>

      <Portal>
  <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}
    style={{ borderRadius: 5 }} >
    <Dialog.Title>Activity Update</Dialog.Title>

    <Dialog.Content>
      <Text>{dialogMessage}</Text>
    </Dialog.Content>

    <Dialog.Actions>
      <Button onPress={() => setDialogVisible(false)}>OK</Button>
    </Dialog.Actions>
  </Dialog>
</Portal>

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  summaryFilter: {
    opacity: 0.7,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyTitle: {
    textAlign: 'center',
    marginBottom: 6,
  },
  emptySubtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default CardListScreen;
