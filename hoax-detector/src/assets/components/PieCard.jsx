import React from 'react';
import SimplePieChart from './SimplePieChart'; 

export default function PieCard({ statusPieData, categoryPieData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Pie Chart: Klasifikasi Hasil Deteksi */}
      {statusPieData.length > 0 ? (
        <SimplePieChart data={statusPieData} title="Klasifikasi Hasil Deteksi" />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 h-[400px] flex items-center justify-center">
            <p className="text-gray-500 text-center">Memuat data Klasifikasi Hasil Deteksi...</p>
        </div>
      )}
      
      {/* Pie Chart: Klasifikasi Berdasarkan Kategori */}
      {categoryPieData.length > 0 ? (
        <SimplePieChart data={categoryPieData} title="Klasifikasi Berdasarkan Kategori" />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 h-[400px] flex items-center justify-center">
            <p className="text-gray-500 text-center">Memuat data Klasifikasi Berdasarkan Kategori...</p>
        </div>
      )}
    </div>
  );
}