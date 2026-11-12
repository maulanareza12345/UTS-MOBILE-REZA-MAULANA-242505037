# 📱 Personal CV & Academic Score App — Level 10 (Industry)

> **Ujian Tengah Semester (UTS) Ganjil 2026/2027**  
> **Mata Kuliah:** Pemrograman Mobile 2  
> **Dosen Pengampu:** Iin, M.Kom  
> **Program Studi:** S1 Sistem Informasi (S1-R-5)  
> **Perguruan Tinggi:** Universitas Ma'soem  
> **Referensi Desain:** [kangsolihin.vercel.app](https://kangsolihin.vercel.app/)

---

## 👨‍🎓 Identitas Mahasiswa

| Field | Keterangan |
| :--- | :--- |
| **Nama Lengkap** | **Reza Maulana** |
| **NIM** | **242505037** |
| **Tempat, Tanggal Lahir** | Cianjur, 14 Mei 2004 |
| **Agama** | Islam |
| **Program Studi / Kelas** | S1 Sistem Informasi / SI-R-5 |
| **Fakultas** | Komputer |
| **Perguruan Tinggi** | Universitas Ma'soem |
| **Email Pribadi** | [rzmreza@gmail.com](mailto:rzmreza@gmail.com) |
| **WhatsApp** | [085722205977](https://wa.me/6285722205977) |
| **Domisili** | Jl. Raya Cipacing No. 22, Jatinangor, Sumedang, Jawa Barat 45367. |
| **GitHub** | [github.com/maulanareza12345](https://github.com/maulanareza12345) |
| **Target Level Diklaim** | **LEVEL 10 (INDUSTRY)** ⭐⭐⭐⭐⭐ |

---

## 🏆 Rangkuman Pencapaian Progressive Challenge (Level 1 - 10)

Aplikasi ini dibangun secara kumulatif memenuhi seluruh kriteria penilaian UTS:

1. **LEVEL 1 (Novice) - Identitas Dasar**: Menampilkan NIM (`242505037`), Nama Lengkap (`Reza Maulana`), dan Foto Profil asli (`assets/profile.jpg`).
2. **LEVEL 2 (Beginner) - Personal Introduction**: Menampilkan bidang profesi (*Information Systems Student & Web/Mobile Developer*), deskripsi diri, dan heading JSX.
3. **LEVEL 3 (Elementary) - Layout & Styling**: Menerapkan Flexbox, StyleSheet, visual hierarchy, kartu informasi, dan layout responsif tanpa elemen terpotong.
4. **LEVEL 4 (Intermediate) - Interactive CV & Form**: Menggunakan Props & State, interaksi tombol Like, serta Formulir Kontak (`TextInput`) dengan validasi input kosong dan respons konfirmasi pengiriman.
5. **LEVEL 5 (Competent) - Separation of UI and Data**: Pemisahan data profil ke file JavaScript terpisah (`data/profileData.js`) dan dikirimkan ke komponen modular via Props.
6. **LEVEL 6 (Proficient) - Local JSON Data**: Data profil dan informasi CV dibaca langsung dari file JSON lokal (`data/profile.json`).
7. **LEVEL 7 (Advanced) - Dynamic Content & Theme Switcher**: 
   - Render dinamis data keahlian dari JSON (`data/skills.json`) dengan filter kategori interaktif.
   - Galeri Portofolio Proyek dinamis (`data/portfolio.json`).
   - Fitur **Theme Switcher** (Mode Terang ☀️ / Mode Gelap 🌙 ala Vercel).
8. **LEVEL 8 (Expert) - My Score & Academic Dashboard**: 
   - Data capaian akademik tersimpan dalam JSON terpisah (`data/academicScore.json`).
   - Identitas akademik resmi (Reza Maulana, 242505037, Pemrograman Mobile 2, Dosen: Iin, M.Kom).
   - Current Score: Nilai **92**, Grade **A** dengan badge melingkar emas.
   - Total Learning Points: **12.375 LP** (*Master Cadet*).
   - Indikator persentase capaian dinamis menggunakan komponen reusable `ProgressBar` (*Attendance 100%, Practice 87%, Quest 95%, Challenge 100%*).
9. **LEVEL 9 (Professional) - Multi-Screen Navigation**:
   - Struktur navigasi multi-layar modular (*Home, My Score, Skills, Portfolio, About, Contact*) dengan Bottom Dock Navigator bergaya modern.
10. **LEVEL 10 (Industry) - Production-Oriented & Error Handling**:
    - **Fitur Unduh CV Resmi (PDF)**: Pembuatan dokumen PDF standar A4 siap cetak berbasis `expo-print` dan `expo-sharing` dengan tombol aksi langsung di halaman utama.
    - **Service Layer**: Implementasi `services/mockApiService.ts` untuk simulasi asynchronous fetching ke server Academic LMS.
    - **Pull-to-Refresh**: Fitur tarik layar untuk sinkronisasi nilai terbaru secara otomatis.
    - **Feedback States**: Penanganan *Loading State* (animasi loader), *Error State* (simulasi gagal koneksi dengan tombol Retry), dan *Empty State*.
    - **Fitur Level Inspector**: Menu drawer di header aplikasi untuk membuktikan dan menguji setiap level (Lvl 1 s/d 10) secara terisolasi maupun kumulatif.

---

## 📂 Struktur Direktori Proyek

```text
uts-mobile-reza/
├── assets/
│   └── profile.jpg               <-- Foto resmi Reza Maulana
├── data/
│   ├── profileData.js            <-- LEVEL 5: Pemisahan Data JS
│   ├── profile.json              <-- LEVEL 6: Data Profil Utama JSON
│   ├── skills.json               <-- LEVEL 7: Data Keahlian Teknis
│   ├── portfolio.json            <-- LEVEL 7: Data Portofolio Proyek
│   └── academicScore.json        <-- LEVEL 8: Data Nilai & LP Dashboard
├── components/
│   ├── ProfileHeader.tsx         <-- Hero Profile, Quick Stats, Avatar Glow
│   ├── AboutSection.tsx          <-- Biodata, Detail Kampus & Clickable Links
│   ├── ContactForm.tsx           <-- Formulir Kontak, Validasi & Respons State
│   ├── SkillsSection.tsx         <-- Dynamic Skills & Filter Kategori
│   ├── PortfolioSection.tsx      <-- Project Cards & Status Tags
│   ├── ScoreDashboard.tsx        <-- Academic Dashboard & Grade A Hero
│   ├── ProgressBar.tsx           <-- Reusable Dynamic Percentage Indicator
│   └── StateFeedback.tsx         <-- Loading, Error & Empty States (Level 10)
├── services/
│   ├── mockApiService.ts         <-- LEVEL 10: Service Layer Async LMS API
│   └── pdfService.ts             <-- LEVEL 10: Generator & Downloader PDF CV A4
├── utils/
│   └── theme.ts                  <-- Sistem Tema Vercel (Light & Dark Mode)
├── App.tsx                       <-- Root Component, Dock Navigation & Level Inspector
├── package.json                  <-- Expo SDK 58 / React Native 0.88 / TS 6.0
└── tsconfig.json
```

---

## 🚀 Panduan Menjalankan Aplikasi

1. **Pastikan Dependensi Terpasang**:
   ```bash
   npm install
   ```

2. **Cek Validasi TypeScript**:
   ```bash
   npx tsc --noEmit
   ```

3. **Jalankan Server Expo**:
   ```bash
   npx expo start
   ```

4. **Buka di Perangkat**:
   - **Smartphone (Android / iOS)**: Buka aplikasi **Expo Go**, lalu scan QR Code yang muncul di terminal.
   - **Web Browser**: Tekan tombol `w` di terminal untuk membuka di browser Chrome / Edge.

---

## 📋 Teks Deskripsi Video Demonstrasi (Bahan Pengumpulan UTS)

> Salin teks di bawah ini ke kolom deskripsi video YouTube saat pengumpulan:

```text
UJIAN TENGAH SEMESTER (UTS) PEMROGRAMAN MOBILE 2
Proyek: Personal CV & Academic Score App
Nama Mahasiswa: Reza Maulana
NIM: 242505037
Program Studi: S1 Sistem Informasi (SI-R-5)
Perguruan Tinggi: Universitas Ma'soem
Dosen Pengampu: Iin, M.Kom
Target Level yang Diklaim: LEVEL 10 (INDUSTRY)

Tautan Source Code (GitHub): https://github.com/maulanareza12345/uts-mobile-reza
Kontak: rzmreza@gmail.com | WA: 085722205977
Referensi Desain: https://kangsolihin.vercel.app/

Daftar Fitur yang Diimplementasikan:
1. Identitas Lengkap Mahasiswa & Foto Profil Asli (NIM: 242505037, Cianjur 14 Mei 2004, Islam).
2. Pemisahan Data & UI menggunakan JavaScript Modular dan Local JSON.
3. Form Kontak Interaktif dengan Validasi Input Kosong dan Umpan Balik Respons.
4. Dynamic Skills dengan Filter Kategori Teknis & Galeri Portofolio Proyek.
5. Academic Dashboard "My Score": Current Score 92 (Grade A), Total 12.375 LP, serta Dynamic Progress Bars (Attendance 100%, Practice 87%, Quest 95%, Challenge 100%).
6. Theme Switcher Mode Terang (Light) & Mode Gelap (Dark) ala Vercel Portfolio.
7. Multi-Screen Navigation dengan Bottom Dock Navigator modern.
8. Service Layer Asinkronus (Mock API LMS) dengan Pull-to-Refresh, Loading State, Error State, dan Tombol Retry.
9. Feature Level Inspector untuk pengujian terisolasi setiap tantangan Level 1 sampai Level 10.
10. Fitur Unduh CV Resmi ke Format PDF (A4) yang dapat langsung dicetak atau dibagikan dari halaman utama.
```

