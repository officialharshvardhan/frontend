import React from 'react';
import { Bar } from 'react-chartjs-2';

const ActiveCancelledChart = ({ data }) => {
  const chartData = {
    labels: data?.months || [],
    datasets: [
      { label: 'Active', data: data?.active || [], backgroundColor: '#4caf50' },
      { label: 'Cancelled', data: data?.cancelled || [], backgroundColor: '#f44336' },
    ],
  };

  return <Bar data={chartData} />;
};

export default ActiveCancelledChart;