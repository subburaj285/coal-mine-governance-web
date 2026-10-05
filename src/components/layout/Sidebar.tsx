import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Scale,
  CheckCircle2,
  ShieldAlert,
  Leaf,
  Layers,
  Compass,
  Sparkles,
  FileSpreadsheet,
  Bell,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronDown
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

  React.useEffect(() => {
    if (activeTab === 'operations') {
      setOpsExpanded(true);
    }
  }, [activeTab]);

  const navItems = [
    { id: 'overview' as NavTab, label: 'Governance Overview', icon: LayoutDashboard },
    { id: 'inspections' as NavTab, label: 'Inspections', icon: ClipboardList, badge: 18 },
    { id: 'compliance' as NavTab, label: 'Statutory Compliance', icon: Scale, badge: openViolationsCount },
    { id: 'actions' as NavTab, label: 'Corrective Actions', icon: CheckCircle2, badge: overdueActionsCount, badgeColor: 'bg-rose-600' },
    { id: 'safety' as NavTab, label: 'Safety Management', icon: ShieldAlert },
    { id: 'environment' as NavTab, label: 'Environment & ESG', icon: Leaf },
    {
      id: 'operations' as NavTab,
      label: 'Operations',
      icon: Layers,
      hasSubmenu: true,
      subItems: [
        { id: 'production' as OperationsSubTab, label: 'Production & Offtake' },
        { id: 'workforce' as OperationsSubTab, label: 'Workforce & Muster' },
        { id: 'equipment' as OperationsSubTab, label: 'Equipment & Fleet' }
      ]
    },
    { id: 'gis' as NavTab, label: 'GIS & Mine Map', icon: Compass },
    { id: 'ai' as NavTab, label: 'AI-Assisted Insights', icon: Sparkles, isAi: true },
    { id: 'reports' as NavTab, label: 'Reports & Audit', icon: FileSpreadsheet },
    { id: 'notifications' as NavTab, label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
    { id: 'admin' as NavTab, label: 'Administration', icon: SlidersHorizontal }
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 transition-all duration-300 z-30 select-none ${collapsed ? 'w-16' : 'w-64'
        }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800">
        {!collapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-md bg-white p-0.5 border border-slate-700 flex items-center justify-center shrink-0">
              <img src="/emblem.png" alt="Emblem of India" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm tracking-tight text-white truncate">Mine Forge</span>
              <span className="text-[10px] text-slate-400 truncate">Smart Governance Platform</span>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="w-8 h-8 rounded-md bg-white p-0.5 border border-slate-700 flex items-center justify-center mx-auto shrink-0">
            <img src="/emblem.png" alt="Emblem of India" className="w-full h-full object-contain" />
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
        <div className="px-3 py-2.5 mx-3 mt-3 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Role Permission</span>
            <span className="font-medium text-blue-400 truncate max-w-[150px]">{role}</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Role Active" />
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.hasSubmenu) {
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => {
                    onSelectTab('operations');
                    setOpsExpanded(!opsExpanded);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  title={collapsed ? item.label : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4.5 h-4.5 shrink-0 text-blue-400" />
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${opsExpanded ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Operations Submenu */}
                {!collapsed && opsExpanded && (
                  <div className="pl-9 pr-1 space-y-1">
                    {item.subItems?.map((sub) => {
                      const isSubActive = activeTab === 'operations' && operationsSubTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            onSelectTab('operations');
                            onSelectOperationsSubTab(sub.id);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${isSubActive
                              ? 'text-white font-semibold bg-slate-800 border-l-2 border-blue-500'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                            }`}
                        >
                          {sub.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-white font-semibold border-l-2 border-amber-500 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 shrink-0 ${item.isAi ? 'text-purple-400' : isActive ? 'text-white' : 'text-slate-400'
                    }`}
                />
                {!collapsed && (
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.isAi && (
                      <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        AI
                      </span>
                    )}
                  </span>
                )}
              </div>

              {!collapsed && item.badge !== undefined && item.badge > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-800 text-slate-200'
                    }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-800 text-[10px] text-slate-400 flex flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-300">Mine Forge Governance</span>
            <span className="text-emerald-400 font-semibold">Live System</span>
          </div>
          <span className="text-slate-400 truncate">Ministry of Coal · Coal India</span>
        </div>
      )}
    </aside>
  );
};
