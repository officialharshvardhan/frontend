import React from 'react';
import { Line } from 'react-chartjs-2';

const RevenueTrendChart = ({ data }) => {
  const chartData = {
    labels: data?.months || [],
    datasets: [
      { label: 'Revenue ($)', data: data?.revenue || [], borderColor: '#ff9800', fill: false },
    ],
  };

  return <Line data={chartData} />;
};

export default RevenueTrendChart;
