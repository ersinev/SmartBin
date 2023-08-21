import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

function SimpleBarChart({ chartData, capacity }) {
  const reversedData = [...chartData].reverse();

  // Get the required data point value for the reference line
  const referenceValue =
    reversedData.length > 0 ? reversedData[reversedData.length - 1].uv : 0;

  // Generate ticks for YAxis
  const yAxisTicks = [
    0,
    capacity / 5,
    (2 * capacity)/ 5,
    (3 * capacity) / 5,
    (4 * capacity) / 5,
    capacity,
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={reversedData}
        margin={{
          top: 10,
          right: 10,
          left: 10,  // Adjusted this margin to match the LineChart's style
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          horizontalFill={["#f5f5f5", "#fff"]}
          fillOpacity={1}
        />
        <XAxis dataKey="date" />
        <YAxis
          ticks={yAxisTicks}
          domain={[0, capacity]}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="red" />

        {/* Adding the reference line at the required data point's value */}
        <ReferenceLine
          y={referenceValue}
          stroke="blue"
          strokeDasharray="3 3"
          strokeWidth={2}
          label={{ value: `${Math.floor(referenceValue)}`, fill: 'black', fontSize: 20 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SimpleBarChart;
