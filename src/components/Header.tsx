import React from 'react';
import {
  Bell,
  Download,
  Moon,
  Sun,
  RotateCw,
  Search,
  ChevronDown
} from 'lucide-react';
import { SubsidiaryId, UserRole, ShiftType, DateRangeType, Language } from '../types/dashboard';
import { SUBSIDIARIES, TRANSLATIONS } from '../data/mockData';

interface HeaderProps {
  subsidiary: SubsidiaryId;
  onSelectSubsidiary: (sub: SubsidiaryId) => void;
  dateRange: DateRangeType;
  onSelectDateRange: (range: DateRangeType) => void;
  shift: ShiftType;
  onSelectShift: (shift: ShiftType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  role: UserRole;
  onSelectRole: (role: UserRole) => void;
  language: Language;
  onToggleLanguage: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  refreshSeconds: number;
  onManualRefresh: () => void;
  unreadAlertsCount: number;
  onOpenNotifications: () => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  subsidiary,
  onSelectSubsidiary,
  dateRange,
  onSelectDateRange,
  shift,
  onSelectShift,
  searchQuery,
  onSearchChange,
  role,
  onSelectRole,
  language,
  onToggleLanguage,
  darkMode,
  onToggleDarkMode,
  refreshSeconds,
  onManualRefresh,
  unreadAlertsCount,
  onOpenNotifications,
  onOpenExport
}) => {
  const t = (key: string) => TRANSLATIONS[key]?.[language.toLowerCase() as 'en' | 'hi'] || key;

  const rolesList: UserRole[] = [
    'Mine Manager',
    'Safety Officer',
    'Environment Officer',
    'Production Manager',
    'Maintenance Engineer',
    'Contractor Supervisor',
    'DGMS Inspector',
    'Corporate Leadership',
    'Control Room Operator'
  ];

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b backdrop-blur-md transition-colors bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="flex h-full items-center justify-between px-3 md:px-6 gap-2 md:gap-4">
        
        {/* Left: Organization Identity & Emblem */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-500 shadow-xs">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 3.3l6 3.33v4.37c0 4.1-2.73 7.9-6 9-3.27-1.1-6-4.9-6-9V8.63l6-3.33zm-1 4.7v5h2v-5h-2zm-3 7h8v1H8v-1z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm md:text-base tracking-tight text-slate-900 dark:text-white">
                COAL INDIA LIMITED
              </span>
              <span className="hidden lg:inline-block text-[11px] px-1.5 py-0.5 rounded font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30">
                MoC #26024
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px] md:max-w-xs">
              Smart Compliance & Governance Monitoring
            </span>
          </div>
        </div>

        {/* Center: Search & Subsidiary/Shift Selectors */}
        <div className="flex items-center gap-2 flex-1 max-w-2xl justify-center">
          
          {/* Subsidiary Filter */}
          <div className="relative shrink-0">
            <select
              value={subsidiary}
              onChange={(e) => onSelectSubsidiary(e.target.value as SubsidiaryId)}
              aria-label="Select Subsidiary"
              className="h-9 text-xs font-medium rounded-lg px-2.5 pr-7 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none shadow-xs"
            >
              {SUBSIDIARIES.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.id === 'ALL' ? 'All CIL Subsidiaries' : `${sub.id} (${sub.name.split(' ')[0]})`}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2.5 pointer-events-none text-slate-400" />
          </div>

          {/* Shift Selector */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700/80 text-xs">
            {(['A', 'B', 'C', 'ALL'] as ShiftType[]).map((s) => (
              <button
                key={s}
                onClick={() => onSelectShift(s)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  shift === s
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title={`Shift ${s}`}
              >
                {s === 'ALL' ? 'All' : `Sh-${s}`}
              </button>
            ))}
          </div>

          {/* Global Search Bar */}
          <div className="relative flex-1 max-w-xs hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-9 pl-8 pr-3 text-xs rounded-lg bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all shadow-xs"
            />
          </div>

          {/* Date Range Selector */}
          <div className="relative shrink-0 hidden lg:block">
            <select
              value={dateRange}
              onChange={(e) => onSelectDateRange(e.target.value as DateRangeType)}
              aria-label="Select Date Range"
              className="h-9 text-xs font-medium rounded-lg px-2.5 pr-7 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none shadow-xs"
            >
              <option value="Today">Today (Real-Time)</option>
              <option value="Shift">Active Shift</option>
              <option value="Week">This Week</option>
              <option value="Month">Month-to-Date</option>
              <option value="Custom">Custom Range</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2.5 pointer-events-none text-slate-400" />
          </div>
        </div>

        {/* Right: Actions, Live Indicator, Notifications, Role, Dark/Light Mode */}
        <div className="flex items-center gap-1.5 md:gap-2.5 shrink-0">
          
          {/* Live Refresh Status */}
          <button
            onClick={onManualRefresh}
            title="Click to force refresh telemetry now"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all cursor-pointer shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
            </span>
            <span className="hidden xl:inline text-slate-600 dark:text-slate-300">Sync:</span>
            <span>{refreshSeconds}s</span>
            <RotateCw className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          </button>

          {/* Export Report */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shadow-xs"
            title="Export statutory audit report (PDF, Excel, CSV)"
          >
            <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden md:inline">Export</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
            title="Active Alarms & Escalations"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          {/* Language Toggle (EN / HI) */}
          <button
            onClick={onToggleLanguage}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
            title="Toggle English / हिन्दी"
          >
            {language === 'EN' ? 'HI' : 'EN'}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-xs"
            title={darkMode ? "Switch to White Theme" : "Switch to Dark Theme"}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Role Switcher & User Profile */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-700">
            <div className="relative">
              <select
                value={role}
                onChange={(e) => onSelectRole(e.target.value as UserRole)}
                aria-label="Select User Role"
                className="h-9 text-xs font-medium rounded-lg pl-2.5 pr-7 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-blue-900 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/60 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer appearance-none max-w-[140px] truncate shadow-xs"
              >
                {rolesList.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2.5 pointer-events-none text-blue-600 dark:text-blue-300" />
            </div>

            {/* Officer Avatar badge */}
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-xs ring-1 ring-slate-300 dark:ring-slate-600 shrink-0"
              title={`Logged in as ${role}`}
            >
              CIL
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
