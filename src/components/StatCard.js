import React from 'react';

const StatCard = ({ title, value, change, highlight }) => (
  <div className="stat-card">
    <h4>{title}</h4>
    <div>
      <span className="stat-value">{value}</span>
      <span className={`stat-change ${highlight}`}>{change}</span>
    </div>
  </div>
);

export default StatCard;
