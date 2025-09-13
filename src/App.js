import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EndUserAnalytics from './analytics/EndUserAnalytics';
import AdminAnalytics from './analytics/AdminAnalytics';
import DashboardPage from './pages/DashboardPage';
import BrowsePlans from './pages/BrowsePlans';
function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<DashboardPage />} />
        <Route path="/user/dashboard" element={<EndUserAnalytics />} />
        <Route path="/admin/dashboard" element={<AdminAnalytics />} />
         <Route path="/Plans" element={<BrowsePlans />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
