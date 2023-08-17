import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const Chart = ({ data, capacity }) => {
  const reversedData = [...data].reverse();

  // Get the required data point value for the reference line
  const referenceValue =
    reversedData.length > 0 ? reversedData[reversedData.length - 1].value : 0;

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
      <LineChart
        data={reversedData}
        margin={{
          top: 10,
          right: 10,
          left: -25,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          horizontalFill={["#f5f5f5", "#fff"]}
          fillOpacity={1}
        />
        <XAxis dataKey="created_at" />
        <YAxis
          ticks={yAxisTicks}
          domain={[0, capacity]}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />

        {/* Adding the reference line at the required data point's value */}
        <ReferenceLine
          y={referenceValue}
          stroke="red"
          strokeDasharray="3 3"
          strokeWidth={2}
          label={{ value: `${Math.floor(referenceValue)}`, fill: 'black', fontSize: 20 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
