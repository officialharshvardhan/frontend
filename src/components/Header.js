import React from 'react';

const Header = () => (
  <header className="header">
    <h1>Hi Admin <span role="img" aria-label="wave">👋</span></h1>
    <p>Welcome back! Here's a quick overview of your subscription platform.</p>
    <input type="text" className="search" placeholder="Search subscriptions..." />
  </header>
);

export default Header;
