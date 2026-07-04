// frontend/src/components/PostCard.js
const PostCard = ({ post, onReadMore }) => {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-muted">
                    By {post.author} • {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="card-text">
                    {post.content.substring(0, 100)}...
                </p>
                <button 
                    className="btn btn-outline-primary"
                    onClick={() => onReadMore(post.id)}
                >
                    Read More ({post.comment_count} comments)
                </button>
            </div>
        </div>
    );
};

// frontend/src/components/LoadingSpinner.js
const LoadingSpinner = () => (
    <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

// frontend/src/components/ErrorMessage.js
const ErrorMessage = ({ message, onRetry }) => (
    <div className="alert alert-danger alert-dismissible fade show mt-5">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {message}
        {onRetry && (
            <button className="btn btn-sm btn-outline-danger ms-3" onClick={onRetry}>
                Retry
            </button>
        )}
    </div>
);