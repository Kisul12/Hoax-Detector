import { ResponsivePie } from '@nivo/pie';

const SimplePieChart = ({ data, title }) => (
  <div className="bg-white rounded-lg shadow-md p-6 h-[400px]"> 
    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{title}</h3>
    {data && data.length > 0 ? (
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 120, bottom: 80, left: 80 }}
        innerRadius={0.5} 
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        
        // arcLabelsComponent={({ datum, style }) => (
        //   <text
        //     x={style.x}
        //     y={style.y}
        //     fill={style.fill}
        //     textAnchor={style.textAnchor}
        //     dominantBaseline={style.dominantBaseline}
        //     style={{
        //       pointerEvents: 'none',
        //       fontSize: '11px',
        //       fontWeight: 'bold',
        //     }}
        //   >
        //     {`${datum.percentage !== undefined ? datum.percentage : '0'}%`}
        //   </text>
        // )}

        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemsSpacing: 0,
            symbolSize: 18,
            symbolShape: 'circle',
            itemDirection: 'left-to-right',
            itemTextColor: '#777',
            itemRender: ({ datum }) => (
              <text style={{ fontSize: '12px' }}>
                <tspan>{datum.label}</tspan>
                <tspan x="0" dy="1.1em" fill="#333" fontWeight="bold">{`${datum.percentage !== undefined ? datum.percentage : '0'}%`}</tspan>
              </text>
            ),
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
    ) : (
      <div className="flex items-center justify-center h-full text-gray-500">
        Tidak ada data untuk chart ini.
      </div>
    )}
  </div>
);

export default SimplePieChart;