// src/assets/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    if (path === '/riwayat') {
      return location.pathname.startsWith('/riwayat') || location.pathname.startsWith('/detail');
    }
    if (path === '/verifikasi') {
      return location.pathname.startsWith('/verifikasi');
    }
    if (path === '/home') {
      return location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { path: '/home', label: 'Beranda', icon: (
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
    ) },
    { path: '/deteksi', label: 'Deteksi', icon: (
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
    ) },
    { path: '/verifikasi', label: 'Verifikasi', icon: (
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
    ) },
    { path: '/riwayat', label: 'Riwayat', icon: (
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    ) },
    { path: '/pengaturan', label: 'Pengaturan', icon: (
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2" />
    ) },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 fixed top-0 left-0 z-50"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {isOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" aria-hidden="true"></div>
      )}

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 shadow-xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-white flex flex-col">
          <div className="flex flex-col items-center justify-center mt-9">
            <Link to="/" className="flex flex-col items-center" onClick={() => setIsOpen(false)}>
              <img src="/unram.png" className="h-16 sm:h-20 mb-2" alt="hoax detector Logo" />
              <span className="text-xl font-semibold whitespace-nowrap dark:text-black">Hoax Detector</span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <ul className="space-y-5 font-medium">
              {menuItems.map(({ path, label, icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`flex items-center p-2 rounded-lg group ${isActive(path) ? 'bg-blue-500 text-white' : 'text-gray-900 hover:bg-blue-500'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className={`w-6 h-6 ${isActive(path) ? 'text-white' : 'text-gray-800 dark:text-black'} ${!isActive(path) && 'group-hover:text-white'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      {icon}
                    </svg>
                    <span className={`ms-3 whitespace-nowrap ${isActive(path) ? 'text-white' : 'text-gray-900'} ${!isActive(path) && 'group-hover:text-white'}`}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <Link
              to="/logout"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-red-500 group"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-black group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap group-hover:text-white">Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}