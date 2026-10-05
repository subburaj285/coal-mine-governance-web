import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  ChevronRight,
  Layers,
  MapPin,
  ClipboardList,
  Scale
} from 'lucide-react';
import { SubsidiaryId, InspectionRecord } from '../../types/dashboard';
import { GovernanceCaseModal } from '../GovernanceCase/GovernanceCaseModal';

interface OverviewPanelProps {
  subsidiary: SubsidiaryId;
  onNavigateTab: (tab: any) => void;
  onSelectInspection: (inspection: InspectionRecord) => void;
}

export const OverviewPanel: React.FC<OverviewPanelProps> = ({
  subsidiary,
  onNavigateTab
}) => {
  const [isCaseModalOpen, setIsCaseModalOpen] = useState<boolean>(false);

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6 px-4">
      
      {/* 1. FIRST SCREEN HERO BRANDING & CORE MESSAGE */}
      <div className="text-center space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="inline-flex flex-col items-center gap-1">
          <span className="text-xs font-bold font-mono tracking-widest text-slate-500 uppercase">
            COAL INDIA
          </span>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
            Smart Governance & Compliance Monitoring
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          From Field Inspection to Verified Closure
        </h1>

        <div className="pt-2 max-w-xl mx-auto space-y-2">
          <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            A single platform connecting:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <span className="px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
              Inspection
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900">
              Compliance
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
              Corrective Action
            </span>
            <span className="text-slate-400">→</span>
            <span className="px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
              Verification
            </span>
          </div>
        </div>
      </div>

      {/* 2. THE THREE CORE COLUMNS: PROBLEM - SOLUTION - RESULT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* PROBLEM CARD */}
        <div className="p-6 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/10 space-y-4">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs tracking-wider uppercase font-mono">
            <AlertCircle className="w-4 h-4" />
            <span>PROBLEM</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Disconnected inspection, compliance and corrective-action processes make it difficult to know:
          </p>
          <ul className="space-y-2 text-xs font-medium text-slate-800 dark:text-slate-200 list-disc pl-4">
            <li>What went wrong?</li>
            <li>Who must fix it?</li>
            <li>Has it been fixed?</li>
            <li>Who verified it?</li>
          </ul>
        </div>

        {/* SOLUTION CARD */}
        <div className="p-6 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/10 space-y-4">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-xs tracking-wider uppercase font-mono">
            <Layers className="w-4 h-4" />
            <span>SOLUTION</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
            One connected governance workflow.
          </p>
          <div className="space-y-2 text-xs font-mono text-blue-900 dark:text-blue-200 font-medium">
            <div className="p-2 rounded bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
              <span>Inspection</span>
              <span className="text-slate-400">↓</span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
              <span>Finding → Compliance</span>
              <span className="text-slate-400">↓</span>
            </div>
            <div className="p-2 rounded bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
              <span>Action → Verification</span>
              <span className="text-emerald-500">→ Closure</span>
            </div>
          </div>
        </div>

        {/* RESULT CARD */}
        <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/10 space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs tracking-wider uppercase font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>RESULT</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Every issue is:
          </p>
          <div className="space-y-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Tracked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Evidence-backed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Auditable</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. ONE EXAMPLE CASE SECTION */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-500">CASE EXAMPLE</span>
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                CASE-2026-00421
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400">
                Critical Issue
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              Underground Air Velocity Deficiency
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Moonidih Colliery · Bharat Coking Coal Limited (BCCL)
            </p>
          </div>

          <button
            onClick={() => setIsCaseModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <span>View Case</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* SMALL VISUAL FLOW */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            CONNECTED WORKFLOW LIFECYCLE
          </span>
          <div className="flex flex-wrap items-center justify-between gap-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold">
            <span className="text-blue-600 dark:text-blue-400">Inspection</span>
            <span className="text-slate-400">→</span>
            <span className="text-purple-600 dark:text-purple-400">Compliance Requirement</span>
            <span className="text-slate-400">→</span>
            <span className="text-amber-600 dark:text-amber-400">Corrective Action</span>
            <span className="text-slate-400">→</span>
            <span className="text-emerald-600 dark:text-emerald-400">Verification</span>
            <span className="text-slate-400">→</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[11px]">
              Closed
            </span>
          </div>
        </div>
      </div>

      {/* Governance Case Modal */}
      <GovernanceCaseModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
      />

    </div>
  );
};
