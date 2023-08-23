import React from "react";
import { ResponsivePie } from "@nivo/pie";

function SimplePieChart({ chartData }) {
  // Use a map to store the first data for each date
  const firstDataForDate = new Map();

  chartData.forEach(item => {
    if (!firstDataForDate.has(item.date)) { // Only set if the date doesn't exist yet
      firstDataForDate.set(item.date, item);
    }
  });

  // Convert map values to an array
  const dataArray = Array.from(firstDataForDate.values());

  // Calculate the date 30 days ago from today
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Filter to only include the last 30 days' data
  const latest30DaysData = dataArray.filter(item => new Date(item.date) >= thirtyDaysAgo);

  // Convert the last 30 days data for the pie chart
  const pieData = latest30DaysData.map((item) => ({
    id: item.date,
    label: item.date,
    value: item.uv
  }));

  console.log(pieData);

  return (
    <div style={{ height: 300 }}>
      <ResponsivePie
        data={pieData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        enableRadialLabels={false}
        enableSliceLabels={true}
        sliceLabel="value"
        isInteractive={true}
        animate={false}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
      />
    </div>
  );
}

export default SimplePieChart;
