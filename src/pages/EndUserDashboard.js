import React from 'react';
import EndUserAnalytics from '../analytics/EndUserAnalytics';
import './Dashboard.css';

function EndUserDashboard() {
  return (
    <div className="dashboard-container">
      <EndUserAnalytics />
    </div>
  );
}

export default EndUserDashboard;
