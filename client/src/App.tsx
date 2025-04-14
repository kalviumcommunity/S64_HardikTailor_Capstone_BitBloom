import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages (create these files inside src/pages/)
import HomePage from './pages/Home';;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

      </Routes>
    </Router>
  );
};

export default App;
