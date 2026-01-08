import React from 'react';
import { 
  Users, FileText, CreditCard, Gamepad2, Megaphone, Store, BarChart3, Layout, Settings, ChevronDown, Info 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 flex-shrink-0 transition-colors duration-200 h-full">
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          JC<span className="text-primary">Admin</span>
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {/* Player Management Group */}
          <div>
            <button className="w-full group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-800">
              <div className="flex items-center">
                <Users className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                Player Management
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            <div className="space-y-1 mt-1 pl-10">
              <Link 
                to="/" 
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive('/') && location.pathname === '/' || location.pathname.startsWith('/player')
                    ? 'text-primary bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Player List
              </Link>
              <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white">
                KYC Center
              </a>
            </div>
          </div>

          <NavItem icon={<CreditCard size={20} />} label="Finance" />
          <NavItem icon={<Gamepad2 size={20} />} label="Games" />
          <NavItem icon={<Megaphone size={20} />} label="Marketing" />
          <NavItem icon={<Store size={20} />} label="Shops" />
          <NavItem icon={<BarChart3 size={20} />} label="Reports" />
          <NavItem icon={<Layout size={20} />} label="Frontend" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
          <Info className="mr-1 h-4 w-4" />
          v0.9.0-1209-1
        </div>
        <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
          Logout
        </button>
      </div>
    </aside>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <a href="#" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white">
    <span className="mr-3 text-gray-500 dark:text-gray-400 group-hover:text-gray-500">
      {icon}
    </span>
    {label}
    <span className="ml-auto text-gray-400 text-xs">
      <ChevronDown className="h-4 w-4 -rotate-90" />
    </span>
  </a>
);

export default Sidebar;