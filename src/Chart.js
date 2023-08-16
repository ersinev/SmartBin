import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data, capacity }) => {
  const reversedData = [...data].reverse();
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
        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontalFill={['#f5f5f5', '#fff']} fillOpacity={1} />
        <XAxis dataKey="created_at" />
        <YAxis
          ticks={[0, capacity / 2,capacity / 3,capacity / 4, capacity]} // Customize the ticks here
          domain={[0, capacity]} // Set the domain to match your data
          tick={{ fontSize: 12 }} // Optional: adjust the tick font size
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
