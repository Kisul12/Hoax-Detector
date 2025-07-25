// src/data/chartDataProcessor.js
import { dummyHoaxData } from './hoaxData';

// --- Fungsi untuk Line Chart (Tren Bulanan) ---
export const processHoaxDataForChart = () => {
    console.log("--- Processing Line Chart Data ---");
    console.log("dummyHoaxData length:", dummyHoaxData.length);
    console.log("Contoh item pertama:", dummyHoaxData[0]); // Lihat struktur item pertama

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    
    const monthlyCounts = {};
    monthNames.forEach(month => {
        monthlyCounts[month] = { Terbukti: 0, TidakTerbukti: 0 };
    });

    dummyHoaxData.forEach((item, index) => {
        if (!item || typeof item.status !== 'string' || !item.tanggal) {
            console.warn(`[Line Chart Processor] Item ke-${index} tidak valid atau status/tanggal hilang:`, item);
            return;
        }
        const date = new Date(item.tanggal);
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];

        // Debugging status dalam loop
        // console.log(`Item status: '${item.status}', Lowercase: '${item.status.toLowerCase()}'`);

        if (item.status.toLowerCase() === 'hoax') {
            monthlyCounts[monthName].Terbukti++;
        } else if (item.status.toLowerCase() === 'aman') {
            monthlyCounts[monthName].TidakTerbukti++;
        }
    });
    console.log("Monthly Counts (Line Chart):", monthlyCounts); // Lihat hasil hitungan bulanan

    const tidakTerbuktiData = {
        id: 'Tidak Terbukti',
        data: monthNames.map(month => ({
            x: month,
            y: monthlyCounts[month].TidakTerbukti
        }))
    };
    const terbuktiData = {
        id: 'Terbukti',
        data: monthNames.map(month => ({
            x: month,
            y: monthlyCounts[month].Terbukti
        }))
    };

    return [tidakTerbuktiData, terbuktiData];
};


// --- Fungsi untuk Pie Chart (Klasifikasi Hasil Deteksi: Terbukti vs Tidak Terbukti) ---
export const processStatusDataForPieChart = () => {
    console.log("--- Processing Status Pie Chart Data ---");
    console.log("dummyHoaxData length:", dummyHoaxData.length);
    let hoaxCount = 0;
    let amanCount = 0;

    dummyHoaxData.forEach(item => {
        if (!item || typeof item.status !== 'string') {
            console.warn(`[Status Pie Processor] Item tidak valid atau status hilang:`, item);
            return;
        }
        // Debugging status dalam loop
        // console.log(`Status for pie: '${item.status}', Lowercase: '${item.status.toLowerCase()}'`);

        if (item.status.toLowerCase() === 'hoax') {
            hoaxCount++;
        } else if (item.status.toLowerCase() === 'aman') {
            amanCount++;
        }
    });
    console.log("Final hoaxCount (Status Pie):", hoaxCount);
    console.log("Final amanCount (Status Pie):", amanCount);

    const total = hoaxCount + amanCount;

    return [
        {
            id: 'Terbukti',
            label: 'Terbukti',
            value: hoaxCount,
            color: '#FC8181', // Merah sesuai desain
            percentage: total > 0 ? (hoaxCount / total * 100).toFixed(0) : "0",
        },
        {
            id: 'Tidak Terbukti',
            label: 'Tidak Terbukti',
            value: amanCount,
            color: '#4FD1C5', // Hijau tosca sesuai desain
            percentage: total > 0 ? (amanCount / total * 100).toFixed(0) : "0",
        },
    ];
};


// --- Fungsi untuk Pie Chart (Klasifikasi Berdasarkan Kategori) ---
export const processCategoryDataForPieChart = () => {
    console.log("--- Processing Category Pie Chart Data ---");
    console.log("dummyHoaxData length:", dummyHoaxData.length);
    const categoryCounts = {};
    const definedCategories = ['Politik', 'Kesehatan', 'Olahraga', 'Pendidikan']; 

    definedCategories.forEach(cat => categoryCounts[cat] = 0);

    dummyHoaxData.forEach(item => {
        if (!item || typeof item.kategori !== 'string') {
            console.warn(`[Category Pie Processor] Item tidak valid atau kategori hilang:`, item);
            return;
        }
        const itemCategory = item.kategori;
        // Debugging kategori dalam loop
        // console.log(`Category for pie: '${itemCategory}', Lowercase: '${itemCategory.toLowerCase()}'`);

        const matchedCategory = definedCategories.find(
            definedCat => definedCat.toLowerCase() === itemCategory.toLowerCase()
        );

        if (matchedCategory) {
            categoryCounts[matchedCategory]++;
        } else {
            categoryCounts['Lain-lain'] = (categoryCounts['Lain-lain'] || 0) + 1;
        }
    });
    console.log("Final categoryCounts (Category Pie):", categoryCounts);

    const total = dummyHoaxData.length;

    const categoryColors = {
        'Politik': '#A78BFA',
        'Kesehatan': '#FC8181',
        'Olahraga': '#60A5FA',
        'Pendidikan': '#F6AD55',
        'Lain-lain': '#CCCCCC'
    };

    return Object.keys(categoryCounts).map(category => ({
        id: category,
        label: category,
        value: categoryCounts[category],
        color: categoryColors[category] || '#CCCCCC',
        percentage: total > 0 ? (categoryCounts[category] / total * 100).toFixed(0) : "0",
    })).filter(item => item.value > 0);
};