import React from 'react';
import { Bar } from 'react-chartjs-2';

const PlanAdoptionChart = ({ data }) => {
  const chartData = {
    labels: data?.plans || [],
    datasets: [
      { label: 'Subscribers', data: data?.subscribers || [], backgroundColor: '#2196f3' },
    ],
  };

  return <Bar data={chartData} />;
};

export default PlanAdoptionChart;
