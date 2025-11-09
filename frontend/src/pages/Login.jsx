import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { InputField, BackgroundEffects, CharacterCard } from '../components';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setApiError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Aurora Background Glow Effects */}
      <BackgroundEffects />

      {/* 3D Character Cards */}
      <CharacterCard
        src="https://i.ibb.co/n6kmyBv/robot-1.png"
        alt="3D Robot"
        position="left"
      />
      <CharacterCard
        src="https://i.ibb.co/3s79dM3/robot-2.png"
        alt="3D Robot"
        position="right"
      />

      {/* Main Login Card */}
      <div className="relative w-full max-w-md z-10">
        {/* Frosted Glass Form Panel */}
        <div className="relative bg-white/70 backdrop-blur-3xl rounded-3xl p-8 shadow-lg ring-1 ring-black/5">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Welcome to Rovio</h1>
            <p className="text-gray-500 mt-2">Sign in to continue your learning journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">
                {apiError}
              </div>
            )}

            {/* Email Input */}
            <InputField
              label="E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="hello.nixtio@gmail.com"
              error={errors.email}
              required
            />

            {/* Password Input */}
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••••••"
              error={errors.password}
              required
              showPasswordToggle
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-200/80 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-500">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#1A1A1A] hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1A1A1A] text-white font-bold text-lg py-4 rounded-full transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <hr className="w-full border-t border-gray-200" />
              <span className="text-sm text-gray-400">OR</span>
              <hr className="w-full border-t border-gray-200" />
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              className="w-full bg-white text-[#1A1A1A] border border-gray-200/80 rounded-full py-3 text-base font-semibold transition-all hover:border-gray-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.217-11.283-7.666l-6.57 4.82C9.656 39.663 16.318 44 24 44z"></path>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.401 44 31.055 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
              </svg>
              Sign In with Google
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-[#1A1A1A] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;