// components/StateFeedback.tsx
// LEVEL 10 (Industry): Loading State, Error State, & Empty State Reusable Components

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ThemeColors } from '../utils/theme';

// 1. LOADING STATE
export function LoadingState({
  message = 'Memuat data dari server LMS...',
  theme,
}: {
  message?: string;
  theme: ThemeColors;
}) {
  return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
        {message}
      </Text>
      <Text style={[styles.loadingSubText, { color: theme.textMuted }]}>
        Academic War LMS Synchronization
      </Text>
    </View>
  );
}

// 2. ERROR STATE DENGAN TOMBOL RETRY
export function ErrorState({
  message = 'Terjadi kesalahan saat memuat data.',
  onRetry,
  theme,
}: {
  message?: string;
  onRetry?: () => void;
  theme: ThemeColors;
}) {
  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.dangerBg,
          borderColor: theme.isDark ? '#7f1d1d' : '#fecaca',
        },
      ]}
    >
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={[styles.errorTitle, { color: theme.danger }]}>
        Gagal Memuat Data LMS
      </Text>
      <Text style={[styles.errorDesc, { color: theme.textSecondary }]}>
        {message}
      </Text>

      {onRetry && (
        <TouchableOpacity
          style={[styles.retryBtn, { backgroundColor: theme.primary }]}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <Text style={styles.retryBtnText}>🔄 Coba Muat Ulang</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 3. EMPTY STATE
export function EmptyState({
  title = 'Data Belum Tersedia',
  description = 'Tidak ada item yang ditemukan pada kategori ini.',
  actionLabel,
  onAction,
  theme,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  theme: ThemeColors;
}) {
  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.surfaceSubtle,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      <Text style={styles.emptyIcon}>📂</Text>
      <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
        {title}
      </Text>
      <Text style={[styles.emptyDesc, { color: theme.textMuted }]}>
        {description}
      </Text>

      {actionLabel && onAction && (
        <TouchableOpacity
          style={[
            styles.emptyActionBtn,
            {
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
            },
          ]}
          onPress={onAction}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.emptyActionText, { color: theme.primary }]}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 14,
  },
  loadingSubText: {
    fontSize: 11,
    marginTop: 3,
  },
  cardContainer: {
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    marginVertical: 12,
  },
  errorIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  errorDesc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
  },
  retryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  retryBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  emptyDesc: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 12,
  },
  emptyActionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  emptyActionText: {
    fontSize: 12,
    fontWeight: '700',
  },
});

