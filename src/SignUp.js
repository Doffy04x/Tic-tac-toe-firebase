import React, { useState } from 'react';
import { auth } from './firebase'; // Make sure this points to your firebase configuration file
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './LoginPage.css'; // Reusing the same CSS file for consistent styling

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Handle post sign-up logic here, such as redirecting to the login page or a welcome page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="form-input">
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-input">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="btn-login">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
