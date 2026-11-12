// services/mockApiService.ts
// LEVEL 10 (Industry): Service Layer & Asynchronous Mock LMS API

import profileJson from '../data/profile.json';
import skillsData from '../data/skills.json';
import portfolioData from '../data/portfolio.json';
import academicScoreData from '../data/academicScore.json';

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * Simulasi pemanggilan API asinkronus ke server Academic LMS Universitas Ma'soem.
 * Mendukung simulasi loading delay dan penanganan error.
 */
export const mockApiService = {
  // Mengambil Data Profil Mahasiswa
  async getProfile(): Promise<ApiResponse<typeof profileJson>> {
    await simulateNetworkDelay(600);
    return {
      success: true,
      statusCode: 200,
      message: 'Data profil mahasiswa berhasil dimuat dari LMS',
      data: profileJson,
      timestamp: new Date().toISOString(),
    };
  },

  // Mengambil Data Nilai & Academic Score (Level 8 & 10)
  async getAcademicScore(
    shouldFail = false
  ): Promise<ApiResponse<typeof academicScoreData>> {
    await simulateNetworkDelay(800);

    if (shouldFail) {
      throw new Error(
        'Gagal terhubung ke Academic War LMS Server. Periksa koneksi internet Anda.'
      );
    }

    return {
      success: true,
      statusCode: 200,
      message: 'Nilai UTS Pemrograman Mobile 2 berhasil disinkronisasi',
      data: academicScoreData,
      timestamp: new Date().toISOString(),
    };
  },

  // Mengambil Data Skills & Keahlian
  async getSkills(): Promise<ApiResponse<typeof skillsData>> {
    await simulateNetworkDelay(500);
    return {
      success: true,
      statusCode: 200,
      message: 'Daftar keahlian teknis berhasil dimuat',
      data: skillsData,
      timestamp: new Date().toISOString(),
    };
  },

  // Mengambil Data Portofolio Proyek
  async getPortfolio(): Promise<ApiResponse<typeof portfolioData>> {
    await simulateNetworkDelay(500);
    return {
      success: true,
      statusCode: 200,
      message: 'Daftar portofolio proyek berhasil dimuat',
      data: portfolioData,
      timestamp: new Date().toISOString(),
    };
  },
};

// Helper fungsi simulasi latency jaringan
function simulateNetworkDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

