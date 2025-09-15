
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details-container">
      <div className="project-header">
        <h1>{project.title}</h1>
      </div>
      <div className="project-content">
        <div className="project-description">
          <h2>Description</h2>
          <p>{project.description}</p>
        </div>
        <div className="project-meta">
          <h2>Details</h2>
          <ul>
            <li><strong>Created by:</strong> {project.owner?.name}</li>
            <li><strong>Skills required:</strong> {project.skills?.join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
