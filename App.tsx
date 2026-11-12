// App.tsx
// Personal CV & Academic Score App - Ujian Tengah Semester (UTS)
// Mahasiswa: Reza Maulana (NIM: 242505037)
// Program Studi: S1 Sistem Informasi (S1-R) | Universitas Ma'soem
// Dosen Pengampu: Iin, M.Kom | Pemrograman Mobile 2
// UI Reference: https://kangsolihin.vercel.app/
// Target Capaian: LEVEL 10 (Industry)

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Image,
  TouchableOpacity,
  Platform,
  RefreshControl,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// THEME SYSTEM (Level 7: Theme Switcher Light & Dark Mode)
import { lightTheme, darkTheme, ThemeColors } from './utils/theme';

// DATA IMPORTS (Level 5, 6, 7, 8)
import profileDataJs from './data/profileData';
import profileJson from './data/profile.json';
import skillsData from './data/skills.json';
import portfolioData from './data/portfolio.json';
import academicScoreData from './data/academicScore.json';

// FOTO PROFIL ASLI (BASE64)
import { PROFILE_IMAGE_BASE64 } from './assets/profileBase64';

// LEVEL 10: ASYNC SERVICE LAYER & PDF GENERATOR
import { mockApiService } from './services/mockApiService';
import { downloadCvPdf } from './services/pdfService';

// MODULAR COMPONENTS
import ProfileHeader from './components/ProfileHeader';
import AboutSection from './components/AboutSection';
import ContactForm from './components/ContactForm';
import SkillsSection from './components/SkillsSection';
import PortfolioSection from './components/PortfolioSection';
import ScoreDashboard from './components/ScoreDashboard';
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from './components/StateFeedback';

type NavTab = 'home' | 'score' | 'skills' | 'portfolio' | 'about' | 'contact';
type ChallengeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'APP';

export default function App() {
  // 1. STATE TEMA (Light / Dark Mode Vercel Aesthetic)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const theme: ThemeColors = isDarkMode ? darkTheme : lightTheme;

  // 2. STATE NAVIGASI MULTI-SCREEN (Level 9: Professional Navigation)
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  // 3. STATE LEVEL INSPECTOR (Progressive Challenge Level 1 - 10)
  const [demoLevel, setDemoLevel] = useState<ChallengeLevel>('APP');
  const [showLevelDrawer, setShowLevelDrawer] = useState<boolean>(false);

  // 4. LEVEL 10 STATES: ASYNC DATA, LOADING, ERROR, & REFRESH
  const [scoreData, setScoreData] = useState(academicScoreData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // LEVEL 10: Sinkronisasi data asinkronus ke Mock API LMS
  const fetchLmsData = async (simulateError = false) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await mockApiService.getAcademicScore(simulateError);
      setScoreData(response.data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal menyinkronkan data LMS');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // 5. LEVEL 10: STATE & HANDLER UNDUH CV KE PDF
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      const result = await downloadCvPdf();
      if (result.success) {
        if (Platform.OS === 'web') {
          Alert.alert(
            'Membuka Dialog Cetak 📄',
            'Silakan pilih opsi "Simpan sebagai PDF" / "Save as PDF" pada jendela cetak browser Anda.'
          );
        } else {
          Alert.alert(
            'CV Berhasil Dibuat! 📄',
            'Dokumen PDF Curriculum Vitae & Capaian Akademik Reza Maulana telah siap disimpan atau dibagikan.'
          );
        }
      } else {
        Alert.alert(
          'Gagal Membuat PDF',
          result.error || 'Terjadi kendala saat memproses dokumen PDF.'
        );
      }
    } catch (err: any) {
      Alert.alert(
        'Gagal Membuat PDF',
        err.message || 'Terjadi kesalahan tidak terduga saat membuat PDF.'
      );
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Pull-to-refresh handler
  const onRefresh = () => {
    setIsRefreshing(true);
    fetchLmsData(false);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      {/* ============================================================== */}
      {/* 1. TOP HEADER BAR                                              */}
      {/* ============================================================== */}
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: theme.surface,
            borderBottomColor: theme.headerBorder,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <View
            style={[
              styles.badgeUTS,
              { backgroundColor: theme.primaryLight },
            ]}
          >
            <Text style={[styles.badgeUTSText, { color: theme.primary }]}>
              UNIVERSITAS MA'SOEM • UTS MOBILE 2
            </Text>
          </View>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            Reza Maulana
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textMuted }]}>
            NIM: 242505037 • SI-R-5 • Dosen: Iin, M.Kom
          </Text>
        </View>

        {/* Action Buttons: Level Inspector & Theme Switcher */}
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[
              styles.inspectorBtn,
              {
                backgroundColor:
                  demoLevel !== 'APP'
                    ? theme.warning
                    : theme.surfaceSubtle,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={() => setShowLevelDrawer(!showLevelDrawer)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.inspectorBtnText,
                {
                  color:
                    demoLevel !== 'APP'
                      ? '#ffffff'
                      : theme.textPrimary,
                },
              ]}
            >
              {demoLevel === 'APP' ? '🎯 Level' : `Lvl ${demoLevel}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.themeBtn,
              {
                backgroundColor: theme.surfaceSubtle,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Text style={styles.themeBtnText}>
              {isDarkMode ? '🌙' : '☀️'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ============================================================== */}
      {/* 2. PROGRESSIVE LEVEL DRAWER (LEVEL 1 - 10 SELECTOR)           */}
      {/* ============================================================== */}
      {showLevelDrawer && (
        <View
          style={[
            styles.drawerContainer,
            {
              backgroundColor: theme.surfaceSubtle,
              borderBottomColor: theme.cardBorder,
            },
          ]}
        >
          <View style={styles.drawerTop}>
            <Text style={[styles.drawerTitle, { color: theme.textPrimary }]}>
              Pilih Target Challenge Level (UTS Pemrograman Mobile 2):
            </Text>
            <TouchableOpacity
              onPress={() => setShowLevelDrawer(false)}
              style={styles.drawerCloseBtn}
            >
              <Text style={{ color: theme.textMuted, fontWeight: '700' }}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.drawerButtonsRow}
          >
            {(['APP', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as ChallengeLevel[]).map(
              (lvl) => {
                const isActive = demoLevel === lvl;
                return (
                  <TouchableOpacity
                    key={String(lvl)}
                    style={[
                      styles.lvlChoiceBtn,
                      {
                        backgroundColor: isActive
                          ? theme.primary
                          : theme.card,
                        borderColor: isActive
                          ? theme.primaryDark
                          : theme.cardBorder,
                      },
                    ]}
                    onPress={() => {
                      setDemoLevel(lvl);
                      if (lvl === 'APP') setShowLevelDrawer(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.lvlChoiceBtnText,
                        {
                          color: isActive ? '#ffffff' : theme.textPrimary,
                          fontWeight: isActive ? '800' : '600',
                        },
                      ]}
                    >
                      {lvl === 'APP' ? '⭐ Full App' : `Lvl ${lvl}`}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </ScrollView>
        </View>
      )}

      {/* ============================================================== */}
      {/* 3. MAIN SCROLLABLE VIEW (DENGAN PULL-TO-REFRESH LEVEL 10)      */}
      {/* ============================================================== */}
      <ScrollView
        style={styles.mainScrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
      >
        {/* JIKA MODE DEMO LEVEL KHUSUS DIAKTIFKAN */}
        {demoLevel !== 'APP' ? (
          <View>
            <View
              style={[
                styles.demoModeBanner,
                {
                  backgroundColor: theme.primaryLight,
                  borderColor: theme.primary,
                },
              ]}
            >
              <View style={styles.demoBannerHeader}>
                <Text style={[styles.demoBannerTitle, { color: theme.primary }]}>
                  DEMO MODE: LEVEL {demoLevel}
                </Text>
                <TouchableOpacity
                  onPress={() => setDemoLevel('APP')}
                  style={[styles.returnAppBtn, { backgroundColor: theme.primary }]}
                >
                  <Text style={styles.returnAppText}>Kembali ke Full App</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={[styles.demoBannerDesc, { color: theme.textSecondary }]}
              >
                {demoLevel === 1 &&
                  'Level 1 (Novice): Menampilkan NIM 242505037, Nama Reza Maulana, dan Foto Profil menggunakan komponen JSX dasar.'}
                {demoLevel === 2 &&
                  'Level 2 (Beginner): Menampilkan Identitas Dasar + Profesi & Deskripsi Singkat Diri.'}
                {demoLevel === 3 &&
                  'Level 3 (Elementary): Layout terstruktur Flexbox, StyleSheet, visual hierarchy & card styling.'}
                {demoLevel === 4 &&
                  'Level 4 (Intermediate): State/Props, tombol like interaktif, dan Formulir Kontak dengan validasi.'}
                {demoLevel === 5 &&
                  'Level 5 (Competent): Pemisahan UI dan Data ke file terpisah (`data/profileData.js`) dikirim via Props.'}
                {demoLevel === 6 &&
                  'Level 6 (Proficient): Membaca seluruh data dari file JSON lokal (`data/profile.json`).'}
                {demoLevel === 7 &&
                  'Level 7 (Advanced): Dynamic Skills & Portfolio Gallery dari JSON + Theme Switcher Light/Dark.'}
                {demoLevel === 8 &&
                  'Level 8 (Expert): Academic Score Dashboard (Nilai 92, Grade A, Total 12375 LP, Dynamic Progress Bars).'}
                {demoLevel === 9 &&
                  'Level 9 (Professional): Multi-Screen Navigation (Home, Score, Skills, Portfolio, About, Contact).'}
                {demoLevel === 10 &&
                  'Level 10 (Industry): Service Layer, Asynchronous Mock API LMS, Pull-to-Refresh, Loading State, Error State & Retry.'}
              </Text>
            </View>

            {/* DEMO LEVEL 1 */}
            {demoLevel === 1 && (
              <View
                style={[
                  styles.simpleCard,
                  { backgroundColor: theme.card, borderColor: theme.cardBorder },
                ]}
              >
                <Image
                  source={{ uri: PROFILE_IMAGE_BASE64 }}
                  style={styles.simpleAvatar}
                />
                <Text style={[styles.simpleName, { color: theme.textPrimary }]}>
                  Reza Maulana
                </Text>
                <Text style={[styles.simpleNim, { color: theme.primary }]}>
                  NIM: 242505037
                </Text>
              </View>
            )}

            {/* DEMO LEVEL 2 */}
            {demoLevel === 2 && (
              <View
                style={[
                  styles.simpleCard,
                  { backgroundColor: theme.card, borderColor: theme.cardBorder },
                ]}
              >
                <Image
                  source={{ uri: PROFILE_IMAGE_BASE64 }}
                  style={styles.simpleAvatar}
                />
                <Text style={[styles.simpleName, { color: theme.textPrimary }]}>
                  Reza Maulana
                </Text>
                <Text style={[styles.simpleNim, { color: theme.primary }]}>
                  NIM: 242505037
                </Text>
                <Text
                  style={[
                    styles.simpleProfession,
                    { color: theme.textSecondary },
                  ]}
                >
                  Information Systems Student & Web/Mobile Developer
                </Text>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: theme.cardBorder },
                  ]}
                />
                <Text
                  style={[styles.simpleHeading, { color: theme.textPrimary }]}
                >
                  Tentang Diri Saya
                </Text>
                <Text style={[styles.simpleBio, { color: theme.textSecondary }]}>
                  {profileJson.deskripsi}
                </Text>
              </View>
            )}

            {/* DEMO LEVEL 3 */}
            {demoLevel === 3 && (
              <View>
                <View
                  style={[
                    styles.simpleCard,
                    { backgroundColor: theme.card, borderColor: theme.cardBorder },
                  ]}
                >
                  <Image
                    source={{ uri: PROFILE_IMAGE_BASE64 }}
                    style={[styles.simpleAvatar, { borderColor: theme.primary }]}
                  />
                  <Text style={[styles.simpleName, { color: theme.textPrimary }]}>
                    Reza Maulana
                  </Text>
                  <Text
                    style={[
                      styles.simpleNimBadge,
                      {
                        backgroundColor: theme.primaryLight,
                        color: theme.primary,
                      },
                    ]}
                  >
                    NIM: 242505037
                  </Text>
                  <Text
                    style={[
                      styles.simpleProfession,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Information Systems Student & Web/Mobile Developer
                  </Text>
                </View>

                <View
                  style={[
                    styles.simpleCard,
                    { backgroundColor: theme.card, borderColor: theme.cardBorder },
                  ]}
                >
                  <Text
                    style={[styles.simpleHeading, { color: theme.textPrimary }]}
                  >
                    📋 Informasi Akademik
                  </Text>
                  <View style={styles.simpleRow}>
                    <Text style={{ color: theme.textMuted }}>Universitas:</Text>
                    <Text style={{ color: theme.textPrimary, fontWeight: '700' }}>
                      Universitas Ma'soem
                    </Text>
                  </View>
                  <View style={styles.simpleRow}>
                    <Text style={{ color: theme.textMuted }}>Program Studi:</Text>
                    <Text style={{ color: theme.textPrimary, fontWeight: '700' }}>
                      Sistem Informasi (S1-R)
                    </Text>
                  </View>
                  <View style={styles.simpleRow}>
                    <Text style={{ color: theme.textMuted }}>Mata Kuliah:</Text>
                    <Text style={{ color: theme.textPrimary, fontWeight: '700' }}>
                      Pemrograman Mobile 2
                    </Text>
                  </View>
                  <View style={styles.simpleRow}>
                    <Text style={{ color: theme.textMuted }}>Dosen:</Text>
                    <Text style={{ color: theme.textPrimary, fontWeight: '700' }}>
                      Iin, M.Kom
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* DEMO LEVEL 4 */}
            {demoLevel === 4 && (
              <View>
                <ProfileHeader data={profileJson} theme={theme} />
                <ContactForm recipientName="Reza Maulana" theme={theme} />
              </View>
            )}

            {/* DEMO LEVEL 5 */}
            {demoLevel === 5 && (
              <View>
                <ProfileHeader data={profileDataJs} theme={theme} />
                <AboutSection data={profileDataJs} theme={theme} />
              </View>
            )}

            {/* DEMO LEVEL 6 */}
            {demoLevel === 6 && (
              <View>
                <ProfileHeader data={profileJson} theme={theme} />
                <AboutSection data={profileJson} theme={theme} />
                <ContactForm recipientName={profileJson.nama} theme={theme} />
              </View>
            )}

            {/* DEMO LEVEL 7 */}
            {demoLevel === 7 && (
              <View>
                <SkillsSection skills={skillsData} theme={theme} />
                <PortfolioSection portfolio={portfolioData} theme={theme} />
              </View>
            )}

            {/* DEMO LEVEL 8 */}
            {demoLevel === 8 && (
              <View>
                <ScoreDashboard data={scoreData} theme={theme} />
              </View>
            )}

            {/* DEMO LEVEL 9 (MULTI-SCREEN DEMONSTRATION) */}
            {demoLevel === 9 && (
              <View>
                <View
                  style={[
                    styles.simpleCard,
                    { backgroundColor: theme.card, borderColor: theme.cardBorder },
                  ]}
                >
                  <Text
                    style={[styles.simpleHeading, { color: theme.textPrimary }]}
                  >
                    🧭 Level 9: Multi-Screen Routing
                  </Text>
                  <Text
                    style={[styles.simpleBio, { color: theme.textSecondary }]}
                  >
                    Aplikasi ini memisahkan 6 layar independen: Home, My Score,
                    Skills, Portfolio, About, dan Contact yang dapat diakses
                    secara instan melalui dock navigator di bawah layar.
                  </Text>
                </View>
                <ScoreDashboard data={scoreData} theme={theme} />
              </View>
            )}

            {/* DEMO LEVEL 10 (INDUSTRY: ASYNC, ERROR & LOADING STATES) */}
            {demoLevel === 10 && (
              <View>
                {/* Control Bar Simulasi Level 10 */}
                <View
                  style={[
                    styles.industryControlCard,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.cardBorder,
                    },
                  ]}
                >
                  <Text
                    style={[styles.industryControlTitle, { color: theme.textPrimary }]}
                  >
                    🧪 Pengujian Kondisi Industri (Level 10):
                  </Text>
                  <Text
                    style={[styles.industryControlDesc, { color: theme.textMuted }]}
                  >
                    Uji penanganan Loading State dan Error State secara langsung:
                  </Text>
                  <View style={styles.industryBtnRow}>
                    <TouchableOpacity
                      style={[styles.industryBtn, { backgroundColor: theme.primary }]}
                      onPress={() => fetchLmsData(false)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.industryBtnText}>
                        ⚡ Fetch Data LMS
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.industryBtn, { backgroundColor: theme.danger }]}
                      onPress={() => fetchLmsData(true)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.industryBtnText}>
                        ⚠️ Uji Error Net
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.industryBtn, { backgroundColor: '#10b981' }]}
                      onPress={handleDownloadPdf}
                      disabled={isDownloadingPdf}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.industryBtnText}>
                        {isDownloadingPdf ? '⏳ PDF...' : '📄 Unduh PDF'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Feedback State Display */}
                {isLoading && (
                  <LoadingState
                    message="Menyinkronkan capaian dari Academic War LMS..."
                    theme={theme}
                  />
                )}

                {errorMessage && (
                  <ErrorState
                    message={errorMessage}
                    onRetry={() => fetchLmsData(false)}
                    theme={theme}
                  />
                )}

                {!isLoading && !errorMessage && (
                  <ScoreDashboard data={scoreData} theme={theme} />
                )}
              </View>
            )}
          </View>
        ) : (
          /* ============================================================== */
          /* MODE FULL PRODUCTION APP (KANG SOLIHIN / VERCEL EXPERIENCE)   */
          /* ============================================================== */
          <View>
            {/* TAB: HOME */}
            {currentTab === 'home' && (
              <View>
                <ProfileHeader
                  data={profileJson}
                  theme={theme}
                  onNavigateToTab={(tab) => setCurrentTab(tab)}
                  onDownloadPdf={handleDownloadPdf}
                  isDownloadingPdf={isDownloadingPdf}
                />

                {/* Score Quick Glance Banner */}
                <TouchableOpacity
                  style={[
                    styles.quickScoreBanner,
                    {
                      backgroundColor: theme.isDark ? '#1e1b4b' : '#eff6ff',
                      borderColor: theme.isDark ? '#312e81' : '#bfdbfe',
                    },
                  ]}
                  onPress={() => setCurrentTab('score')}
                  activeOpacity={0.8}
                >
                  <View style={styles.quickScoreLeft}>
                    <Text style={styles.quickScorePre}>
                      ACADEMIC SCORE (UTS)
                    </Text>
                    <Text
                      style={[
                        styles.quickScoreMk,
                        { color: theme.isDark ? '#ffffff' : '#1e3a8a' },
                      ]}
                    >
                      Pemrograman Mobile 2
                    </Text>
                    <Text
                      style={[
                        styles.quickScoreDosen,
                        { color: theme.isDark ? '#93c5fd' : '#2563eb' },
                      ]}
                    >
                      Dosen: Iin, M.Kom • 12,375 LP
                    </Text>
                  </View>
                  <View style={styles.quickScoreGrade}>
                    <Text style={styles.quickScoreGradeLetter}>A</Text>
                    <Text style={styles.quickScoreNilai}>Nilai 92</Text>
                  </View>
                </TouchableOpacity>

                {/* Preview Keahlian Teknis */}
                <SkillsSection skills={skillsData.slice(0, 4)} theme={theme} />

                <TouchableOpacity
                  style={[
                    styles.seeAllBtn,
                    {
                      backgroundColor: theme.surfaceSubtle,
                      borderColor: theme.cardBorder,
                    },
                  ]}
                  onPress={() => setCurrentTab('skills')}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[styles.seeAllBtnText, { color: theme.primary }]}
                  >
                    Lihat Semua Keahlian & Proyek →
                  </Text>
                </TouchableOpacity>

                <AboutSection data={profileJson} theme={theme} />
              </View>
            )}

            {/* TAB: MY SCORE (ACADEMIC DASHBOARD) */}
            {currentTab === 'score' && (
              <View>
                {isLoading ? (
                  <LoadingState
                    message="Memuat capaian akademik dari LMS..."
                    theme={theme}
                  />
                ) : errorMessage ? (
                  <ErrorState
                    message={errorMessage}
                    onRetry={() => fetchLmsData(false)}
                    theme={theme}
                  />
                ) : (
                  <ScoreDashboard data={scoreData} theme={theme} />
                )}
              </View>
            )}

            {/* TAB: SKILLS */}
            {currentTab === 'skills' && (
              <SkillsSection skills={skillsData} theme={theme} />
            )}

            {/* TAB: PORTFOLIO */}
            {currentTab === 'portfolio' && (
              <PortfolioSection portfolio={portfolioData} theme={theme} />
            )}

            {/* TAB: ABOUT & BIODATA */}
            {currentTab === 'about' && (
              <AboutSection data={profileJson} theme={theme} />
            )}

            {/* TAB: CONTACT */}
            {currentTab === 'contact' && (
              <ContactForm recipientName={profileJson.nama} theme={theme} />
            )}
          </View>
        )}

        {/* FOOTER RESMI KAMPUS */}
        <View
          style={[
            styles.footerBox,
            { borderTopColor: theme.cardBorder },
          ]}
        >
          <Text style={[styles.footerUni, { color: theme.textPrimary }]}>
            UNIVERSITAS MA'SOEM • FAKULTAS KOMPUTER
          </Text>
          <Text style={[styles.footerCourse, { color: theme.textMuted }]}>
            Pemrograman Mobile 2 • Dosen: Iin, M.Kom
          </Text>
          <Text style={[styles.footerStudent, { color: theme.primary }]}>
            Reza Maulana (NIM: 242505037) • S1 Sistem Informasi
          </Text>
        </View>
      </ScrollView>

      {/* ============================================================== */}
      {/* 4. BOTTOM DOCK NAVIGATOR (VERCEL DOCK STYLE)                   */}
      {/* ============================================================== */}
      {demoLevel === 'APP' && (
        <View
          style={[
            styles.bottomDock,
            {
              backgroundColor: theme.surface,
              borderTopColor: theme.headerBorder,
              shadowColor: theme.shadowColor,
            },
          ]}
        >
          <DockTabItem
            icon="🏠"
            label="Home"
            active={currentTab === 'home'}
            onPress={() => setCurrentTab('home')}
            theme={theme}
          />
          <DockTabItem
            icon="🎓"
            label="Score"
            badge="Lvl 8"
            active={currentTab === 'score'}
            onPress={() => setCurrentTab('score')}
            theme={theme}
          />
          <DockTabItem
            icon="⚡"
            label="Skills"
            active={currentTab === 'skills'}
            onPress={() => setCurrentTab('skills')}
            theme={theme}
          />
          <DockTabItem
            icon="💼"
            label="Proyek"
            active={currentTab === 'portfolio'}
            onPress={() => setCurrentTab('portfolio')}
            theme={theme}
          />
          <DockTabItem
            icon="👤"
            label="About"
            active={currentTab === 'about'}
            onPress={() => setCurrentTab('about')}
            theme={theme}
          />
          <DockTabItem
            icon="✉️"
            label="Kontak"
            active={currentTab === 'contact'}
            onPress={() => setCurrentTab('contact')}
            theme={theme}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

// Subkomponen Item Tab Navigasi Dock Bawah
function DockTabItem({
  icon,
  label,
  badge,
  active,
  onPress,
  theme,
}: {
  icon: string;
  label: string;
  badge?: string;
  active: boolean;
  onPress: () => void;
  theme: ThemeColors;
}) {
  return (
    <TouchableOpacity
      style={[styles.dockItem, active && styles.dockItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.dockIconContainer}>
        <Text style={styles.dockIcon}>{icon}</Text>
        {badge && (
          <View
            style={[
              styles.dockBadge,
              { backgroundColor: theme.primary },
            ]}
          >
            <Text style={styles.dockBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text
        style={[
          styles.dockLabel,
          {
            color: active ? theme.primary : theme.textMuted,
            fontWeight: active ? '800' : '500',
          },
        ]}
      >
        {label}
      </Text>
      {active && (
        <View
          style={[styles.activeIndicator, { backgroundColor: theme.primary }]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  headerBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
    marginRight: 10,
  },
  badgeUTS: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 3,
  },
  badgeUTSText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 10,
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inspectorBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  inspectorBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  themeBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeBtnText: {
    fontSize: 14,
  },
  drawerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  drawerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  drawerTitle: {
    fontSize: 11,
    fontWeight: '700',
  },
  drawerCloseBtn: {
    padding: 4,
  },
  drawerButtonsRow: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 4,
  },
  lvlChoiceBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  lvlChoiceBtnText: {
    fontSize: 11,
  },
  mainScrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  quickScoreBanner: {
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickScoreLeft: {
    flex: 1,
  },
  quickScorePre: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#3b82f6',
    marginBottom: 2,
  },
  quickScoreMk: {
    fontSize: 15,
    fontWeight: '800',
  },
  quickScoreDosen: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  quickScoreGrade: {
    backgroundColor: '#f59e0b',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  quickScoreGradeLetter: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 24,
  },
  quickScoreNilai: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
  },
  seeAllBtn: {
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  demoModeBanner: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  demoBannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  demoBannerTitle: {
    fontSize: 13,
    fontWeight: '900',
  },
  returnAppBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  returnAppText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
  },
  demoBannerDesc: {
    fontSize: 11,
    lineHeight: 16,
  },
  simpleCard: {
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 14,
  },
  simpleAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  simpleName: {
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  simpleNim: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  simpleNimBadge: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '800',
    marginVertical: 6,
  },
  simpleProfession: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  dividerLine: {
    height: 1,
    width: '100%',
    marginVertical: 14,
  },
  simpleHeading: {
    fontSize: 15,
    fontWeight: '700',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  simpleBio: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'justify',
  },
  simpleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 6,
  },
  industryControlCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  industryControlTitle: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  industryControlDesc: {
    fontSize: 11,
    marginBottom: 12,
  },
  industryBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  industryBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  industryBtnText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  footerBox: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    marginTop: 10,
  },
  footerUni: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  footerCourse: {
    fontSize: 11,
    marginTop: 2,
  },
  footerStudent: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },
  bottomDock: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  dockItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 2,
  },
  dockItemActive: {},
  dockIconContainer: {
    position: 'relative',
  },
  dockIcon: {
    fontSize: 18,
    marginBottom: 2,
  },
  dockBadge: {
    position: 'absolute',
    top: -4,
    right: -12,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 6,
  },
  dockBadgeText: {
    color: '#ffffff',
    fontSize: 7,
    fontWeight: '800',
  },
  dockLabel: {
    fontSize: 10,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 16,
    height: 3,
    borderRadius: 1.5,
  },
});
