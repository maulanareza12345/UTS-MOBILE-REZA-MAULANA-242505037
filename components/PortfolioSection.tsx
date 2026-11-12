// components/PortfolioSection.tsx
// LEVEL 7 (Advanced): Dynamic Portfolio Gallery

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ThemeColors } from '../utils/theme';

export interface PortfolioItem {
  id: string;
  judul: string;
  kategori: string;
  deskripsi: string;
  tech: string[];
  status: string;
  tahun: string;
  icon: string;
  peran: string;
}

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
  theme: ThemeColors;
}

export default function PortfolioSection({
  portfolio,
  theme,
}: PortfolioSectionProps) {
  const [selectedKat, setSelectedKat] = useState<string>('Semua');

  const categories = ['Semua', 'Mobile', 'Web'];

  const filtered =
    selectedKat === 'Semua'
      ? portfolio
      : portfolio.filter((p) => p.kategori === selectedKat);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.headerIcon}>💼</Text>
        <View>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Portofolio & Proyek Pilihan
          </Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            Daftar karya dan proyek aplikasi yang telah dikembangkan
          </Text>
        </View>
      </View>

      {/* Filter Category Buttons */}
      <View style={styles.filterRow}>
        {categories.map((kat) => {
          const isSelected = selectedKat === kat;
          return (
            <TouchableOpacity
              key={kat}
              style={[
                styles.tabBtn,
                {
                  backgroundColor: isSelected
                    ? theme.primary
                    : theme.surfaceSubtle,
                  borderColor: isSelected ? theme.primary : theme.cardBorder,
                },
              ]}
              onPress={() => setSelectedKat(kat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabBtnText,
                  {
                    color: isSelected ? '#ffffff' : theme.textSecondary,
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {kat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Projects List */}
      <View style={styles.projectList}>
        {filtered.map((item) => {
          const isDone = item.status === 'Selesai';
          return (
            <View
              key={item.id}
              style={[
                styles.projectCard,
                {
                  backgroundColor: theme.surfaceSubtle,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <View style={styles.projectTopRow}>
                <View style={styles.projectTitleCol}>
                  <Text style={styles.projectIcon}>{item.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.projectTitle,
                        { color: theme.textPrimary },
                      ]}
                    >
                      {item.judul}
                    </Text>
                    <Text
                      style={[
                        styles.projectMeta,
                        { color: theme.textMuted },
                      ]}
                    >
                      {item.tahun} • {item.peran}
                    </Text>
                  </View>
                </View>

                {/* Status Badge */}
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: isDone
                        ? theme.successBg
                        : theme.warningBg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      {
                        color: isDone ? theme.success : theme.warning,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.projectDesc, { color: theme.textSecondary }]}
              >
                {item.deskripsi}
              </Text>

              {/* Tech Stack Pills */}
              <View style={styles.techPillContainer}>
                {item.tech.map((tech, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.techPill,
                      {
                        backgroundColor: theme.isDark
                          ? '#1e293b'
                          : '#e2e8f0',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.techPillText,
                        { color: theme.textPrimary },
                      ]}
                    >
                      #{tech}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  tabBtn: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  tabBtnText: {
    fontSize: 12,
  },
  projectList: {
    gap: 12,
  },
  projectCard: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  projectTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  projectTitleCol: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 8,
  },
  projectIcon: {
    fontSize: 20,
    marginRight: 8,
    marginTop: 1,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  projectMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  projectDesc: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },
  techPillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  techPill: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  techPillText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

