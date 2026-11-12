import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import { ThemeColors, lightTheme } from '../utils/theme';

interface ContactFormProps {
  recipientName?: string;
  theme?: ThemeColors;
}

interface SubmittedData {
  nama: string;
  email: string;
  pesan: string;
  waktu: string;
}

export default function ContactForm({
  recipientName = 'Reza Maulana',
  theme = lightTheme,
}: ContactFormProps) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [pesan, setPesan] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  // Fungsi membuka WhatsApp langsung
  const handleOpenWhatsApp = () => {
    const phone = '6285722205977';
    const message = encodeURIComponent(
      'Halo Reza Maulana, saya melihat aplikasi CV Anda dan ingin berdiskusi.'
    );
    const waAppUrl = `whatsapp://send?phone=${phone}&text=${message}`;
    const waWebUrl = `https://wa.me/${phone}?text=${message}`;

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

  const handleSubmit = () => {
    if (!nama.trim()) {
      setErrorMessage('Nama lengkap wajib diisi!');
      Alert.alert('Validasi Gagal', 'Silakan isi nama lengkap Anda.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Alamat email wajib diisi!');
      Alert.alert('Validasi Gagal', 'Silakan isi alamat email Anda.');
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Format email tidak valid (contoh: user@gmail.com)!');
      Alert.alert('Validasi Gagal', 'Mohon masukkan format email yang benar.');
      return;
    }

    if (!pesan.trim()) {
      setErrorMessage('Isi pesan tidak boleh kosong!');
      Alert.alert('Validasi Gagal', 'Silakan tuliskan pesan Anda.');
      return;
    }

    setErrorMessage(null);

    const result: SubmittedData = {
      nama: nama.trim(),
      email: email.trim(),
      pesan: pesan.trim(),
      waktu: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setSubmittedData(result);

    setNama('');
    setEmail('');
    setPesan('');

    Alert.alert(
      'Pesan Berhasil Terkirim! 🎉',
      `Terima kasih ${result.nama}, pesan Anda untuk ${recipientName} telah berhasil diproses.`
    );
  };

  const handleResetResponse = () => {
    setSubmittedData(null);
  };

  return (
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
      <View style={styles.headerRow}>
        <Text style={styles.headerIcon}>✉️</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Hubungi {recipientName}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            Kirim pesan formulir atau chat WhatsApp langsung
          </Text>
        </View>
      </View>

      {/* QUICK CHAT WHATSAPP BUTTON (LANGSUNG KE APLIKASI WA) */}
      <TouchableOpacity
        style={styles.waDirectBtn}
        onPress={handleOpenWhatsApp}
        activeOpacity={0.8}
      >
        <Text style={styles.waBtnIcon}>💬</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.waBtnTitle}>Chat Langsung via WhatsApp</Text>
          <Text style={styles.waBtnSubtitle}>
            Nomor: 085722205977 (Buka Aplikasi WA)
          </Text>
        </View>
        <Text style={styles.waArrow}>→</Text>
      </TouchableOpacity>

      <View
        style={[styles.orDivider, { borderTopColor: theme.cardBorder }]}
      >
        <Text
          style={[
            styles.orText,
            { backgroundColor: theme.card, color: theme.textMuted },
          ]}
        >
          ATAU KIRIM FORMULIR
        </Text>
      </View>

      {/* Tampilan Respons Sukses */}
      {submittedData ? (
        <View
          style={[
            styles.successBox,
            {
              backgroundColor: theme.successBg,
              borderColor: theme.isDark ? '#065f46' : '#bbf7d0',
            },
          ]}
        >
          <Text style={styles.successIcon}>✅</Text>
          <Text style={[styles.successTitle, { color: theme.success }]}>
            Pesan Anda Telah Diterima!
          </Text>
          <Text style={[styles.successSubtitle, { color: theme.textSecondary }]}>
            Berikut rincian formulir yang Anda kirim pada pukul {submittedData.waktu}:
          </Text>

          <View
            style={[
              styles.summaryBox,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <Text style={[styles.summaryItem, { color: theme.textSecondary }]}>
              <Text style={[styles.summaryLabel, { color: theme.textPrimary }]}>
                Pengirim:{' '}
              </Text>
              {submittedData.nama}
            </Text>
            <Text style={[styles.summaryItem, { color: theme.textSecondary }]}>
              <Text style={[styles.summaryLabel, { color: theme.textPrimary }]}>
                Email:{' '}
              </Text>
              {submittedData.email}
            </Text>
            <Text style={[styles.summaryItem, { color: theme.textSecondary }]}>
              <Text style={[styles.summaryLabel, { color: theme.textPrimary }]}>
                Pesan:{' '}
              </Text>
              "{submittedData.pesan}"
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.success }]}
            onPress={handleResetResponse}
            activeOpacity={0.7}
          >
            <Text style={styles.resetButtonText}>+ Kirim Pesan Baru</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          {errorMessage && (
            <View
              style={[
                styles.errorBanner,
                {
                  backgroundColor: theme.dangerBg,
                  borderColor: theme.isDark ? '#7f1d1d' : '#fecaca',
                },
              ]}
            >
              <Text style={[styles.errorText, { color: theme.danger }]}>
                ⚠️ {errorMessage}
              </Text>
            </View>
          )}

          {/* Input Nama */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Nama Lengkap <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surfaceSubtle,
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="Masukkan nama lengkap Anda..."
              placeholderTextColor={theme.textMuted}
              value={nama}
              onChangeText={(text) => {
                setNama(text);
                if (errorMessage) setErrorMessage(null);
              }}
            />
          </View>

          {/* Input Email */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Alamat Email <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surfaceSubtle,
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="contoh: reza@example.com"
              placeholderTextColor={theme.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errorMessage) setErrorMessage(null);
              }}
            />
          </View>

          {/* Input Pesan */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Pesan / Keterangan <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  backgroundColor: theme.surfaceSubtle,
                  borderColor: theme.cardBorder,
                  color: theme.textPrimary,
                },
              ]}
              placeholder="Tulis pesan Anda untuk Reza Maulana di sini..."
              placeholderTextColor={theme.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={pesan}
              onChangeText={(text) => {
                setPesan(text);
                if (errorMessage) setErrorMessage(null);
              }}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.primary }]}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>🚀 Kirim Pesan Sekarang</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.15)',
  },
  headerIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  waDirectBtn: {
    backgroundColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  waBtnIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  waBtnTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  waBtnSubtitle: {
    color: '#d1fae5',
    fontSize: 11,
    marginTop: 1,
  },
  waArrow: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  orDivider: {
    borderTopWidth: 1,
    alignItems: 'center',
    marginVertical: 12,
  },
  orText: {
    top: -9,
    paddingHorizontal: 10,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  formContainer: {
    gap: 12,
  },
  errorBanner: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
  },
  inputGroup: {
    gap: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  required: {
    color: '#ef4444',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
  },
  textArea: {
    height: 90,
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  successBox: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  successTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  successSubtitle: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 12,
  },
  summaryBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 14,
    gap: 6,
  },
  summaryItem: {
    fontSize: 12,
  },
  summaryLabel: {
    fontWeight: '700',
  },
  resetButton: {
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 18,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
