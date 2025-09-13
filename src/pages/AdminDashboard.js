import React from 'react';
import AdminAnalytics from '../analytics/AdminAnalytics';
import 'Dashboard.css';

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <AdminAnalytics />
    </div>
  );
}

export default AdminDashboard;
