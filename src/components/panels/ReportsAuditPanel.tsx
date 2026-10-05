import React, { useState } from 'react';
import { FileSpreadsheet, Download, History, Search, ShieldCheck, Lock } from 'lucide-react';
import { SubsidiaryId, StatutoryReport, AuditTrailItem } from '../../types/dashboard';
import { STATUTORY_REPORTS, AUDIT_TRAIL_DATA } from '../../data/mockData';

interface ReportsAuditPanelProps {
  subsidiary: SubsidiaryId;
  onOpenExportModal?: () => void;
}

export const ReportsAuditPanel: React.FC<ReportsAuditPanelProps> = ({
  subsidiary,
  onOpenExportModal
}) => {
  const [reports] = useState<StatutoryReport[]>(STATUTORY_REPORTS);
  const [auditLogs] = useState<AuditTrailItem[]>(AUDIT_TRAIL_DATA);
  const [searchAudit, setSearchAudit] = useState('');

  const filteredAudit = auditLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchAudit.toLowerCase()) ||
      log.action.toLowerCase().includes(searchAudit.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchAudit.toLowerCase()) ||
      log.hash.toLowerCase().includes(searchAudit.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            Statutory Reports & Immutable Audit Locker
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Download DGMS, IBM, MoEFCC returns and inspect digitally signed immutable audit logs.
          </p>
        </div>

        <button
          onClick={onOpenExportModal}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Download className="w-4 h-4" />
          <span>Export Custom Report</span>
        </button>
      </div>

      {/* Statutory Reports Grid */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Statutory Regulatory Filings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3 text-xs shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{rep.code}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {rep.regulator}
                  </span>
                </div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">{rep.title}</div>
                <div className="text-slate-500">Period: {rep.period} · Due: {rep.dueDate}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate max-w-xs">SHA: {rep.digitalSignatureSha}</div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rep.status === 'Submitted & Verified'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                  }`}
                >
                  {rep.status}
                </span>
                <button className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-[11px] font-semibold transition-colors flex items-center gap-1">
                  <Download className="w-3 h-3" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-600" />
            Readable Governance Audit Trail
          </h3>

          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search user, action, hash..."
              value={searchAudit}
              onChange={(e) => setSearchAudit(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Action Executed</th>
                <th className="py-2.5 px-3">Target Entity</th>
                <th className="py-2.5 px-3">State Transition</th>
                <th className="py-2.5 px-3">Cryptographic Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
              {filteredAudit.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 text-slate-500">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-900 dark:text-white">{log.user}</td>
                  <td className="py-2.5 px-3 font-sans text-blue-600">{log.role}</td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-800 dark:text-slate-200">{log.action}</td>
                  <td className="py-2.5 px-3 text-purple-600 font-bold">{log.entity}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-400">
                    <span className="text-rose-600">{log.previousState}</span> → <span className="text-emerald-600 font-bold">{log.newState}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 truncate max-w-[140px]" title={log.hash}>
                    {log.hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
