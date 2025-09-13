import React from 'react';

const Sidebar = ({ onNavigate }) => (
  <aside className="sidebar">
    <div className="logo">Logo</div>
    <nav>
      <ul>
        <li onClick={() => onNavigate('home')}>Home</li>
        <li onClick={() => onNavigate('plans')}>Plan Management</li>
        <li onClick={() => onNavigate('discount')}>Discount Management</li>
        <li onClick={() => onNavigate('analytics')}>Analytics</li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
