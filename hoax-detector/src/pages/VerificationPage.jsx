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

  return (
    <div>
      <Navbar />
      <div className="pl-72 pt-14 pr-16 pb-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Verifikasi Deteksi Hoax
          {selectedItemForVerification && <span className="font-normal text-gray-500"> &gt; Form Verifikasi</span>}
        </h1>

        {selectedItemForVerification ? (
          // Tampilan Form Verifikasi
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Form Verifikasi</h2>

            {/* Detail Item */}
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

            {/* Input Status */}
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

            {/* Input Ulasan */}
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

            {/* Tombol Aksi */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmitVerification}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300"
              >
                Submit
              </button>
              <button
                onClick={handleCancelForm}
                className="px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75 transition duration-300"
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          // Tampilan Daftar Item
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {itemsToVerify.length > 0 ? (
              itemsToVerify.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="w-full text-left space-y-2 mb-4">
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
                  <button
                    onClick={() => handleVerifyClick(item)}
                    className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300"
                  >
                    Verifikasi
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">Tidak ada item yang perlu diverifikasi saat ini.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}