import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top:10,
          right: 10, // Adjusted to 0
          left: -25, // Adjusted to 0
          
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontalFill={['#f5f5f5', '#fff']} fillOpacity={1} />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
