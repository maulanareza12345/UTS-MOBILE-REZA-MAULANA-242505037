// services/pdfService.ts
// LEVEL 10 (Industry): Generator Dokumen PDF Resmi Curriculum Vitae Reza Maulana
// Memuat data otentik: Foto Profil Asli (Base64), Profil Singkat, Pendidikan,
// Pengalaman Praktik/Magang, Proyek Utama, Organisasi, Hard & Soft Skills, Karya Tulis, dan Capaian Nilai UTS.

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';

import profileJson from '../data/profile.json';
import academicScoreData from '../data/academicScore.json';
import { PROFILE_IMAGE_BASE64 } from '../assets/profileBase64';

/**
 * Menghasilkan string HTML dokumen CV resmi lengkap sesuai data kurikulum vitae Reza Maulana.
 */
export function generateCvHtml(): string {
  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Curriculum Vitae - ${profileJson.nama}</title>
  <style>
    @page {
      size: A4;
      margin: 10mm 12mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 8.5pt;
      line-height: 1.4;
    }
    a {
      color: #1e40af;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }

    /* HEADER BANNER */
    .header-container {
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }
    .header-photo-wrapper {
      flex-shrink: 0;
    }
    .header-photo {
      width: 95px;
      height: 95px;
      border-radius: 48px;
      object-fit: cover;
      border: 3px solid #1e3a8a;
      box-shadow: 0 4px 10px rgba(30, 58, 138, 0.2);
      display: block;
    }
    .header-left {
      flex: 1;
    }
    .cv-badge {
      display: inline-block;
      background: #eff6ff;
      color: #1e40af;
      font-size: 7.5pt;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    h1 {
      margin: 1px 0;
      font-size: 19pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.5px;
    }
    .headline {
      font-size: 9.5pt;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 5px;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2px 10px;
      font-size: 8pt;
      color: #334155;
    }
    .contact-item strong {
      color: #0f172a;
    }

    /* SCORE UTS BADGE */
    .score-badge-card {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      color: #ffffff;
      padding: 8px 12px;
      border-radius: 8px;
      text-align: center;
      min-width: 125px;
      flex-shrink: 0;
    }
    .score-grade {
      font-size: 20pt;
      font-weight: 900;
      line-height: 1;
      color: #fbbf24;
    }
    .score-title {
      font-size: 7pt;
      font-weight: 800;
      text-transform: uppercase;
      margin-top: 2px;
      color: #e0e7ff;
    }
    .score-lp {
      font-size: 7.5pt;
      font-weight: 700;
      color: #93c5fd;
      border-top: 1px solid rgba(255, 255, 255, 0.25);
      margin-top: 3px;
      padding-top: 2px;
    }

    /* SECTION TITLE */
    .section-title {
      font-size: 9.5pt;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 2px;
      margin: 8px 0 5px 0;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    /* PROFIL SINGKAT */
    .summary-box {
      font-size: 8pt;
      color: #334155;
      text-align: justify;
      margin: 0 0 6px 0;
      line-height: 1.4;
    }

    /* ITEMS / EXPERIENCE */
    .exp-item {
      margin-bottom: 6px;
      page-break-inside: avoid;
    }
    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .exp-role {
      font-size: 8.5pt;
      font-weight: 800;
      color: #0f172a;
    }
    .exp-date {
      font-size: 7.5pt;
      font-weight: 700;
      color: #2563eb;
    }
    .exp-inst {
      font-size: 8pt;
      font-weight: 600;
      color: #475569;
      margin-bottom: 2px;
    }
    ul.exp-bullets {
      margin: 2px 0 4px 14px;
      padding: 0;
      font-size: 7.5pt;
      color: #334155;
    }
    ul.exp-bullets li {
      margin-bottom: 1.5px;
    }

    /* PROJECTS GRID */
    .project-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px;
      margin-bottom: 5px;
      page-break-inside: avoid;
    }
    .project-card {
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      border-radius: 5px;
      padding: 6px 8px;
    }
    .proj-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1px;
    }
    .proj-title {
      font-size: 8pt;
      font-weight: 800;
      color: #0f172a;
    }
    .proj-year {
      font-size: 7pt;
      color: #64748b;
      font-weight: 700;
    }
    .proj-tech {
      font-size: 7pt;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 2px;
    }
    .proj-desc {
      font-size: 7pt;
      color: #334155;
      line-height: 1.3;
      margin: 0;
    }

    /* SKILLS */
    .skills-section {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3px;
      font-size: 7.5pt;
      margin-bottom: 5px;
    }
    .skill-category {
      margin-bottom: 1px;
    }
    .skill-cat-label {
      font-weight: 800;
      color: #0f172a;
    }
    .skill-cat-items {
      color: #334155;
    }

    /* ACADEMIC CAPAIAN GRID */
    .capaian-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      margin-bottom: 5px;
      text-align: center;
    }
    .capaian-box {
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      border-radius: 5px;
      padding: 4px;
    }
    .capaian-val {
      font-size: 10pt;
      font-weight: 900;
      color: #1e40af;
    }
    .capaian-lbl {
      font-size: 7pt;
      font-weight: 700;
      color: #64748b;
    }

    /* FOOTER */
    .cv-footer {
      border-top: 1px solid #e2e8f0;
      margin-top: 8px;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
      font-size: 7pt;
      color: #64748b;
    }
  </style>
</head>
<body>

  <!-- 1. HEADER BANNER DENGAN FOTO ASLI REZA MAULANA -->
  <div class="header-container">
    <div class="header-photo-wrapper">
      <img src="${PROFILE_IMAGE_BASE64}" alt="${profileJson.nama}" class="header-photo" />
    </div>

    <div class="header-left">
      <div class="cv-badge">CURRICULUM VITAE RESMI</div>
      <h1>${profileJson.nama}</h1>
      <div class="headline">${profileJson.profesi}</div>

      <div class="contact-grid">
        <div class="contact-item">📍 <strong>Alamat:</strong> ${profileJson.kontak.alamat}</div>
        <div class="contact-item">✉️ <strong>Email:</strong> ${profileJson.kontak.email}</div>
        <div class="contact-item">📞 <strong>WhatsApp/Telp:</strong> ${profileJson.kontak.telepon}</div>
        <div class="contact-item">🐙 <strong>GitHub:</strong> <a href="${profileJson.kontak.github}">${profileJson.kontak.github.replace('https://', '')}</a></div>
        <div class="contact-item">🏛️ <strong>Kampus:</strong> Universitas Ma'soem (Sumedang / Bandung)</div>
        <div class="contact-item">🎓 <strong>NIM & Prodi:</strong> ${profileJson.nim} — ${profileJson.prodi}</div>
      </div>
    </div>

    <!-- SCORE UTS CARD -->
    <div class="score-badge-card">
      <div class="score-grade">${academicScoreData.currentScore.grade}</div>
      <div class="score-title">NILAI UTS: ${academicScoreData.currentScore.nilai}</div>
      <div class="score-lp">🏆 ${academicScoreData.learningPoints.totalLP.toLocaleString('id-ID')} LP</div>
      <div style="font-size: 6.5pt; color: #e0e7ff; margin-top: 1px;">${academicScoreData.learningPoints.badgeTitle}</div>
    </div>
  </div>

  <!-- 2. PROFIL SINGKAT (TENTANG SAYA) -->
  <div class="section-title">👤 Profil Singkat (Tentang Saya)</div>
  <p class="summary-box">${profileJson.deskripsi}</p>

  <!-- 3. PENDIDIKAN RESMI -->
  <div class="section-title">🎓 Pendidikan</div>
  <div class="exp-item">
    <div class="exp-header">
      <span class="exp-role">S1 Sistem Informasi, Fakultas Komputer</span>
      <span class="exp-date">Sedang Berjalan</span>
    </div>
    <div class="exp-inst">Universitas Ma’soem — Sumedang / Bandung, Jawa Barat (NIM: ${profileJson.nim})</div>
    <div style="font-size: 7.5pt; color: #475569;">
      <strong>Fokus Studi:</strong> Analisis & Perancangan Sistem Informasi, Pemrograman Web, Pemrograman Berorientasi Objek (Desktop & Mobile), Manajemen Basis Data (SQL & PL/SQL), dan Jaringan Komputer.
    </div>
  </div>

  <!-- 4. PENGALAMAN PRAKTIK & MAGANG -->
  <div class="section-title">💼 Pengalaman Praktik & Magang</div>

  <div class="exp-item">
    <div class="exp-header">
      <span class="exp-role">Pengembang Sistem Informasi & Analis Sistem (Praktik Adaptasi Lapangan)</span>
      <span class="exp-date">Maret 2026 – Oktober 2026</span>
    </div>
    <div class="exp-inst">Kantor Desa Bojongloa, Kec. Rancaekek, Kab. Bandung</div>
    <ul class="exp-bullets">
      <li>Menganalisis alur kerja pelayanan administrasi kependudukan dan persuratan yang sebelumnya berjalan secara manual menggunakan buku besar fisik serta dokumen terpisah.</li>
      <li>Mengidentifikasi empat hambatan utama operasional menggunakan metode analisis PIECES (kesalahan pengetikan berulang, lambatnya pencarian arsip, rentannya kerusakan/kehilangan arsip fisik, serta keterlambatan rekapitulasi laporan bulanan).</li>
      <li>Merancang dan membangun <strong>SIPELDES (Sistem Informasi Pelayanan Terpadu Desa Bojongloa)</strong> berbasis web menggunakan Laravel dan MySQL/MariaDB.</li>
      <li>Mengimplementasikan modul pengelolaan Data Penduduk, Pengajuan Surat (termasuk surat keterangan usaha dan kependudukan dengan hak akses berbasis peran/admin), Arsip Surat digital, serta rekapitulasi Laporan pelayanan otomatis.</li>
    </ul>
  </div>

  <div class="exp-item">
    <div class="exp-header">
      <span class="exp-role">Peserta Praktik Pengenalan Lapangan (PPL)</span>
      <span class="exp-date">Juli 2025</span>
    </div>
    <div class="exp-inst">Pesantren Siswa Al Ma’soem — Sumedang, Jawa Barat</div>
    <ul class="exp-bullets">
      <li>Melaksanakan observasi lingkungan kerja, alur operasional, dan kebutuhan penerapan sistem informasi sebagai bagian dari kurikulum Program Studi Sistem Informasi.</li>
    </ul>
  </div>

  <!-- 5. PROYEK UTAMA & PORTOFOLIO TEKNIS (6 PROYEK) -->
  <div class="section-title">🚀 Proyek Utama & Portofolio Teknis</div>
  <div class="project-grid">
    <div class="project-card">
      <div class="proj-head">
        <span class="proj-title">SIPELDES — Sistem Informasi Pelayanan Desa</span>
        <span class="proj-year">2026</span>
      </div>
      <div class="proj-tech">PHP (Laravel), MySQL/MariaDB, HTML5, CSS3, JS, UML</div>
      <p class="proj-desc">Aplikasi web untuk mendigitalisasi proses pengajuan dan pengarsipan surat pelayanan desa dengan integritas relasi basis data serta kontrol akun administratif ketat.</p>
    </div>

    <div class="project-card">
      <div class="proj-head">
        <span class="proj-title">Aplikasi Mobile Multi-Screen & Katalog Dinamis</span>
        <span class="proj-year">2026</span>
      </div>
      <div class="proj-tech">React Native, Expo SDK 58, JavaScript, TypeScript</div>
      <p class="proj-desc">Aplikasi mobile lintas platform dengan arsitektur navigasi Stack & Bottom-Tab, manajemen state, optimasi debouncing, dan FlatList dinamis.</p>
    </div>

    <div class="project-card">
      <div class="proj-head">
        <span class="proj-title">Prototipe Mobile E-Commerce Pop Culture</span>
        <span class="proj-year">2026</span>
      </div>
      <div class="proj-tech">Kodular, Android UI, E-Commerce Flow</div>
      <p class="proj-desc">Purwarupa aplikasi perdagangan elektronik (e-commerce) berbasis Android untuk katalog produk dan alur pemesanan koleksi pop culture.</p>
    </div>

    <div class="project-card">
      <div class="proj-head">
        <span class="proj-title">Aplikasi Desktop POS & Manajemen Penjualan</span>
        <span class="proj-year">2026</span>
      </div>
      <div class="proj-tech">Visual Basic .NET (VB.NET), MySQL, SAP Crystal Reports</div>
      <p class="proj-desc">Sistem kasir dan manajemen transaksi penjualan desktop terintegrasi basis data MySQL serta pembuatan laporan transaksi otomatis.</p>
    </div>

    <div class="project-card">
      <div class="proj-head">
        <span class="proj-title">Aplikasi Desktop Manajemen Keanggotaan Gym</span>
        <span class="proj-year">2025 – 2026</span>
      </div>
      <div class="proj-tech">Java Swing, JDBC, Oracle Database 11g (PL/SQL)</div>
      <p class="proj-desc">Aplikasi desktop Java untuk pengelolaan data anggota dan transaksi dengan arsitektur basis data relasional multi-tabel serta Stored Procedures.</p>
    </div>

    <div class="project-card">
      <div class="proj-head">
        <span class="proj-title">Simulasi Topologi & Infrastruktur Jaringan</span>
        <span class="proj-year">2025 – 2026</span>
      </div>
      <div class="proj-tech">Cisco Packet Tracer (Static/RIP, DHCP, Wireless)</div>
      <p class="proj-desc">Perancangan jaringan komputer multi-segmen dengan konfigurasi Static/Dynamic Routing (RIP), DHCP Server, serta integrasi Wireless Access Point.</p>
    </div>
  </div>

  <!-- 6. KETERAMPILAN TEKNIS & NON-TEKNIS -->
  <div class="section-title">⚡ Keterampilan (Skills)</div>
  <div class="skills-section">
    <div class="skill-category">
      <span class="skill-cat-label">Pengembangan Web:</span>
      <span class="skill-cat-items">PHP, Laravel Framework, HTML5, CSS3, JavaScript, REST API dasar.</span>
    </div>
    <div class="skill-category">
      <span class="skill-cat-label">Pengembangan Desktop & Mobile:</span>
      <span class="skill-cat-items">Java (Java Swing, JDBC), Visual Basic .NET, React Native, Expo, Kodular.</span>
    </div>
    <div class="skill-category">
      <span class="skill-cat-label">Basis Data & Pelaporan:</span>
      <span class="skill-cat-items">MySQL / MariaDB (phpMyAdmin), Oracle Database 11g (SQL & PL/SQL), SAP Crystal Reports.</span>
    </div>
    <div class="skill-category">
      <span class="skill-cat-label">Analisis Sistem & Jaringan:</span>
      <span class="skill-cat-items">Pemodelan UML (Use Case, Activity, Class Diagram), Analisis PIECES, Cisco Packet Tracer.</span>
    </div>
    <div class="skill-category">
      <span class="skill-cat-label">Tools, Version Control & Cloud:</span>
      <span class="skill-cat-items">Git, GitHub, Railway (Cloud Deployment), VS Code, Apache NetBeans, Visual Studio, Laragon, XAMPP.</span>
    </div>
    <div class="skill-category">
      <span class="skill-cat-label">Keterampilan Non-Teknis (Soft Skills):</span>
      <span class="skill-cat-items">Pemecahan masalah sistematis & debugging, komunikasi efektif pemangku kepentingan, kerja sama tim, manajemen waktu berbasis target.</span>
    </div>
  </div>

  <!-- 7. PENGALAMAN ORGANISASI, KARYA TULIS & AKADEMIK -->
  <div class="section-title">🏛️ Organisasi & Karya Tulis</div>
  <div style="font-size: 7.5pt; color: #334155; margin-bottom: 5px;">
    <div>• <strong>Panitia Pelaksana FESTAMI 2026</strong> — BEM Universitas Ma’soem (September 2026): Koordinasi teknis, logistik, pedoman registrasi digital lomba MTQ dan vokal solo.</div>
    <div>• <strong>Laporan Praktik Adaptasi Lapangan:</strong> Perancangan Sistem Informasi Pelayanan Administrasi Berbasis Web Pada Kantor Desa Bojongloa (2026).</div>
    <div>• <strong>Studi Literatur Ekonomi Syariah:</strong> Analisis Kinerja dan Perkembangan PT Bank Syariah Indonesia Tbk (2026).</div>
  </div>

  <!-- 8. CAPAIAN PEMROGRAMAN MOBILE 2 (UTS VERIFIKASI) -->
  <div class="section-title">📊 Capaian Akademik Pemrograman Mobile 2 (Dosen: Iin, M.Kom)</div>
  <div class="capaian-grid">
    <div class="capaian-box">
      <div class="capaian-val">100%</div>
      <div class="capaian-lbl">Attendance</div>
    </div>
    <div class="capaian-box">
      <div class="capaian-val">87%</div>
      <div class="capaian-lbl">Practice</div>
    </div>
    <div class="capaian-box">
      <div class="capaian-val">95%</div>
      <div class="capaian-lbl">Quest</div>
    </div>
    <div class="capaian-box">
      <div class="capaian-val">100%</div>
      <div class="capaian-lbl">Challenge (Lvl 10)</div>
    </div>
  </div>

  <!-- FOOTER RESMI DOKUMEN -->
  <div class="cv-footer">
    <div>Dokumen CV Resmi Mahasiswa • Program Studi S1 Sistem Informasi • Universitas Ma'soem</div>
    <div>Dicetak secara digital via Mobile CV App (${new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })})</div>
  </div>

</body>
</html>
  `;
}

/**
 * Mengunduh, mencetak, atau membagikan file PDF secara lintas platform (Web, Android, iOS).
 */
export async function downloadCvPdf(): Promise<{
  success: boolean;
  uri?: string;
  error?: string;
}> {
  try {
    const html = generateCvHtml();

    if (Platform.OS === 'web') {
      // PADA BROWSER WEB:
      // Gunakan iframe terisolasi agar HANYA DOKUMEN CV yang dicetak / disimpan ke PDF
      // (Bukan layar tampilan antarmuka aplikasi Expo web!)
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();

        // Tunggu rendering selesai lalu picu print dialog dokumen CV
        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } catch (e) {
            console.error('Print iframe error:', e);
          }
          // Bersihkan iframe setelah dialog cetak dipicu
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 1500);
        }, 500);
      }
      return { success: true };
    }

    // PADA NATIVE MOBILE (ANDROID & IOS):
    // 1. Generate file PDF ke direktori cache lokal
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    // 2. Buka dialog Simpan File / Berbagi dokumen bawaan sistem operasi (Downloads, WhatsApp, Drive, dll)
    const isSharingAvailable = await Sharing.isAvailableAsync();
    if (isSharingAvailable) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Unduh CV ${profileJson.nama} (PDF)`,
        UTI: 'com.adobe.pdf',
      });
    } else {
      await Print.printAsync({ uri });
    }

    return { success: true, uri };
  } catch (error: any) {
    console.error('Error saat membuat PDF CV:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat memproses file PDF.',
    };
  }
}
