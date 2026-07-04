// frontend/src/components/NavBar.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaPlus, FaComment, FaEdit, FaTrash, FaSignOutAlt, FaHome } from 'react-icons/fa';
const NavBar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const userInitial = user && user.username ? user.username.charAt(0).toUpperCase() : '?';
    // Animation Variants
    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { type: 'spring', stiffness: 120, damping: 20 }
        }
    };
    const mobileMenuVariants = {
        closed: { opacity: 0, height: 0 },
        open: { 
            opacity: 1, 
            height: 'auto',
            transition: { duration: 0.3, ease: 'easeInOut' }
        }
    };
    return (
        <motion.nav 
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className="navbar navbar-expand-lg sticky-top"
            style={{
                background: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 4px 30px rgba(108, 99, 255, 0.05)',
                zIndex: 1000,
                padding: '12px 0'
            }}
        >
            <div className="container">
                {/* Brand Logo with Gradient */}
                <Link 
                    className="navbar-brand d-flex align-items-center gap-2 fw-extrabold" 
                    to="/"
                    style={{
                        background: 'linear-gradient(45deg, #6C63FF, #FF6584)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.45rem',
                        letterSpacing: '-0.03em',
                        transition: 'transform 0.2s ease'
                    }}
                >
                    <span style={{ WebkitTextFillColor: 'initial', fontSize: '1.6rem' }}>📝</span>
                    <span style={{ fontWeight: 800 }}>BlogSpace</span>
                </Link>
                {/* Custom Hamburger Menu Toggle */}
                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        padding: '8px',
                        outline: 'none',
                        boxShadow: 'none'
                    }}
                >
                    <div className="position-relative" style={{ width: '24px', height: '20px' }}>
                        <span 
                            style={{
                                display: 'block',
                                position: 'absolute',
                                width: '100%',
                                height: '3px',
                                background: '#6C63FF',
                                borderRadius: '3px',
                                transition: 'all 0.2s ease',
                                transform: isOpen ? 'rotate(45deg) translateY(6px)' : 'none',
                                top: isOpen ? '6px' : '0px'
                            }}
                        />
                        <span 
                            style={{
                                display: 'block',
                                position: 'absolute',
                                width: '100%',
                                height: '3px',
                                background: '#6C63FF',
                                borderRadius: '3px',
                                transition: 'all 0.15s ease',
                                opacity: isOpen ? 0 : 1,
                                top: '8px'
                            }}
                        />
                        <span 
                            style={{
                                display: 'block',
                                position: 'absolute',
                                width: '100%',
                                height: '3px',
                                background: '#6C63FF',
                                borderRadius: '3px',
                                transition: 'all 0.2s ease',
                                transform: isOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
                                top: isOpen ? '6px' : '16px'
                            }}
                        />
                    </div>
                </button>
                {/* Desktop and Mobile Wrapper */}
                <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-3">
                        <li className="nav-item">
                            <Link 
                                className="nav-link px-3 py-2 fw-semibold d-flex align-items-center gap-2" 
                                to="/"
                                style={{
                                    color: location.pathname === '/' ? '#6C63FF' : '#4A5568',
                                    transition: 'color 0.2s ease'
                                }}
                            >
                                <FaHome style={{ fontSize: '1.1rem' }} /> Home
                            </Link>
                        </li>
                        
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <Link 
                                        className="btn btn-primary d-flex align-items-center gap-2" 
                                        to="/create"
                                        style={{
                                            borderRadius: '10px',
                                            padding: '8px 18px',
                                            fontSize: '0.9rem',
                                            boxShadow: '0 4px 14px rgba(108, 99, 255, 0.25)'
                                        }}
                                    >
                                        <FaPlus /> New Post
                                    </Link>
                                </li>
                                <li className="nav-item d-flex align-items-center gap-2 ms-2 px-3 py-1 bg-white rounded-pill border" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                    <div 
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(45deg, #6C63FF, #FF6584)',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: '700',
                                            fontSize: '14px',
                                            boxShadow: '0 2px 6px rgba(108, 99, 255, 0.2)'
                                        }}
                                    >
                                        {userInitial}
                                    </div>
                                    <span className="fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>
                                        {user.username}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="btn btn-outline-danger btn-sm border-0 d-flex align-items-center gap-2 px-3 py-2"
                                        onClick={handleLogout}
                                        style={{
                                            borderRadius: '10px',
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            color: '#E53E3E',
                                            background: 'rgba(229, 62, 62, 0.05)'
                                        }}
                                    >
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link 
                                    className="btn btn-primary d-flex align-items-center gap-2" 
                                    to="/login"
                                    style={{
                                        borderRadius: '10px',
                                        padding: '8px 20px',
                                        boxShadow: '0 4px 14px rgba(108, 99, 255, 0.25)'
                                    }}
                                >
                                    <FaLock style={{ fontSize: '0.85rem' }} /> Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            {/* Mobile Nav dropdown using Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={mobileMenuVariants}
                        className="w-100 d-lg-none"
                        style={{ overflow: 'hidden' }}
                    >
                        <div className="container py-3 d-flex flex-column gap-3 mt-2 border-top" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                            <Link 
                                className="nav-link py-2 fw-semibold d-flex align-items-center gap-2" 
                                to="/"
                                onClick={() => setIsOpen(false)}
                                style={{ color: location.pathname === '/' ? '#6C63FF' : '#4A5568' }}
                            >
                                <FaHome /> Home
                            </Link>
                            {user ? (
                                <>
                                    <Link 
                                        className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2" 
                                        to="/create"
                                        onClick={() => setIsOpen(false)}
                                        style={{ borderRadius: '10px' }}
                                    >
                                        <FaPlus /> New Post
                                    </Link>
                                    <div className="d-flex align-items-center gap-2 py-2 px-3 bg-white rounded-3 border">
                                        <div 
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: 'linear-gradient(45deg, #6C63FF, #FF6584)',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: '700',
                                                fontSize: '14px'
                                            }}
                                        >
                                            {userInitial}
                                        </div>
                                        <span className="fw-semibold text-dark">{user.username}</span>
                                    </div>
                                    <button 
                                        className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2 py-2"
                                        onClick={() => {
                                            setIsOpen(false);
                                            handleLogout();
                                        }}
                                        style={{ borderRadius: '10px' }}
                                    >
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </>
                            ) : (
                                <Link 
                                    className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2" 
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    style={{ borderRadius: '10px' }}
                                >
                                    <FaLock /> Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
export default NavBar;