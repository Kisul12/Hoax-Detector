import React, { useState, useRef } from 'react';
import Navbar from '../assets/components/Navbar';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';

export default function DetectionPage() {
  const [inputText, setInputText] = useState('');
  const [detectionResult, setDetectionResult] = useState(null);
  const fileInputRef = useRef(null);

  const dummyResults = [
    {
      id: 'hoax_video_1',
      type: 'video',
      url: 'https://youtu.be/RK7nRsUNCJs?si=GUBnG1SQncbINizj',
      kategori: 'Politik',
      keyakinan: 82,
      status: 'Hoax',
      videoId: 'RK7nRsUNCJs',
    },
    {
      id: 'aman_video_1',
      type: 'video',
      url: 'https://youtu.be/RK7nRsUNCJs?si=GUBnG1SQncbINizj',
      kategori: 'Politik',
      keyakinan: 88,
      status: 'Aman',
      videoId: 'RK7nRsUNCJs',
    },
    {
      id: 'csv_hoax_1',
      type: 'tabular',
      fileType: 'csv',
      fileName: 'contoh_hoax.csv',
      totalRows: 150,
      totalColumns: 5,
      previewHeaders: ['Judul', 'URL', 'Status'],
      previewRows: [
        { Judul: 'Berita A', URL: 'http://a.com', Status: 'Hoax' },
        { Judul: 'Berita B', URL: 'http://b.com', Status: 'Aman' },
        { Judul: 'Berita C', URL: 'http://c.com', Status: 'Hoax' },
      ],
      kategori: 'Multi',
      keyakinan: 70,
      status: 'Hoax',
      illustration: '/hoax.png',
    },
    {
      id: 'csv_aman_1',
      type: 'tabular',
      fileType: 'csv',
      fileName: 'contoh_aman.csv',
      totalRows: 200,
      totalColumns: 4,
      previewHeaders: ['Judul', 'URL', 'Status'],
      previewRows: [
        { Judul: 'Laporan D', URL: 'http://d.com', Status: 'Aman' },
        { Judul: 'Laporan E', URL: 'http://e.com', Status: 'Aman' },
        { Judul: 'Laporan F', URL: 'http://f.com', Status: 'Hoax' },
      ],
      kategori: 'Multi',
      keyakinan: 90,
      status: 'Aman',
      illustration: '/safe.png',
    },
    {
      id: 'excel_hoax_1',
      type: 'tabular',
      fileType: 'excel',
      fileName: 'dokumen_hoax.xlsx',
      totalRows: 120,
      totalColumns: 6,
      previewHeaders: ['No', 'Konten', 'Kategori', 'Status'],
      previewRows: [
        { No: 1, Konten: 'Narasi X', Kategori: 'Kesehatan', Status: 'Hoax' },
        { No: 2, Konten: 'Klaim Y', Kategori: 'Politik', Status: 'Aman' },
        { No: 3, Konten: 'Informasi Z', Kategori: 'Olahraga', Status: 'Hoax' },
      ],
      kategori: 'Multi',
      keyakinan: 75,
      status: 'Hoax',
      illustration: '/hoax.png',
    },
    {
      id: 'excel_aman_1',
      type: 'tabular',
      fileType: 'excel',
      fileName: 'dokumen_aman.xlsx',
      totalRows: 180,
      totalColumns: 5,
      previewHeaders: ['No', 'Konten', 'Kategori', 'Status'],
      previewRows: [
        { No: 1, Konten: 'Fakta P', Kategori: 'Edukasi', Status: 'Aman' },
        { No: 2, Konten: 'Penjelasan Q', Kategori: 'Sains', Status: 'Aman' },
        { No: 3, Konten: 'Ulasan R', Kategori: 'Bisnis', Status: 'Hoax' },
      ],
      kategori: 'Multi',
      keyakinan: 95,
      status: 'Aman',
      illustration: '/safe.png',
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
      icon: 'success', // Ikon centang
      title: 'Deteksi Selesai!',
      text: 'Hasil analisis Anda siap.',
      showConfirmButton: false, // Tidak perlu tombol konfirmasi
      timer: 1500, // Tampilkan sebentar
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));
    Swal.close();

    setDetectionResult(resultToDisplay);
    console.log('Deteksi URL diklik. Input:', inputText, 'Result:', resultToDisplay.status);

    Swal.close();
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
    setDetectionResult(null);
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

        const headers = lines[0].split(',').map((h) => h.trim());
        const rawRows = lines.slice(1);
        const parsedRows = rawRows.map((line) => {
          const values = line.split(',').map((v) => v.trim());
          let rowObject = {};
          headers.forEach((header, i) => {
            rowObject[header] = values[i] || '';
          });
          return rowObject;
        });

        await new Promise((resolve) => setTimeout(resolve, 2500));

        const isHoaxCsv = Math.random() < 0.5;
        const csvResultDummy = isHoaxCsv ? dummyResults[2] : dummyResults[3];

        setDetectionResult({
          ...csvResultDummy,
          fileName: file.name,
          totalRows: parsedRows.length,
          totalColumns: headers.length,
          previewRows: parsedRows.slice(0, 3),
          previewHeaders: headers.slice(0, Math.min(headers.length, 3)),
        });
        console.log('CSV uploaded and processed. Result:', csvResultDummy.status);
        Swal.close();
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

        const headers = jsonRows[0];
        const parsedRows = jsonRows.slice(1).map((row) => {
          let rowObject = {};
          headers.forEach((header, i) => {
            rowObject[header] = row[i] || '';
          });
          return rowObject;
        });

        await new Promise((resolve) => setTimeout(resolve, 2500));

        const isHoaxExcel = Math.random() < 0.5;
        const excelResultDummy = isHoaxExcel ? dummyResults[4] : dummyResults[5];

        Swal.fire({
          icon: 'success',
          title: 'Proses File Selesai!',
          text: `File '${file.name}' berhasil dianalisis.`,
          showConfirmButton: false,
          timer: 1500,
        });

        await new Promise((resolve) => setTimeout(resolve, 1500));
        Swal.close();

        setDetectionResult({
          ...excelResultDummy,
          fileName: file.name,
          totalRows: parsedRows.length,
          totalColumns: headers.length,
          previewRows: parsedRows.slice(0, 3),
          previewHeaders: headers.slice(0, Math.min(headers.length, 3)),
        });
        console.log('Excel uploaded and processed. Result:', excelResultDummy.status);
        Swal.close();
      };

      reader.onerror = () => {
        Swal.close();
        alert('Gagal membaca file Excel.');
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Tipe file tidak didukung. Mohon unggah file CSV atau Excel.');
      setDetectionResult(null);
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

        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto flex flex-col items-center justify-center text-center min-h-[400px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hasil Deteksi</h2>

          {detectionResult ? (
            <div className="w-full flex flex-col items-center">
              {detectionResult.type === 'video' && detectionResult.videoId ? (
                <div className="relative w-full max-w-lg mb-6" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/PI0kh-ScV6A?si=upgeNLbIzEZytaIW${detectionResult.videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : detectionResult.type === 'tabular' ? (
                <div className="w-full max-w-lg mb-6 text-left">
                  <h3 className="text-xl font-semibold mb-3">
                    Overview File {detectionResult.fileType.toLowerCase()}: {detectionResult.fileName}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Total Baris: {detectionResult.totalRows}, Total Kolom: {detectionResult.totalColumns}
                  </p>

                  {detectionResult.previewRows && detectionResult.previewRows.length > 0 && (
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {detectionResult.previewHeaders.map((header) => (
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
                          {detectionResult.previewRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {detectionResult.previewHeaders.map((header) => (
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
                  <p className="text-sm text-gray-500 mt-2">
                    Menampilkan {detectionResult.previewRows.length} dari {detectionResult.totalRows} baris.
                  </p>
                </div>
              ) : null}

              <div className="w-full text-left space-y-3 mb-6">
                <div className="grid grid-cols-3 gap-x-4">
                  <p className="col-span-1 text-gray-700 font-bold">{detectionResult.url ? 'URL' : 'File'}</p>
                  <p className="col-span-2 text-gray-900">
                    :
                    {detectionResult.url ? (
                      <a
                        href={detectionResult.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {detectionResult.url}
                      </a>
                    ) : (
                      detectionResult.fileName
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                  <p className="col-span-1 text-gray-700 font-bold">Kategori</p>
                  <p className="col-span-2 text-gray-900">: {detectionResult.kategori}</p>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                  <p className="col-span-1 text-gray-700 font-bold">Keyakinan</p>
                  <p className="col-span-2 text-gray-900">: {detectionResult.keyakinan}%</p>
                </div>
                <div className="grid grid-cols-3 gap-x-4 items-center">
                  <p className="col-span-1 text-gray-700 font-bold">Status</p>
                  <div className="col-span-2 flex items-center gap-2">
                    <p className="text-gray-900">:</p>
                    <span
                      className={`font-bold text-lg ${
                        detectionResult.status === 'Hoax' ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {detectionResult.status}
                    </span>
                  </div>
                </div>
              </div>
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