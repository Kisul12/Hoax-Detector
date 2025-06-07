// src/assets/components/TrendChart.jsx
import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const TrendChart = ({ data }) => (
    <ResponsiveLine
        data={data}
        // Margin ini sudah disesuaikan agar tidak terpotong, bisa tetap digunakan
        margin={{ top: 60, right: 120, bottom: 70, left: 80 }} 

        xScale={{ type: 'point' }} // Karena X-axis adalah kategori (bulan)
        yScale={{
            type: 'linear',
            min: 0, // Mulai dari 0
            max: 'auto', // Max otomatis
            stacked: false, // Diubah kembali menjadi false
            reverse: false
        }}
        // --- PERBAIKAN: FORMAT Y-AXIS AGAR TIDAK ADA KOMA ---
        yFormat=">-.0f" // Ubah format Y-axis: .0f berarti float dengan 0 angka di belakang koma (bilangan bulat)
        // --- AKHIR PERBAIKAN Y-AXIS FORMAT ---

        // --- PERBAIKAN: BENTUK GARIS MENJADI LURUS ---
        curve="linear" // Ubah dari "natural" menjadi "linear" untuk garis lurus
        // --- AKHIR PERBAIKAN BENTUK GARIS ---

        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Bulan', // Label X-axis
            legendOffset: 65, // Jarak label dari axis
            legendPosition: 'middle',
            truncateTickAt: 0 // Pastikan label bulan tidak terpotong
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Jumlah Laporan', // Label Y-axis
            legendOffset: -70, // Jarak label dari axis
            legendPosition: 'middle',
            // --- PERBAIKAN: FORMAT TICK Y-AXIS AGAR TIDAK ADA KOMA ---
            format: value => Math.round(value) === value ? value : '' // Tampilkan hanya bilangan bulat
            // atau bisa juga format: ">-.0f" seperti yFormat
            // --- AKHIR PERBAIKAN Y-AXIS TICK FORMAT ---
        }}
        enableGridX={false} // Sembunyikan grid vertikal
        enableGridY={true} // Tampilkan grid horizontal
        // Warna disesuaikan jika Anda membalik urutan data di chartDataProcessor.js
        // Jika Anda ingin "Tidak Terbukti" hijau dan "Terbukti" merah,
        // dan di chartDataProcessor.js Anda mengembalikan [tidakTerbuktiData, terbuktiData]
        // maka colors={['#10B981', '#EF4444']} ini sudah benar
        colors={['#10B981', '#EF4444']} 
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableArea={true} // Diubah menjadi false untuk menghapus area di bawah garis
        areaBlendMode="multiply" // Hapus ini jika enableArea: false
        areaOpacity={0.6} // Hapus ini jika enableArea: false

        legends={[
            {
                anchor: 'bottom', // Posisi legenda di bawah
                direction: 'row', // Legenda horizontal
                justify: false,
                translateX: 0,
                translateY: 60, // Tingkatkan translateY untuk legenda agar tidak terlalu dekat
                itemWidth: 100, // Lebar item legenda
                itemHeight: 20, // Tinggi item legenda
                itemsSpacing: 10,
                symbolSize: 12,
                symbolShape: 'circle',
                itemDirection: 'left-to-right',
                itemTextColor: '#333',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
);

export default TrendChart;