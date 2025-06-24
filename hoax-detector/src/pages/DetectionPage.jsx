import React, { useState, useRef } from 'react';
import Navbar from '../assets/components/Navbar';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

export default function DetectionPage() {
  const [inputText, setInputText] = useState('');
  const [detectionResults, setDetectionResults] = useState([]);
  const fileInputRef = useRef(null);

  const dummyResults = [
    {
      id: 'hoax_video_1',
      type: 'video',
      url: 'https://youtu.be/lrMiuYS0Zv4?si=nUQ2TSzdfVzSj52r',
      kategori: 'Politik',
      keyakinan: 82,
      status: 'Hoax',
      videoId: 'RK7nRsUNCJs',
    },
    {
      id: 'aman_video_1',
      type: 'video',
      url: 'https://youtu.be/lrMiuYS0Zv4?si=nUQ2TSzdfVzSj52r',
      kategori: 'Politik',
      keyakinan: 88,
      status: 'Aman',
      videoId: 'RK7nRsUNCJs',
    },
  ];

  const handleDetectClick = async () => {
    if (!inputText.trim()) {
      alert('Mohon masukkan URL Sumber Berita.');
      return;
    }

    Swal.fire({
      title: 'Mendeteksi...',
      text: 'Mohon tunggu, kami sedang menganalisis konten.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isHoax = Math.random() < 0.5;
    const resultToDisplay = isHoax ? dummyResults[0] : dummyResults[1];

    Swal.fire({
      icon: 'success',
      title: 'Deteksi Selesai!',
      text: 'Hasil analisis Anda siap.',
      showConfirmButton: false,
      timer: 1500,
    });

    setDetectionResults([{ ...resultToDisplay, isLoading: false }]);
    console.log('Deteksi URL diklik. Input:', inputText, 'Result:', resultToDisplay.status);
    Swal.close();
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
    setDetectionResults([]);
  };

  const detectRow = async (row, index, headers) => {
    const url = row[headers.find((h) => h.toLowerCase() === 'url') || 'URL'];
    if (!url || !url.includes('youtu')) {
      return {
        ...row,
        kategori: 'Tidak Diketahui',
        keyakinan: 0,
        status: 'Tidak Valid',
        videoId: null,
        isLoading: false,
      };
    }

    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&\n?]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    // Simulasi deteksi dengan delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isHoax = Math.random() < 0.5;
    return {
      ...row,
      kategori: isHoax ? 'Politik' : 'Edukasi',
      keyakinan: Math.floor(Math.random() * (95 - 70 + 1)) + 70,
      status: isHoax ? 'Hoax' : 'Aman',
      videoId,
      isLoading: false,
    };
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    event.target.value = '';

    Swal.fire({
      title: 'Memproses File...',
      text: 'Sedang membaca dan menganalisis ' + file.name + '.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    let headers, parsedRows;
    if (fileExtension === 'csv') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csvContent = e.target.result;
        const lines = csvContent.split('\n').filter((line) => line.trim() !== '');
        if (lines.length < 2) {
          Swal.close();
          alert('File CSV terlalu pendek untuk dianalisis.');
          return;
        }

        headers = lines[0].split(',').map((h) => h.trim());
        const rawRows = lines.slice(1);
        parsedRows = rawRows.map((line) => {
          const values = line.split(',').map((v) => v.trim());
          let rowObject = {};
          headers.forEach((header, i) => {
            rowObject[header] = values[i] || '';
          });
          return { ...rowObject, isLoading: true };
        });

        setDetectionResults(parsedRows);
        Swal.close();

        // Proses deteksi per baris
        for (let i = 0; i < parsedRows.length; i++) {
          const result = await detectRow(parsedRows[i], i, headers);
          setDetectionResults((prev) =>
            prev.map((row, index) => (index === i ? result : row))
          );
        }

        Swal.fire({
          icon: 'success',
          title: 'Proses File Selesai!',
          text: `File '${file.name}' berhasil dianalisis.`,
          showConfirmButton: false,
          timer: 1500,
        });
      };
      reader.onerror = () => {
        Swal.close();
        alert('Gagal membaca file CSV.');
      };
      reader.readAsText(file);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonRows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonRows.length < 2) {
          Swal.close();
          alert('File Excel terlalu pendek untuk dianalisis.');
          return;
        }

        headers = jsonRows[0];
        parsedRows = jsonRows.slice(1).map((row) => {
          let rowObject = {};
          headers.forEach((header, i) => {
            rowObject[header] = row[i] || '';
          });
          return { ...rowObject, isLoading: true };
        });

        setDetectionResults(parsedRows);
        Swal.close();

        // Proses deteksi per baris
        for (let i = 0; i < parsedRows.length; i++) {
          const result = await detectRow(parsedRows[i], i, headers);
          setDetectionResults((prev) =>
            prev.map((row, index) => (index === i ? result : row))
          );
        }

        Swal.fire({
          icon: 'success',
          title: 'Proses File Selesai!',
          text: `File '${file.name}' berhasil dianalisis.`,
          showConfirmButton: false,
          timer: 1500,
        });
      };
      reader.onerror = () => {
        Swal.close();
        alert('Gagal membaca file Excel.');
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Tipe file tidak didukung. Mohon unggah file CSV atau Excel.');
      setDetectionResults([]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pl-72 pt-14 pr-16 pb-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">DETEKSI HOAX</h1>

        <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
          <input
            type="text"
            placeholder="Masukkan URL Sumber Berita"
            className="w-full bg-white md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm
                                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                      text-gray-700"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <button
            onClick={handleDetectClick}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                                      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                                      focus:ring-opacity-75 transition duration-300"
          >
            Deteksi URL
          </button>
          <button
            onClick={triggerFileUpload}
            className="flex gap-1.5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md
                                      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                                      focus:ring-opacity-75 transition duration-300"
          >
            <img src="/upload.png" alt="" />
            Upload File
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center min-h-[400px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hasil Deteksi</h2>

          {detectionResults.length > 0 ? (
            <div className="w-full flex flex-col items-center">
              {detectionResults[0].type === 'video' ? (
                <div className="relative w-full max-w-lg mb-8" style={{ paddingBottom: '40.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                    src="https://www.youtube.com/embed/lrMiuYS0Zv4?si=Cg1IGAXF8bFi9pz2"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="  w-full max-w-4xl mb-6 text-left">
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {Object.keys(detectionResults[0])
                            .filter((key) => !['kategori', 'keyakinan', 'status', 'videoId', 'isLoading'].includes(key))
                            .map((header) => (
                              <th
                                key={header}
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {header}
                              </th>
                            ))}
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pratinjau
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kategori
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Keyakinan
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {detectionResults.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {Object.keys(row)
                              .filter((key) => !['kategori', 'keyakinan', 'status', 'videoId', 'isLoading'].includes(key))
                              .map((header) => (
                                <td
                                  key={`${rowIndex}-${header}`}
                                  className="px-4 py-2 whitespace-nowrap text-sm text-gray-900"
                                >
                                  {header === 'URL' ? (
                                    <a
                                      href={row[header]}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      {row[header]}
                                    </a>
                                  ) : (
                                    row[header]
                                  )}
                                </td>
                              ))}
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                                {row.videoId ? (
                                  <div className="relative w-30 h-20" style={{ paddingBottom: '56.25%' }}>
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
                                ) : (
                                  'Tidak Ada Pratinjau'
                                )}
                              </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                              {row.kategori || '-'}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                              {row.keyakinan ? `${row.keyakinan}%` : '-'}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                              {row.isLoading ? (
                                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                              ) : (
                                <span
                                  className={`font-bold ${
                                    row.status === 'Hoax' ? 'text-red-600' : row.status === 'Aman' ? 'text-green-600' : ''
                                  }`}
                                >
                                  {row.status || '-'}
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Menampilkan {detectionResults.length} baris.
                  </p>
                </div>
              )}

              {detectionResults[0].type === 'video' && (
                <div className="w-full text-left space-y-3 mb-6">
                  <div className="grid grid-cols-3 gap-x-4">
                    <p className="col-span-1 text-gray-700 font-bold">URL</p>
                    <p className="col-span-2 text-gray-900">
                      :{' '}
                      <a
                        href={detectionResults[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {detectionResults[0].url}
                      </a>
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-x-4">
                    <p className="col-span-1 text-gray-700 font-bold">Kategori</p>
                    <p className="col-span-2 text-gray-900">: {detectionResults[0].kategori}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-x-4">
                    <p className="col-span-1 text-gray-700 font-bold">Keyakinan</p>
                    <p className="col-span-2 text-gray-900">: {detectionResults[0].keyakinan}%</p>
                  </div>
                  <div className="grid grid-cols-3 gap-x-4 items-center">
                    <p className="col-span-1 text-gray-700 font-bold">Status</p>
                    <div className="col-span-2 flex items-center gap-2">
                      <p className="text-gray-900">:</p>
                      <span
                        className={`font-bold text-lg ${
                          detectionResults[0].status === 'Hoax' ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {detectionResults[0].status}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <img src="/nothing.png" alt="Belum ada input" className="w-64 h-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada input-an URL atau File</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}