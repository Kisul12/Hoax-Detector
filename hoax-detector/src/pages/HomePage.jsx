import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../assets/components/Navbar';
import Button from '../assets/components/Button';
import TrendChart from '../assets/components/TrendChart'; // Komponen bar chart
import SummaryCard from '../assets/components/SummaryCard';
import PieCard from '../assets/components/PieCard';
import LatestDetailsTable from '../assets/components/LatestDetailsTable';

// Import fungsi pemrosesan data dari chartDataProcessor.js
import {
  processHoaxDataForBarChart,
  processStatusDataForPieChart,
  processCategoryDataForPieChart,
} from '../data/chartDataProcessor';

// Import dummyHoaxData
import { dummyHoaxData } from '../data/hoaxData';

export default function HomePage() {
  // Data untuk Bar Chart (Tren Bulanan)
  const barChartData = useMemo(() => processHoaxDataForBarChart(), []);

  // Pie Chart Data
  const statusPieData = useMemo(() => processStatusDataForPieChart(), []);
  const categoryPieData = useMemo(() => processCategoryDataForPieChart(), []);

  // Total Deteksi Hari Ini
  const totalDeteksiHariIni = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return dummyHoaxData.filter(item => item.tanggal === today).length;
  }, []);

  // Total Verifikasi Hari Ini (simulasi)
  const totalVerifikasiHariIni = useMemo(() => {
    return Math.floor(Math.random() * (totalDeteksiHariIni / 2)) + 1;
  }, [totalDeteksiHariIni]);

  // Detail Terbaru
  const latestDetails = useMemo(() => {
    const sorted = [...dummyHoaxData].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    return sorted.slice(0, 5);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="pl-72 pt-14 pr-16 pb-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between mb-6">
          <h1 className="ml-4 text-3xl font-medium leading-relaxed">
            Halo, Selamat Datang di Website <br />Pendeteksi Hoax
          </h1>
          <div className="flex items-center justify-center">
            <Link to="/deteksi">
              <Button classname="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                                      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                                      focus:ring-opacity-75 transition duration-300" type="button">Deteksi</Button>
            </Link>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Tren Hasil Deteksi pada tahun 2024
          </h2>
          <div style={{ height: '400px', width: '100%' }}>
            {barChartData.length > 0 ? (
              <TrendChart data={barChartData} />
            ) : (
              <p className="text-gray-500 text-center">Memuat data chart...</p>
            )}
          </div>
        </div>

        {/* Ringkasan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <SummaryCard title="Total Deteksi Hari Ini" value={totalDeteksiHariIni} valueColorClass="text-green-500" />
          <SummaryCard title="Total Verifikasi Hari Ini" value={totalVerifikasiHariIni} valueColorClass="text-blue-500" />
        </div>

        {/* Pie Chart */}
        <PieCard statusPieData={statusPieData} categoryPieData={categoryPieData} />

        {/* Riwayat Terbaru */}
        <LatestDetailsTable latestDetails={latestDetails} />
      </div>
    </div>
  );
}
