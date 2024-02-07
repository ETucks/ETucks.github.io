import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResearchContext } from '../contexts/ResearchContext';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../App.css';
import 'prismjs/themes/prism-okaidia.css';
import Prism from 'prismjs';

  
function ProjectDetail() {
    let { projectId, subProjectId } = useParams();
    const { researchProjects } = useContext(ResearchContext);
    const [codeContent, setCodeContent] = useState('');
    const [showCode, setShowCode] = useState(false);
  
    // Find the project and sub-project based on the URL parameters
    const project = researchProjects.find(p => p.id === projectId);
    const subProject = project?.subProjects?.find(sp => sp.id === subProjectId);
  
    if (!subProject) {
      return <div>Sub-project not found.</div>;
    }

    useEffect(() => {
      Prism.highlightAll();
    }, [codeContent, showCode]);

    const displayCode = (codePath) => {
      fetch(codePath)
        .then(response => response.text())
        .then(code => {
          setCodeContent(code);
          setShowCode(true); // Show the code box after fetching the code
        })
        .catch(error => {
          console.error('Error fetching code:', error);
        });
    };
  
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
        case 'code':
          return (
            <button onClick={() => displayCode(element.src)}>Show Code</button>
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
      {showCode && (
        <div className="code-container" style={{ backgroundColor: '#282c34', color: '#abb2bf', padding: '20px', borderRadius: '5px', overflowX: 'auto' }}>
          <pre style={{ margin: 0 }}><code className="language-python">{codeContent}</code></pre> {/* Add language class */}
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
