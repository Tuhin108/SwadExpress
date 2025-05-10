import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center bg-gray-50">
      <div className="container max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center">
              <span className="text-2xl font-bold text-orange-600">Spice</span>
              <span className="text-2xl font-bold text-green-600">Route</span>
            </Link>
            <h1 className="text-2xl font-bold mt-4">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isLogin 
                ? 'Sign in to continue to SpiceRoute' 
                : 'Join SpiceRoute for the best Indian food delivery'}
            </p>
          </div>
          
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;