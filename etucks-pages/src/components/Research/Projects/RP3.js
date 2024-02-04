// Project3.js
import React from 'react';
import { Link } from 'react-router-dom';

const subProjects = [
    // ...sub-project data with unique IDs...
];

function RP3() {
    return (
      <div>
        <h2>Project RP3</h2>
        {subProjects.map(subProject => (
          <div key={subProject.id}>
            <Link to={`/research/rp3/${subProject.id}`}>{subProject.title}</Link>
            {/* Display brief info if needed */}
          </div>
        ))}
      </div>
    );
}

export default RP3;
