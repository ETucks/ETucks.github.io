import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { ResearchContext } from '../../contexts/ResearchContext';

function Research() {
  const { researchProjects } = useContext(ResearchContext);

  let navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/research/${projectId}`);
  };

  return (
    <div>
      <h2>Research Projects</h2>
      <div className="research-preview-container">
        {researchProjects.map((project) => (
          <Card
            key={project.id}
            className="research-card" // Add this line
            hoverable
            cover={<img alt={project.title} src={project.image} />}
            onClick={() => handleProjectClick(project.id)}
          >
            <Card.Meta title={project.title} description={project.description} />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Research;
