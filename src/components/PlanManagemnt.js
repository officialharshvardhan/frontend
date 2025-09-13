import React, { useState } from "react";

const initialPlans = [
  { id: 1, name: "Pro Annual", type: "FIBERNET", price: 59.99, quota: 500, active: true },
  { id: 2, name: "Basic Monthly", type: "COPPER", price: 19.99, quota: 100, active: true },
];

const PlanManagement = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanPrice, setNewPlanPrice] = useState("");
  const [newPlanQuota, setNewPlanQuota] = useState("");
  const [newPlanType, setNewPlanType] = useState("FIBERNET");

  // Toggle active status
  const toggleActive = (id) => {
    setPlans(plans.map(plan =>
      plan.id === id ? { ...plan, active: !plan.active } : plan
    ));
  };

  // Delete plan
  const deletePlan = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans(plans.filter(plan => plan.id !== id));
    }
  };

  // Add new plan
  const addPlan = () => {
    if (!newPlanName || !newPlanPrice || !newPlanQuota) {
      alert("Please fill all fields");
      return;
    }
    const newPlan = {
      id: Date.now(),
      name: newPlanName,
      price: parseFloat(newPlanPrice),
      quota: parseInt(newPlanQuota, 10),
      type: newPlanType,
      active: true
    };
    setPlans([...plans, newPlan]);
    setNewPlanName("");
    setNewPlanPrice("");
    setNewPlanQuota("");
    setNewPlanType("FIBERNET");
  };

  return (
    <section className="plan-management">
      <h3>Plan Management</h3>
      <div className="add-plan-form">
        <input
          type="text"
          placeholder="Plan Name"
          value={newPlanName}
          onChange={(e) => setNewPlanName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={newPlanPrice}
          onChange={(e) => setNewPlanPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quota (GB)"
          value={newPlanQuota}
          onChange={(e) => setNewPlanQuota(e.target.value)}
        />
        <select value={newPlanType} onChange={e => setNewPlanType(e.target.value)}>
          <option value="FIBERNET">FIBERNET</option>
          <option value="COPPER">COPPER</option>
          <option value="OTHER">OTHER</option>
        </select>
        <button onClick={addPlan}>Add Plan</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price ($)</th>
            <th>Quota (GB)</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{plan.type}</td>
              <td>{plan.price.toFixed(2)}</td>
              <td>{plan.quota}</td>
              <td>{plan.active ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => toggleActive(plan.id)}>
                  {plan.active ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => deletePlan(plan.id)} style={{ marginLeft: "8px", color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PlanManagement;
