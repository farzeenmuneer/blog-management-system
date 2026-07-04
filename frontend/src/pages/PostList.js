// frontend/src/pages/PostList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaPlus, FaComment, FaUser, FaCalendar } from 'react-icons/fa';
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();
    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/posts/');
            const postsData = response.data.results || response.data;
            setPosts(postsData);
            setLoading(false);
        } catch (err) {
            console.error('Error details:', err);
            if (err.response?.status === 401) {
                localStorage.removeItem('access_token');
                setError('Session expired. Please login again.');
            } else {
                setError('Failed to load posts');
            }
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status" style={{ width: '50px', height: '50px' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading posts...</p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                    {error}
                </div>
            </div>
        );
    }
    return (
        <div className="container mt-4">
            <motion.div 
                className="d-flex justify-content-between align-items-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1 style={{ fontWeight: 800, color: '#1a202c', marginBottom: '4px' }}>
                        📝 Blog Posts
                    </h1>
                    <p className="text-muted" style={{ margin: 0 }}>
                        Discover amazing stories from our community
                    </p>
                </div>
                {user && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/create" className="btn btn-primary d-flex align-items-center gap-2" style={{ borderRadius: '10px' }}>
                            <FaPlus /> Create Post
                        </Link>
                    </motion.div>
                )}
            </motion.div>
            {posts.length === 0 ? (
                <motion.div 
                    className="text-center mt-5 p-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div style={{ fontSize: '48px' }}>📭</div>
                    <h3 className="mt-3" style={{ fontWeight: 700 }}>No posts yet</h3>
                    <p className="text-muted">
                        {user ? 'Be the first to write a blog post!' : 'Login to start writing'}
                    </p>
                    {!user && (
                        <Link to="/login" className="btn btn-primary" style={{ borderRadius: '10px' }}>Login to Write</Link>
                    )}
                </motion.div>
            ) : (
                <div className="row g-4">
                    {posts.map((post, index) => (
                        <motion.div 
                            className="col-md-6 col-lg-4"
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="card h-100 border-0" style={{ 
                                borderRadius: '16px',
                                background: 'rgba(255, 255, 255, 0.85)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)'
                            }}>
                                <div className="card-body d-flex flex-column p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title" style={{ 
                                            fontWeight: 700, 
                                            fontSize: '18px',
                                            marginBottom: '8px',
                                            color: '#1a202c'
                                        }}>
                                            {post.title}
                                        </h5>
                                    </div>
                                    
                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                        <span className="badge bg-light text-dark d-flex align-items-center gap-1" style={{ 
                                            fontWeight: 500,
                                            padding: '5px 10px',
                                            borderRadius: '6px'
                                        }}>
                                            <FaUser className="text-muted" style={{ fontSize: '0.8rem' }} /> {post.author_username || `User ${post.author}`}
                                        </span>
                                        <span className="badge bg-light text-dark d-flex align-items-center gap-1" style={{ 
                                            fontWeight: 500,
                                            padding: '5px 10px',
                                            borderRadius: '6px'
                                        }}>
                                            <FaCalendar className="text-muted" style={{ fontSize: '0.8rem' }} /> {new Date(post.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    
                                    <p className="card-text text-muted" style={{ 
                                        fontSize: '14px', 
                                        flex: 1,
                                        lineHeight: '1.6',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical'
                                    }}>
                                        {post.content}
                                    </p>
                                    
                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                                        <Link 
                                            to={`/post/${post.id}`} 
                                            className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                                            style={{ borderRadius: '8px', padding: '6px 16px', fontSize: '0.85rem' }}
                                        >
                                            Read More &rarr;
                                        </Link>
                                        {post.comments_count !== undefined && (
                                            <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
                                                <FaComment style={{ color: '#6C63FF' }} /> {post.comments_count}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default PostList;
