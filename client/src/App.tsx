import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import ResourcesPage from '../src/page/resourcePage';
import ExplorePage from '../src/page/Explore';
import UploadResource from './page/uploadResource';
import ResourceDetails from './page/resourceDeatils';
import HomePage from './page/Home';
import OpenSource from './page/projectPage';
import Auth from './page/auth';


const App: React.FC = () => {
  return (
      <Routes>
        <Route path = '/' element= {<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/resource" element={<ResourcesPage />} />
        <Route path ="/opensource" element={<OpenSource />} />
        <Route path='/uploadresource' element={<UploadResource />} />
        <Route path="/resources/:id" element={<ResourceDetails />} />
        <Route path ="/auth" element={<Auth />} />
      </Routes>
  );
};

export default App;
