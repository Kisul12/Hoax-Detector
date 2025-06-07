import Navbar from "../components/Navbar";

export default function SettingPage() {
  return (
    <div>
        <Navbar />
        <div className="pl-72 pt-14 pr-16 pb-8">
            <h1 className="text-2xl font-bold mb-4">Halaman Pengaturan</h1>
            <p>Ini adalah halaman untuk melakukan pengaturan website.</p>
            {/* Tambahkan komponen atau konten lain yang diperlukan di sini */}
        </div>
    </div>
  );
}