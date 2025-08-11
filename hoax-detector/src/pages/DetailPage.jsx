import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../assets/components/Navbar';
import { dummyHoaxData } from '../data/hoaxData';
import Swal from 'sweetalert2';

export default function DetailPage() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundData = dummyHoaxData.find(item => item.id === id);
    setDetailData(foundData);

    console.log('ID dari URL:', id);
    console.log('Data yang ditemukan:', foundData);
    if (foundData) {
      console.log('Properti URL di data:', foundData.url);
      console.log('Properti fileName di data:', foundData.fileName);
      console.log('Properti videoId di data:', foundData.videoId);
    }
  }, [id]);

  const handleExportPdf = () => {
    Swal.fire({
      icon: 'info',
      title: 'Export PDF',
      text: 'Fitur ini akan segera tersedia.',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleExportCsv = () => {
    Swal.fire({
      icon: 'info',
      title: 'Export CSV',
      text: 'Fitur ini akan segera tersedia.',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!detailData) {
    return (
      <div>
        <Navbar />
        <div className="pl-72 pt-14 pr-16 pb-8 bg-gray-100 min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-700">Memuat detail atau data tidak ditemukan...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="pl-72 pt-14 pr-16 pb-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          RIWAYAT DETEKSI HOAX - <span className="font-normal text-gray-500"> DETAIL RIWAYAT</span>
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <div className="flex justify-start mb-6">
            <button
              onClick={handleGoBack}
              className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-300 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4l4 4" />
              </svg>
              Kembali
            </button>
          </div>

          {detailData.type === 'video' ? (
            <div className="relative w-full max-w-lg mx-auto mb-6" style={{ paddingBottom: '33%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-md shadow"
                src="https://www.youtube.com/embed/lrMiuYS0Zv4?si=Cg1IGAXF8bFi9pz2"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ) : detailData.type === 'tabular' ? (
            <div className="w-full max-w-lg mx-auto mb-6 text-left">
              <h3 className="text-xl font-semibold mb-3">
                Overview File {detailData.fileType.toUpperCase()}: {detailData.fileName}
              </h3>
              <p className="text-gray-700 mb-2">Total Baris: {detailData.totalRows}, Total Kolom: {detailData.totalColumns}</p>
              {detailData.previewRows && detailData.previewRows.length > 0 && (
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {detailData.previewHeaders.map(header => (
                          <th
                            key={header}
                            className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {detailData.previewRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {detailData.previewHeaders.map(header => (
                            <td
                              key={`${rowIndex}-${header}`}
                              className="px-4 py-2 whitespace-nowrap text-sm text-gray-900"
                            >
                              {row[header]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full text-center mb-6">
              <img src="/people.png" alt="Tidak ada media preview" className="w-48 h-auto mx-auto mb-4" />
              <p className="text-gray-500">Tidak ada preview media untuk tipe ini.</p>
            </div>
          )}

          <div className="w-full text-left space-y-3 mb-8">
            <div className="grid grid-cols-3 gap-x-4">
              <p className="col-span-1 text-gray-700 font-bold">Judul</p>
              <p className="col-span-2 text-gray-900">: {detailData.judul}</p>
            </div>
            <div className="grid grid-cols-3 gap-x-4">
              <p className="col-span-1 text-gray-700 font-bold">URL</p>
              <p className="col-span-2 text-gray-900">
                :{' '}
                {detailData.url ? (
                  <a href={detailData.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {detailData.url}
                  </a>
                ) : (
                  detailData.fileName
                )}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-x-4">
              <p className="col-span-1 text-gray-700 font-bold">Kategori</p>
              <p className="col-span-2 text-gray-900">: {detailData.kategori}</p>
            </div>
            <div className="grid grid-cols-3 gap-x-4">
              <p className="col-span-1 text-gray-700 font-bold">Keyakinan</p>
              <p className="col-span-2 text-gray-900">: {detailData.keyakinan}%</p>
            </div>
            <div className="grid grid-cols-3 gap-x-4 items-center">
              <p className="col-span-1 text-gray-700 font-bold">Status</p>
              <div className="col-span-2 flex items-center gap-2">
                <p className={`font-bold text-lg ${detailData.status === 'Hoax' ? 'text-red-600' : 'text-green-600'}`}>
                  : {detailData.status}
                </p>
                {detailData.illustration && (
                  <img src={detailData.illustration} alt={detailData.status} className="w-8 h-8" />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleExportPdf}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300"
            >
              Export PDF
            </button>
            <button
              onClick={handleExportCsv}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}