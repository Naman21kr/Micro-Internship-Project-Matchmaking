
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get('http://localhost:5001/api/projects');
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project: any) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-container">
      <h1>Projects</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for projects..."
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="projects-grid">
        {filteredProjects.map((project: any) => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button className="btn btn-primary">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
