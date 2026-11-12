// components/ProgressBar.tsx
// Komponen Reusable untuk Indikator Progres Persentase Dinamis (Level 8)

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeColors } from '../utils/theme';

interface ProgressBarProps {
  label: string;
  persentase: number;
  color?: string;
  icon?: string;
  keterangan?: string;
  theme: ThemeColors;
}

export default function ProgressBar({
  label,
  persentase,
  color = '#2563eb',
  icon,
  keterangan,
  theme,
}: ProgressBarProps) {
  // Batasi persentase antara 0% dan 100%
  const clampedProgress = Math.min(Math.max(persentase, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.labelCol}>
          {icon && <Text style={styles.iconText}>{icon}</Text>}
          <Text style={[styles.labelText, { color: theme.textPrimary }]}>
            {label}
          </Text>
        </View>

        <View
          style={[
            styles.percentageBadge,
            { backgroundColor: `${color}18`, borderColor: `${color}40` },
          ]}
        >
          <Text style={[styles.percentageText, { color }]}>
            {clampedProgress}%
          </Text>
        </View>
      </View>

      {/* Progress Track & Fill */}
      <View
        style={[styles.track, { backgroundColor: theme.progressTrack }]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      {keterangan && (
        <Text style={[styles.keteranganText, { color: theme.textMuted }]}>
          {keterangan}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    marginRight: 6,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '700',
  },
  percentageBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '800',
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  keteranganText: {
    fontSize: 11,
    marginTop: 4,
    fontStyle: 'italic',
  },
});

