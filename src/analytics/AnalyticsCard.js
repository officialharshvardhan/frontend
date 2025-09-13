import React from 'react';
import './Analytics.css';

const AnalyticsCard = ({ title, value }) => (
  <div className="analytics-card">
    <strong>{title}</strong>
    <div>{value}</div>
  </div>
);

export default AnalyticsCard;
