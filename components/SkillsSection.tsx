// components/SkillsSection.tsx
// LEVEL 7 (Advanced): Dynamic Skills dari Data JSON

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ThemeColors } from '../utils/theme';

export interface SkillItem {
  id: string;
  nama: string;
  kategori: string;
  tingkat: string;
  persentase: number;
  icon: string;
  deskripsi: string;
}

interface SkillsSectionProps {
  skills: SkillItem[];
  theme: ThemeColors;
}

export default function SkillsSection({ skills, theme }: SkillsSectionProps) {
  const [selectedKategori, setSelectedKategori] = useState<string>('Semua');

  // Ambil daftar kategori unik
  const kategoriList = [
    'Semua',
    ...Array.from(new Set(skills.map((s) => s.kategori))),
  ];

  // Filter skills secara dinamis
  const filteredSkills =
    selectedKategori === 'Semua'
      ? skills
      : skills.filter((s) => s.kategori === selectedKategori);

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
        <Text style={styles.headerIcon}>⚡</Text>
        <View>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Technical Skills & Keahlian
          </Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            Dirender dinamis dari data JSON lokal ({skills.length} keahlian)
          </Text>
        </View>
      </View>

      {/* Filter Chips Kategori */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {kategoriList.map((kat) => {
          const isSelected = selectedKategori === kat;
          return (
            <TouchableOpacity
              key={kat}
              style={[
                styles.chip,
                {
                  backgroundColor: isSelected
                    ? theme.primary
                    : theme.surfaceSubtle,
                  borderColor: isSelected ? theme.primary : theme.cardBorder,
                },
              ]}
              onPress={() => setSelectedKategori(kat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
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
      </ScrollView>

      {/* Daftar Skill Dinamis */}
      <View style={styles.skillList}>
        {filteredSkills.map((skill) => (
          <View
            key={skill.id}
            style={[
              styles.skillCard,
              {
                backgroundColor: theme.surfaceSubtle,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <View style={styles.skillTop}>
              <View style={styles.skillTitleGroup}>
                <Text style={styles.skillIcon}>{skill.icon}</Text>
                <View>
                  <Text
                    style={[styles.skillName, { color: theme.textPrimary }]}
                  >
                    {skill.nama}
                  </Text>
                  <Text
                    style={[styles.skillCategory, { color: theme.textMuted }]}
                  >
                    {skill.kategori}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.badgeTingkat,
                  {
                    backgroundColor:
                      skill.tingkat === 'Advanced'
                        ? theme.successBg
                        : theme.primaryLight,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeTingkatText,
                    {
                      color:
                        skill.tingkat === 'Advanced'
                          ? theme.success
                          : theme.primary,
                    },
                  ]}
                >
                  {skill.tingkat}
                </Text>
              </View>
            </View>

            {/* Deskripsi */}
            <Text
              style={[styles.skillDesc, { color: theme.textSecondary }]}
              numberOfLines={2}
            >
              {skill.deskripsi}
            </Text>

            {/* Visual Bar Mini */}
            <View style={styles.barRow}>
              <View
                style={[
                  styles.barTrack,
                  { backgroundColor: theme.progressTrack },
                ]}
              >
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${skill.persentase}%`,
                      backgroundColor: theme.primary,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.barPercent, { color: theme.primary }]}>
                {skill.persentase}%
              </Text>
            </View>
          </View>
        ))}
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
  filterScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 11,
  },
  skillList: {
    gap: 10,
  },
  skillCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  skillTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  skillTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '700',
  },
  skillCategory: {
    fontSize: 10,
    marginTop: 1,
  },
  badgeTingkat: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  badgeTingkatText: {
    fontSize: 10,
    fontWeight: '700',
  },
  skillDesc: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  barPercent: {
    fontSize: 11,
    fontWeight: '800',
    width: 32,
    textAlign: 'right',
  },
});

