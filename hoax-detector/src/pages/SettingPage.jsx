import React, { useState, useEffect } from 'react';
import Navbar from '../assets/components/Navbar';
import Swal from 'sweetalert2';

export default function SettingPage() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'id';
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    Swal.fire({ icon: 'success', title: 'Tema Diperbarui!', text: `Tema berhasil diubah ke ${newTheme === 'light' ? 'Terang' : 'Gelap'}.`, showConfirmButton: false, timer: 1500 });
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    Swal.fire({ icon: 'success', title: 'Bahasa Diperbarui!', text: `Bahasa berhasil diubah ke ${newLanguage === 'id' ? 'Indonesia' : 'English'}.`, showConfirmButton: false, timer: 1500 });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      <div className="pl-72 pt-14 pr-16 pb-8">
        <h1 className="text-4xl font-bold mb-8 text-center">PENGATURAN</h1>

        {/* Theme */}
        <Section title="Ubah Tema" theme={theme}>
          <ButtonToggle current={theme} options={{ light: 'Terang', dark: 'Gelap' }} onToggle={handleThemeChange} />
        </Section>

        {/* Language */}
        <Section title="Ubah Bahasa" theme={theme}>
          <ButtonToggle current={language} options={{ id: 'Bahasa Indonesia', en: 'English' }} onToggle={handleLanguageChange} />
        </Section>

        {/* System Configuration */}
        <Section title="Konfigurasi Sistem" theme={theme}>
          <form onSubmit={(e) => { e.preventDefault(); Swal.fire({ icon: 'success', title: 'Konfigurasi Disimpan!', text: 'Pengaturan sistem telah diperbarui.', showConfirmButton: false, timer: 1500 }); }}>
            <label htmlFor="hoaxThreshold" className="block text-sm font-medium text-gray-700">Ambang Batas Keyakinan Hoax (%)</label>
            <input type="number" id="hoaxThreshold" defaultValue="80" className={`mt-1 block w-full p-2 border rounded-md sm:text-sm ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border-gray-300'}`} />
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Simpan Konfigurasi</button>
          </form>
        </Section>

        {/* Security */}
        <Section title="Keamanan & Autentikasi" theme={theme}>
          <ul className="space-y-4">
            <li><button onClick={() => Swal.fire({ icon: 'warning', title: 'Ubah Kata Sandi', text: 'Fitur ini akan segera tersedia.' })} className="text-blue-600 hover:underline">Ubah Kata Sandi</button></li>
            <li><button onClick={() => Swal.fire({ icon: 'info', title: 'Kelola Sesi', text: 'Fitur ini akan segera tersedia.' })} className="text-blue-600 hover:underline">Kelola Sesi Login</button></li>
          </ul>
        </Section>

        {/* Backup */}
        <Section title="Backup & Pemulihan" theme={theme}>
          <div className="space-y-4 space-x-3.5">
            <button onClick={() => Swal.fire({ icon: 'success', title: 'Backup Dibuat!', text: 'Data telah dicadangkan.' })} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Buat Cadangan Sekarang</button>
            <button onClick={() => Swal.fire({ icon: 'info', text: 'Fitur ini akan segera tersedia.' })} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">Pulihkan Data</button>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children, theme }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md mb-8 ${theme === 'dark' ? 'bg-gray-700 text-white' : ''}`}>
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">{title}</h2>
      {children}
    </div>
  );
}

function ButtonToggle({ current, options, onToggle }) {
  return (
    <div className="flex space-x-4">
      {Object.entries(options).map(([value, label]) => (
        <button
          key={value}
          onClick={() => onToggle(value)}
          className={`px-4 py-2 rounded-md ${current === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition duration-300`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}