import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResearchContext } from '../contexts/ResearchContext';
import ReactMarkdown from 'react-markdown';
import Prism from 'prismjs';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "../prism-overrides.css";
import '../App.css';


  
function ProjectDetail() {
    let { projectId, subProjectId } = useParams();
    const { researchProjects } = useContext(ResearchContext);
    const [codeContent, setCodeContent] = useState('');
    const [showCode, setShowCode] = useState(false);
  
    useEffect(() => {
      Prism.highlightAll();
    }, [codeContent, showCode]);

    // Find the project and sub-project based on the URL parameters
    const project = researchProjects.find(p => p.id === projectId);
    const subProject = project?.subProjects?.find(sp => sp.id === subProjectId);
  
    if (!subProject) {
      return <div>Sub-project not found.</div>;
    }

    const toggleCodeVisibility = (codePath) => {
      if (showCode) {
        setShowCode(false); // If code is currently shown, simply hide it
      } else {
        // Only fetch code if it hasn't been fetched yet
        if (!codeContent) {
          fetch(codePath)
            .then(response => response.text())
            .then(code => {
              setCodeContent(code); // Save the fetched code
              setShowCode(true); // Show the code box
            })
            .catch(error => {
              console.error('Error fetching code:', error);
            });
        } else {
          setShowCode(true); // If code has already been fetched, just show it
        }
      }
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
            <button onClick={() => toggleCodeVisibility(element.src)}>Toggle Code</button>
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
        <div className="code-container" style={{ /* Your styling here */ }}>
          <pre style={{ margin: 0 }}><code className="language-python">{codeContent}</code></pre>
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
