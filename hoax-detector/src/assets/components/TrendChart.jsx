// src/assets/components/TrendChart.jsx
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const TrendChart = ({ data }) => (
    <ResponsiveBar
        data={data}
        margin={{ top: 60, right: 120, bottom: 70, left: 80 }}
        keys={['Terbukti', 'Tidak Terbukti']}
        indexBy="month"
        groupMode="grouped" // <-- Ini memastikan bar tidak saling tumpang-tindih
        valueScale={{ type: 'linear', min: 0, max: 'auto' }}
        valueFormat=">-.0f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Bulan',
            legendOffset: 65,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Jumlah Laporan',
            legendOffset: -70,
            legendPosition: 'middle',
            format: value => Math.round(value) === value ? value : ''
        }}
        enableGridX={false}
        enableGridY={true}
        colors={['#10B981', '#EF4444']}
        borderRadius={2}
        padding={0.3}
        innerPadding={4} // Tambahkan spacing agar bar bersebelahan tapi tidak terlalu rapat
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 60,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 10,
                symbolSize: 12,
                symbolShape: 'square',
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