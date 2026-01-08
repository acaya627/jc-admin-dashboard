import React from 'react';
import { Menu, Bell, Moon, Sun, ChevronDown, User } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  breadcrumbs: string[];
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, breadcrumbs }) => {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700 flex items-center justify-between h-16 px-6 z-20 transition-colors duration-200">
      <div className="flex items-center">
        <button className="md:hidden mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Menu />
        </button>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="mx-2">/</span>}
              <span className={index === breadcrumbs.length - 1 ? "font-medium text-gray-900 dark:text-white" : ""}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
          <User className="h-6 w-6" />
        </button>
        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-slate-900"></span>
        </button>
        
        <div className="relative inline-block text-left">
          <button className="inline-flex justify-center w-full rounded-md px-3 py-1 bg-white dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none border border-gray-200 dark:border-slate-600 items-center">
            English
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </div>

        <button 
          className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none" 
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header;