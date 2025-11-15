import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button, Chip, useTheme } from 'react-native-paper';

const getStatusAppearance = (status, theme) => {
  switch (status) {
    case 'Not Started':
      return { label: 'Not started', color: theme.colors.outline };
    case 'In Progress':
      return { label: 'In progress', color: theme.colors.primary };
    case 'Completed':
      return { label: 'Completed', color: '#16a34a' };
    default:
      return { label: status, color: theme.colors.outline };
  }
};

const Cards = ({ activity, onActionPress }) => {
  const theme = useTheme();
  const statusStyles = getStatusAppearance(activity.status, theme);

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
              {activity.title}
            </Text>
            <View style={styles.metaRow}>
              <Chip compact style={styles.metaChip}>
                <Text variant="labelSmall">{activity.type}</Text>
              </Chip>
              {activity.instructor ? (
                <Chip compact style={styles.metaChip}>
                  <Text variant="labelSmall">{activity.instructor}</Text>
                </Chip>
              ) : null}
            </View>
          </View>
          <Chip
            compact
            style={[styles.statusChip, { borderColor: statusStyles.color }]}
            textStyle={{ color: statusStyles.color, fontWeight: '600' }}
          >
            {statusStyles.label}
          </Chip>
        </View>

        <View style={styles.bodyRow}>
          <Text variant="bodySmall" style={styles.description} numberOfLines={3}>
            {activity.description}
          </Text>
        </View>

        <View style={styles.footerRow}>
          <View style={styles.footerLeft}>
            <Text variant="labelSmall">
              {activity.date} · {activity.time}
            </Text>
            {activity.duration && (
              <Text variant="labelSmall" style={styles.subMeta}>
                {activity.duration}
              </Text>
            )}
          </View>

          <Button
            mode={activity.status === 'Completed' ? 'outlined' : 'contained'}
            onPress={() => onActionPress && onActionPress(activity)}
            style={styles.actionButton}
            compact
          >
            {activity.status === 'Completed' ? 'View details' : 'Go to activity'}
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
  content: {
    paddingVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  metaChip: {
    marginRight: 4,
    marginTop: 4,
  },
  statusChip: {
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  bodyRow: {
    marginTop: 10,
  },
  description: {
    opacity: 0.8,
  },
  footerRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLeft: {
    flex: 1,
  },
  subMeta: {
    opacity: 0.7,
    marginTop: 2,
  },
  actionButton: {
    marginLeft: 8,
    borderRadius: 20,
  },
});

export default Cards;
