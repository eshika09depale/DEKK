import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    city: '',
    role: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      tempErrors.name = "Name should only contain letters";
    }
    
    // Email validation
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    
    // Password validation
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    
    // Contact validation
    if (!formData.contact) {
      tempErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      tempErrors.contact = "Contact should be a 10-digit number";
    }
    
    // Address validation
    if (!formData.address.trim()) {
      tempErrors.address = "Address is required";
    }
    
    // City validation
    if (!formData.city.trim()) {
      tempErrors.city = "City is required";
    }
    
    // Role validation
    if (!formData.role) {
      tempErrors.role = "Please select a role";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (validate()) {
      try {
        // API call to backend to register user
        const res = await fetch("http://localhost:5000/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)  // Form data as body
        });

        // Parsing the response from the backend
        const data = await res.json();

        if (res.ok) {
          alert("Registration successful!");
          // Reset form data after successful registration
          setFormData({
            name: '',
            email: '',
            password: '',
            contact: '',
            address: '',
            city: '',
            role: ''
          });
          setErrors({});  // Reset validation errors
        } else {
          alert(data.message || "Something went wrong.");
        }
      } catch (err) {
        console.error("API error:", err);
        alert("Server error. Please try again later.");
      }
    } else {
      console.log("Form has validation errors");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h1>Register Here!!!</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={errors.contact ? "input-error" : ""}
            />
            {errors.contact && <p className="error-message">{errors.contact}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "input-error" : ""}
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={errors.city ? "input-error" : ""}
            />
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={errors.role ? "input-error" : ""}
            >
              <option value="" disabled>Select your role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>
          
          <button type="submit" className="submit-btn">Register</button><br/>
          <div className="register-link">
            <p>Don't have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
