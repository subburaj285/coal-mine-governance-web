import React from 'react';
import {
  Search,
  Bell,
  Download,
  Moon,
  Sun,
  Globe,
  User,
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
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20 px-4 flex items-center justify-between gap-3 shadow-2xs select-none">
      
      {/* Brand Identity & Title */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col">
          <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white font-mono">
            MINE FORGE
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            Smart Governance Platform
          </span>
        </div>
      </div>

      {/* Global Context Controls */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        
        {/* Global Search Bar */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search cases, rules, colliery..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-8 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 pointer-events-none">
            ⌘K
          </kbd>
        </div>

        {/* Subsidiary Selector */}
        <div className="relative flex items-center">
          <select
            value={subsidiary}
            onChange={(e) => onSelectSubsidiary(e.target.value as SubsidiaryId)}
            className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
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
        <div className="relative hidden sm:flex items-center">
          <select
            value={dateRange}
            onChange={(e) => onSelectDateRange(e.target.value as DateRangeType)}
            className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
          >
            <option value="Today">Today (24h)</option>
            <option value="Shift">Current Shift</option>
            <option value="Week">This Week</option>
            <option value="Month">This Month</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none text-slate-400" />
        </div>

        {/* Role Switcher Lens */}
        <div className="relative flex items-center">
          <select
            value={role}
            onChange={(e) => onSelectRole(e.target.value as UserRole)}
            className="appearance-none pl-3 pr-7 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white cursor-pointer focus:outline-none"
          >
            {ROLES_LIST.map((r) => (
              <option key={r} value={r}>
                Lens: {r}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-2 pointer-events-none text-slate-400" />
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 my-auto" />

        {/* Actions: Language, DarkMode, Export, Notifications */}
        <button
          onClick={onToggleLanguage}
          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
          title="Toggle Language"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>{language}</span>
        </button>

        <button
          onClick={onToggleDarkMode}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
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
          className="relative p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold px-1 rounded-full">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
        </div>

      </div>

    </header>
  );
};
