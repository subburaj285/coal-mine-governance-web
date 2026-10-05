import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Scale,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Bell,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShieldAlert,
  Leaf,
  Compass,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../../types/dashboard';

export type NavTab =
  | 'overview'
  | 'inspections'
  | 'compliance'
  | 'actions'
  | 'safety'
  | 'environment'
  | 'operations'
  | 'gis'
  | 'ai'
  | 'reports'
  | 'notifications'
  | 'admin';

export type OperationsSubTab = 'production' | 'workforce' | 'equipment';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  operationsSubTab: OperationsSubTab;
  onSelectOperationsSubTab: (subTab: OperationsSubTab) => void;
  role: UserRole;
  collapsed: boolean;
  onToggleCollapse: () => void;
  unreadNotificationsCount: number;
  overdueActionsCount: number;
  openViolationsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  operationsSubTab,
  onSelectOperationsSubTab,
  role,
  collapsed,
  onToggleCollapse,
  unreadNotificationsCount,
  overdueActionsCount,
  openViolationsCount
}) => {
  const [opsExpanded, setOpsExpanded] = React.useState(activeTab === 'operations');

  const mainNav = [
    { id: 'overview' as NavTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'inspections' as NavTab, label: 'Cases', icon: ClipboardList, badge: 18 },
    { id: 'compliance' as NavTab, label: 'Compliance', icon: Scale, badge: openViolationsCount },
    { id: 'actions' as NavTab, label: 'Corrective Actions', icon: CheckCircle2, badge: overdueActionsCount, badgeColor: 'bg-rose-600' },
    { id: 'reports' as NavTab, label: 'Reports', icon: FileSpreadsheet }
  ];

  const secondaryNav = [
    { id: 'safety' as NavTab, label: 'Safety', icon: ShieldAlert },
    { id: 'environment' as NavTab, label: 'Environment', icon: Leaf },
    { id: 'gis' as NavTab, label: 'GIS Map', icon: Compass },
    { id: 'notifications' as NavTab, label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
    { id: 'admin' as NavTab, label: 'Administration', icon: SlidersHorizontal }
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
        {!collapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-md text-xs font-mono">
              CIL
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs tracking-tight text-white truncate">Coal India Limited</span>
              <span className="text-[10px] text-slate-400 truncate">Smart Governance Platform</span>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white shadow-md text-xs mx-auto">
            CIL
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Badge Indicator */}
      {!collapsed && (
        <div className="px-3 py-2 mx-3 mt-3 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs">
          <div className="flex flex-col">
            <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider font-mono">Active Lens</span>
            <span className="font-semibold text-blue-400 truncate max-w-[150px]">{role}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      )}

      {/* Primary Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 no-scrollbar">
        <div className="space-y-1">
          {!collapsed && (
            <div className="px-3 text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-1">
              GOVERNANCE WORKFLOW
            </div>
          )}

          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      item.badgeColor || 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Modules */}
        <div className="space-y-1 pt-2 border-t border-slate-800">
          {!collapsed && (
            <div className="px-3 text-[9px] font-bold font-mono text-slate-500 uppercase tracking-widest mb-1">
              SUPPORTING MODULES
            </div>
          )}

          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 text-slate-400" />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-400 flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <span className="font-mono">SIH PS ID: 26024</span>
            <span className="text-emerald-400 font-semibold">Live System</span>
          </div>
          <span className="text-slate-400 truncate">Ministry of Coal · Coal India</span>
        </div>
      )}
    </aside>
  );
};
