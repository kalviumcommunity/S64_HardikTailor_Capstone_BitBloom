import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ResourcesPage from '../src/page/resourcePage';
import ExplorePage from '../src/page/Explore';
import UploadResource from './page/uploadResource';
import ResourceDetails from './components/resourceDeatils';
import HomePage from './page/Home';
import OpenSource from './page/openSource';
import Auth from './page/auth';
import CodingPage from './page/codingPage';
import UploadProject from './page/uploadProject';
import ProjectFeed from './page/projectFeed';
import ResourceFeed from './page/resourceFeed';
import ProtectedRoute from './components/ProtectedRoute'; 

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<ExplorePage />} />
      <Route path="/auth" element={<Auth />} />

      {/* Protected Routes */}
      <Route path="/resource" element={<ProtectedRoute> <ResourcesPage/> </ProtectedRoute>} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/opensource"
        element={<ProtectedRoute> <OpenSource /> </ ProtectedRoute>
        }
      />
      <Route
        path="/uploadresource"
        element={
          <ProtectedRoute>
            <UploadResource />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resources/:id"
        element={
          <ProtectedRoute>
            <ResourceDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/uploadproject"
        element={
          <ProtectedRoute>
            <UploadProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/coding"
        element={
          <ProtectedRoute>
            <CodingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectFeed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resources-feed"
        element={
          <ProtectedRoute>
            <ResourceFeed />
          </ProtectedRoute>
        }
      />

      {/* If the user types something invalid, redirect to Explore */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
