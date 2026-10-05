import React, { useState, useEffect } from 'react';
import {
  SubsidiaryId,
  UserRole,
  DateRangeType,
  Language,
  KpiMetric,
  InspectionRecord
} from './types/dashboard';

import { ACTIVE_ALERTS, VIOLATIONS_DATA, CORRECTIVE_ACTIONS_DATA } from './data/mockData';

// Layout Components
import { Sidebar, NavTab, OperationsSubTab } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';

// Reconstructed Governance Panels
import { OverviewPanel } from './components/panels/OverviewPanel';
import { InspectionsPanel } from './components/panels/InspectionsPanel';
import { CompliancePanel } from './components/panels/CompliancePanel';
import { CorrectiveActionsPanel } from './components/panels/CorrectiveActionsPanel';
import { SafetyPanel } from './components/panels/SafetyPanel';
import { EnvironmentPanel } from './components/panels/EnvironmentPanel';
import { OperationsPanel } from './components/panels/OperationsPanel';
import { GeospatialPanel } from './components/panels/GeospatialPanel';
import { AiInsightsPanel } from './components/panels/AiInsightsPanel';
import { ReportsAuditPanel } from './components/panels/ReportsAuditPanel';
import { NotificationsPanel } from './components/panels/NotificationsPanel';
import { AdminPanel } from './components/panels/AdminPanel';

// Modals
import { DrillDownModal } from './components/DrillDownModal';
import { ExportModal } from './components/ExportModal';
import { NotificationDrawer } from './components/NotificationDrawer';

export default function App() {
  // Global State
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('EN');
  const [subsidiary, setSubsidiary] = useState<SubsidiaryId>('ALL');
  const [dateRange, setDateRange] = useState<DateRangeType>('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState<UserRole>('Mine Manager');

  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [operationsSubTab, setOperationsSubTab] = useState<OperationsSubTab>('production');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Modals
  const [selectedKpi, setSelectedKpi] = useState<KpiMetric | null>(null);
  const [selectedInspectionFromOverview, setSelectedInspectionFromOverview] = useState<InspectionRecord | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Alerts
  const [alerts, setAlerts] = useState(ACTIVE_ALERTS);

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

  // Role-based navigation preset
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    switch (newRole) {
      case 'DGMS Inspector':
      case 'Corporate Leadership':
        setActiveTab('overview');
        break;
      case 'Safety Officer':
        setActiveTab('safety');
        break;
      case 'Environment Officer':
        setActiveTab('environment');
        break;
      case 'Production Manager':
        setActiveTab('operations');
        setOperationsSubTab('production');
        break;
      case 'Maintenance Engineer':
        setActiveTab('operations');
        setOperationsSubTab('equipment');
        break;
      case 'Contractor Supervisor':
        setActiveTab('actions');
        break;
      default:
        break;
    }
  };

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const unreadAlertsCount = alerts.filter((a) => !a.acknowledged).length;
  const overdueActionsCount = CORRECTIVE_ACTIONS_DATA.filter((a) => a.status === 'OPEN' || a.status === 'IN PROGRESS').length;
  const openViolationsCount = VIOLATIONS_DATA.filter((v) => v.status === 'Open').length;

  const handleSelectInspectionFromOverview = (inspection: InspectionRecord) => {
    setSelectedInspectionFromOverview(inspection);
    setActiveTab('inspections');
  };

  return (
    <div className={`min-h-screen flex transition-colors ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. Persistent Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        operationsSubTab={operationsSubTab}
        onSelectOperationsSubTab={setOperationsSubTab}
        role={role}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        unreadNotificationsCount={unreadAlertsCount}
        overdueActionsCount={overdueActionsCount}
        openViolationsCount={openViolationsCount}
      />

      {/* Main Viewport Content Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* 2. Top Header Bar */}
        <TopHeader
          subsidiary={subsidiary}
          onSelectSubsidiary={setSubsidiary}
          dateRange={dateRange}
          onSelectDateRange={setDateRange}
          role={role}
          onSelectRole={handleRoleChange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          language={language}
          onToggleLanguage={() => setLanguage((l) => (l === 'EN' ? 'HI' : 'EN'))}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          unreadNotificationsCount={unreadAlertsCount}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenExport={() => setIsExportOpen(true)}
        />

        {/* 3. Main Body Container */}
        <main className="flex-1 p-4 sm:p-6 space-y-6 max-w-[1720px] w-full mx-auto">
          {activeTab === 'overview' && (
            <OverviewPanel
              subsidiary={subsidiary}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectInspection={handleSelectInspectionFromOverview}
            />
          )}

          {activeTab === 'inspections' && (
            <InspectionsPanel
              subsidiary={subsidiary}
              role={role}
              selectedInspectionFromParent={selectedInspectionFromOverview}
              onClearParentSelection={() => setSelectedInspectionFromOverview(null)}
            />
          )}

          {activeTab === 'compliance' && <CompliancePanel subsidiary={subsidiary} />}

          {activeTab === 'actions' && (
            <CorrectiveActionsPanel
              subsidiary={subsidiary}
              role={role}
            />
          )}

          {activeTab === 'safety' && <SafetyPanel subsidiary={subsidiary} />}

          {activeTab === 'environment' && <EnvironmentPanel subsidiary={subsidiary} />}

          {activeTab === 'operations' && (
            <OperationsPanel
              subsidiary={subsidiary}
              activeSubTab={operationsSubTab}
              onSelectSubTab={setOperationsSubTab}
            />
          )}

          {activeTab === 'gis' && <GeospatialPanel subsidiary={subsidiary} />}

          {activeTab === 'ai' && <AiInsightsPanel subsidiary={subsidiary} />}

          {activeTab === 'reports' && (
            <ReportsAuditPanel
              subsidiary={subsidiary}
              onOpenExportModal={() => setIsExportOpen(true)}
            />
          )}

          {activeTab === 'notifications' && <NotificationsPanel subsidiary={subsidiary} />}

          {activeTab === 'admin' && <AdminPanel currentRole={role} />}
        </main>
      </div>

      {/* Modals & Drawers */}
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
