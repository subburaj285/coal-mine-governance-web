import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  AlertTriangle,
  ClipboardList,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  FileCheck2,
  ArrowRight,
  Camera,
  History,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  SubsidiaryId,
  InspectionRecord
} from '../../types/dashboard';
import {
  VIOLATIONS_DATA,
  INSPECTIONS_DATA,
  CORRECTIVE_ACTIONS_DATA,
  ACTIVE_ALERTS
} from '../../data/mockData';
import { GovernanceCaseModal } from '../GovernanceCase/GovernanceCaseModal';

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
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(1);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState<boolean>(false);

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

  const workflowSteps = [
    {
      num: 1,
      title: '1. Field Inspection',
      icon: ClipboardList,
      color: 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/40',
      description: 'Field inspection creates a verified finding with evidence metadata.'
    },
    {
      num: 2,
      title: '2. Finding & Evidence',
      icon: Camera,
      color: 'border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/40',
      description: 'Non-compliance detected with photographic proof, timestamp, and GPS coordinates.'
    },
    {
      num: 3,
      title: '3. Compliance Mapping',
      icon: Scale,
      color: 'border-purple-500 text-purple-600 bg-purple-50 dark:bg-purple-950/40',
      description: 'Finding is mapped directly to the statutory requirement (e.g. CMR 2017 Reg 153).'
    },
    {
      num: 4,
      title: '4. Corrective Action',
      icon: CheckCircle2,
      color: 'border-rose-500 text-rose-600 bg-rose-50 dark:bg-rose-950/40',
      description: 'Responsible owner receives a corrective action notice with fixed SLA deadline.'
    },
    {
      num: 5,
      title: '5. Verification & Closure',
      icon: ShieldCheck,
      color: 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40',
      description: 'Closure requires corrective evidence proof + authorized manager verification.'
    },
    {
      num: 6,
      title: '6. Immutable Audit Trail',
      icon: History,
      color: 'border-slate-500 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800',
      description: 'Every state transition is cryptographically hashed for regulatory transparency.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* HERO BANNER — CORE PRODUCT MESSAGE */}
      <div className="p-6 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-800/60 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 font-bold">
              SIH Problem Statement ID: 26024 · Ministry of Coal · Coal India Limited
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              From Field Finding to Verified Closure
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              One connected governance workflow linking inspection evidence, compliance, corrective action, verification, and audit.
            </p>
          </div>

          <button
            onClick={() => setIsCaseModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shrink-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Interactive 2-Min Judge Demo →</span>
          </button>
        </div>

        {/* HERO WORKFLOW STEPPER BAR (THE HERO visual element) */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono font-bold text-blue-300 uppercase tracking-wider">
            Connected Governance Workflow Lifecycle (Click any step to inspect):
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {workflowSteps.map((st) => {
              const Icon = st.icon;
              const isActive = activeWorkflowStep === st.num;
              return (
                <button
                  key={st.num}
                  onClick={() => setActiveWorkflowStep(st.num)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 border-white text-white shadow-md font-bold'
                      : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Icon className="w-4 h-4 text-blue-300" />
                    <span className="text-[9px] font-mono text-slate-400">Step {st.num}</span>
                  </div>
                  <div className="text-xs font-bold truncate">{st.title.split('. ')[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Interactive Step Explanation Box */}
          <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs text-slate-200 flex items-center justify-between">
            <span className="font-semibold text-blue-300">
              Stage {activeWorkflowStep}: {workflowSteps[activeWorkflowStep - 1].description}
            </span>
            <button
              onClick={() => setIsCaseModalOpen(true)}
              className="text-[11px] text-amber-300 font-bold hover:underline shrink-0 ml-2"
            >
              See Example Case →
            </button>
          </div>
        </div>
      </div>

      {/* 3 SIMPLIFIED GOVERNANCE STATUS CARDS ONLY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigateTab('compliance')}
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Compliance Health Score</span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 border border-blue-200">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">96.8%</span>
            <span className="text-xs font-semibold text-emerald-600">↑ +1.2%</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Statutory Aggregate</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('compliance')}
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">High-Risk Non-Compliance</span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 border border-amber-200">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-slate-900 dark:text-white">3</span>
            <span className="text-xs font-semibold text-amber-600">Critical Priority</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Requires Management Action</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        <div
          onClick={() => onNavigateTab('actions')}
          className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all cursor-pointer group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Overdue Corrective Actions</span>
            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 border border-rose-200">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold font-mono text-rose-600">6</span>
            <span className="text-xs font-semibold text-rose-600">Remediation Pending</span>
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Pending Evidence & Signoff</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* FEATURED EXAMPLE GOVERNANCE CASE CARD */}
      <div className="p-5 rounded-2xl border border-blue-200 dark:border-blue-800/80 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                PROMINENT DEMO CASE
              </span>
              <span className="text-xs font-bold text-rose-600">Critical Non-Compliance</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">
              Featured Case: CASE-2026-00421 — Underground Air Velocity Deficiency
            </h3>
            <p className="text-xs text-slate-500">Moonidih Underground Colliery (BCCL) · Mapped to CMR 2017 Regulation 153(2)</p>
          </div>

          <button
            onClick={() => setIsCaseModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <span>View Complete Case Flow →</span>
          </button>
        </div>

        {/* Horizontal Case Flow Stepper Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[9px] font-mono text-slate-400 block">1. INSPECTION</span>
            <span className="font-bold text-slate-900 dark:text-white">DGMS Sirdar Audit</span>
            <span className="text-[10px] text-slate-500 block">Anemometer test</span>
          </div>

          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-amber-900 dark:text-amber-200 space-y-1">
            <span className="text-[9px] font-mono text-amber-600 block">2. FINDING</span>
            <span className="font-bold">Air Velocity 1.1 m/s</span>
            <span className="text-[10px] text-amber-700 block">Photo & GPS evidence</span>
          </div>

          <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 text-purple-900 dark:text-purple-200 space-y-1">
            <span className="text-[9px] font-mono text-purple-600 block">3. COMPLIANCE</span>
            <span className="font-bold">CMR 2017 Reg 153</span>
            <span className="text-[10px] text-purple-700 block">Below 1.5 m/s std</span>
          </div>

          <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-rose-900 dark:text-rose-200 space-y-1">
            <span className="text-[9px] font-mono text-rose-600 block">4. ACTION</span>
            <span className="font-bold">ACT-2026-801</span>
            <span className="text-[10px] text-rose-700 block">Fan House #2 overhaul</span>
          </div>

          <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 text-cyan-900 dark:text-cyan-200 space-y-1">
            <span className="text-[9px] font-mono text-cyan-600 block">5. EVIDENCE</span>
            <span className="font-bold">Photo Proof Upload</span>
            <span className="text-[10px] text-cyan-700 block">Pitch set to +4°</span>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-emerald-900 dark:text-emerald-200 space-y-1">
            <span className="text-[9px] font-mono text-emerald-600 block">6. VERIFIED</span>
            <span className="font-bold">Manager Signoff</span>
            <span className="text-[10px] text-emerald-700 block">SHA-256 Audit Log</span>
          </div>
        </div>
      </div>

      {/* PRIORITY ATTENTION BLOCK */}
      <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-gradient-to-r from-rose-50/70 via-white to-amber-50/50 dark:from-rose-950/30 dark:via-slate-900 dark:to-amber-950/20 shadow-xs space-y-3">
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
            className="p-3 rounded-xl border border-rose-200 dark:border-rose-800/60 bg-white dark:bg-slate-900 hover:border-rose-400 cursor-pointer transition-all space-y-1 shadow-2xs group"
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
            className="p-3 rounded-xl border border-amber-200 dark:border-amber-800/60 bg-white dark:bg-slate-900 hover:border-amber-400 cursor-pointer transition-all space-y-1 shadow-2xs group"
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
            className="p-3 rounded-xl border border-blue-200 dark:border-blue-800/60 bg-white dark:bg-slate-900 hover:border-blue-400 cursor-pointer transition-all space-y-1 shadow-2xs group"
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
            className="p-3 rounded-xl border border-purple-200 dark:border-purple-800/60 bg-white dark:bg-slate-900 hover:border-purple-400 cursor-pointer transition-all space-y-1 shadow-2xs group"
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

      {/* RECENT GOVERNANCE ACTIVITY */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-blue-600" />
            Recent Governance Activity & Field Audits
          </h3>
          <button
            onClick={() => onNavigateTab('inspections')}
            className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            View All Inspections →
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Inspection ID</th>
                <th className="py-2.5 px-3">Mine & Subsidiary</th>
                <th className="py-2.5 px-3">Type</th>
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
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        insp.riskLevel === 'Critical'
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
                      className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-[11px] font-bold transition-colors cursor-pointer"
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

      {/* 2-Minute Judge Showcase Case Journey Modal */}
      <GovernanceCaseModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
      />

    </div>
  );
};
