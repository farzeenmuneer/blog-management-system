// frontend/src/pages/CreatePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes } from 'react-icons/fa';
const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const validateForm = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = 'Title is required';
        else if (title.length < 3) newErrors.title = 'Title must be at least 3 characters';
        else if (title.length > 200) newErrors.title = 'Title cannot exceed 200 characters';
        if (!content.trim()) newErrors.content = 'Content is required';
        else if (content.length < 10) newErrors.content = 'Content must be at least 10 characters';
        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setSubmitting(true);
        setError('');
        setErrors({});
        try {
            await api.post('/posts/', { title, content });
            navigate('/');
        } catch (err) {
            setError('Failed to create post');
            setSubmitting(false);
        }
    };
    return (
        <div className="container mt-4">
            <motion.div 
                className="row justify-content-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="col-md-8">
                    <div className="card border-0 shadow-lg" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                        {/* Header */}
                        <div style={{
                            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                            padding: '24px 30px'
                        }}>
                            <h3 className="text-white mb-0" style={{ fontWeight: 700 }}>
                                <FaPlus className="me-2" /> Create New Post
                            </h3>
                            <p className="text-white opacity-75 mb-0" style={{ fontSize: '14px' }}>
                                Share your thoughts with the community
                            </p>
                        </div>
                        
                        <div className="card-body p-4">
                            {error && (
                                <div className="alert alert-danger border-0">{error}</div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Title</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                            if (errors.title) setErrors({ ...errors, title: '' });
                                        }}
                                        placeholder="Enter post title"
                                        style={{ borderRadius: '10px' }}
                                    />
                                    {errors.title && (
                                        <div className="invalid-feedback">{errors.title}</div>
                                    )}
                                    <div className="text-end mt-1">
                                        <small className="text-muted">{title.length}/200</small>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Content</label>
                                    <textarea
                                        className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                        rows="10"
                                        value={content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                            if (errors.content) setErrors({ ...errors, content: '' });
                                        }}
                                        placeholder="Write your blog post here..."
                                        style={{ borderRadius: '10px', resize: 'vertical' }}
                                    />
                                    {errors.content && (
                                        <div className="invalid-feedback">{errors.content}</div>
                                    )}
                                    <div className="text-end mt-1">
                                        <small className="text-muted">{content.length} characters</small>
                                    </div>
                                </div>
                                
                                <div className="d-flex gap-2">
                                    <motion.button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={submitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{ borderRadius: '10px', padding: '10px 30px' }}
                                    >
                                        {submitting ? 'Creating...' : 'Create Post'}
                                    </motion.button>
                                    <motion.button 
                                        type="button" 
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/')}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{ borderRadius: '10px' }}
                                    >
                                        <FaTimes className="me-1" /> Cancel
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
export default CreatePost;