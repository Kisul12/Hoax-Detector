import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import HistoryPage from '../pages/HistoryPage';
import DetectionPage from '../pages/DetectionPage';
import VerificationPage from '../pages/VerificationPage';
import SettingPage from '../pages/SettingPage';
import DetailPage from '../pages/DetailPage';

 export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path='/riwayat' element={<HistoryPage />} />
      <Route path='/deteksi' element={<DetectionPage />} />
      <Route path='/verifikasi' element={<VerificationPage />} />
      <Route path='/pengaturan' element={<SettingPage />} />
      <Route path='/detail/:id' element={<DetailPage />} />
    </Routes>
  );
}