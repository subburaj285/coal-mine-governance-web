import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Filter,
  FileCheck2,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  SubsidiaryId,
  InspectionRecord,
  CorrectiveActionItem
} from '../../types/dashboard';
import {
  GOVERNANCE_KPIS,
  VIOLATIONS_DATA,
  INSPECTIONS_DATA,
  CORRECTIVE_ACTIONS_DATA,
  ACTIVE_ALERTS
} from '../../data/mockData';

interface OverviewPanelProps {
  subsidiary: SubsidiaryId;
  onNavigateTab: (tab: any) => void;
  onSelectInspection: (inspection: InspectionRecord) => void;
}

export const OverviewPanel: React.FC<OverviewPanelProps> = ({
  subsidiary,
  onNavigateTab,
  onSelectInspection
}) => {
  const [trendPeriod, setTrendPeriod] = useState<'7d' | '30d'>('7d');

  // Filter data by selected subsidiary
  const filteredViolations = VIOLATIONS_DATA.filter(
    (v) => subsidiary === 'ALL' || v.subsidiary === subsidiary
  );

  const filteredInspections = INSPECTIONS_DATA.filter(
    (i) => subsidiary === 'ALL' || i.subsidiary === subsidiary
  );

  const filteredActions = CORRECTIVE_ACTIONS_DATA.filter(
    (a) => subsidiary === 'ALL' || a.subsidiary === subsidiary
  );

  const overdueActions = filteredActions.filter(
    (a) => a.status === 'OPEN' || a.status === 'IN PROGRESS' || a.status === 'ASSIGNED'
  );

  return (
    <div className="space-y-6">

      {/* Overview Header & Filter Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-blue-600" />
            Governance Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Current compliance, inspection, risk and corrective-action status across colliery operations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            <Filter className="w-4 h-4 text-slate-400" />
            Subsidiary: <b className="text-blue-600 dark:text-blue-400">{subsidiary}</b>
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Audited & Verified
          </span>
        </div>
      </div>

      {/* 4 PRIMARY KPI CARDS ONLY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GOVERNANCE_KPIS.map((kpi) => {
          let Icon = Scale;
          let colorClass = 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900';
          let navTarget = 'compliance';

          if (kpi.id === 'gov-risks') {
            Icon = ShieldAlert;
            colorClass = 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900';
            navTarget = 'compliance';
          } else if (kpi.id === 'gov-overdue') {
            Icon = Clock;
            colorClass = 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900';
            navTarget = 'actions';
          } else if (kpi.id === 'gov-inspections') {
            Icon = ClipboardList;
            colorClass = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900';
            navTarget = 'inspections';
          }

          return (
            <div
              key={kpi.id}
              onClick={() => onNavigateTab(navTarget)}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{kpi.title}</span>
                <div className={`p-2 rounded-lg border ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{kpi.value}</span>
                <span className={`text-xs font-semibold flex items-center ${kpi.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {kpi.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {kpi.trend}
                </span>
              </div>

              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>{kpi.subtext}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* PRIORITY ATTENTION: "What needs my attention right now?" */}
      <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-gradient-to-r from-rose-50/70 via-white to-amber-50/50 dark:from-rose-950/30 dark:via-slate-900 dark:to-amber-950/20 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Priority Attention Required Right Now</h3>
          </div>
          <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40 px-2 py-0.5 rounded border border-rose-200">
            Action Required Before Shift End
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div
            onClick={() => onNavigateTab('compliance')}
            className="p-3 rounded-lg border border-rose-200 dark:border-rose-800/60 bg-white dark:bg-slate-900 hover:border-rose-400 cursor-pointer transition-all space-y-1 shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-600 font-mono text-base">3 Critical</span>
              <ChevronRight className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-semibold text-slate-900 dark:text-white">Non-Compliance Notices</div>
            <div className="text-[10px] text-slate-500">Moonidih UG CMR 153 Air Velocity</div>
          </div>

          <div
            onClick={() => onNavigateTab('actions')}
            className="p-3 rounded-lg border border-amber-200 dark:border-amber-800/60 bg-white dark:bg-slate-900 hover:border-amber-400 cursor-pointer transition-all space-y-1 shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-600 font-mono text-base">6 Overdue</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-semibold text-slate-900 dark:text-white">Corrective Actions</div>
            <div className="text-[10px] text-slate-500">2 Critical SLA violations pending</div>
          </div>

          <div
            onClick={() => onNavigateTab('reports')}
            className="p-3 rounded-lg border border-blue-200 dark:border-blue-800/60 bg-white dark:bg-slate-900 hover:border-blue-400 cursor-pointer transition-all space-y-1 shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-600 font-mono text-base">2 Filing</span>
              <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-semibold text-slate-900 dark:text-white">Statutory Deadlines</div>
            <div className="text-[10px] text-slate-500">SPCB Form V due within 7 days</div>
          </div>

          <div
            onClick={() => onNavigateTab('inspections')}
            className="p-3 rounded-lg border border-purple-200 dark:border-purple-800/60 bg-white dark:bg-slate-900 hover:border-purple-400 cursor-pointer transition-all space-y-1 shadow-2xs group"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-600 font-mono text-base">1 Verification</span>
              <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-semibold text-slate-900 dark:text-white">Pending Signoff</div>
            <div className="text-[10px] text-slate-500">Gevra Bench 5 Berm Evidence</div>
          </div>
        </div>
      </div>

      {/* SECTION 1: RISK & COMPLIANCE (TWO COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* LEFT: Compliance Overview Breakdown (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              Compliance Status Overview
            </h3>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">318 Colliery Leases</span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Verified Compliant', count: 184, percent: 84, color: 'bg-emerald-500' },
              { label: 'Under Review / Audit', count: 22, percent: 10, color: 'bg-blue-500' },
              { label: 'Due Soon (within 14d)', count: 9, percent: 4, color: 'bg-amber-500' },
              { label: 'Overdue Non-Compliance', count: 4, percent: 2, color: 'bg-rose-500' }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                  <span className="font-mono text-slate-900 dark:text-white font-bold">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500">Mines Act 1952 Rate</span>
              <div className="font-bold font-mono text-slate-900 dark:text-white text-sm">97.6%</div>
            </div>
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500">EP Act 1986 Rate</span>
              <div className="font-bold font-mono text-slate-900 dark:text-white text-sm">95.8%</div>
            </div>
          </div>
        </div>

        {/* RIGHT: Priority Risks Table (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Priority Statutory Risks
            </h3>
            <button
              onClick={() => onNavigateTab('compliance')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              View All Violations →
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Issue / Rule</th>
                  <th className="py-2.5 px-3">Mine / Area</th>
                  <th className="py-2.5 px-3">Severity</th>
                  <th className="py-2.5 px-3">Age</th>
                  <th className="py-2.5 px-3">Responsible Owner</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredViolations.map((v) => (
                  <tr
                    key={v.id}
                    onClick={() => onNavigateTab('compliance')}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white truncate max-w-[180px]" title={v.description}>
                        {v.description}
                      </div>
                      <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">{v.ruleCode}</div>
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                      {v.mine} ({v.subsidiary})
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${v.severity === 'Critical'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200'
                          }`}
                      >
                        {v.severity}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-medium text-slate-600 dark:text-slate-400">
                      {v.daysOverdue > 0 ? `${v.daysOverdue}d overdue` : 'On track'}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 truncate max-w-[130px]" title={v.assignedOfficer}>
                      {v.assignedOfficer}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* SECTION 2: INSPECTION ACTIVITY */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-blue-600" />
              Inspection Activity & Recent Audit Log
            </h3>
            <p className="text-xs text-slate-500">Track statutory, safety, and environmental inspection progress</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setTrendPeriod('7d')}
                className={`px-3 py-1 rounded-md transition-colors ${trendPeriod === '7d' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTrendPeriod('30d')}
                className={`px-3 py-1 rounded-md transition-colors ${trendPeriod === '30d' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                30 Days
              </button>
            </div>
            <button
              onClick={() => onNavigateTab('inspections')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Open Module →
            </button>
          </div>
        </div>

        {/* Activity Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Inspection ID</th>
                <th className="py-2.5 px-3">Mine / Subsidiary</th>
                <th className="py-2.5 px-3">Inspection Type</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Findings</th>
                <th className="py-2.5 px-3">Risk Level</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInspections.map((insp) => (
                <tr key={insp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">{insp.id}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {insp.mine} ({insp.subsidiary})
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{insp.type}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{insp.date}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white font-mono">
                    {insp.findingsCount} findings
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${insp.riskLevel === 'Critical'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400 border border-rose-200'
                          : insp.riskLevel === 'Major'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200'
                        }`}
                    >
                      {insp.riskLevel}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700 dark:text-slate-300">{insp.status}</td>
                  <td className="py-2.5 px-3">
                    <button
                      onClick={() => onSelectInspection(insp)}
                      className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-[11px] font-bold transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: CORRECTIVE ACTION TRACKER PIPELINE */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Corrective Action Lifecycle Tracker
            </h3>
            <p className="text-xs text-slate-500">Every issue requires verified evidence before final closure</p>
          </div>
          <button
            onClick={() => onNavigateTab('actions')}
            className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Manage Actions →
          </button>
        </div>

        {/* Workflow Stage Visualization */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
          {[
            { stage: 'OPEN', count: 2, color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 border-rose-200' },
            { stage: 'ASSIGNED', count: 3, color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 border-amber-200' },
            { stage: 'IN PROGRESS', count: 4, color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 border-blue-200' },
            { stage: 'PENDING VERIFICATION', count: 3, color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 border-purple-200' },
            { stage: 'VERIFIED', count: 5, color: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 border-cyan-200' },
            { stage: 'CLOSED', count: 12, color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 border-emerald-200' }
          ].map((st, idx) => (
            <div key={idx} className={`p-2.5 rounded-lg border text-xs ${st.color}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{st.stage}</div>
              <div className="text-lg font-bold font-mono mt-0.5">{st.count}</div>
            </div>
          ))}
        </div>

        {/* Overdue Actions Table */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Pending / Overdue Actions Requiring Remediation</h4>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Action ID</th>
                  <th className="py-2.5 px-3">Issue Description</th>
                  <th className="py-2.5 px-3">Mine</th>
                  <th className="py-2.5 px-3">Responsible Owner</th>
                  <th className="py-2.5 px-3">Due Date</th>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {overdueActions.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">{act.id}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white max-w-xs truncate" title={act.issueTitle}>
                      {act.issueTitle}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-semibold">{act.mine}</td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{act.owner}</td>
                    <td className="py-2.5 px-3 font-mono text-rose-600 font-semibold">{act.dueDate}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${act.priority === 'Critical'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                      >
                        {act.priority}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[10px] font-bold">
                        {act.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* SECTION 4: ACTIVE ALERTS & ESCALATIONS */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Active Escalated Governance Alerts
          </h3>
          <span className="text-xs text-slate-500 font-mono">Strict Statutory Thresholds</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ACTIVE_ALERTS.slice(0, 4).map((alt) => (
            <div
              key={alt.id}
              className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${alt.severity === 'Critical'
                  ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50'
                  : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50'
                }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${alt.severity === 'Critical' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                      }`}
                  >
                    {alt.severity}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">{alt.timestamp}</span>
                </div>
                <div className="font-bold text-slate-900 dark:text-white">{alt.title}</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  Location: <b className="text-slate-800 dark:text-slate-200">{alt.location}</b>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Escalated To: {alt.escalatedTo}</div>
              </div>

              <button
                onClick={() => onNavigateTab('notifications')}
                className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 text-[10px] font-semibold shrink-0"
              >
                Review
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
