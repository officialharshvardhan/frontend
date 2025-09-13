import React, { useState, useEffect } from 'react';
import './SubscriptionManagement.css';  // Assuming this is the file name

import { 
  Wifi, 
  Package, 
  Star, 
  CheckCircle, 
  XCircle, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  Clock,
  DollarSign,
  Zap,
  Shield,
  Phone,
  Users,
  TrendingUp,
  Eye,
  X,
  Check,
  AlertTriangle
} from 'lucide-react';

const SubscriptionManagement = () => {
  const [currentView, setCurrentView] = useState('browse');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonPlans, setComparisonPlans] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Mock current user
  const currentUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  };

  // Mock plans data
  const [plans] = useState([
    {
      id: 1,
      name: 'Basic Fibernet',
      type: 'Fibernet',
      speed: '50 Mbps',
      quota: '500 GB',
      price: 599,
      originalPrice: 699,
      features: ['High-speed internet', '24/7 support', 'Basic security', 'Free installation'],
      popular: false,
      available: true
    },
    {
      id: 2,
      name: 'Premium Fibernet',
      type: 'Fibernet',
      speed: '100 Mbps',
      quota: '1000 GB',
      price: 999,
      originalPrice: 1199,
      features: ['Ultra-high speed', '24/7 priority support', 'Advanced security', 'Free installation', 'Static IP'],
      popular: true,
      available: true
    },
    {
      id: 3,
      name: 'Enterprise Fibernet',
      type: 'Fibernet',
      speed: '200 Mbps',
      quota: 'Unlimited',
      price: 1999,
      originalPrice: 2299,
      features: ['Enterprise grade', 'Dedicated support', 'Premium security', 'Free installation', 'Static IP', 'Priority routing'],
      popular: false,
      available: true
    },
    {
      id: 4,
      name: 'Basic Copper',
      type: 'Broadband Copper',
      speed: '25 Mbps',
      quota: '250 GB',
      price: 399,
      originalPrice: 499,
      features: ['Reliable connection', 'Standard support', 'Basic security'],
      popular: false,
      available: true
    },
    {
      id: 5,
      name: 'Premium Copper',
      type: 'Broadband Copper',
      speed: '50 Mbps',
      quota: '500 GB',
      price: 699,
      originalPrice: 799,
      features: ['Enhanced speed', '24/7 support', 'Advanced security', 'Free installation'],
      popular: false,
      available: true
    }
  ]);

  // Mock user subscriptions
  const [userSubscriptions, setUserSubscriptions] = useState([
    {
      id: 1,
      planId: 2,
      planName: 'Premium Fibernet',
      status: 'active',
      startDate: '2025-08-01',
      endDate: '2025-09-01',
      nextBilling: '2025-10-01',
      price: 999,
      usage: 650,
      quota: 1000,
      autoRenew: true
    }
  ]);

  // Mock subscription history
  const [subscriptionHistory] = useState([
    {
      id: 1,
      planName: 'Basic Fibernet',
      action: 'Subscribed',
      date: '2025-06-01',
      price: 599,
      status: 'completed'
    },
    {
      id: 2,
      planName: 'Premium Fibernet',
      action: 'Upgraded',
      date: '2025-08-01',
      price: 999,
      status: 'completed'
    },
    {
      id: 3,
      planName: 'Basic Copper',
      action: 'Cancelled',
      date: '2025-07-15',
      price: 399,
      status: 'cancelled'
    }
  ]);

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setConfirmAction({ type: 'subscribe', plan });
    setShowConfirmModal(true);
  };

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    setConfirmAction({ type: 'upgrade', plan });
    setShowConfirmModal(true);
  };

  const handleDowngrade = (plan) => {
    setSelectedPlan(plan);
    setConfirmAction({ type: 'downgrade', plan });
    setShowConfirmModal(true);
  };

  const handleCancel = (subscription) => {
    setConfirmAction({ type: 'cancel', subscription });
    setShowConfirmModal(true);
  };

  const confirmActionHandler = () => {
    if (confirmAction) {
      switch (confirmAction.type) {
        case 'subscribe':
          const newSubscription = {
            id: Date.now(),
            planId: confirmAction.plan.id,
            planName: confirmAction.plan.name,
            status: 'active',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            price: confirmAction.plan.price,
            usage: 0,
            quota: parseInt(confirmAction.plan.quota) || 999999,
            autoRenew: true
          };
          setUserSubscriptions([...userSubscriptions, newSubscription]);
          break;
        case 'upgrade':
        case 'downgrade':
          setUserSubscriptions(userSubscriptions.map(sub => 
            sub.id === userSubscriptions[0].id 
              ? { ...sub, planId: confirmAction.plan.id, planName: confirmAction.plan.name, price: confirmAction.plan.price }
              : sub
          ));
          break;
        case 'cancel':
          setUserSubscriptions(userSubscriptions.map(sub =>
            sub.id === confirmAction.subscription.id
              ? { ...sub, status: 'cancelled' }
              : sub
          ));
          break;
      }
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const addToComparison = (plan) => {
    if (comparisonPlans.length < 3 && !comparisonPlans.find(p => p.id === plan.id)) {
      setComparisonPlans([...comparisonPlans, plan]);
    }
  };

  const removeFromComparison = (planId) => {
    setComparisonPlans(comparisonPlans.filter(p => p.id !== planId));
  };

  const PlanCard = ({ plan, isComparison = false, showActions = true }) => (
    <div className={`bg-white rounded-xl shadow-lg border-2 ${plan.popular ? 'border-blue-500' : 'border-gray-200'} relative overflow-hidden transition-all hover:shadow-xl`}>
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
          <Star className="inline w-4 h-4 mr-1" />
          Popular
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-2 rounded-lg mr-3">
            {plan.type === 'Fibernet' ? <Zap className="w-6 h-6 text-blue-600" /> : <Wifi className="w-6 h-6 text-green-600" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
            <p className="text-gray-500 text-sm">{plan.type}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">₹{plan.price}</span>
            <span className="text-gray-500 ml-2">/month</span>
            {plan.originalPrice && (
              <span className="text-red-500 line-through text-lg ml-2">₹{plan.originalPrice}</span>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-700">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
            <span>{plan.speed}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Package className="w-4 h-4 mr-2 text-green-500" />
            <span>{plan.quota} Data</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {showActions && !isComparison && (
          <div className="space-y-2">
            <button
              onClick={() => handleSubscribe(plan)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Subscribe Now
            </button>
            <button
              onClick={() => addToComparison(plan)}
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              disabled={comparisonPlans.length >= 3}
            >
              Add to Compare
            </button>
          </div>
        )}

        {isComparison && (
          <button
            onClick={() => removeFromComparison(plan.id)}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );

  const BrowsePlans = () => (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Available Plans</h2>
          <p className="text-gray-600">Choose the perfect plan for your needs</p>
        </div>
        
        {comparisonPlans.length > 0 && (
          <button
            onClick={() => setShowComparison(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            Compare Plans ({comparisonPlans.length})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map(plan => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );

  const PlanComparison = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Plan Comparison</h2>
        <button
          onClick={() => setShowComparison(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {comparisonPlans.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No plans selected for comparison</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisonPlans.map(plan => (
            <PlanCard key={plan.id} plan={plan} isComparison={true} showActions={false} />
          ))}
        </div>
      )}
    </div>
  );

  const MySubscriptions = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Subscriptions</h2>
      
      {userSubscriptions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Active Subscriptions</h3>
          <p className="text-gray-500 mb-6">You don't have any active subscriptions yet.</p>
          <button
            onClick={() => setCurrentView('browse')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Browse Plans
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {userSubscriptions.map(subscription => {
            const plan = plans.find(p => p.id === subscription.planId);
            const usagePercentage = (subscription.usage / subscription.quota) * 100;
            
            return (
              <div key={subscription.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        {plan?.type === 'Fibernet' ? <Zap className="w-6 h-6 text-blue-600" /> : <Wifi className="w-6 h-6 text-green-600" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{subscription.planName}</h3>
                        <p className="text-gray-500">{plan?.type}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {subscription.status === 'active' ? <CheckCircle className="w-4 h-4 inline mr-1" /> : <XCircle className="w-4 h-4 inline mr-1" />}
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm">Monthly Price</p>
                      <p className="text-2xl font-bold text-gray-800">₹{subscription.price}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm">Next Billing</p>
                      <p className="text-lg font-semibold text-gray-800">{new Date(subscription.nextBilling).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm">Auto Renew</p>
                      <p className="text-lg font-semibold text-gray-800">{subscription.autoRenew ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-gray-600">Data Usage</p>
                      <p className="text-sm text-gray-500">
                        {subscription.usage} GB / {subscription.quota === 999999 ? 'Unlimited' : `${subscription.quota} GB`}
                      </p>
                    </div>
                    {subscription.quota !== 999999 && (
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            usagePercentage > 90 ? 'bg-red-500' : 
                            usagePercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  {subscription.status === 'active' && (
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          const higherPlans = plans.filter(p => p.price > subscription.price);
                          if (higherPlans.length > 0) handleUpgrade(higherPlans[0]);
                        }}
                        className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        <ArrowUp className="w-4 h-4 mr-2" />
                        Upgrade
                      </button>
                      <button
                        onClick={() => {
                          const lowerPlans = plans.filter(p => p.price < subscription.price);
                          if (lowerPlans.length > 0) handleDowngrade(lowerPlans[lowerPlans.length - 1]);
                        }}
                        className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                      >
                        <ArrowDown className="w-4 h-4 mr-2" />
                        Downgrade
                      </button>
                      <button
                        onClick={() => handleCancel(subscription)}
                        className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const SubscriptionHistory = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Subscription History</h2>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptionHistory.map(record => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{record.planName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.action === 'Subscribed' ? 'bg-green-100 text-green-800' :
                      record.action === 'Upgraded' ? 'bg-blue-100 text-blue-800' :
                      record.action === 'Downgraded' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ₹{record.price}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status === 'completed' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <XCircle className="w-3 h-3 inline mr-1" />}
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ConfirmationModal = () => (
    showConfirmModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
            <h3 className="text-lg font-semibold">Confirm Action</h3>
          </div>
          
          <p className="text-gray-600 mb-6">
            {confirmAction?.type === 'subscribe' && `Are you sure you want to subscribe to ${confirmAction.plan?.name}?`}
            {confirmAction?.type === 'upgrade' && `Are you sure you want to upgrade to ${confirmAction.plan?.name}?`}
            {confirmAction?.type === 'downgrade' && `Are you sure you want to downgrade to ${confirmAction.plan?.name}?`}
            {confirmAction?.type === 'cancel' && `Are you sure you want to cancel your ${confirmAction.subscription?.planName} subscription?`}
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmActionHandler}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors ${
                confirmAction?.type === 'cancel' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-800">Subscription Manager</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {currentUser.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Sub Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { key: 'browse', label: 'Browse Plans' },
              { key: 'subscriptions', label: 'My Subscriptions' },
              { key: 'history', label: 'History' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setCurrentView(tab.key)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  currentView === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showComparison ? (
          <PlanComparison />
        ) : (
          <>
            {currentView === 'browse' && <BrowsePlans />}
            {currentView === 'subscriptions' && <MySubscriptions />}
            {currentView === 'history' && <SubscriptionHistory />}
          </>
        )}
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
};

export default SubscriptionManagement;