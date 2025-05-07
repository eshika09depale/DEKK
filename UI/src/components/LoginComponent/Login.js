import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error('Invalid JSON response:', jsonError);
        setLoginFailed(true);
        return;
      }

      if (response.ok && responseData?.token) {
        setLoginSuccess(true);

        // Save token and other details
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userRole', responseData.role || '');
        localStorage.setItem('userName', responseData.name || '');

        setTimeout(() => {
          alert('Login successful! Redirecting...');
          if (responseData.role === 'admin') {
            window.location.href = '/adminhome';
          } else if (responseData.role === 'user') {
            window.location.href = '/userhome';
          } else {
            window.location.href = '/';
          }
        }, 1500);
      } else {
        setLoginFailed(true);
        setTimeout(() => {
          setLoginFailed(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginFailed(true);
      setTimeout(() => {
        setLoginFailed(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className={`login-form-wrapper ${isSubmitting ? 'submitting' : ''} ${loginSuccess ? 'success' : ''} ${loginFailed ? 'failed' : ''}`}>
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
                placeholder="Enter your email"
              />
              <span className="input-icon">✉️</span>
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
                placeholder="Enter your password"
              />
              <span className="input-icon clickable" onClick={togglePasswordVisibility}>
                {showPassword ? "👁️" : "🔒"}
              </span>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="login-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={toggleRememberMe}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="spinner"></div>
            ) : loginSuccess ? (
              "Success! ✓"
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="login-divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <button className="social-btn google">
            <span className="social-icon">G</span>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="register-link">
          <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
      </div>

      {loginFailed && (
        <div className="error-toast">
          Invalid email or password. Please try again.
        </div>
      )}
    </div>
  );
};

export default Login;
