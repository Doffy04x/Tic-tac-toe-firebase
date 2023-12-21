import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router hook for navigation
import { auth } from './firebase'; // Importing the auth object from your Firebase configuration file
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase auth function
import './LoginPage.css'; // Your custom CSS for styling

const LoginPage = () => {
    const navigate = useNavigate(); // Hook to navigate to different routes
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(''); // State to store login errors

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // If successful, redirect to the 'tic.js' page component
            navigate('/Gameboard'); // Make sure you have a route set up for '/tic' in your Router
        } catch (error) {
            // If there's an error (wrong credentials, network issue, etc.), display it
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="login-form">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-input">
                            <i className="icon-user"></i>
                            <input 
                                type="email" 
                                placeholder="Your Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="form-input">
                            <i className="icon-lock"></i>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-remember">
                            <input 
                                type="checkbox" 
                                id="remember-me" 
                                checked={rememberMe} 
                                onChange={(e) => setRememberMe(e.target.checked)} 
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button type="submit" className="btn-login">Log in</button>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                    <div className="login-links">
                        <a href="/signup">Create an account</a>
                        <a href="/resetpassword">Forgot your password?</a>
                    </div>
                </div>
                {/* Insert your login illustration here */}
                <div className="login-image">
                    {/* <img src="path-to-your-image.jpg" alt="login" /> */}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
