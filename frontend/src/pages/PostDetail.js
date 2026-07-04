// frontend/src/pages/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaComment, FaUser, FaCalendar, FaReply } from 'react-icons/fa';
const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        fetchPost();
    }, [id]);
    const fetchPost = async () => {
        try {
            const response = await api.get(`/posts/${id}/`);
            setPost(response.data);
            setLoading(false);
        } catch (err) {
            setError('Post not found');
            setLoading(false);
        }
    };
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${id}/`);
                navigate('/');
            } catch (err) {
                alert('Failed to delete post');
            }
        }
    };
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        setSubmitting(true);
        try {
            await api.post('/comments/', { post: parseInt(id), content: comment });
            setComment('');
            fetchPost();
        } catch (err) {
            alert('Failed to add comment');
        }
        setSubmitting(false);
    };
    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Delete this comment?')) {
            try {
                await api.delete(`/comments/${commentId}/`);
                fetchPost();
            } catch (err) {
                alert('Failed to delete comment');
            }
        }
    };
    if (loading) return <div className="container mt-5"><div className="text-center"><div className="spinner-border" style={{ width: '50px', height: '50px' }}><span className="visually-hidden">Loading...</span></div></div></div>;
    if (error) return <div className="container mt-5"><div className="alert alert-danger border-0">{error}</div></div>;
    if (!post) return <div className="container mt-5"><div className="alert alert-warning border-0">Post not found</div></div>;
    const isAuthor = user && post.author_id === user.userId;
    return (
        <motion.div 
            className="container mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Post Card */}
            <div className="card border-0 shadow-lg mb-4" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <h1 style={{ fontWeight: 800, fontSize: '2.2rem', color: '#1a202c' }}>
                            {post.title}
                        </h1>
                        <span className="badge" style={{
                            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                            padding: '8px 16px',
                            fontSize: '14px',
                            color: 'white'
                        }}>
                            {new Date(post.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    
                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '16px'
                        }}>
                            {post.author?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, color: '#2d3748' }}>
                                {post.author || 'Anonymous'}
                            </div>
                            <div style={{ fontSize: '13px', color: '#a0aec0' }}>
                                <FaCalendar className="me-1" /> {new Date(post.created_at).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    
                    <hr className="my-3" style={{ borderColor: '#e2e8f0' }} />
                    
                    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#2d3748' }}>
                        {post.content}
                    </div>
                    
                    {isAuthor && (
                        <div className="mt-4 d-flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to={`/edit/${post.id}`} className="btn btn-warning">
                                    <FaEdit className="me-2" /> Edit Post
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button onClick={handleDelete} className="btn btn-danger">
                                    <FaTrash className="me-2" /> Delete Post
                                </button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
            {/* Comments Section */}
            <div className="card border-0 shadow-lg mt-4" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">
                    <h3 style={{ fontWeight: 700, color: '#1a202c' }}>
                        <FaComment className="me-2 text-primary" /> 
                        Comments ({post.comments?.length || 0})
                    </h3>
                    
                    {user ? (
                        <form onSubmit={handleCommentSubmit} className="mb-4">
                            <div className="d-flex gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    disabled={submitting}
                                    style={{ borderRadius: '10px' }}
                                />
                                <motion.button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={submitting}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ borderRadius: '10px', padding: '0 20px' }}
                                >
                                    {submitting ? 'Posting...' : <><FaReply className="me-1" /> Post</>}
                                </motion.button>
                            </div>
                        </form>
                    ) : (
                        <div className="alert alert-info border-0" style={{ borderRadius: '10px' }}>
                            <Link to="/login">Login</Link> to join the conversation
                        </div>
                    )}
                    {post.comments?.length === 0 ? (
                        <div className="text-center py-4">
                            <div style={{ fontSize: '32px' }}>💬</div>
                            <p className="text-muted">No comments yet. Be the first!</p>
                        </div>
                    ) : (
                        <div className="mt-3">
                            {post.comments.map((c, index) => (
                                <motion.div 
                                    key={c.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="d-flex gap-3 p-3 mb-2"
                                    style={{
                                        background: '#f7fafc',
                                        borderRadius: '12px',
                                        borderLeft: '3px solid #6C63FF'
                                    }}
                                >
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        flexShrink: 0
                                    }}>
                                        {c.author?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <span style={{ fontWeight: 600, color: '#2d3748' }}>
                                                    {c.author || 'Anonymous'}
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#a0aec0', marginLeft: '10px' }}>
                                                    {new Date(c.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {user && c.author_id === user.userId && (
                                                <button 
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDeleteComment(c.id)}
                                                    style={{ borderRadius: '8px' }}
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            )}
                                        </div>
                                        <p className="mt-1" style={{ margin: 0, color: '#4a5568' }}>
                                            {c.content}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
export default PostDetail;