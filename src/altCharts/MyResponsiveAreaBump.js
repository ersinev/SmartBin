import React from 'react';
import { ResponsiveAreaBump } from '@nivo/bump';

function MyResponsiveAreaBump({ chartData }) {
  const reversedData = [...chartData].reverse();
  
  const adjustedData = [{
    id: "sampleSeries", // assuming a singular series for demonstration
    data: reversedData.map(d => ({
      x: d.date,
      y: d.uv
    }))
  }];

  return (
    <ResponsiveAreaBump
        data={adjustedData}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={8}
        colors={{ scheme: 'nivo' }}
        blendMode="multiply"
        startLabel="x"
        endLabel="x"
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -36
        }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
        }}
    />
  );
}

export default MyResponsiveAreaBump;
