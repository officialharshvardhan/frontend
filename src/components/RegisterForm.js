import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      navigate('/login');
    }, 1500); // Show message then go to login
  };

  return (
    <div className="center">
      <h2>Register</h2>
      {registered ? (
        <div style={{ color: 'green' }}>Successfully registered!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="email" required placeholder="Email" />
          <input type="password" required placeholder="Password" />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;
