import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h4 className="text-success">Quick Skill</h4>
            <p>Empowering professionals through quality education and skill development since 2020.</p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-4 col-6">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/service">Services</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-4 col-6">
            <h5>Courses</h5>
            <ul className="footer-links">
              <li><a href="#">Course</a></li>
              <li><a href="#">Library</a></li>
              <li><a href="#">Quizess</a></li>
              <li><a href="#">Result</a></li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-4">
            <h5>Contact Info</h5>
            <ul className="contact-info">
              <li><i className="fa fa-map-marker-alt"></i> 123 Education Street, Learning City</li>
              <li><i className="fa fa-phone"></i> +91 6261493636</li>
              <li><i className="fa fa-envelope"></i> DEKK@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <hr className="mt-4 mb-4" />
        
        <div className="row">
          <div className="col-md-6">
            <p className="mb-md-0">© 2025 Quick Skill. All Rights Reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <ul className="terms-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;