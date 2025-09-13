import React, { useEffect, useState } from 'react';
import AnalyticsCard from './AnalyticsCard';
import { Line } from 'react-chartjs-2';
import { getEndUserAnalytics } from '../services/api';
import "./Analytics.css"
function EndUserAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getEndUserAnalytics().then(setAnalytics).catch(console.error);
  }, []);

  if (!analytics) return <p>Loading...</p>;

  const usageData = {
    labels: analytics.usageHistory?.months || [],
    datasets: [
      {
        label: 'Usage (GB)',
        data: analytics.usageHistory?.usedGB || [],
        borderColor: '#4caf50',
        fill: false,
      },
      {
        label: 'Quota (GB)',
        data: analytics.usageHistory?.quotaGB || [],
        borderColor: '#ff9800',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  return (
    <div className="analytics-container">
      <h1>My Dashboard</h1>
      <div className="analytics-cards">
        <AnalyticsCard title="Plan" value={analytics.subscription.plan} />
        <AnalyticsCard title="Status" value={analytics.subscription.status} />
        <AnalyticsCard title="Auto-Renew" value={analytics.subscription.autoRenew ? 'Yes' : 'No'} />
        <AnalyticsCard title="Data Used" value={`${analytics.usage.usedGB} / ${analytics.usage.quotaGB} GB`} />
      </div>

      <div className="chart-section">
        <h2>Usage History</h2>
        <Line data={usageData} />
      </div>
    </div>
  );
}

export default EndUserAnalytics;
