import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onNavigate }) => (
  <aside className="sidebar">
    <div className="logo">SM-Systems</div>
    <nav>
      <ul>
        <li><Link to ="/Plans">Plans</Link></li>
        <li><Link to ="sub">Subscription Manager</Link></li>
        <li><Link to ="admin/dashboard">Admin Analytics</Link></li>
        <li><Link to ="user/dashboard">User Analytics</Link></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
