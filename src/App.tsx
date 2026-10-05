import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Pickaxe,
  Leaf,
  Scale,
  Truck,
  Users,
  Compass,
  BellRing,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

import {
  SubsidiaryId,
  UserRole,
  ShiftType,
  DateRangeType,
  Language,
  KpiMetric
} from './types/dashboard';

import {
  INITIAL_KPIS,
  ACTIVE_ALERTS,
  TRANSLATIONS
} from './data/mockData';

import { Header } from './components/Header';
import { TopKpiStrip } from './components/TopKpiStrip';
import { DrillDownModal } from './components/DrillDownModal';
import { ExportModal } from './components/ExportModal';
import { NotificationDrawer } from './components/NotificationDrawer';

// Panels
import { SafetyPanel } from './components/panels/SafetyPanel';
import { ProductionPanel } from './components/panels/ProductionPanel';
import { EnvironmentPanel } from './components/panels/EnvironmentPanel';
import { CompliancePanel } from './components/panels/CompliancePanel';
import { FleetPanel } from './components/panels/FleetPanel';
import { WorkforcePanel } from './components/panels/WorkforcePanel';
import { GeospatialPanel } from './components/panels/GeospatialPanel';
import { AlertsPanel } from './components/panels/AlertsPanel';
import { AiPredictivePanel } from './components/panels/AiPredictivePanel';
import { ReportsPanel } from './components/panels/ReportsPanel';

type ActiveTab =
  | 'safety'
  | 'production'
  | 'environment'
  | 'compliance'
  | 'fleet'
  | 'workforce'
  | 'gis'
  | 'alerts'
  | 'ai'
  | 'reports';

export default function App() {
  // White theme as default per user request
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('EN');
  const [subsidiary, setSubsidiary] = useState<SubsidiaryId>('ALL');
  const [shift, setShift] = useState<ShiftType>('ALL');
  const [dateRange, setDateRange] = useState<DateRangeType>('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState<UserRole>('Mine Manager');
  const [activeTab, setActiveTab] = useState<ActiveTab>('safety');

  // Modals & Drawers
  const [selectedKpi, setSelectedKpi] = useState<KpiMetric | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Alerts state
  const [alerts, setAlerts] = useState(ACTIVE_ALERTS);

  // Live Auto-Refresh simulation
  const [refreshSeconds, setRefreshSeconds] = useState(30);

  // Sync dark/light mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  // Role-based default tab adjustment
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    switch (newRole) {
      case 'Safety Officer':
        setActiveTab('safety');
        break;
      case 'Environment Officer':
        setActiveTab('environment');
        break;
      case 'Production Manager':
        setActiveTab('production');
        break;
      case 'Maintenance Engineer':
        setActiveTab('fleet');
        break;
      case 'Contractor Supervisor':
        setActiveTab('workforce');
        break;
      case 'DGMS Inspector':
        setActiveTab('compliance');
        break;
      case 'Corporate Leadership':
        setActiveTab('gis');
        break;
      case 'Control Room Operator':
        setActiveTab('alerts');
        break;
      default:
        break;
    }
  };

  // Live Countdown & data pulse simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshSeconds((prev) => {
        if (prev <= 1) {
          return 30; // reset
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setRefreshSeconds(30);
  };

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const unreadAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  const t = (key: string) => TRANSLATIONS[key]?.[language.toLowerCase() as 'en' | 'hi'] || key;

  // Tabs navigation definition
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'safety', label: t('tabSafety'), icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'production', label: t('tabProduction'), icon: <Pickaxe className="w-4 h-4" /> },
    { id: 'environment', label: t('tabEnvironment'), icon: <Leaf className="w-4 h-4" /> },
    { id: 'compliance', label: t('tabCompliance'), icon: <Scale className="w-4 h-4" /> },
    { id: 'fleet', label: t('tabFleet'), icon: <Truck className="w-4 h-4" /> },
    { id: 'workforce', label: t('tabWorkforce'), icon: <Users className="w-4 h-4" /> },
    { id: 'gis', label: t('tabGis'), icon: <Compass className="w-4 h-4" /> },
    { id: 'alerts', label: t('tabAlerts'), icon: <BellRing className="w-4 h-4" />, badge: unreadAlertsCount },
    { id: 'ai', label: t('tabAi'), icon: <Sparkles className="w-4 h-4" /> },
    { id: 'reports', label: t('tabReports'), icon: <FileSpreadsheet className="w-4 h-4" /> }
  ];

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. Header (sticky, 64px) */}
      <Header
        subsidiary={subsidiary}
        onSelectSubsidiary={setSubsidiary}
        dateRange={dateRange}
        onSelectDateRange={setDateRange}
        shift={shift}
        onSelectShift={setShift}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        role={role}
        onSelectRole={handleRoleChange}
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'EN' ? 'HI' : 'EN'))}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        refreshSeconds={refreshSeconds}
        onManualRefresh={handleManualRefresh}
        unreadAlertsCount={unreadAlertsCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-[1720px] mx-auto p-3 sm:p-5 space-y-5">
        
        {/* Role & Context Status Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-900 dark:text-white">Active Lens:</span>
            <span className="font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
              {role}
            </span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-slate-600 dark:text-slate-400">
              Subsidiary: <b className="text-slate-900 dark:text-slate-200">{subsidiary}</b>
            </span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <span className="text-slate-600 dark:text-slate-400">
              Shift: <b className="text-slate-900 dark:text-slate-200">{shift === 'ALL' ? 'All Shifts' : `Shift ${shift}`}</b>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium text-slate-700 dark:text-slate-300">IoT Mesh: 318 Mines Online</span>
            </span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-600">·</span>
            <span className="hidden md:inline">DGMS Shram Suvidha Link Active</span>
          </div>
        </div>

        {/* 2. Top KPI Strip (8 cards, responsive grid, sparklines, drill-down trigger) */}
        <section aria-label="Key Performance Indicators">
          <TopKpiStrip
            metrics={INITIAL_KPIS}
            onSelectMetric={(kpi) => setSelectedKpi(kpi)}
            language={language}
          />
        </section>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${isActive ? 'bg-white text-blue-600' : 'bg-rose-600 text-white'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Active Panel Viewport */}
        <section className="min-h-[580px]">
          {activeTab === 'safety' && <SafetyPanel subsidiary={subsidiary} />}
          {activeTab === 'production' && <ProductionPanel subsidiary={subsidiary} />}
          {activeTab === 'environment' && <EnvironmentPanel subsidiary={subsidiary} />}
          {activeTab === 'compliance' && <CompliancePanel subsidiary={subsidiary} />}
          {activeTab === 'fleet' && <FleetPanel subsidiary={subsidiary} />}
          {activeTab === 'workforce' && <WorkforcePanel subsidiary={subsidiary} />}
          {activeTab === 'gis' && <GeospatialPanel subsidiary={subsidiary} />}
          {activeTab === 'alerts' && <AlertsPanel subsidiary={subsidiary} />}
          {activeTab === 'ai' && <AiPredictivePanel subsidiary={subsidiary} />}
          {activeTab === 'reports' && (
            <ReportsPanel subsidiary={subsidiary} onOpenExportModal={() => setIsExportOpen(true)} />
          )}
        </section>

      </main>

      {/* Modals & Overlays */}
      <DrillDownModal
        metric={selectedKpi}
        onClose={() => setSelectedKpi(null)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        subsidiary={subsidiary}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        alerts={alerts}
        onAcknowledgeAlert={handleAcknowledgeAlert}
      />

    </div>
  );
}
