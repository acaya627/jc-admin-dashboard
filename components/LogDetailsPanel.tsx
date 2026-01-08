import React from 'react';
import { X } from 'lucide-react';
import { LogDetailData } from '../types';

interface LogDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: LogDetailData | null;
}

const LogDetailsPanel: React.FC<LogDetailsPanelProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop */}
        <div 
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
            aria-hidden="true" 
            onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel */}
        <div className="inline-block align-bottom bg-white dark:bg-slate-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                className="bg-white dark:bg-slate-900 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <div className="bg-white dark:bg-slate-900 px-4 pt-5 pb-4 sm:p-6">
                <div className="mt-3 sm:mt-0 text-left w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-x divide-gray-200 dark:divide-slate-700">
                        
                        {/* Before Section */}
                        <div className="pr-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-6">
                                Personal Information (Before)
                            </h3>
                            <div className="space-y-0 divide-y divide-gray-100 dark:divide-slate-800">
                                {data.items.map((item, idx) => (
                                    <div key={`before-${idx}`} className="flex justify-between py-3 text-sm">
                                        <span className="text-gray-500 dark:text-gray-400 font-normal w-1/3">{item.field}</span>
                                        <span className="text-gray-900 dark:text-white font-medium text-right w-2/3 break-words">
                                            {item.before || <span className="text-gray-300">-</span>}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* After Section */}
                        <div className="pl-4 md:pl-8">
                             <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-6">
                                Personal Information (After)
                            </h3>
                            <div className="space-y-0 divide-y divide-gray-100 dark:divide-slate-800">
                                {data.items.map((item, idx) => (
                                    <div key={`after-${idx}`} className="flex justify-between py-3 text-sm">
                                        <span className="text-gray-500 dark:text-gray-400 font-normal w-1/3">{item.field}</span>
                                        <span className="text-gray-900 dark:text-white font-medium text-right w-2/3 break-words">
                                            {item.after || <span className="text-gray-300">-</span>}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LogDetailsPanel;