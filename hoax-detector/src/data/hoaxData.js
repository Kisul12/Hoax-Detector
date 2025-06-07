// Fungsi helper untuk menghasilkan UUID sederhana
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Fungsi helper untuk mendapatkan tanggal acak di bulan tertentu tahun 2024
function getRandomDateInMonth(monthIndex) {
  const day = Math.floor(Math.random() * 28) + 1; // Maks 28 hari untuk menyederhanakan
  const date = new Date(2024, monthIndex, day);
  return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
}

// Fungsi helper untuk memilih kategori acak
const categories = ['Politik', 'Kesehatan', 'Olahraga', 'Pendidikan'];
function getRandomCategory() {
  return categories[Math.floor(Math.random() * categories.length)];
}

// Fungsi helper untuk membuat entri data dummy
function createDummyEntry(monthIndex) {
  const id = generateUniqueId();
  const status = Math.random() < 0.5 ? 'Hoax' : 'Aman'; // 50% Hoax, 50% Aman
  const keyakinan = Math.floor(Math.random() * 50) + 50; // Antara 50-99%
  const tanggal = getRandomDateInMonth(monthIndex);
  const kategori = getRandomCategory();
  const isVideo = Math.random() < 0.3; // 30% kemungkinan video
  const isTabular = Math.random() < 0.2; // 20% kemungkinan tabular (jika bukan video/text)

  let entry = {
    id: id,
    judul: `Laporan ${kategori} ${id.substring(0, 5)}`,
    kategori: kategori,
    keyakinan: keyakinan,
    status: status,
    tanggal: tanggal,
  };

  if (isVideo) {
    entry.type = 'video';
    entry.url = `https://example.com/video/${id}`;
    entry.jenis = 'video';
    // Contoh ID video YouTube valid (jika Anda ingin mencoba embed di DetailPage)
    // entry.videoId = Math.random() < 0.5 ? 'RK7nRsUNCJs' : 'dQw4w9WgXcQ'; 
  } else if (isTabular) {
    entry.type = 'tabular';
    entry.fileType = Math.random() < 0.5 ? 'csv' : 'excel';
    entry.fileName = `data_${kategori.toLowerCase()}_${id.substring(0, 4)}.${entry.fileType}`;
    entry.jenis = entry.fileType; // 'csv' atau 'excel'
    // Tambahkan preview data jika Anda memerlukannya untuk DetailPage (seperti di DetectionPage)
    entry.previewHeaders = ['Kolom1', 'Kolom2'];
    entry.previewRows = [{ Kolom1: 'DataA', Kolom2: 'DataB' }];
    entry.totalRows = Math.floor(Math.random() * 100) + 20;
    entry.totalColumns = Math.floor(Math.random() * 5) + 3;
  } else {
    entry.type = 'text';
    entry.url = `https://example.com/berita/${id}`;
    entry.jenis = 'text';
  }

  // Tambahkan sedikit bias agar ada variasi dalam jumlah Hoax vs Aman per bulan
  // Misalnya, di bulan-bulan tertentu, 'Hoax' lebih banyak, di bulan lain 'Aman' lebih banyak
  if (monthIndex % 3 === 0 && Math.random() < 0.7) { // Jan, Apr, Jul, Okt lebih banyak Hoax
      entry.status = 'Hoax';
  } else if (monthIndex % 3 === 1 && Math.random() < 0.7) { // Feb, Mei, Agu, Nov lebih banyak Aman
      entry.status = 'Aman';
  }
  
  // Sesuaikan keyakinan jika status diset secara bias
  if (entry.status === 'Hoax' && entry.keyakinan < 70) entry.keyakinan = Math.floor(Math.random() * 30) + 70;
  if (entry.status === 'Aman' && entry.keyakinan > 70) entry.keyakinan = Math.floor(Math.random() * 30) + 50;


  // Pastikan URL selalu ada jika jenisnya 'text' atau 'video'
  if (entry.type !== 'tabular' && !entry.url) {
    entry.url = `https://example.com/fallback/${id}`;
  }


  return entry;
}

export const dummyHoaxData = [];
// Buat sekitar 100 entri data
for (let i = 0; i < 100; i++) {
  const monthIndex = Math.floor(Math.random() * 12); // Acak bulan dari 0-11
  dummyHoaxData.push(createDummyEntry(monthIndex));
}

// Opsional: Sortir berdasarkan tanggal agar lebih teratur untuk HistoryPage
dummyHoaxData.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

// Pastikan semua properti 'URL' menjadi 'url' untuk konsistensi
dummyHoaxData.forEach(item => {
    if (item.URL) { // Jika ada properti URL (huruf besar)
        item.url = item.URL; // Salin ke properti url (huruf kecil)
        delete item.URL; // Hapus properti URL (huruf besar)
    }
});

console.log(dummyHoaxData.length)