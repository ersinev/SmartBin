import React from 'react';
import { ResponsiveFunnel } from '@nivo/funnel';

function SimpleFunnelChart({ chartData }) {
  // Convert chartData to match the funnel chart format
  const funnelData = chartData.map(item => ({
    id: item.date,
    label: item.date,
    value: item.uv
  }));

  return (
    <div style={{ height: 300 }}>
      <ResponsiveFunnel
        data={funnelData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        valueFormat=">-.4s"
        colors={{ scheme: 'spectral' }}
        borderWidth={20}
        labelColor={{
          from: 'color',
          modifiers: [['darker', 3]]
        }}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentPartSizeExtension={10}
        currentBorderWidth={40}
        motionConfig="wobbly"
      />
    </div>
  );
}

export default SimpleFunnelChart;
