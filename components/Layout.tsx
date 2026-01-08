import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Initialize Dark Mode based on preference or local storage
  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  // Generate breadcrumbs based on path
  const generateBreadcrumbs = () => {
    const path = location.pathname;
    const crumbs = ['Home'];
    
    if (path === '/') {
      crumbs.push('Player List');
    } else if (path.startsWith('/player/')) {
        crumbs.push('Player List', 'Player Details');
    }
    
    return crumbs;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-slate-950 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            breadcrumbs={generateBreadcrumbs()}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;