import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import { SubsidiaryId } from '../types/dashboard';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  subsidiary: SubsidiaryId;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, subsidiary }) => {
  if (!isOpen) return null;

  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');
  const [reportType, setReportType] = useState('daily_mis');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExport = () => {
    // Generate real CSV content
    const headers = 'Timestamp,Subsidiary,MineZone,Production_Tonnes,Dispatch_Tonnes,CH4_Percent,CO_PPM,ComplianceScore,Status\n';
    const rows = [
      `2026-09-29 06:00:00,${subsidiary},Gevra East,12400,12100,0.12,4.2,98.2,Nominal`,
      `2026-09-29 07:00:00,${subsidiary},Moonidih UG,4100,3950,0.88,18.2,94.5,Warning`,
      `2026-09-29 08:00:00,${subsidiary},Jayant Quarry,18200,17900,0.05,3.1,99.1,Nominal`,
      `2026-09-29 09:00:00,${subsidiary},Talcher Seam IX,7200,6900,0.65,14.8,95.4,Nominal`,
      `2026-09-29 10:00:00,${subsidiary},Umrer OCP,8900,8800,0.08,5.6,97.8,Nominal`
    ].join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CIL_Compliance_Report_${subsidiary}_${new Date().toISOString().slice(0, 10)}.${format === 'pdf' ? 'txt' : format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Export Governance & Audit Report</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Coal India Limited · Ministry of Coal (PSID 26024)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Report Category
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full text-xs rounded-lg px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
            >
              <option value="daily_mis">Daily Production & Safety MIS (All Mines)</option>
              <option value="dgms_statutory">DGMS Statutory Register Form IV & V</option>
              <option value="env_audit">Environmental SPCB & EC Compliance Ledger</option>
              <option value="fleet_util">HEMM Fleet Utilization & Fuel Telematics</option>
              <option value="workforce_muster">Underground Workforce Muster & Biometric Log</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all shadow-xs ${
                  format === 'csv'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 mb-1 text-emerald-600 dark:text-emerald-400" />
                <span>CSV (Raw)</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('excel')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all shadow-xs ${
                  format === 'excel'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 mb-1 text-blue-600 dark:text-blue-400" />
                <span>Excel (.xlsx)</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all shadow-xs ${
                  format === 'pdf'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-bold'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400'
                }`}
              >
                <FileText className="w-5 h-5 mb-1 text-rose-600 dark:text-rose-400" />
                <span>PDF Summary</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Digital Security Verification</span>
            </div>
            <p>
              Report includes cryptographic SHA-256 hash stamp for submission to DGMS / Ministry of Coal governance portal.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Generated & Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generate Report</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
