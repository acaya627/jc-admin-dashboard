import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PlayerList from './pages/PlayerList';
import PlayerDashboard from './pages/PlayerDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PlayerList />} />
          <Route path="player/:id" element={<PlayerDashboard />} />
          {/* Fallback */}
          <Route path="*" element={<div className="p-4 text-center">404 - Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;