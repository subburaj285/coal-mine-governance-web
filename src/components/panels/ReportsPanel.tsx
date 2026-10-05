import React, { useState } from 'react';
import {
  FileText,
  Download,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Calendar,
  Send,
  Eye
} from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';
import { STATUTORY_REPORTS } from '../../data/mockData';

interface ReportsPanelProps {
  subsidiary: SubsidiaryId;
  onOpenExportModal: () => void;
}

export const ReportsPanel: React.FC<ReportsPanelProps> = ({ subsidiary, onOpenExportModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'DGMS' | 'IBM' | 'SPCB'>('All');
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const filteredReports = STATUTORY_REPORTS.filter((r) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'DGMS') return r.regulator === 'DGMS';
    if (selectedCategory === 'IBM') return r.regulator === 'IBM';
    if (selectedCategory === 'SPCB') return r.regulator.includes('SPCB');
    return true;
  });

  return (
    <div className="space-y-5">
      
      {/* Top Banner: Export Center & 1-Click Generation */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Statutory Regulatory Returns & Cryptographic Audit Locker</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ministry of Coal · DGMS Dhanbad · Indian Bureau of Mines (IBM) · State Pollution Control Boards
          </p>
        </div>

        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Launch Export Center (PDF/XLS/CSV)</span>
        </button>
      </div>

      {/* Row 1: Statutory Reports Cards & Digital Signatures */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Mandatory Statutory Registers & Filings</h4>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            {(['All', 'DGMS', 'IBM', 'SPCB'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                  selectedCategory === cat ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((rep) => (
            <div key={rep.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30">
                    {rep.code}
                  </span>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white mt-1.5">{rep.title}</h5>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Regulator: {rep.regulator} · Period: {rep.period}
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    rep.status === 'Submitted & Verified'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400'
                      : rep.status === 'Pending Review'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {rep.status}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Digital Signature Verification:</span>
                </div>
                <div className="text-[10px] truncate text-slate-500">{rep.digitalSignatureSha}</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                <span className="text-slate-500 dark:text-slate-400">Due: {rep.dueDate}</span>
                <button
                  onClick={onOpenExportModal}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  <Download className="w-3.5 h-3.5" /> Download Filing Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Geo-Tagged Evidence Locker & Scheduled Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Evidence Locker */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Geo-Tagged Regulatory Evidence Locker
            </h4>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-200">
              GPS & Timestamp Stamped
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Drone Highwall Orthomosaic Photogrammetry</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Gevra Open Pit · Resolution: 2.1 cm/px</div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">22.3486°N, 82.5922°E · Alt 120m AGL</div>
              </div>
              <button
                onClick={() => alert('Inspecting High-Resolution Orthomosaic TIF & 3D Point Cloud...')}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 dark:border-transparent dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center gap-1 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Underground Refuge Chamber Video Snapshot</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Moonidih Seam IV Longwall Refuge Chamber</div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">23.7381°N, 86.3456°E · Depth 420m</div>
              </div>
              <button
                onClick={() => alert('Inspecting CCTV Verification Snapshot...')}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 dark:border-transparent dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center gap-1 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">SPCB Water Discharge Grab Sample Test Report</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">NABL Accredited Lab Certificate</div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">pH 7.4 · TSS 42 mg/L · Iron 0.8 mg/L</div>
              </div>
              <button
                onClick={() => alert('Inspecting NABL Laboratory Test Certificate...')}
                className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 dark:border-transparent dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center gap-1 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" /> View
              </button>
            </div>
          </div>
        </div>

        {/* Automated Scheduled Distribution Scheduler */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Automated Report Dispatch Scheduler
            </h4>
            <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-200">
              Daily / Weekly
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center font-bold text-slate-900 dark:text-white">
                <span>Daily 06:00 Executive MIS Dispatch</span>
                <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-semibold">ENABLED</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Delivered via encrypted PDF to Chairman CIL, Ministry of Coal desk, and Subsidiary CMDs.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center font-bold text-slate-900 dark:text-white">
                <span>DGMS Weekly Safety & Near-Miss Digest</span>
                <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-semibold">ENABLED</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Automated statutory dispatch to DGMS Regional Inspectorate every Monday 08:00 AM.
              </p>
            </div>

            <button
              onClick={() => {
                setScheduledSuccess(true);
                setTimeout(() => setScheduledSuccess(false), 2000);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 shadow-xs cursor-pointer"
            >
              {scheduledSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Scheduled Dispatch Triggered Now!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Trigger Immediate On-Demand Distribution</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
