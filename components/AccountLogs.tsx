import React, { useState } from 'react';
import { Download, Printer, Search, RotateCcw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { AccountLog } from '../types';

interface AccountLogsProps {
  logs: AccountLog[];
  onViewDetails: (logId: string) => void;
}

const AccountLogs: React.FC<AccountLogsProps> = ({ logs, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const actionOptions = [
    "Log In",
    "Log Out",
    "Token Expired",
    "Register",
    "Update Phone Number",
    "Update KYC Status",
    "Update Profile Details",
    "Update Account Status",
    "Change Password",
    "Update Fund Account",
    "Update Betting Limit",
    "Update Self-Exclusion"
  ];

  const renderValueCell = (value: string | undefined, log: AccountLog) => {
    if (value === 'Details' && log.hasDetails) {
      return (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(log.id);
          }}
          className="text-primary hover:text-primary-dark underline font-medium"
        >
          Details
        </button>
      );
    }
    return <span className="text-gray-900 dark:text-gray-300" title={value}>{value || '-'}</span>;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-12 md:col-span-3">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Action</label>
            <select className="w-full border-gray-300 dark:border-slate-600 dark:bg-slate-800 rounded-md text-sm py-2 focus:border-primary focus:ring-primary dark:text-white">
              <option value="">Please enter a value</option>
              {actionOptions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
          
          <div className="col-span-12 md:col-span-5 flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Start Time</label>
              <input type="datetime-local" className="w-full border-gray-300 dark:border-slate-600 dark:bg-slate-800 rounded-md text-sm py-2 focus:border-primary focus:ring-primary dark:text-white" placeholder="MM-DD-YYYY hh:mm:ss" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">End Time</label>
              <input type="datetime-local" className="w-full border-gray-300 dark:border-slate-600 dark:bg-slate-800 rounded-md text-sm py-2 focus:border-primary focus:ring-primary dark:text-white" placeholder="MM-DD-YYYY hh:mm:ss" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 flex items-end gap-2">
             <div className="flex gap-2">
                {['Today', 'This Week', 'Last Week', 'This Month', 'Last Month'].map(period => (
                    <button key={period} className="px-2 py-2 border border-blue-200 dark:border-blue-900/30 rounded text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 whitespace-nowrap">
                        {period}
                    </button>
                ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
             <button className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center uppercase">
              RESET
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 flex items-center uppercase">
              SEARCH
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="flex justify-end p-2 border-b border-gray-200 dark:border-slate-700 gap-2 bg-gray-50 dark:bg-slate-800/50">
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
            <Printer size={18} />
          </button>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
            <Download size={18} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 font-medium text-gray-500 dark:text-gray-400 uppercase">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">No.</th>
                <th className="px-4 py-3 whitespace-nowrap">Time</th>
                <th className="px-4 py-3 whitespace-nowrap">Updated by</th>
                <th className="px-4 py-3 whitespace-nowrap">Action</th>
                <th className="px-4 py-3 whitespace-nowrap">Before Value</th>
                <th className="px-4 py-3 whitespace-nowrap">After Value</th>
                <th className="px-4 py-3 whitespace-nowrap">Remarks</th>
                <th className="px-4 py-3 whitespace-nowrap">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-700 text-gray-700 dark:text-gray-300">
              {logs.map((log) => (
                <tr 
                    key={log.id} 
                    className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{log.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{log.time}</td>
                  <td className="px-4 py-3">{log.updatedBy}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900 dark:text-white">
                        {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-[150px] truncate">
                      {renderValueCell(log.beforeValue, log)}
                  </td>
                  <td className="px-4 py-3 max-w-[150px] truncate">
                       {renderValueCell(log.afterValue, log)}
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">{log.remarks || '-'}</td>
                  <td className="px-4 py-3 font-mono text-gray-500">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 bg-red-50/10">
            <div>Rows per page: 10 <span className="mx-2">|</span> 1-10 of {logs.length}</div>
            <div className="flex items-center gap-4">
                <div className="flex gap-1">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"><ChevronLeft size={16} /></button>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded"><ChevronRight size={16} /></button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLogs;