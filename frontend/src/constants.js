// frontend/src/constants.js
export const API = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
    ENDPOINTS: {
        LOGIN: '/token/',
        REFRESH: '/token/refresh/',
        POSTS: '/posts/',
        COMMENTS: '/comments/',
    },
    STATUS: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        SERVER_ERROR: 500,
    },
};

export const MESSAGES = {
    ERROR: {
        NETWORK: 'Network error. Please check your connection.',
        UNAUTHORIZED: 'Please login to continue.',
        FORBIDDEN: 'You are not authorized to perform this action.',
        NOT_FOUND: 'The requested resource was not found.',
        SERVER: 'Server error. Please try again later.',
    },
    SUCCESS: {
        LOGIN: 'Login successful!',
        LOGOUT: 'Logged out successfully.',
        POST_CREATED: 'Post created successfully!',
        POST_UPDATED: 'Post updated successfully!',
        POST_DELETED: 'Post deleted successfully!',
        COMMENT_ADDED: 'Comment added successfully!',
        COMMENT_DELETED: 'Comment deleted successfully!',
    },
};