// components/ProfileHeader.tsx
// Desain Hero Profile terinspirasi Vercel Portfolio (kangsolihin.vercel.app)
// Ditambahkan tombol Unduh CV ke PDF (Level 10 Industry)

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ThemeColors, lightTheme } from '../utils/theme';
import { PROFILE_IMAGE_BASE64 } from '../assets/profileBase64';

export interface ProfileHeaderData {
  nama: string;
  nim: string;
  profesi: string;
  universitas: string;
  prodi: string;
  fakultas?: string;
  deskripsi?: string;
  status?: {
    tersedia: boolean;
    label: string;
  };
}

interface ProfileHeaderProps {
  data: ProfileHeaderData;
  theme?: ThemeColors;
  onNavigateToTab?: (tab: 'score' | 'skills' | 'contact') => void;
  onDownloadPdf?: () => void;
  isDownloadingPdf?: boolean;
}

export default function ProfileHeader({
  data,
  theme = lightTheme,
  onNavigateToTab,
  onDownloadPdf,
  isDownloadingPdf = false,
}: ProfileHeaderProps) {
  const [likes, setLikes] = useState<number>(24);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    Alert.alert(
      isBookmarked ? 'Bookmark Dihapus' : 'Profil Disimpan! ⭐',
      isBookmarked
        ? 'Profil Reza Maulana telah dihapus dari daftar favorit.'
        : 'Profil Reza Maulana berhasil disimpan ke daftar favorit Anda!'
    );
  };

  return (
    <View
      style={[
        styles.heroContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          shadowColor: theme.shadowColor,
        },
      ]}
    >
      {/* 1. STATUS BADGE TERSEDIA (VERCEL STYLE) */}
      <View
        style={[
          styles.statusPill,
          {
            backgroundColor: theme.successBg,
            borderColor: theme.isDark ? '#065f46' : '#bbf7d0',
          },
        ]}
      >
        <View style={styles.statusDotGreen} />
        <Text style={[styles.statusPillText, { color: theme.success }]}>
          {data.status?.label || 'Available for Projects & Collaboration'}
        </Text>
      </View>

      {/* 2. AVATAR DENGAN RING BORDER & GLOW */}
      <View style={styles.avatarWrapper}>
        <View
          style={[
            styles.avatarRing,
            { borderColor: theme.primary, backgroundColor: theme.surfaceSubtle },
          ]}
        >
          <Image
            source={{ uri: PROFILE_IMAGE_BASE64 }}
            style={styles.avatarImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.badgeOnlineFloat}>
          <View style={styles.dotOnline} />
        </View>
      </View>

      {/* 3. GREETING & IDENTITAS MAHASISWA */}
      <Text style={[styles.greetingText, { color: theme.textMuted }]}>
        Halo! Saya
      </Text>
      <Text style={[styles.nameTitle, { color: theme.textPrimary }]}>
        {data.nama}
      </Text>

      {/* NIM BADGE HIGHLIGHT */}
      <View
        style={[
          styles.nimBadge,
          {
            backgroundColor: theme.primaryLight,
            borderColor: theme.isDark ? '#1e3a8a' : '#bfdbfe',
          },
        ]}
      >
        <Text style={[styles.nimPrefix, { color: theme.primary }]}>NIM</Text>
        <Text style={[styles.nimCode, { color: theme.primary }]}>
          {data.nim}
        </Text>
      </View>

      <Text style={[styles.professionText, { color: theme.textSecondary }]}>
        {data.profesi}
      </Text>

      {/* KAMPUS & PRODI PILLS */}
      <View style={styles.tagWrap}>
        <View
          style={[
            styles.tagItem,
            {
              backgroundColor: theme.surfaceSubtle,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.tagItemText, { color: theme.textPrimary }]}>
            🏛️ {data.universitas}
          </Text>
        </View>
        <View
          style={[
            styles.tagItem,
            {
              backgroundColor: theme.surfaceSubtle,
              borderColor: theme.cardBorder,
            },
          ]}
        >
          <Text style={[styles.tagItemText, { color: theme.textPrimary }]}>
            💻 {data.prodi}
          </Text>
        </View>
      </View>

      {/* 4. QUICK STATS COUNTERS */}
      <View
        style={[
          styles.statsCardGrid,
          {
            backgroundColor: theme.surfaceSubtle,
            borderColor: theme.cardBorder,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.statCell}
          onPress={() => onNavigateToTab?.('score')}
          activeOpacity={0.7}
        >
          <Text style={[styles.statValue, { color: theme.primary }]}>
            92 (A)
          </Text>
          <Text style={[styles.statTitle, { color: theme.textMuted }]}>
            Nilai Score
          </Text>
        </TouchableOpacity>

        <View
          style={[styles.statDividerVertical, { backgroundColor: theme.cardBorder }]}
        />

        <TouchableOpacity
          style={styles.statCell}
          onPress={() => onNavigateToTab?.('score')}
          activeOpacity={0.7}
        >
          <Text style={[styles.statValue, { color: '#f59e0b' }]}>
            12.3k
          </Text>
          <Text style={[styles.statTitle, { color: theme.textMuted }]}>
            Total LP
          </Text>
        </TouchableOpacity>

        <View
          style={[styles.statDividerVertical, { backgroundColor: theme.cardBorder }]}
        />

        <TouchableOpacity
          style={styles.statCell}
          onPress={() => onNavigateToTab?.('score')}
          activeOpacity={0.7}
        >
          <Text style={[styles.statValue, { color: theme.success }]}>
            100%
          </Text>
          <Text style={[styles.statTitle, { color: theme.textMuted }]}>
            Kehadiran
          </Text>
        </TouchableOpacity>

        <View
          style={[styles.statDividerVertical, { backgroundColor: theme.cardBorder }]}
        />

        <TouchableOpacity
          style={styles.statCell}
          onPress={() => onNavigateToTab?.('skills')}
          activeOpacity={0.7}
        >
          <Text style={[styles.statValue, { color: theme.accent }]}>
            4+
          </Text>
          <Text style={[styles.statTitle, { color: theme.textMuted }]}>
            Projects
          </Text>
        </TouchableOpacity>
      </View>

      {/* 5. TOMBOL UTAMA: UNDUH CV KE PDF (FITUR LEVEL 10 INDUSTRY) */}
      {onDownloadPdf && (
        <TouchableOpacity
          style={[
            styles.pdfDownloadBanner,
            {
              backgroundColor: theme.isDark ? '#1e293b' : '#1e3a8a',
              borderColor: theme.isDark ? '#3b82f6' : '#1d4ed8',
            },
          ]}
          onPress={onDownloadPdf}
          disabled={isDownloadingPdf}
          activeOpacity={0.8}
        >
          <View style={styles.pdfIconCircle}>
            <Text style={styles.pdfIconText}>📄</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.pdfHeaderRow}>
              <Text style={styles.pdfTitleText}>Unduh CV Resmi (PDF)</Text>
              <View style={styles.pdfLevelBadge}>
                <Text style={styles.pdfLevelBadgeText}>LEVEL 10</Text>
              </View>
            </View>
            <Text style={styles.pdfSubtitleText}>
              {isDownloadingPdf
                ? 'Sedang membuat file PDF...'
                : 'Cetak / Simpan CV & Academic Score A4'}
            </Text>
          </View>

          {isDownloadingPdf ? (
            <ActivityIndicator size="small" color="#ffffff" style={{ marginLeft: 8 }} />
          ) : (
            <View style={styles.pdfArrowBox}>
              <Text style={styles.pdfArrowText}>⬇️</Text>
            </View>
          )}
        </TouchableOpacity>
      )}

      {/* 6. ACTION BUTTONS ROW */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.btnPrimary, { backgroundColor: theme.primary }]}
          onPress={() => onNavigateToTab?.('contact')}
          activeOpacity={0.8}
        >
          <Text style={styles.btnPrimaryText}>✉️ Hubungi Reza</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnSecondary,
            {
              backgroundColor: theme.surfaceSubtle,
              borderColor: theme.cardBorder,
            },
          ]}
          onPress={() => onNavigateToTab?.('score')}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnSecondaryText, { color: theme.textPrimary }]}>
            🎓 Lihat Score
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnIcon,
            isBookmarked
              ? { backgroundColor: theme.warning }
              : {
                  backgroundColor: theme.surfaceSubtle,
                  borderColor: theme.cardBorder,
                },
          ]}
          onPress={handleBookmark}
          activeOpacity={0.7}
        >
          <Text style={styles.btnIconText}>
            {isBookmarked ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* TOMBOL LIKE COUNTER (LEVEL 4 INTERACTIVE) */}
      <TouchableOpacity
        style={styles.likeRow}
        onPress={handleLike}
        activeOpacity={0.6}
      >
        <Text style={[styles.likeText, { color: theme.textMuted }]}>
          Apresiasi profil ini:{' '}
          <Text style={{ color: theme.primary, fontWeight: '700' }}>
            👍 {likes} Apresiasi
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    borderRadius: 24,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
    marginBottom: 16,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  statusDotGreen: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarRing: {
    width: 124,
    height: 124,
    borderRadius: 62,
    padding: 3,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  badgeOnlineFloat: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  dotOnline: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10b981',
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  nameTitle: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  nimBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 8,
    borderWidth: 1,
  },
  nimPrefix: {
    fontSize: 11,
    fontWeight: '700',
    marginRight: 5,
    opacity: 0.8,
  },
  nimCode: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  professionText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  tagItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
  },
  tagItemText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statsCardGrid: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 14,
  },
  statCell: {
    alignItems: 'center',
    flex: 1,
  },
  statDividerVertical: {
    width: 1,
    height: '60%',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 10,
    fontWeight: '600',
  },

  /* STYLES TOMBOL UNDUH PDF */
  pdfDownloadBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    marginBottom: 14,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  pdfIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pdfIconText: {
    fontSize: 18,
  },
  pdfHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pdfTitleText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  pdfLevelBadge: {
    backgroundColor: '#f59e0b',
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  pdfLevelBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '900',
  },
  pdfSubtitleText: {
    color: '#bfdbfe',
    fontSize: 10,
    marginTop: 2,
  },
  pdfArrowBox: {
    paddingLeft: 6,
  },
  pdfArrowText: {
    fontSize: 16,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  btnPrimary: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  btnSecondary: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSecondaryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  btnIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIconText: {
    fontSize: 16,
  },
  likeRow: {
    marginTop: 12,
    paddingVertical: 4,
  },
  likeText: {
    fontSize: 11,
  },
});
