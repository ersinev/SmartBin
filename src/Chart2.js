import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const PieChartComponent = ({ data, capacity }) => {
  // Define colors based on capacity
  const colors = ['#00ff00', '#ff8080', '#ff0000'];

  // Calculate percentages for different sections
  const greenPercent = (capacity * 0.6) / 100;
  const lightRedPercent = (capacity * 0.2) / 100;

  // Calculate the fill percentage based on the data value
  const fillPercentage = (parseFloat(data.value) / capacity) * 100;

  // Determine the color based on fill percentage
  let colorIndex = 0;
  if (fillPercentage > 80) {
    colorIndex = 2;
  } else if (fillPercentage > 60) {
    colorIndex = 1;
  }

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={[data]}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        startAngle={180}
        endAngle={0}
        fill={colors[colorIndex]}
        dataKey="value"
        paddingAngle={0}
      >
        <Cell key={`cell-${colorIndex}`} fill={colors[colorIndex]} />
      </Pie>
    </PieChart>
  );
};

export default PieChartComponent;
