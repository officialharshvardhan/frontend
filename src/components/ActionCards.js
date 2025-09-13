import React from 'react';
import { Link } from 'react-router-dom';
const actions = [
  {
    title: 'Plan Management',
    desc: 'Add, edit, and manage subscription plans offered.',
    label: 'Go to Plan'
  },
  {
    title: 'Discount Management',
    desc: 'Create and oversee promotional discount codes.',
    label: 'Go to Discount'
  },
  {
    title: 'Admin Analytics',
    desc: 'Monitor subscription trends and performance insights.',
    label: 'Go to Admin'
  }
];

const ActionCards = () => (
  <div className="action-cards">
    {actions.map(action => (
      <div className="action-card" key={action.title}>
        <h3>{action.title}</h3>
        <p>{action.desc}</p>
        <Link to="admin/dashboard"><button>{action.label}</button></Link>
      </div>
    ))}
  </div>
);

export default ActionCards;
