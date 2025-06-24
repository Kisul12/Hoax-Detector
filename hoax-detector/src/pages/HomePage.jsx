// src/assets/pages/HomePage.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../assets/components/Navbar';
import Button from '../assets/components/Button';
import TrendChart from '../assets/components/TrendChart'; // Komponen line chart
import SimplePieChart from '../assets/components/SimplePieChart'; // Komponen pie chart generik

// Import fungsi pemrosesan data dari chartDataProcessor.js
import {
  processHoaxDataForChart,
  processStatusDataForPieChart,
  processCategoryDataForPieChart,
} from '../data/chartDataProcessor';

// Import dummyHoaxData (digunakan untuk 'Detail Terakhir' dan oleh data processors)
import { dummyHoaxData } from '../data/hoaxData';
import SummaryCard from '../assets/components/SummaryCard';
import PieCard from '../assets/components/PieCard';
import LatestDetailsTable from '../assets/components/LatestDetailsTable';

export default function HomePage() {
  // Memproses data untuk line chart
  const lineChartData = useMemo(() => processHoaxDataForChart(), []);
  // Memproses data untuk pie chart status
  const statusPieData = useMemo(() => processStatusDataForPieChart(), []);
  // Memproses data untuk pie chart kategori
  const categoryPieData = useMemo(() => processCategoryDataForPieChart(), []);

  // Dummy data untuk kartu ringkasan (simulasi)
  const totalDeteksiHariIni = useMemo(() => {
    // Hitung total deteksi hari ini dari dummyHoaxData (simulasi)
    const today = new Date().toISOString().split('T')[0];
    return dummyHoaxData.filter(item => item.tanggal === today).length;
  }, []);

  const totalVerifikasiHariIni = useMemo(() => {
    // Hitung total verifikasi hari ini (simulasi, misal dari item yang statusnya berubah)
    return Math.floor(Math.random() * (totalDeteksiHariIni / 2)) + 1; // Antara 1 dan setengah total deteksi
  }, [totalDeteksiHariIni]);

  // Ambil beberapa item terakhir dari dummyHoaxData untuk 'Detail Terakhir'
  const latestDetails = useMemo(() => {
    const sortedData = [...dummyHoaxData].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    return sortedData.slice(0, 5); // Ambil 5 item terbaru
  }, []);

  return (
    <div>
      <Navbar /> 

      {/* Kontainer utama untuk konten halaman */}
      <div className="pl-72 pt-14 pr-16 pb-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between mb-6 ">
          <h1 className="ml-4 text-3xl font-medium leading-relaxed">Halo, Selamat Datang di Website <br />Pendeteksi Hoax</h1>
          <div className="flex items-center justify-center">
            <Link to="/deteksi">
              <Button classname="bg-blue-500 hover:bg-blue-700 " type="button">Deteksi</Button>
            </Link>
          </div>
        </div>

        {/* Bagian Chart Tren Deteksi (Line Chart) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tren Hasil Deteksi pada tahun 2024</h2>
          <div style={{ height: '400px', width: '100%' }}> 
            {lineChartData.length > 0 ? (
              <TrendChart data={lineChartData} />
            ) : (
              <p className="text-gray-500 text-center">Memuat data chart...</p>
            )}
          </div>
        </div>

        {/* Kartu Ringkasan (Total Deteksi & Verifikasi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <SummaryCard title="Total Deteksi Hari Ini" value={totalDeteksiHariIni} valueColorClass="text-green-500" />
            <SummaryCard title="Total Verifikasi Hari Ini" value={totalVerifikasiHariIni} valueColorClass="text-blue-500" />
        </div>

        {/* Pie Carts */}
        <PieCard statusPieData={statusPieData} categoryPieData={categoryPieData} />

        {/* Riwayat Deteksi Terakhir */}
        <LatestDetailsTable latestDetails={latestDetails} />
      </div>
    </div>
  );
}