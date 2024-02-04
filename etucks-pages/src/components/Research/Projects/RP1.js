// Project1.js
import React, { useContext } from 'react';
import { ResearchContext } from '../../../contexts/ResearchContext';
import { Link } from 'react-router-dom';

const subProjects = [
    // ...sub-project data with unique IDs...
];

function RP1() {
    const { researchProjects } = useContext(ResearchContext);
    const project = researchProjects.find(p => p.id === 'rp1');
  
    if (!project || !project.subProjects) {
      return <div>Project or sub-projects not found.</div>;
    }
  
    return (
      <div>
        <h2>Project RP1</h2>
        {project.subProjects.map(subProject => (
          <div key={subProject.id}>
            <Link to={`/research/rp1/${subProject.id}`}>{subProject.title}</Link>
          </div>
        ))}
      </div>
    );
  }

export default RP1;
