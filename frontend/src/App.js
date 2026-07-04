// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
// Import Bootstrap and custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// Protected route component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};
function AppRoutes() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route 
                    path="/create" 
                    element={
                        <ProtectedRoute>
                            <CreatePost />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/edit/:id" 
                    element={
                        <ProtectedRoute>
                            <EditPost />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}
function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}
export default App;