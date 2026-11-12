// components/AboutSection.tsx
// Desain About & Biodata terinspirasi Vercel Portfolio (kangsolihin.vercel.app)
// Dilengkapi Tautan Langsung Interaktif (WhatsApp Direct Chat, Email, Maps, GitHub)
// Serta Pengalaman Praktik/Magang, Organisasi, dan Karya Tulis

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { ThemeColors, lightTheme } from '../utils/theme';

export interface AboutSectionData {
  deskripsi: string;
  ttl: string;
  agama: string;
  prodi: string;
  fakultas: string;
  universitas: string;
  mataKuliah: string;
  dosen: string;
  kontak: {
    email: string;
    telepon: string;
    waNumber?: string;
    alamat: string;
    domisiliKampus?: string;
    github?: string;
    linkedin?: string;
  };
}

interface AboutSectionProps {
  data: AboutSectionData;
  theme?: ThemeColors;
}

export default function AboutSection({
  data,
  theme = lightTheme,
}: AboutSectionProps) {
  // Fungsi membuka WhatsApp langsung ke aplikasi chat
  const handleOpenWhatsApp = () => {
    const rawNumber = data.kontak.waNumber || data.kontak.telepon;
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const formattedNumber = cleanNumber.startsWith('0')
      ? '62' + cleanNumber.slice(1)
      : cleanNumber;

    const message = encodeURIComponent(
      'Halo Reza Maulana, saya melihat aplikasi Mobile CV Anda dan ingin terhubung/berdiskusi.'
    );

    const waAppUrl = `whatsapp://send?phone=${formattedNumber}&text=${message}`;
    const waWebUrl = `https://wa.me/${formattedNumber}?text=${message}`;

    Linking.canOpenURL(waAppUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(waAppUrl);
        } else {
          return Linking.openURL(waWebUrl);
        }
      })
      .catch(() => {
        Linking.openURL(waWebUrl);
      });
  };

  // Fungsi membuka Email client
  const handleOpenEmail = () => {
    const subject = encodeURIComponent(
      'Diskusi Proyek / Akademik - Personal CV Reza Maulana'
    );
    const mailUrl = `mailto:${data.kontak.email}?subject=${subject}`;
    Linking.openURL(mailUrl).catch(() => {
      Alert.alert('Info Email', `Alamat email: ${data.kontak.email}`);
    });
  };

  // Fungsi membuka Google Maps Alamat
  const handleOpenMaps = () => {
    const query = encodeURIComponent(data.kontak.alamat);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(mapsUrl).catch(() => {
      Alert.alert('Alamat Domisili', data.kontak.alamat);
    });
  };

  // Fungsi membuka GitHub profile
  const handleOpenGitHub = () => {
    if (!data.kontak.github) return;
    const url = data.kontak.github.startsWith('http')
      ? data.kontak.github
      : `https://${data.kontak.github}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('GitHub', url);
    });
  };

  return (
    <View style={styles.container}>
      {/* 1. BIOGRAFI RINGKAS (TENTANG SAYA) */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.headerIcon}>👤</Text>
          <View>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              Profil Singkat (Tentang Saya)
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
              Latar belakang, keahlian mendalam & rekam jejak
            </Text>
          </View>
        </View>

        <Text style={[styles.bioParagraph, { color: theme.textSecondary }]}>
          {data.deskripsi}
        </Text>
      </View>

      {/* 2. PENDIDIKAN RESMI */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.headerIcon}>🎓</Text>
          <View>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              Pendidikan
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
              Perguruan Tinggi & Fokus Studi
            </Text>
          </View>
        </View>

        <View style={styles.expItemCard}>
          <View style={styles.expHeaderRow}>
            <Text style={[styles.expRoleTitle, { color: theme.textPrimary }]}>
              S1 Sistem Informasi (Fakultas Komputer)
            </Text>
            <View style={[styles.dateBadge, { backgroundColor: theme.primaryLight }]}>
              <Text style={[styles.dateBadgeText, { color: theme.primary }]}>
                Sedang Berjalan
              </Text>
            </View>
          </View>
          <Text style={[styles.expInstText, { color: theme.primary }]}>
            Universitas Ma’soem — Sumedang / Bandung, Jawa Barat
          </Text>
          <Text style={[styles.expDescText, { color: theme.textSecondary }]}>
            <Text style={{ fontWeight: '700' }}>Fokus Studi:</Text> Analisis & Perancangan Sistem Informasi, Pemrograman Web, Pemrograman Berorientasi Objek (Desktop & Mobile), Manajemen Basis Data (SQL & PL/SQL), dan Jaringan Komputer.
          </Text>
        </View>
      </View>

      {/* 3. PENGALAMAN PRAKTIK & MAGANG */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.headerIcon}>💼</Text>
          <View>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              Pengalaman Praktik & Magang
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
              Implementasi sistem nyata di instansi & lingkungan kerja
            </Text>
          </View>
        </View>

        {/* Pengalaman 1: Desa Bojongloa */}
        <View
          style={[
            styles.expItemCard,
            { borderBottomColor: theme.cardBorder, borderBottomWidth: 1, paddingBottom: 12 },
          ]}
        >
          <View style={styles.expHeaderRow}>
            <Text style={[styles.expRoleTitle, { color: theme.textPrimary }]}>
              Pengembang SI & Analis Sistem
            </Text>
            <View style={[styles.dateBadge, { backgroundColor: theme.primaryLight }]}>
              <Text style={[styles.dateBadgeText, { color: theme.primary }]}>
                Mar – Okt 2026
              </Text>
            </View>
          </View>
          <Text style={[styles.expInstText, { color: theme.primary }]}>
            Kantor Desa Bojongloa, Kec. Rancaekek, Kab. Bandung
          </Text>
          <View style={styles.bulletList}>
            <Text style={[styles.bulletItem, { color: theme.textSecondary }]}>
              • Menganalisis alur kerja pelayanan administrasi kependudukan manual & mengidentifikasi 4 hambatan utama dengan analisis PIECES.
            </Text>
            <Text style={[styles.bulletItem, { color: theme.textSecondary }]}>
              • Merancang dan membangun <Text style={{ fontWeight: '700' }}>SIPELDES</Text> berbasis web menggunakan Laravel & MySQL/MariaDB.
            </Text>
            <Text style={[styles.bulletItem, { color: theme.textSecondary }]}>
              • Mengimplementasikan modul Data Penduduk, Pengajuan Surat (berbasis peran/admin), Arsip Surat digital, dan rekapitulasi Laporan otomatis.
            </Text>
          </View>
        </View>

        {/* Pengalaman 2: Pesantren Al Ma'soem */}
        <View style={[styles.expItemCard, { paddingTop: 10 }]}>
          <View style={styles.expHeaderRow}>
            <Text style={[styles.expRoleTitle, { color: theme.textPrimary }]}>
              Peserta Praktik Pengenalan Lapangan (PPL)
            </Text>
            <View style={[styles.dateBadge, { backgroundColor: theme.surfaceSubtle }]}>
              <Text style={[styles.dateBadgeText, { color: theme.textMuted }]}>
                Juli 2025
              </Text>
            </View>
          </View>
          <Text style={[styles.expInstText, { color: theme.primary }]}>
            Pesantren Siswa Al Ma’soem — Sumedang, Jawa Barat
          </Text>
          <Text style={[styles.bulletItem, { color: theme.textSecondary }]}>
            • Melaksanakan observasi lingkungan kerja, alur operasional, dan kebutuhan penerapan sistem informasi sebagai bagian kurikulum Prodi SI.
          </Text>
        </View>
      </View>

      {/* 4. PENGALAMAN ORGANISASI & KARYA TULIS */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.headerIcon}>🏛️</Text>
          <View>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              Organisasi & Karya Tulis
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
              Aktivitas kemahasiswaan & publikasi akademik
            </Text>
          </View>
        </View>

        <View style={styles.bulletList}>
          <Text style={[styles.bulletItem, { color: theme.textSecondary }]}>
            • <Text style={{ fontWeight: '800', color: theme.textPrimary }}>Panitia Pelaksana FESTAMI 2026</Text> (BEM Universitas Ma’soem | Sept 2026): Koordinasi teknis, logistik, pedoman registrasi digital lomba MTQ dan vokal solo.
          </Text>
          <Text style={[styles.bulletItem, { color: theme.textSecondary }]}>
            • <Text style={{ fontWeight: '800', color: theme.textPrimary }}>Laporan Praktik Adaptasi Lapangan (2026):</Text> Perancangan Sistem Informasi Pelayanan Administrasi Berbasis Web Pada Kantor Desa Bojongloa.
          </Text>
          <Text style={[styles.bulletItem, { color: theme.textSecondary }]}>
            • <Text style={{ fontWeight: '800', color: theme.textPrimary }}>Studi Literatur Ekonomi Syariah (2026):</Text> Analisis Kinerja dan Perkembangan PT Bank Syariah Indonesia Tbk.
          </Text>
        </View>
      </View>

      {/* 5. BIODATA RESMI MAHASISWA & AKADEMIK */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.headerIcon}>📋</Text>
          <View>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              Biodata & Informasi Akademik
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
              Data resmi mahasiswa Universitas Ma'soem
            </Text>
          </View>
        </View>

        <View style={styles.tableList}>
          <InfoRow
            label="Tempat, Tgl Lahir"
            value={data.ttl}
            icon="🎂"
            theme={theme}
          />
          <InfoRow label="Agama" value={data.agama} icon="🕌" theme={theme} />
          <InfoRow
            label="Program Studi"
            value={data.prodi}
            icon="💻"
            highlight
            theme={theme}
          />
          <InfoRow
            label="Fakultas"
            value={data.fakultas}
            icon="🏢"
            theme={theme}
          />
          <InfoRow
            label="Perguruan Tinggi"
            value={data.universitas}
            icon="🏛️"
            theme={theme}
          />
          <InfoRow
            label="Mata Kuliah"
            value={data.mataKuliah}
            icon="📱"
            theme={theme}
          />
          <InfoRow
            label="Dosen Pengampu"
            value={data.dosen}
            icon="👨‍🏫"
            theme={theme}
          />
        </View>
      </View>

      {/* 6. KONTAK & TAUTAN TERHUBUNG (INTERAKTIF & LANGSUNG KE APP) */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.cardBorder,
            shadowColor: theme.shadowColor,
          },
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.headerIcon}>📫</Text>
          <View>
            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
              Kontak & Tautan Terhubung
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.textMuted }]}>
              Klik untuk chat WhatsApp, kirim email, atau cek maps
            </Text>
          </View>
        </View>

        <View style={styles.contactList}>
          {/* TAUTAN WHATSAPP */}
          <TouchableOpacity
            style={[
              styles.contactActionCard,
              {
                backgroundColor: theme.isDark ? '#064e3b' : '#ecfdf5',
                borderColor: theme.isDark ? '#047857' : '#a7f3d0',
              },
            ]}
            onPress={handleOpenWhatsApp}
            activeOpacity={0.7}
          >
            <View style={styles.contactLeft}>
              <View style={styles.waIconCircle}>
                <Text style={styles.waIconText}>💬</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.waHeaderRow}>
                  <Text style={[styles.contactLabel, { color: theme.textPrimary }]}>
                    WhatsApp Direct
                  </Text>
                  <View style={styles.chatBadge}>
                    <Text style={styles.chatBadgeText}>Langsung Chat WA</Text>
                  </View>
                </View>
                <Text style={[styles.contactValPhone, { color: '#059669' }]}>
                  {data.kontak.telepon}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* TAUTAN EMAIL RESMI */}
          <TouchableOpacity
            style={[
              styles.contactActionCard,
              {
                backgroundColor: theme.surfaceSubtle,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={handleOpenEmail}
            activeOpacity={0.7}
          >
            <View style={styles.contactLeft}>
              <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
                <Text style={styles.iconCircleText}>✉️</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.contactLabelSmall, { color: theme.textMuted }]}>
                  Email Pribadi & Resmi
                </Text>
                <Text style={[styles.contactValText, { color: theme.primary }]}>
                  {data.kontak.email}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* TAUTAN DOMISILI DENGAN MAPS */}
          <TouchableOpacity
            style={[
              styles.contactActionCard,
              {
                backgroundColor: theme.surfaceSubtle,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={handleOpenMaps}
            activeOpacity={0.7}
          >
            <View style={styles.contactLeft}>
              <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
                <Text style={styles.iconCircleText}>📍</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.mapsHeaderRow}>
                  <Text style={[styles.contactLabelSmall, { color: theme.textMuted }]}>
                    Alamat Domisili
                  </Text>
                  <Text style={[styles.mapsBadge, { color: theme.primary }]}>
                    Buka Google Maps ↗
                  </Text>
                </View>
                <Text style={[styles.contactValAddress, { color: theme.textPrimary }]}>
                  {data.kontak.alamat}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* TAUTAN GITHUB */}
          {data.kontak.github && (
            <TouchableOpacity
              style={[
                styles.contactActionCard,
                {
                  backgroundColor: theme.surfaceSubtle,
                  borderColor: theme.cardBorder,
                },
              ]}
              onPress={handleOpenGitHub}
              activeOpacity={0.7}
            >
              <View style={styles.contactLeft}>
                <View style={[styles.iconCircle, { backgroundColor: theme.surface }]}>
                  <Text style={styles.iconCircleText}>🐙</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.contactLabelSmall, { color: theme.textMuted }]}>
                    Profil GitHub
                  </Text>
                  <Text style={[styles.contactValText, { color: theme.primary }]}>
                    {data.kontak.github.replace('https://', '')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

// Sub-komponen InfoRow
function InfoRow({
  label,
  value,
  icon,
  highlight = false,
  theme,
}: {
  label: string;
  value: string;
  icon: string;
  highlight?: boolean;
  theme: ThemeColors;
}) {
  return (
    <View style={styles.tableRow}>
      <View style={styles.labelCol}>
        <Text style={styles.rowIcon}>{icon}</Text>
        <Text style={[styles.labelText, { color: theme.textMuted }]}>
          {label}
        </Text>
      </View>
      <Text
        style={[
          styles.valueText,
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
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.12)',
  },
  headerIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  cardSubtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  bioParagraph: {
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'justify',
  },
  expItemCard: {
    marginBottom: 8,
  },
  expHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  expRoleTitle: {
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  dateBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  dateBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  expInstText: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  expDescText: {
    fontSize: 12,
    lineHeight: 18,
  },
  bulletList: {
    gap: 6,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 12,
    lineHeight: 18,
  },
  tableList: {
    gap: 2,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.08)',
  },
  labelCol: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '42%',
  },
  rowIcon: {
    fontSize: 13,
    marginRight: 7,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 12,
    width: '58%',
    textAlign: 'right',
  },
  contactList: {
    gap: 10,
  },
  contactActionCard: {
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  waIconText: {
    fontSize: 18,
  },
  waHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 13,
    fontWeight: '800',
  },
  chatBadge: {
    backgroundColor: '#10b981',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  chatBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  contactValPhone: {
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleText: {
    fontSize: 16,
  },
  contactLabelSmall: {
    fontSize: 11,
    fontWeight: '600',
  },
  contactValText: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 1,
  },
  mapsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapsBadge: {
    fontSize: 10,
    fontWeight: '700',
  },
  contactValAddress: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    marginTop: 2,
  },
});
