import { Link } from 'react-router-dom';

export default function LatestDetailsTable({ latestDetails }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Riwayat Deteksi Terakhir</h2>
      
      {latestDetails.length > 0 ? (
        <div className="overflow-x-auto"> {/* Untuk scroll horizontal jika tabel terlalu lebar */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sumber</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {latestDetails.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}.</td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 max-w-xs break-words">{item.judul}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Tampilkan Link jika ada URL, atau Nama File jika jenisnya tabular */}
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a>
                    ) : (
                      item.fileName || '-' // Tampilkan nama file atau '-' jika tidak ada
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.kategori}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggal}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                    item.status === 'Hoax' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {item.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {/* Tombol Lihat Detail */}
                    <Link
                      to={`/detail/${item.id}`}
                      className="inline-flex px-3 py-1 text-xs font-medium text-blue-600 hover:underline"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Tidak ada detail terbaru.</p>
      )}
    </div>
  );
};
