
import React, { useState, useEffect } from 'react';
import './BrowsePlans.css';

const API_BASE = "http://localhost:5000";

function BrowsePlans() {
  const [plans, setPlans] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    monthly_price: 0,
    monthly_quota_gb: 0,
    description: '',
    type: 'FIBERNET',
    discount_ids: [],
  });

  const defaultPlans = [
    { plan_id: 1, name: 'Basic Tier', monthly_price: 19, monthly_quota_gb: 50, description: 'Access core features\n50 GB storage\nBasic support', type: 'FIBERNET' },
    { plan_id: 2, name: 'Pro Tier', monthly_price: 49, monthly_quota_gb: 200, description: 'All Basic features\n200 GB storage\nPriority support\nAdvanced analytics', type: 'FIBERNET' },
    { plan_id: 3, name: 'Enterprise Tier', monthly_price: 99, monthly_quota_gb: 0, description: 'All Pro features\nUnlimited storage\n24/7 dedicated support\nCustom integrations', type: 'FIBERNET' },
    { plan_id: 4, name: 'Starter Tier', monthly_price: 0, monthly_quota_gb: 10, description: 'Limited features\n10 GB storage\nCommunity support', type: 'COPPER' }
  ];

  const defaultDiscounts = [
    { discount_id: 1, name: 'New User', discount_percent: 10 },
    { discount_id: 2, name: 'Annual Plan', discount_percent: 20 },
    { discount_id: 3, name: 'Loyal Customer', discount_percent: 15 }
  ];

  useEffect(() => {
    fetchPlans();
    fetchDiscounts();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch(`${API_BASE}/plans`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
      });
      if (!res.ok) throw new Error('Failed to fetch plans');
      const data = await res.json();
      setPlans(data.length > 0 ? data : defaultPlans);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setPlans(defaultPlans);
    }
  };

  const fetchDiscounts = async () => {
    try {
      // Since GET /discounts is unavailable, use defaultDiscounts
      // Alternatively, you can fetch from a local JSON file (uncomment below if needed)
      // const res = await fetch('/discounts.json');
      // const data = await res.json();
      setDiscounts(defaultDiscounts);
    } catch (err) {
      console.error('Error fetching discounts:', err);
      setDiscounts(defaultDiscounts);
    }
  };

  const openModal = (plan = null) => {
    setEditingPlan(plan);
    if (plan) {
      setFormData({
        name: plan.name,
        monthly_price: plan.monthly_price,
        monthly_quota_gb: plan.monthly_quota_gb,
        description: plan.description,
        type: plan.type,
        discount_ids: [], // No discounts from plan since backend doesn't return them
      });
    } else {
      setFormData({ name: '', monthly_price: 0, monthly_quota_gb: 0, description: '', type: 'FIBERNET', discount_ids: [] });
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === 'discount_ids') {
      const discountId = parseInt(value);
      setFormData(prev => ({
        ...prev,
        discount_ids: checked
          ? [...prev.discount_ids, discountId]
          : prev.discount_ids.filter(id => id !== discountId),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let planId;
      if (editingPlan) {
        const res = await fetch(`${API_BASE}/plans/${editingPlan.plan_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            name: formData.name,
            monthly_price: formData.monthly_price,
            monthly_quota_gb: formData.monthly_quota_gb,
            description: formData.description,
            type: formData.type,
          }),
        });
        if (!res.ok) throw new Error('Update failed');
        planId = editingPlan.plan_id;
        for (let did of formData.discount_ids) {
          await fetch(`${API_BASE}/discounts/apply`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ plan_id: planId, discount_id: did }),
          });
        }
      } else {
        const res = await fetch(`${API_BASE}/plans`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            name: formData.name,
            monthly_price: formData.monthly_price,
            monthly_quota_gb: formData.monthly_quota_gb,
            description: formData.description,
            type: formData.type,
          }),
        });
        if (!res.ok) throw new Error('Create failed');
        const createResponse = await res.json();
        planId = createResponse.plan_id;
        for (let did of formData.discount_ids) {
          await fetch(`${API_BASE}/discounts/apply`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ plan_id: planId, discount_id: did }),
          });
        }
      }
      closeModal();
      await fetchPlans();
    } catch (err) {
      console.error(err);
      alert('Error saving plan. Please check your authentication or server status.');
    }
  };

  const handleDelete = async planId => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try {
      const res = await fetch(`${API_BASE}/plans/${planId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!res.ok) throw new Error('Delete failed');
      await fetchPlans();
    } catch (err) {
      console.error(err);
      alert('Error deleting plan. Please check your authentication or server status.');
    }
  };

  return (
    <div className="browse-plans">
      {/* <header className="header">
        <div className="logo">*Logo</div>
        <input className="search" placeholder="Search subscriptions..." />
        <div className="profile">Profile</div>
      </header> */}

      <div className="container">
        <nav className="sidebar">
          <ul>
            <li>Home</li>
            <li>Plan Management</li>
            <li>Discount Management</li>
            <li>Analytics</li>
          </ul>
        </nav>

        <main className="main">
          <h1>Plan Management</h1>
          <button className="add-button" onClick={() => openModal(null)}>+ Add New Plan</button>

          <div className="plans-grid">
            {plans.map(plan => (
              <div key={plan.plan_id} className="plan-card">
                <h2>{plan.name}</h2>
                <p>${plan.monthly_price} per month</p>
                <ul className="features">
                  {plan.description.split('\n').map((feature, idx) => <li key={idx}>{feature}</li>)}
                  <li>{plan.monthly_quota_gb === 0 ? 'Unlimited' : `${plan.monthly_quota_gb} GB`} quota</li>
                  <li>Type: {plan.type}</li>
                </ul>
                <div className="buttons">
                  <button className="edit-button" onClick={() => openModal(plan)}>Edit Plan</button>
                  <button className="delete-button" onClick={() => handleDelete(plan.plan_id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <footer className="footer">Company | Resources | Legal</footer>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Plan Name" value={formData.name} onChange={handleChange} required />
              <input type="number" name="monthly_price" placeholder="Monthly Price" value={formData.monthly_price} onChange={handleChange} required />
              <input type="number" name="monthly_quota_gb" placeholder="Monthly Quota GB" value={formData.monthly_quota_gb} onChange={handleChange} required />
              <textarea name="description" placeholder="Description (one feature per line)" value={formData.description} onChange={handleChange} required />
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="FIBERNET">FIBERNET</option>
                <option value="COPPER">COPPER</option>
                <option value="OTHER">OTHER</option>
              </select>
              <div className="discounts-section">
                <label>Apply Discounts (note: applied discounts won't display in UI):</label>
                {discounts.map(d => (
                  <div key={d.discount_id}>
                    <input
                      type="checkbox"
                      name="discount_ids"
                      value={d.discount_id}
                      checked={formData.discount_ids.includes(d.discount_id)}
                      onChange={handleChange}
                    />
                    {d.name} ({d.discount_percent}%)
                  </div>
                ))}
              </div>
              <div className="modal-buttons">
                <button type="submit">{editingPlan ? 'Save Changes' : 'Add Plan'}</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrowsePlans;

