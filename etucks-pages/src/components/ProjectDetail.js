import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ResearchContext } from '../contexts/ResearchContext';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../App.css';
  
function ProjectDetail() {
    let { projectId, subProjectId } = useParams();
    const { researchProjects } = useContext(ResearchContext);
  
    // Find the project and sub-project based on the URL parameters
    const project = researchProjects.find(p => p.id === projectId);
    const subProject = project?.subProjects?.find(sp => sp.id === subProjectId);
  
    if (!subProject) {
      return <div>Sub-project not found.</div>;
    }
  
    const renderContentElement = (element) => {
      console.log('Rendering element:', element);
      switch (element.type) {
        case 'text':
          return <p>{element.value}</p>;
        case 'image':
          return <img src={element.src} alt={element.alt} />;
        case 'markdown':
          return (
            <div className="markdown-container">
              <ReactMarkdown 
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {element.value}
              </ReactMarkdown>
            </div>
          );
      //   case 'animation':
      //     return <MyCustomAnimation id={element.animationId} />;
        default:
          return null;
      }
    };

  return (
    <div>
      <h2>{subProject.title}</h2>
      {subProject.content.map((element, index) => (
        <div key={index}>{renderContentElement(element)}</div>
      ))}
    </div>
  );
}

export default ProjectDetail;
