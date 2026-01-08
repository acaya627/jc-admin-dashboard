import React from 'react';
import { Filter, Search, RotateCcw, Edit, Download, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Player, AccountStatus, KYCStatus } from '../types';

const MOCK_PLAYERS: Player[] = [
  {
    id: "d4vp2mogm2ks73e1brdg",
    shortId: "499213573366",
    fullName: "Juan Dela Cruz",
    phone: "9123333333",
    email: "juan@example.com",
    status: AccountStatus.Active,
    isPaid: true,
    kycStatus: KYCStatus.Approved,
    walletBalance: 7000.00,
    lastLogin: "11-20-2025 14:30",
    lastDeposit: "11-20-2025 14:30",
    registrationTime: "11-03-2025 09:15"
  },
  {
    id: "user2",
    shortId: "027934623169",
    fullName: "Maria Santos",
    phone: "9871122334",
    email: "maria.s@test.com",
    status: AccountStatus.Inactive,
    isPaid: false,
    kycStatus: KYCStatus.NotSet,
    walletBalance: 0.00,
    lastLogin: "11-21-2025 08:00",
    lastDeposit: "-",
    registrationTime: "11-21-2025 08:00"
  },
  {
    id: "user3",
    shortId: "775185249134",
    fullName: "Jose Rizal",
    phone: "9199218932",
    email: "jose.rizal@ph.com",
    status: AccountStatus.SelfExclusion,
    isPaid: false,
    kycStatus: KYCStatus.Expired,
    walletBalance: 0.00,
    lastLogin: "11-25-2025 10:12",
    lastDeposit: "11-10-2025 09:30",
    registrationTime: "11-25-2025 10:12",
    banReason: "Player Request"
  },
  {
    id: "user4",
    shortId: "150016184295",
    fullName: "Andres Bonifacio",
    phone: "9998887776",
    email: "kkk@supremo.com",
    status: AccountStatus.UnderReview,
    isPaid: true,
    kycStatus: KYCStatus.Verifying,
    walletBalance: 500.00,
    lastLogin: "11-25-2025 11:30",
    lastDeposit: "11-25-2025 11:15",
    registrationTime: "11-25-2025 11:00",
    banReason: "Suspicious Activity"
  },
  {
    id: "user5",
    shortId: "535066382046",
    fullName: "Emilio Aguinaldo",
    phone: "9999988888",
    email: "emilio@first.com",
    status: AccountStatus.Locked,
    isPaid: false,
    kycStatus: KYCStatus.Disapproved,
    walletBalance: 0.00,
    lastLogin: "11-25-2025 14:00",
    lastDeposit: "-",
    registrationTime: "11-25-2025 13:50",
    banReason: "Multi Account"
  }
];

const PlayerList: React.FC = () => {
  
  // Refined Color Logic based on specs
  const getStatusColor = (status: AccountStatus) => {
    switch(status) {
      case AccountStatus.Active: 
        // Active: bg-[#F0FBE6], text-[#3F8111] (Using a green text for readability instead of pink/red)
        return 'bg-[#F0FBE6] text-[#3F8111] border border-[#F0FBE6]'; 
      case AccountStatus.Inactive: 
        // Inactive: bg-[#FEEFF2], text-[#F36685]
        return 'bg-[#FEEFF2] text-[#F36685] border border-[#FEEFF2]';
      default: 
        // Others: bg-[#F3F5F9], text-[#859BC7]
        return 'bg-[#F3F5F9] text-[#859BC7] border border-[#F3F5F9]';
    }
  };

  const getKycColor = (status: KYCStatus) => {
    switch(status) {
      case KYCStatus.Approved: return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
      case KYCStatus.Verifying: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
      case KYCStatus.Pending: return 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300';
      case KYCStatus.Disapproved: return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
      case KYCStatus.Expired: return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case KYCStatus.NotSet: return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Filter Card */}
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Filter className="mr-2 text-primary h-5 w-5" />
            Player List Filter
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Player Short ID</label>
            <input type="text" className="w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:text-white sm:text-sm" placeholder="Enter ID" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input type="text" className="w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:text-white sm:text-sm" placeholder="Enter Phone" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" className="w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:text-white sm:text-sm" placeholder="Enter Email" />
          </div>
          
          {/* Status Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Status</label>
            <select className="w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:text-white sm:text-sm">
              <option value="">All Statuses</option>
              {Object.values(AccountStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">KYC Status</label>
            <select className="w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:text-white sm:text-sm">
              <option value="">All Statuses</option>
              {Object.values(KYCStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
          {/* Is Paid Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paid Player</label>
            <select className="w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-800 dark:text-white sm:text-sm">
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Registration Time</label>
            <div className="flex items-center space-x-2">
                <input type="datetime-local" className="flex-1 rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm focus:border-primary focus:ring-primary" />
                <span className="text-gray-500">-</span>
                <input type="datetime-local" className="flex-1 rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:text-sm focus:border-primary focus:ring-primary" />
            </div>
          </div>
          
        </div>

        <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 dark:border-slate-700 pt-4">
          <button className="px-4 py-2 border border-gray-300 dark:border-slate-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center">
             <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </button>
          <button className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark flex items-center">
             <Search className="mr-2 h-4 w-4" /> Search
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-slate-900 shadow rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            <div className="flex space-x-4 text-sm text-gray-500">
                <span className="font-medium">{MOCK_PLAYERS.length} Records Found</span>
            </div>
            <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <LayoutGrid size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <Download size={20} />
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">Action</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Short ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Full Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Paid</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">KYC</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Balance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registered</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-900 divide-y divide-gray-200 dark:divide-slate-700">
                    {MOCK_PLAYERS.map(player => (
                        <tr key={player.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <Link to={`/player/${player.id}`} className="text-gray-400 hover:text-primary transition-colors">
                                    <Edit size={18} />
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{player.shortId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{player.fullName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{player.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{player.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(player.status)}`}>
                                    {player.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${player.isPaid ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                    {player.isPaid ? 'Yes' : 'No'}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getKycColor(player.kycStatus)}`}>
                                    {player.kycStatus}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">₱ {player.walletBalance.toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">{player.registrationTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;