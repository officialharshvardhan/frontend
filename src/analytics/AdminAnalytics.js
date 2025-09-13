import React, { useEffect, useState } from 'react';
import AnalyticsCard from './AnalyticsCard';
import { Bar } from 'react-chartjs-2';
import "./Analytics.css"
import { getAdminAnalytics } from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    getAdminAnalytics().then(setAnalytics).catch(console.error);
  }, []);

  if (!analytics) return <p>Loading...</p>;

  const subscriptionTrendData = {
    labels: analytics.subscriptionTrends?.months || [],
    datasets: [
      { label: 'Active', data: analytics.subscriptionTrends?.active || [], backgroundColor: '#4caf50' },
      { label: 'Cancelled', data: analytics.subscriptionTrends?.cancelled || [], backgroundColor: '#f44336' },
      { label: 'Upgraded', data: analytics.subscriptionTrends?.upgraded || [], backgroundColor: '#2196f3' },
      { label: 'Downgraded', data: analytics.subscriptionTrends?.downgraded || [], backgroundColor: '#ff9800' },
    ],
  };

  const planPerformanceData = {
    labels: analytics.planPerformance?.plans || [],
    datasets: [
      {
        label: 'Subscribers',
        data: analytics.planPerformance?.subscribers || [],
        backgroundColor: '#2196f3',
        type: 'bar',
      },
      {
        label: 'Revenue ($)',
        data: analytics.planPerformance?.revenue || [],
        type: 'line',
        borderColor: '#ff9800',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="analytics-container">
      <h1>Admin Dashboard</h1>

      <div className="analytics-cards">
        <AnalyticsCard title="Active Users" value={analytics.userOverview.activeUsers} />
        <AnalyticsCard title="New Sign-Ups" value={analytics.userOverview.newSignUps?.slice(-1)[0]} />
      </div>

      <div className="chart-section">
        <h2>Subscription Trends</h2>
        <Bar key="subscriptionTrends" data={subscriptionTrendData} />
      </div>

      <div className="chart-section">
        <h2>Plan Performance</h2>
        <Bar key="planPerformance" data={planPerformanceData} />
      </div>
    </div>
  );
}

export default AdminAnalytics;
