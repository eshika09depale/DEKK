import './About.css';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
  <> 
    <section id="about">
    <div class="about">
        <div class="right">
            <img src="./assets/img/quickskill.jpg" alt="" />
        </div>


        <div class="left">
            <p class="heading">About Us</p>
            <p>An "Quick Skill Website" the typically detail the mission, vision, and core values of an online learning platform, 
                explaining how they provide accessible, flexible education through a variety of digital courses, often highlighting their commitment to quality content, diverse instructors, and a user-friendly learning experience, and unique features that set quizes with gaming function.</p>

            <div class="point">
                <ul>
                    <li>User friendly platform.</li>
                    <li>Gamingfication for better learning.</li>
                    <li>Course are designed to meet the learning needs.</li>
                </ul>
            </div>

            <div class="btn">
            <Link className="nav-item nav-link" to="/userlogin"><h1><b>Get Started</b></h1></Link>
            </div>
        </div>
    </div>
</section>
  </>  
  );
}

export default About;
