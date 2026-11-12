// components/ScoreDashboard.tsx
// LEVEL 8 (Expert): My Score & Academic Dashboard

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeColors } from '../utils/theme';
import ProgressBar from './ProgressBar';

export interface AcademicScoreData {
  identitas: {
    nama: string;
    nim: string;
    prodi: string;
    fakultas: string;
    kelas: string;
    universitas: string;
    mataKuliah: string;
    dosen: string;
    tahunAjaran: string;
    jenisUjian: string;
  };
  currentScore: {
    nilai: number;
    grade: string;
    status: string;
    keterangan: string;
  };
  learningPoints: {
    totalLP: number;
    badgeTitle: string;
    rankTingkat: string;
    targetNextRank: number;
  };
  learningProgress: Array<{
    id: string;
    kategori: string;
    persentase: number;
    icon: string;
    keterangan: string;
    color: string;
  }>;
  timelineUjian: Array<{
    minggu: string;
    fokus: string;
    status: string;
  }>;
}

interface ScoreDashboardProps {
  data: AcademicScoreData;
  theme: ThemeColors;
}

export default function ScoreDashboard({ data, theme }: ScoreDashboardProps) {
  const lpPercent = Math.round(
    (data.learningPoints.totalLP / data.learningPoints.targetNextRank) * 100
  );

  return (
    <View style={styles.container}>
      {/* 1. HERO SCORE & GRADE CARD (HIGHLIGHT SECTION) */}
      <View
        style={[
          styles.heroScoreCard,
          {
            backgroundColor: theme.isDark ? '#1e1b4b' : '#1e3a8a',
            borderColor: theme.isDark ? '#312e81' : '#1d4ed8',
          },
        ]}
      >
        <View style={styles.scoreTopRow}>
          <View>
            <Text style={styles.heroPreTitle}>ACADEMIC WAR SCORE</Text>
            <Text style={styles.heroMkTitle}>{data.identitas.mataKuliah}</Text>
            <Text style={styles.heroDosenText}>
              Dosen: {data.identitas.dosen}
            </Text>
          </View>

          {/* Grade Badge A Glowing */}
          <View style={styles.gradeBadgeContainer}>
            <Text style={styles.gradeLetter}>{data.currentScore.grade}</Text>
            <Text style={styles.gradeSubText}>GRADE</Text>
          </View>
        </View>

        {/* Big Numbers Split */}
        <View style={styles.scoreStatsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>CURRENT SCORE</Text>
            <Text style={styles.statValueScore}>{data.currentScore.nilai}</Text>
            <Text style={styles.statSubText}>Skala 0 - 100</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>LEARNING POINTS</Text>
            <Text style={styles.statValueLp}>
              {data.learningPoints.totalLP.toLocaleString('id-ID')}
            </Text>
            <Text style={styles.statBadgeTitle}>
              🎖️ {data.learningPoints.badgeTitle}
            </Text>
          </View>
        </View>

        {/* LP Progress to Next Rank */}
        <View style={styles.lpProgressContainer}>
          <View style={styles.lpProgressLabelRow}>
            <Text style={styles.lpRankTier}>
              {data.learningPoints.rankTingkat}
            </Text>
            <Text style={styles.lpTargetText}>
              {data.learningPoints.totalLP} / {data.learningPoints.targetNextRank} LP ({lpPercent}%)
            </Text>
          </View>
          <View style={styles.lpTrack}>
            <View style={[styles.lpFill, { width: `${lpPercent}%` }]} />
          </View>
        </View>
      </View>

      {/* 2. IDENTITAS AKADEMIK RESMI */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>🎓</Text>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Identitas Akademik Ujian
          </Text>
        </View>

        <View style={styles.tableGrid}>
          <TableRow
            label="Nama Mahasiswa"
            value={data.identitas.nama}
            theme={theme}
          />
          <TableRow
            label="NIM"
            value={data.identitas.nim}
            highlight
            theme={theme}
          />
          <TableRow
            label="Program Studi"
            value={data.identitas.prodi}
            theme={theme}
          />
          <TableRow
            label="Kelas / Semester"
            value={data.identitas.kelas}
            theme={theme}
          />
          <TableRow
            label="Perguruan Tinggi"
            value={data.identitas.universitas}
            theme={theme}
          />
          <TableRow
            label="Mata Kuliah"
            value={data.identitas.mataKuliah}
            theme={theme}
          />
          <TableRow
            label="Dosen Pengampu"
            value={data.identitas.dosen}
            theme={theme}
          />
          <TableRow
            label="Tahun Akademik"
            value={data.identitas.tahunAjaran}
            theme={theme}
          />
        </View>
      </View>

      {/* 3. LEARNING PROGRESS SECTION (DINAMIS DENGAN PROGRESS BAR) */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>📊</Text>
          <View>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
              Learning Progress Capaian
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.textMuted }]}>
              Indikator persentase aktivitas akademik mahasiswa
            </Text>
          </View>
        </View>

        <View style={styles.progressList}>
          {data.learningProgress.map((item) => (
            <ProgressBar
              key={item.id}
              label={item.kategori}
              persentase={item.persentase}
              color={item.color}
              icon={item.icon}
              keterangan={item.keterangan}
              theme={theme}
            />
          ))}
        </View>
      </View>

      {/* 4. TIMELINE UTS & ROADMAP PENGEMBANGAN */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>🗺️</Text>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Timeline Progressive Challenge
          </Text>
        </View>

        <View style={styles.timelineList}>
          {data.timelineUjian.map((step, idx) => {
            const isCompleted = step.status === 'Selesai';
            return (
              <View key={idx} style={styles.timelineItem}>
                <View style={styles.timelineDotCol}>
                  <View
                    style={[
                      styles.timelineDot,
                      {
                        backgroundColor: isCompleted
                          ? theme.success
                          : theme.primary,
                      },
                    ]}
                  />
                  {idx < data.timelineUjian.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        { backgroundColor: theme.cardBorder },
                      ]}
                    />
                  )}
                </View>

                <View style={styles.timelineContent}>
                  <View style={styles.timelineHeaderRow}>
                    <Text
                      style={[
                        styles.timelineWeek,
                        { color: theme.textPrimary },
                      ]}
                    >
                      {step.minggu}
                    </Text>
                    <View
                      style={[
                        styles.statusPill,
                        {
                          backgroundColor: isCompleted
                            ? theme.successBg
                            : theme.primaryLight,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusPillText,
                          {
                            color: isCompleted
                              ? theme.success
                              : theme.primary,
                          },
                        ]}
                      >
                        {step.status}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.timelineFokus,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {step.fokus}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

// Subkomponen baris tabel
function TableRow({
  label,
  value,
  highlight = false,
  theme,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  theme: ThemeColors;
}) {
  return (
    <View style={styles.tableRow}>
      <Text style={[styles.tableLabel, { color: theme.textMuted }]}>
        {label}
      </Text>
      <Text
        style={[
          styles.tableValue,
          {
            color: highlight ? theme.primary : theme.textPrimary,
            fontWeight: highlight ? '800' : '600',
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 20,
  },
  heroScoreCard: {
    borderRadius: 22,
    padding: 20,
    borderWidth: 1.5,
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  scoreTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  heroPreTitle: {
    color: '#93c5fd',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroMkTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  heroDosenText: {
    color: '#bfdbfe',
    fontSize: 12,
    marginTop: 2,
  },
  gradeBadgeContainer: {
    backgroundColor: '#f59e0b',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  gradeLetter: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  gradeSubText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scoreStatsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statLabel: {
    color: '#bfdbfe',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  statValueScore: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
  },
  statValueLp: {
    color: '#fbbf24',
    fontSize: 24,
    fontWeight: '900',
  },
  statSubText: {
    color: '#93c5fd',
    fontSize: 10,
    marginTop: 2,
  },
  statBadgeTitle: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  lpProgressContainer: {
    gap: 6,
  },
  lpProgressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lpRankTier: {
    color: '#67e8f9',
    fontSize: 11,
    fontWeight: '700',
  },
  lpTargetText: {
    color: '#cbd5e1',
    fontSize: 11,
  },
  lpTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  lpFill: {
    height: '100%',
    backgroundColor: '#38bdf8',
    borderRadius: 4,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.15)',
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  sectionSubtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  tableGrid: {
    gap: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.08)',
  },
  tableLabel: {
    fontSize: 13,
    fontWeight: '500',
    width: '45%',
  },
  tableValue: {
    fontSize: 13,
    width: '55%',
    textAlign: 'right',
  },
  progressList: {
    gap: 6,
  },
  timelineList: {
    marginTop: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timelineDotCol: {
    alignItems: 'center',
    width: 20,
    marginRight: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  timelineWeek: {
    fontSize: 13,
    fontWeight: '700',
  },
  statusPill: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  timelineFokus: {
    fontSize: 12,
    lineHeight: 18,
  },
});

