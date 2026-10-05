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
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-20 px-3 sm:px-5 flex items-center justify-between gap-2 shadow-2xs select-none max-w-full overflow-x-auto no-scrollbar">
      
      {/* Brand Identity & Title */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="flex flex-col min-w-0">
          <span className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white font-mono truncate">
            MINE FORGE
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate hidden sm:inline">
            Smart Governance Platform
          </span>
        </div>
      </div>

      {/* Global Context Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        
        {/* Global Search Bar */}
        <div className="relative hidden lg:block w-36 xl:w-56">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search cases, rules..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-7 pr-7 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
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
            className="appearance-none pl-2.5 pr-6 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none max-w-[120px] sm:max-w-[150px] truncate"
          >
            {SUBSIDIARIES.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.id === 'ALL' ? 'Pan-India (All)' : `${sub.id} - ${sub.name.split(' ')[0]}`}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-1.5 pointer-events-none text-slate-400" />
        </div>

        {/* Period Selector */}
        <div className="relative hidden xl:flex items-center">
          <select
            value={dateRange}
            onChange={(e) => onSelectDateRange(e.target.value as DateRangeType)}
            className="appearance-none pl-2.5 pr-6 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer focus:outline-none"
          >
            <option value="Today">Today (24h)</option>
            <option value="Shift">Current Shift</option>
            <option value="Week">This Week</option>
            <option value="Month">This Month</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-1.5 pointer-events-none text-slate-400" />
        </div>

        {/* Role Switcher Lens */}
        <div className="relative flex items-center">
          <select
            value={role}
            onChange={(e) => onSelectRole(e.target.value as UserRole)}
            className="appearance-none pl-2.5 pr-6 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white cursor-pointer focus:outline-none max-w-[120px] sm:max-w-[150px] truncate"
          >
            {ROLES_LIST.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 absolute right-1.5 pointer-events-none text-slate-400" />
        </div>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 my-auto hidden sm:block" />

        {/* Actions: Language, DarkMode, Export, Notifications */}
        <button
          onClick={onToggleLanguage}
          className="px-2 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          title="Toggle Language"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>{language}</span>
        </button>

        <button
          onClick={onToggleDarkMode}
          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
          title="Toggle Dark / Light Mode"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        <button
          onClick={onOpenExport}
          className="px-2 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          title="Export Statutory Report"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden md:inline">Export</span>
        </button>

        <button
          onClick={onOpenNotifications}
          className="relative p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
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
        <div className="flex items-center gap-2 pl-1.5 border-l border-slate-200 dark:border-slate-800 shrink-0">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center font-bold text-xs">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

    </header>
  );
};
