import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom"; 

export default function HomePage() {
  return (
    <div className="pl-72 pt-14 pr-16">
        <Navbar />
        <div className="flex justify-between ">
          <h1 className="ml-4 text-3xl font-medium leading-relaxed">Halo, Selamat Datang di Aplikasi <br />Pendeteksi Hoax</h1>
          <div className="flex items-center justify-center">
            {/* Mengarah ke halaman deteksi */}
            <Link to="/deteksi">
              <Button classname="bg-blue-500 hover:bg-blue-700 " type="button">Deteksi</Button>
            </Link>
          </div>
        </div>
    </div>
  );
}