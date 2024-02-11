import React from 'react';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import { Card } from 'antd';
import { Row, Col } from 'antd'
import Home from './components/Home/Home'; // Import the Home component
import Research from './components/Research/Research';
import RP1 from './components/Research/Projects/RP1';
import RP2 from './components/Research/Projects/RP2';
import RP3 from './components/Research/Projects/RP3';
import Art from './components/Art/Art';
import ProjectDetail from './components/ProjectDetail';
import { ResearchProvider } from './contexts/ResearchContext';

function App() {
  const { researchProjects } = useContext(ResearchContext);

  const handleProjectClick = (projectId) => {
    navigate(`/research/${projectId}`);
  };

  return (
    <ResearchProvider>
      <div className="App">
        <header className="App-header">
          <h1>Collected Works</h1>
          <Row justify="center" gutter={[16, 16]}>
            <Col>
              <Link to="/">   Home   </Link>
            </Col>
            <Col>
              <Link to="/research">   Research   </Link>
            </Col>
            <Col>
              <Link to="/art">   Art   </Link>
            </Col>
            {/* Add more Col components for additional links */}
          </Row>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/rp1" element={<RP1 />} />
          <Route path="/research/rp2" element={<RP2 />} />
          <Route path="/research/rp3" element={<RP3 />} />
          <Route path="/art" element={<Art />} />
          <Route path="/research/:projectId/:subProjectId" element={<ProjectDetail />} />
        </Routes>

        <footer className="App-footer">
          {/* <p>Footer content here.</p> */}
        </footer>
      </div>

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
    </ResearchProvider>
  );
}

export default App;
