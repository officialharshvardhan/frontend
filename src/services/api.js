import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api';

export const getEndUserAnalytics = async () => {
  try {
    // Attempt real API
    const res = await axios.get(`${API_BASE_URL}/user/analytics`);
    return res.data;
  } catch (err) {
    console.warn('Backend not ready, returning mock data.');
    return {
      subscription: { plan: 'Standard', status: 'active', autoRenew: true },
      usage: { usedGB: 120, quotaGB: 150 },
      usageHistory: { months: ['Jan','Feb'], usedGB: [80,120], quotaGB: [150,150] },
      notifications: [{ id:1, title:'Offer', read:false }],
      recommendations: [{ plan:'Premium', reason:'High usage' }]
    };
  }
};

export const getAdminAnalytics = async () => {
  try {
    // Try real API call
    const res = await axios.get(`${API_BASE_URL}/admin/analytics`);
    return res.data;
  } catch (err) {
    console.warn('Backend not ready, returning mock admin data.');
    // Return mock data for frontend development
    return {
      userOverview: {
        activeUsers: 1200,
        newSignUps: [50, 60, 70, 80, 90], // last 5 months
      },
      subscriptionTrends: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        active: [1000, 1100, 1200, 1150, 1300],
        cancelled: [50, 60, 70, 65, 80],
        upgraded: [20, 25, 30, 28, 35],
        downgraded: [10, 15, 12, 14, 20],
      },
      planPerformance: {
        plans: ['Basic', 'Standard', 'Premium'],
        subscribers: [500, 400, 300],
        revenue: [5000, 8000, 12000],
      },
      discountEffectiveness: {
        campaigns: ['SUMMER20', 'WELCOME10'],
        usedCount: [150, 200],
      },
      usageAnalytics: {
        monthlyUsageGB: [1200, 1400, 1300, 1500, 1600],
      },
      notifications: [
        { id: 1, title: 'System Maintenance', pending: true },
        { id: 2, title: 'New Feature', pending: false },
      ],
    };
  }
};