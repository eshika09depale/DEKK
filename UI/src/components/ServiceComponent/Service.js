import React from 'react';
import './Service.css';
import { Link } from 'react-router-dom';
const CourseSection = () => {
  return (
    <>
    {/* Features Section */}
    <div className="features-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Why Choose <span className="text-success">Quick Skill</span>?</h2>
            <p className="section-subtitle">We provide a comprehensive learning ecosystem</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fa fa-book"></i>
                </div>
                <h3>E-Library Access</h3>
                <p>Access thousands of eBooks, articles, and resources to support your learning journey.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fa fa-laptop"></i>
                </div>
                <h3>Interactive Courses</h3>
                <p>Engage with our interactive courses designed by industry experts for practical learning.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fa fa-chart-line"></i>
                </div>
                <h3>Progress Tracking</h3>
                <p>Monitor your progress with detailed assessments and performance analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature Section End */}
         {/* Call to Action */}
         <div className="cta-section py-5">
        <div className="container">
          <div className="cta-container text-center p-5">
            <h2 className="mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="lead mb-4">Join thousands of students who have already transformed their careers with Quick Skill.</p>
            <Link to="/register" className="btn btn-success btn-lg px-5 py-3">Register Now</Link>
          </div>
        </div>
      </div>
      </>
  )
};

export default CourseSection;
