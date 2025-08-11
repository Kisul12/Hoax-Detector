import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import ikon mata

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State baru untuk melihat/menyembunyikan password
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Email:', email);
        console.log('Password:', password);

        if (email === 'admin@gmail.com' && password === 'admin123') {
            Swal.fire({
                icon: 'success',
                title: 'Login Berhasil!',
                text: 'Anda akan segera diarahkan ke halaman utama.',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate('/home');
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal!',
                text: 'Email atau Kata Sandi salah. Silakan coba lagi.',
                confirmButtonText: 'Oke'
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Membalik nilai showPassword
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300">
                <div className="text-center mb-8">
                    {/* Pastikan path logo ini benar dari root public Anda */}
                    <img src="/unram.png" alt="Logo Universitas Mataram" className="mx-auto h-35 mb-4 animate-fade-in" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-slide-down">Selamat Datang Kembali!</h2>
                    <p className="text-gray-600 text-lg animate-fade-in-delay">Sistem Pendeteksi Hoax</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
                        <input
                            type="text"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Masukkan Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {/* --- BAGIAN INPUT PASSWORD DENGAN TOGGLE --- */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
                        <div className="relative"> 
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 pr-10" 
                                placeholder="Masukkan Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button" 
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 cursor-pointer"
                                aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />} 
                            </button>
                        </div>
                    </div>
                    {/* --- AKHIR BAGIAN INPUT PASSWORD --- */}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-md transform hover:scale-100"
                    >
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    );
}