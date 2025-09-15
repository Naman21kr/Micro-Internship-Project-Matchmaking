
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      const res = await axios.get('http://localhost:5001/api/projects?limit=3');
      setFeaturedProjects(res.data);
    };
    fetchFeaturedProjects();
  }, []);

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to the Micro-Internship & Project Matchmaking Platform</h1>
        <p>Find the perfect project or the right talent for your needs.</p>
        <Link to="/projects" className="btn btn-primary">Browse Projects</Link>
      </div>

      <div className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">1</div>
            <h3>Create Your Profile</h3>
            <p>Sign up as a student or a project owner and complete your profile.</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3>Browse & Apply</h3>
            <p>Browse through a wide range of projects and apply to the ones that interest you.</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>Collaborate & Succeed</h3>
            <p>Work with talented individuals and bring your project ideas to life.</p>
          </div>
        </div>
      </div>

      <div className="featured-projects-section">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {featuredProjects.map((project: any) => (
            <div key={project.id} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link to={`/projects/${project.id}`} className="btn btn-primary">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
