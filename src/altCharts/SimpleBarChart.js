import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function SimpleBarChart({ chartData }) {
  const reversedData = [...chartData].reverse();  // Create a reversed copy of the data

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={reversedData}  // Use reversed data
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SimpleBarChart;
