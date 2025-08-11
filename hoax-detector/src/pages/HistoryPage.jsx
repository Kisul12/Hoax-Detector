import React, { useState, useMemo } from 'react';
import { dummyHoaxData } from '../data/hoaxData';
import { Link } from 'react-router-dom';
import Navbar from '../assets/components/Navbar';

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterJenis, setFilterJenis] = useState('Semua');
  const [sortByDate, setSortByDate] = useState('Default');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredAndSortedData = useMemo(() => {
    let currentData = [...dummyHoaxData];

    if (searchTerm) {
      currentData = currentData.filter(item =>
        item.judul.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterKategori !== 'Semua') {
      currentData = currentData.filter(item => item.kategori === filterKategori);
    }

    if (filterStatus !== 'Semua') {
      currentData = currentData.filter(item => item.status === filterStatus);
    }

    if (filterJenis !== 'Semua') {
      currentData = currentData.filter(item => item.jenis === filterJenis);
    }

    if (startDate) {
      currentData = currentData.filter(item => new Date(item.tanggal) >= new Date(startDate));
    }
    if (endDate) {
      currentData = currentData.filter(item => new Date(item.tanggal) <= new Date(endDate));
    }

    if (sortByDate === 'Terbaru') {
      currentData.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
    } else if (sortByDate === 'Terlama') {
      currentData.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
    }

    return currentData;
  }, [searchTerm, filterKategori, filterStatus, filterJenis, sortByDate, startDate, endDate]);

  const uniqueCategories = useMemo(() => {
    const categories = dummyHoaxData.map(item => item.kategori);
    return ['Semua', ...new Set(categories)];
  }, []);

  return (
    <div>
      <Navbar />

      <div className="bg-gray-100 pl-72 pt-14 pr-16 pb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">RIWAYAT DETEKSI HOAX</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Cari Judul:</label>
            <input
              type="text"
              id="search"
              placeholder="Cari berdasarkan judul..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="filterKategori" className="block text-sm font-medium text-gray-700 mb-1">Kategori:</label>
            <select
              id="filterKategori"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
            >
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
            <select
              id="filterStatus"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="Semua">Semua</option>
              <option value="Hoax">Hoax</option>
              <option value="Aman">Aman</option>
            </select>
          </div>

          <div>
            <label htmlFor="filterJenis" className="block text-sm font-medium text-gray-700 mb-1">Jenis:</label>
            <select
              id="filterJenis"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
            >
              <option value="Semua">Semua</option>
              <option value="video">Video</option>
              <option value="tabular">Tabular</option>
            </select>
          </div>

          <div>
            <label htmlFor="sortByDate" className="block text-sm font-medium text-gray-700 mb-1">Urutkan Tanggal:</label>
            <select
              id="sortByDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              value={sortByDate}
              onChange={(e) => setSortByDate(e.target.value)}
            >
              <option value="Default">Default</option>
              <option value="Terbaru">Terbaru</option>
              <option value="Terlama">Terlama</option>
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-2 flex gap-4">
            <div className="w-full">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal:</label>
              <input
                type="date"
                id="startDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal:</label>
              <input
                type="date"
                id="endDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Keyakinan (%)</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Detail</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((data, index) => (
                  <tr key={data.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 max-w-xs break-words">{data.judul}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={data.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">Link</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.tanggal}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{data.kategori}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{data.keyakinan}%</td>
                    <td className={`px-6 py-4 text-center whitespace-nowrap text-sm font-semibold ${
                      data.status === 'Hoax' ? 'text-red-600' : 'text-green-600 '
                    }`}>{data.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <Link
                        to={`/detail/${data.id}`}
                        className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      >
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">Tidak ada data yang cocok dengan filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
