import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, PiggyBank, Banknote, TrendingDown, Phone, ShieldCheck, Settings } from 'lucide-react';
import AccountLogs from '../components/AccountLogs';
import LogDetailsPanel from '../components/LogDetailsPanel';
import { AccountLog, LogDetailData, AccountStatus } from '../types';

// Mock Data for Logs
const MOCK_LOGS: AccountLog[] = [
  { 
      id: 'ACCLOG-32', 
      time: '01-14-2024 15:58:30', 
      updatedBy: 'Kikira777', 
      action: 'Update Account Status', 
      beforeValue: 'Self-Exclusion',
      afterValue: 'Active',
      remarks: 'Player Regrets', 
      ip: '2001:b030:1253::1', 
      hasDetails: false 
  },
  { 
      id: 'ACCLOG-31', 
      time: '01-14-2024 14:02:10', 
      updatedBy: '236988445179', // Updated
      action: 'Token Expired', 
      beforeValue: '-',
      afterValue: '-',
      remarks: 'Ban', // Updated
      ip: '123.100.200.100', 
      hasDetails: false 
  },
  { 
      id: 'ACCLOG-30', 
      time: '01-14-2024 10:58:30', 
      updatedBy: '236988445179', 
      action: 'Update Account Status', 
      beforeValue: 'Active',
      afterValue: 'Self-Exclusion',
      remarks: '-', 
      ip: '123.100.200.300', 
      hasDetails: false 
  },
  { 
      id: 'ACCLOG-29', 
      time: '01-14-2024 10:58:30', 
      updatedBy: '236988445179', 
      action: 'Update Self-Exclusion', 
      beforeValue: '-',
      afterValue: '01-14-2024 - 12-12-2026',
      remarks: '-', 
      ip: '123.100.200.300', 
      hasDetails: false 
  },
  { 
      id: 'ACCLOG-28', 
      time: '01-13-2024 09:58:30', 
      updatedBy: '236988445179', 
      action: 'Update Betting Limit', 
      beforeValue: '100,000',
      afterValue: '0',
      remarks: 'Daily', 
      ip: '123.100.200.300', 
      hasDetails: false 
  },
  { 
      id: 'ACCLOG-22', 
      time: '01-13-2024 09:28:30', 
      updatedBy: 'Naomi', 
      action: 'Update Profile Details', 
      beforeValue: 'Nokki@example.com',
      afterValue: 'Naoki@example.com',
      remarks: 'Email', 
      ip: '123.100.200.100', 
      hasDetails: false // Updated: don't click to appear panel
  },
  { 
      id: 'ACCLOG-11', 
      time: '01-12-2024 07:20:30', 
      updatedBy: '236988445179', 
      action: 'Update Profile Details', 
      beforeValue: 'Details',
      afterValue: 'Details',
      remarks: '-', 
      ip: '123.100.200.300', 
      hasDetails: true // New Entry
  },
  { 
      id: 'ACCLOG-12', 
      time: '01-12-2024 07:50:30', 
      updatedBy: '236988445179', 
      action: 'Update KYC Status', 
      beforeValue: 'Not Set',
      afterValue: 'Pending',
      remarks: '-', 
      ip: '2001:b030:1253::1', 
      hasDetails: false 
  },
];

const MOCK_PROFILE_DETAILS: LogDetailData = {
  logId: 'ACCLOG-11',
  items: [
    { field: 'Name', before: 'Naomi Francisca Takamaki', after: 'Naomi Francisca Takamaki' },
    { field: 'Date of Birth', before: 'MM/DD/YYYY', after: 'MM/DD/YYYY' },
    { field: 'Gender', before: 'Male', after: 'Male' },
    { field: 'Place of Birth', before: 'Manila', after: 'Manila' },
    { field: 'Nationality', before: 'Philippine', after: 'Philippine' },
    { field: 'Source of Income', before: 'Self-Employed', after: 'Self-Employed' },
    { field: 'Nature of Work', before: 'Jewelry / Precious Stones & Metals Trading', after: 'Jewelry / Precious Stones & Metals Trading' },
    { field: 'Current Address', before: '4th Street Pasay, Metro Manila Philippines', after: '4th Street Pasay, Metro Manila Philippines' },
    { field: 'Permanent Address', before: '4th Street Pasay, Metro Manila Philippines', after: '4th Street Pasay, Metro Manila Philippines' },
  ]
};

const PlayerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'wallet' | 'logs' | 'remarks'>('summary');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogPanelOpen, setIsLogPanelOpen] = useState(false);
  const [selectedLogData, setSelectedLogData] = useState<LogDetailData | null>(null);

  const handleViewLogDetails = (logId: string) => {
    // In a real app, fetch data based on logId
    // For prototype, we just use the MOCK_PROFILE_DETAILS for ACCLOG-11
    if (logId === 'ACCLOG-11') {
        setSelectedLogData({ ...MOCK_PROFILE_DETAILS, logId });
        setIsLogPanelOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">354178664893</h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <Phone size={18} className="mr-1" />
                <span className="font-medium text-lg">(9171234567)</span>
              </div>
              {/* Active Badge - Green based on new logic */}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-[#F0FBE6] text-[#3F8111] border border-[#F0FBE6]">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-lg">Naomi Takamaki</span>
              <span className="ml-2 text-sm font-medium bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">(NAOKI)</span>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm text-sm uppercase flex items-center transition-colors"
          >
            <Settings size={18} className="mr-2" />
            Adjust Account Status
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-t-xl px-4 shadow-sm mt-2">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {[
            { id: 'summary', label: 'Account Summary' },
            { id: 'wallet', label: 'Wallet & Finance' },
            { id: 'logs', label: 'Account Log' },
            { id: 'remarks', label: 'Staff Remarks' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={<Wallet />} label="Main Wallet Balance" value="₱ 123,456.00" />
              <StatCard icon={<PiggyBank />} label="Total Deposit" value="₱ 123,456.00" />
              <StatCard icon={<Banknote />} label="Total Withdrawal" value="₱ 123,456.00" />
              <StatCard icon={<TrendingDown className="text-red-500" />} label="Player Win/Loss" value="- 123,456.00" valueColor="text-red-500" />
            </div>

            {/* Detail Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <DetailSection title="Account Summary" color="blue">
                <DetailRow label="Player Short ID" value="354178664893" />
                <DetailRow label="Player ID" value="d4vp2mogm2ks73e1brdg" />
                <DetailRow label="Full Name" value="Naomi Takamaki" />
                <DetailRow label="KYC Status" value="Not Set" valueClass="text-yellow-600 dark:text-yellow-500" />
                <DetailRow label="Branch" value="TO - Test Outlet" />
                <div className="border-t border-gray-200 dark:border-slate-700 my-2"></div>
                <DetailRow label="Registration Time" value="12-15-2025 12:40:59" />
                <DetailRow label="Registration IP" value="123.0.123.123" />
                <DetailRow label="Registration Device ID" value="AB1234CD-E123-12FG-J123" />
                <div className="border-t border-gray-200 dark:border-slate-700 my-2"></div>
                <DetailRow label="Last Login Time" value="12-15-2025 12:40:59" />
                <DetailRow label="Last Login IP" value="123.0.123.123" />
                <DetailRow label="Last Login Device ID" value="AB1234CD-E123-12FG-J123" />
              </DetailSection>

              <div className="space-y-6">
                <DetailSection title="Finance Summary" color="purple">
                  <DetailRow label="First Deposit Time" value="12-15-2025 12:40:59" />
                  <DetailRow label="Last Deposit Time" value="12-15-2025 12:40:59" />
                  <DetailRow label="Last Bet Time" value="12-15-2025 12:40:59" />
                </DetailSection>

                <DetailSection title="Personal Info & Security" color="purple">
                    <DetailRow label="Nickname" value="NAOKI" />
                    <DetailRow label="Birthday" value="12-15-2002" />
                    <DetailRow label="Gender" value="Male" />
                    <DetailRow label="Account Password" value="-" />
                    <DetailRow label="Wallet Password" value="******" />
                    <DetailRow label="Email" value="NAOKI.N@example.com" />
                    <DetailRow label="Linked Providers" value="-" />
                </DetailSection>
              </div>

               <DetailSection 
                    title="Betting Limit" 
                    color="red" 
                    headerRight={<span className="text-xs text-gray-400 font-normal">Last Update Time: 12-15-2025 12:40:59</span>}
               >
                <DetailRow label="Daily Limit" value="123,456.00" />
                <DetailRow label="Weekly Limit" value="123,456,789.00" />
                <DetailRow label="Monthly Limit" value="123,456.00" />
              </DetailSection>

               <DetailSection title="Self Exclusion" color="red">
                <DetailRow label="Start Date" value="12-15-2025 12:40:59" />
                <div className="flex justify-center my-1"><span className="text-gray-400">↓</span></div>
                <DetailRow label="End Date" value="12-15-2025 12:40:59" />
              </DetailSection>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <AccountLogs logs={MOCK_LOGS} onViewDetails={handleViewLogDetails} />
        )}
        
        {activeTab === 'wallet' && <div className="p-12 text-center text-gray-500">Wallet & Finance Module Placeholder</div>}
        {activeTab === 'remarks' && <div className="p-12 text-center text-gray-500">Remarks Module Placeholder</div>}
      </div>

      {/* Slide Over Panel */}
      <LogDetailsPanel isOpen={isLogPanelOpen} onClose={() => setIsLogPanelOpen(false)} data={selectedLogData} />

      {/* Adjust Status Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-slate-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-200 dark:border-slate-700">
              <div className="bg-white dark:bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  Adjust Account Status
                </h3>
                <div className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Status</label>
                        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md dark:bg-slate-800 dark:text-white">
                            {Object.values(AccountStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Reason <span className="text-red-500">*</span></label>
                        <textarea rows={3} className="mt-1 block w-full border border-gray-300 dark:border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-800 dark:text-white"></textarea>
                    </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Update
                </button>
                <button 
                    type="button" 
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-slate-600 shadow-sm px-4 py-2 bg-white dark:bg-slate-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components for Dashboard
const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; valueColor?: string }> = ({ icon, label, value, valueColor }) => (
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-4 flex items-center transition-transform hover:scale-[1.02]">
    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-400 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</p>
      <p className={`text-xl font-bold mt-1 ${valueColor || 'text-gray-900 dark:text-white'}`}>{value}</p>
    </div>
  </div>
);

const DetailSection: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    color: 'blue' | 'purple' | 'red';
    headerRight?: React.ReactNode; 
}> = ({ title, children, color, headerRight }) => {
    const borderColor = color === 'blue' ? 'border-l-blue-500' : color === 'purple' ? 'border-l-purple-500' : 'border-l-red-500';
    return (
        <div className={`bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-y border-r border-gray-200 dark:border-slate-700 border-l-4 ${borderColor} p-5`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
                {headerRight}
            </div>
            <div className="space-y-1">
                {children}
            </div>
        </div>
    );
};

const DetailRow: React.FC<{ label: string; value: string; valueClass?: string }> = ({ label, value, valueClass }) => (
    <div className="flex justify-between py-2 border-b border-dashed border-gray-200 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/30 px-2 rounded">
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        <span className={`text-sm font-medium ${valueClass || 'text-gray-900 dark:text-white'} text-right`}>{value}</span>
    </div>
);

export default PlayerDashboard;