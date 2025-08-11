import React, { useState } from 'react';
import Navbar from '../assets/components/Navbar';
import { dummyHoaxData } from '../data/hoaxData';

export default function VerificationPage() {
  const [itemsToVerify, setItemsToVerify] = useState(() => {
    return dummyHoaxData.map(item => ({ ...item }));
  });

  const [selectedItemForVerification, setSelectedItemForVerification] = useState(null);
  const [formStatus, setFormStatus] = useState('');
  const [ulasanKoreksi, setUlasanKoreksi] = useState('');

  const handleVerifyClick = (item) => {
    setSelectedItemForVerification(item);
    setFormStatus(item.status);
    setUlasanKoreksi('');
  };

  const handleSubmitVerification = (e) => {
    e.preventDefault();
    if (!formStatus) {
      alert('Mohon pilih status (Aman/Hoax).');
      return;
    }

    console.log('--- Form Verifikasi Disubmit ---');
    console.log('Item ID:', selectedItemForVerification.id);
    console.log('URL/File:', selectedItemForVerification.URL || selectedItemForVerification.fileName);
    console.log('Status Baru:', formStatus);
    console.log('Ulasan Koreksi:', ulasanKoreksi);
    console.log('--------------------------------');

    alert(`Verifikasi untuk item ID ${selectedItemForVerification.id} disubmit dengan status: ${formStatus}`);

    setItemsToVerify(prevItems =>
      prevItems.map(item =>
        item.id === selectedItemForVerification.id
          ? { ...item, status: formStatus, ulasan: ulasanKoreksi }
          : item
      )
    );

    setSelectedItemForVerification(null);
    setFormStatus('');
    setUlasanKoreksi('');
  };

  const handleCancelForm = () => {
    setSelectedItemForVerification(null);
    setFormStatus('');
    setUlasanKoreksi('');
  };

  // --- FILTER DATA UNTUK DUA KOLOM ---
  const videoItems = itemsToVerify.filter(item => item.type === 'video' && item.videoId);
  const nonVideoItems = itemsToVerify.filter(item => !(item.type === 'video' && item.videoId));

  return (
    <div>
      <Navbar />
      <div className="pl-72 pt-14 pr-16 pb-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          VERIFIKASI DETEKSI HOAX
          {selectedItemForVerification && (
            <span className="font-normal text-gray-500"> - Form Verifikasi</span>
          )}
        </h1>

        {selectedItemForVerification ? (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Form Verifikasi</h2>

            <div className="w-full text-left space-y-3 mb-6">
              <div className="grid grid-cols-3 gap-x-4">
                <p className="col-span-1 text-gray-700 font-bold">Judul</p>
                <p className="col-span-2 text-gray-900">: {selectedItemForVerification.judul}</p>
              </div>
              <div className="grid grid-cols-3 gap-x-4">
                <p className="col-span-1 text-gray-700 font-bold">URL</p>
                <p className="col-span-2 text-gray-900">: {selectedItemForVerification.url ? (
                  <a href={selectedItemForVerification.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {selectedItemForVerification.url}
                  </a>
                ) : selectedItemForVerification.fileName}</p>
              </div>
              <div className="grid grid-cols-3 gap-x-4">
                <p className="col-span-1 text-gray-700 font-bold">Kategori</p>
                <p className="col-span-2 text-gray-900">: {selectedItemForVerification.kategori}</p>
              </div>
              <div className="grid grid-cols-3 gap-x-4">
                <p className="col-span-1 text-gray-700 font-bold">Keyakinan</p>
                <p className="col-span-2 text-gray-900">: {selectedItemForVerification.keyakinan}%</p>
              </div>
            </div>

            <div className="mb-6 text-left">
              <label className="block text-gray-700 font-bold mb-2">Status:</label>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="formStatus"
                    value="Aman"
                    checked={formStatus === 'Aman'}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="form-radio text-green-600 h-5 w-5"
                  />
                  <span className="ml-2 text-gray-900">Aman</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="formStatus"
                    value="Hoax"
                    checked={formStatus === 'Hoax'}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="form-radio text-red-600 h-5 w-5"
                  />
                  <span className="ml-2 text-gray-900">Hoax</span>
                </label>
              </div>
            </div>

            <div className="mb-6 text-left">
              <label htmlFor="ulasan" className="block text-gray-700 font-bold mb-2">Ulasan Koreksi:</label>
              <textarea
                id="ulasan"
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                value={ulasanKoreksi}
                onChange={(e) => setUlasanKoreksi(e.target.value)}
                placeholder="Tulis ulasan koreksi di sini..."
              ></textarea>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmitVerification}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
              >
                Submit
              </button>
              <button
                onClick={handleCancelForm}
                className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500"
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          // --- BAGIAN TATA LETAK DUA KOLOM ---
          <div className="flex flex-col lg:flex-row gap-6 items-start"> {/* items-start untuk menyelaraskan bagian atas kolom */}

            {/* Kolom Kiri: Item Video */}
            <div className="flex-1 w-full lg:w-1/2"> {/* flex-1 agar mengambil lebar yang sama, w-full untuk responsivitas */}
              <div className="grid grid-cols-1 gap-6">
                {videoItems.length > 0 ? (
                  videoItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                      {/* Konten Video (selalu ada di sini) */}
                      <div className="w-full mb-4">
                        <div className="relative w-full h-0 pb-[56.25%] rounded-md overflow-hidden shadow">
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
                      </div>

                      {/* Detail Item (flex-grow untuk mengisi ruang) */}
                      <div className="w-full text-left space-y-2 mb-4 flex-grow">
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">URL</p>
                          <p className="col-span-1 text-gray-900">: {item.url ? (
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>
                          ) : item.fileName || '-'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">Kategori</p>
                          <p className="col-span-1 text-gray-900">: {item.kategori}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">Keyakinan</p>
                          <p className="col-span-1 text-gray-900">: {item.keyakinan}%</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">Status</p>
                          <p className={`col-span-1 font-bold ${item.status === 'Hoax' ? 'text-red-600' : 'text-green-600'}`}>: {item.status}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">Tanggal</p>
                          <p className="col-span-1 text-gray-900">: {item.tanggal}</p>
                        </div>
                      </div>

                      {/* Tombol Verifikasi (mt-auto untuk menempel ke bawah) */}
                      <button
                        onClick={() => handleVerifyClick(item)}
                        className="w-full mt-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                      >
                        Verifikasi
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">Tidak ada item video yang perlu diverifikasi.</p>
                )}
              </div>
            </div>

            {/* Kolom Kanan: Item Non-Video */}
            <div className="flex-1 w-full lg:w-1/2">
              <div className="grid grid-cols-1 gap-6">
                {nonVideoItems.length > 0 ? (
                  nonVideoItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                      {/* TIDAK ADA BAGIAN VIDEO UNTUK ITEM NON-VIDEO */}

                      {/* Detail Item (flex-grow untuk mengisi ruang) */}
                      <div className="w-full text-left space-y-2 mb-4 flex-grow">
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">URL</p>
                          <p className="col-span-1 text-gray-900">: {item.url ? (
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>
                          ) : item.fileName || '-'}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">Kategori</p>
                          <p className="col-span-1 text-gray-900">: {item.kategori}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">Keyakinan</p>
                          <p className="col-span-1 text-gray-900">: {item.keyakinan}%</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">Status</p>
                          <p className={`col-span-1 font-bold ${item.status === 'Hoax' ? 'text-red-600' : 'text-green-600'}`}>: {item.status}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                          <p className="col-span-1 text-gray-700 font-bold">Tanggal</p>
                          <p className="col-span-1 text-gray-900">: {item.tanggal}</p>
                        </div>
                      </div>

                      {/* Tombol Verifikasi (mt-auto untuk menempel ke bawah) */}
                      <button
                        onClick={() => handleVerifyClick(item)}
                        className="w-full mt-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                      >
                        Verifikasi
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">Tidak ada item non-video yang perlu diverifikasi.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}