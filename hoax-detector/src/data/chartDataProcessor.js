import { dummyHoaxData } from './hoaxData';

// --- Fungsi untuk Line Chart (Tren Bulanan) ---
export const processHoaxDataForChart = () => {
    console.log("--- Processing Line Chart Data ---");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    
    const monthlyCounts = {};
    monthNames.forEach(month => {
        monthlyCounts[month] = { Terbukti: 0, TidakTerbukti: 0 };
    });

    dummyHoaxData.forEach((item) => {
        if (!item || typeof item.status !== 'string' || !item.tanggal) return;
        const date = new Date(item.tanggal);
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];

        if (item.status.toLowerCase() === 'hoax') {
            monthlyCounts[monthName].Terbukti++;
        } else if (item.status.toLowerCase() === 'aman') {
            monthlyCounts[monthName].TidakTerbukti++;
        }
    });

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


// --- 🔥 Fungsi Tambahan untuk Bar Chart (format untuk ResponsiveBar) ---
export const processHoaxDataForBarChart = () => {
    console.log("--- Processing Bar Chart Data ---");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

    const monthlyCounts = {};
    monthNames.forEach(month => {
        monthlyCounts[month] = { month, Terbukti: 0, 'Tidak Terbukti': 0 };
    });

    dummyHoaxData.forEach((item) => {
        if (!item || typeof item.status !== 'string' || !item.tanggal) return;

        const date = new Date(item.tanggal);
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];

        if (item.status.toLowerCase() === 'hoax') {
            monthlyCounts[monthName]['Terbukti'] += 1;
        } else if (item.status.toLowerCase() === 'aman') {
            monthlyCounts[monthName]['Tidak Terbukti'] += 1;
        }
    });

    const result = Object.values(monthlyCounts);
    console.log("Monthly Counts (Bar Chart):", result);
    return result;
};


// --- Fungsi untuk Pie Chart (Terbukti vs Tidak Terbukti) ---
export const processStatusDataForPieChart = () => {
    let hoaxCount = 0;
    let amanCount = 0;

    dummyHoaxData.forEach(item => {
        if (!item || typeof item.status !== 'string') return;
        if (item.status.toLowerCase() === 'hoax') hoaxCount++;
        else if (item.status.toLowerCase() === 'aman') amanCount++;
    });

    const total = hoaxCount + amanCount;

    return [
        {
            id: 'Terbukti',
            label: 'Terbukti',
            value: hoaxCount,
            color: '#FC8181',
            percentage: total > 0 ? (hoaxCount / total * 100).toFixed(0) : "0",
        },
        {
            id: 'Tidak Terbukti',
            label: 'Tidak Terbukti',
            value: amanCount,
            color: '#4FD1C5',
            percentage: total > 0 ? (amanCount / total * 100).toFixed(0) : "0",
        },
    ];
};


// --- Fungsi untuk Pie Chart Berdasarkan Kategori ---
export const processCategoryDataForPieChart = () => {
    const categoryCounts = {};
    const definedCategories = ['Politik', 'Kesehatan', 'Olahraga', 'Pendidikan']; 
    definedCategories.forEach(cat => categoryCounts[cat] = 0);

    dummyHoaxData.forEach(item => {
        if (!item || typeof item.kategori !== 'string') return;

        const matchedCategory = definedCategories.find(
            cat => cat.toLowerCase() === item.kategori.toLowerCase()
        );

        if (matchedCategory) {
            categoryCounts[matchedCategory]++;
        } else {
            categoryCounts['Lain-lain'] = (categoryCounts['Lain-lain'] || 0) + 1;
        }
    });

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
