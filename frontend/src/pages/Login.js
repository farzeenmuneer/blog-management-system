// frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, error } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        
        if (!username || !password) {
            setLocalError('Please enter both username and password');
            return;
        }
        setIsLoading(true);
        const success = await login(username, password);
        setIsLoading(false);
        if (success) {
            navigate('/');
        } else {
            setLocalError(error || 'Login failed. Please try again.');
        }
    };
    return (
        <div className="container mt-5">
            <motion.div 
                className="row justify-content-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="col-md-5 col-lg-4">
                    <div className="card border-0 shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                        {/* Gradient Header */}
                        <div style={{
                            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                            padding: '35px 20px',
                            textAlign: 'center'
                        }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                style={{
                                    fontSize: '48px',
                                    marginBottom: '10px'
                                }}
                            >
                                ✍️
                            </motion.div>
                            <h2 style={{
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '28px',
                                margin: 0,
                                letterSpacing: '-0.5px'
                            }}>
                                Welcome Back
                            </h2>
                            <p style={{
                                color: 'rgba(255,255,255,0.8)',
                                margin: '5px 0 0 0',
                                fontWeight: 400
                            }}>
                                Login to your account
                            </p>
                        </div>
                        
                        {/* Form */}
                        <div className="card-body p-4" style={{ background: 'white' }}>
                            {localError && (
                                <motion.div 
                                    className="alert alert-danger border-0"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ borderRadius: '10px' }}
                                >
                                    {localError}
                                </motion.div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Username</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0" style={{ borderRadius: '10px 0 0 10px' }}>
                                            <FaUser className="text-muted" />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control border-0 bg-light"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter username"
                                            style={{ borderRadius: '0 10px 10px 0' }}
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0" style={{ borderRadius: '10px 0 0 10px' }}>
                                            <FaLock className="text-muted" />
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control border-0 bg-light"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter password"
                                            style={{ borderRadius: '0 10px 10px 0' }}
                                        />
                                    </div>
                                </div>
                                
                                <motion.button 
                                    type="submit" 
                                    className="btn w-100 text-white"
                                    disabled={isLoading}
                                    style={{
                                        background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        fontSize: '16px',
                                        border: 'none'
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isLoading ? 'Logging in...' : (
                                        <>
                                            <FaSignInAlt className="me-2" /> Login
                                        </>
                                    )}
                                </motion.button>
                            </form>
                            
                            <div className="text-center mt-3">
                                <small className="text-muted" style={{ fontSize: '12px' }}>
                                    Demo: <strong>admin</strong> / <strong>root123</strong>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
export default Login;
