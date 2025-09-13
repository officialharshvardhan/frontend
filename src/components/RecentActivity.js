import React from 'react';

const activities = [
  { text: "New 'Pro Annual' plan created by Admin A.", time: '2 hours ago' },
  { text: "Discount code 'SUMMER20' activated.", time: 'Yesterday' },
  { text: "User 'John Doe' upgraded to Premium Plan.", time: '2 days ago' },
  { text: "Subscription for 'Jane Smith' cancelled.", time: '4 days ago' },
  { text: "Analytics dashboard refreshed with latest data.", time: '5 days ago' }
];

const RecentActivity = () => (
  <div className="recent-activity">
    <h4>Recent Activity</h4>
    <ul>
      {activities.map((a, i) => (
        <li key={i}>
          <span>{a.text}</span>
          <small>{a.time}</small>
        </li>
      ))}
    </ul>
  </div>
);

export default RecentActivity;
