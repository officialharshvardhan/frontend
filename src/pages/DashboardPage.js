import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ActionCards from '../components/ActionCards';
import RecentActivity from '../components/RecentActivity';
import '../index.css';

const DashboardPage = () => {
  // Stat cards data
  const stats = [
    { title: 'Total Active Subscriptions', value: 1250, change: '+5.2%', highlight: 'up' },
    { title: 'New Subscriptions (This Month)', value: 85, change: '+12.8%', highlight: 'up' },
    { title: 'Churn Rate', value: '1.5%', change: '-0.3%', highlight: 'down' },
    { title: 'Monthly Recurring Revenue', value: '$35,200', change: '+7.1%', highlight: 'up' }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <ActionCards />
        <section className="stats-section">
          {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
        </section>
        <RecentActivity />
      </main>
    </div>
  );
};

export default DashboardPage;
