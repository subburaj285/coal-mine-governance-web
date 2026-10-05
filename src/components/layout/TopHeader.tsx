import React from 'react';
import {
  Search,
  Bell,
  Download,
  Moon,
  Sun,
  Globe,
  User,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import {
  SubsidiaryId,
  UserRole,
  DateRangeType,
  Language
} from '../../types/dashboard';
import { SUBSIDIARIES } from '../../data/mockData';

interface TopHeaderProps {
  subsidiary: SubsidiaryId;
  onSelectSubsidiary: (sub: SubsidiaryId) => void;
  dateRange: DateRangeType;
  onSelectDateRange: (range: DateRangeType) => void;
  role: UserRole;
  onSelectRole: (role: UserRole) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  language: Language;
  onToggleLanguage: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenExport: () => void;
}

const ROLES_LIST: UserRole[] = [
  'Mine Manager',
  'Corporate Leadership',
  'Safety Officer',
  'Environment Officer',
  'Production Manager',
  'Maintenance Engineer',
  'Contractor Supervisor',
  'DGMS Inspector',
  'Control Room Operator'
];

export const TopHeader: React.FC<TopHeaderProps> = ({
  subsidiary,
  onSelectSubsidiary,
  dateRange,
  onSelectDateRange,
  role,
  onSelectRole,
  searchQuery,
  onSearchChange,
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenExport
}) => {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20 px-4 flex items-center justify-between gap-3 shadow-xs">
      
      {/* Search Input & Title */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search inspections, CMR 153 rules, colliery, violation notices..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>

      {/* Global Context Controls */}
      <div className="flex items-center gap-2.5">
        
        {/* Subsidiary Selector */}
        <div className="relative flex items-center">
          <select
            value={subsidiary}
            onChange={(e) => onSelectSubsidiary(e.target.value as SubsidiaryId)}
            className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {SUBSIDIARIES.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.id === 'ALL' ? 'Pan-India (All CIL)' : `${sub.id} - ${sub.name.split(' ')[0]}`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none text-slate-400" />
        </div>

        {/* Date Range Selector */}
        <div className="relative flex items-center">
          <select
            value={dateRange}
            onChange={(e) => onSelectDateRange(e.target.value as DateRangeType)}
            className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="Today">Today (24h)</option>
            <option value="Shift">Current Shift</option>
            <option value="Week">This Week</option>
            <option value="Month">This Month</option>
            <option value="Custom">Custom Range</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none text-slate-400" />
        </div>

        {/* Role Switcher */}
        <div className="relative flex items-center">
          <select
            value={role}
            onChange={(e) => onSelectRole(e.target.value as UserRole)}
            className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-bold bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            {ROLES_LIST.map((r) => (
              <option key={r} value={r}>
                Lens: {r}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none text-blue-500" />
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 my-auto" />

        {/* Actions: Language, DarkMode, Export, Notifications */}
        <button
          onClick={onToggleLanguage}
          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
          title="Toggle Language"
        >
          <Globe className="w-3.5 h-3.5 text-blue-500" />
          <span>{language}</span>
        </button>

        <button
          onClick={onToggleDarkMode}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Toggle Dark / Light Mode"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        <button
          onClick={onOpenExport}
          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
          title="Export Statutory Report"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Export</span>
        </button>

        <button
          onClick={onOpenNotifications}
          className="relative p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          )}
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold px-1 rounded-full">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
            <User className="w-4 h-4" />
          </div>
        </div>

      </div>

    </header>
  );
};
