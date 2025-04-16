import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import ExplorePage from './page/Explore';

const App: React.FC = () => {
  return (
    <div className="bitbloom-app">
      <Navbar />
      <div className="container">
        <ExplorePage />
      </div>
    </div>
  );
};

export default App;
