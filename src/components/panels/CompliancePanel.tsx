import React, { useState } from 'react';
import {
  FileWarning,
  Users2,
  History
} from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';
import { VIOLATIONS_DATA, CONTRACTORS_DATA } from '../../data/mockData';

interface CompliancePanelProps {
  subsidiary: SubsidiaryId;
}

export const CompliancePanel: React.FC<CompliancePanelProps> = ({ subsidiary }) => {
  const [filterSeverity, setFilterSeverity] = useState<'All' | 'Critical' | 'Major'>('All');

  const filteredViolations = VIOLATIONS_DATA.filter((v) => {
    if (subsidiary !== 'ALL' && v.subsidiary !== subsidiary) return false;
    if (filterSeverity !== 'All' && v.severity !== filterSeverity) return false;
    return true;
  });

  const filteredContractors = CONTRACTORS_DATA.filter((c) => {
    if (subsidiary !== 'ALL' && c.subsidiary !== subsidiary) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileWarning className="w-5 h-5 text-amber-500" />
            Statutory & Compliance Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor Mines Act 1952, CMR 2017 regulations, Environmental Clearances (EP Act), and Contractor Compliance.
          </p>
        </div>
      </div>
      
      {/* Statutory Pillar Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">Mines Act & CMR 2017</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">97.6%</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">DGMS Safety Standards</div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">EP Act 1986 & SPCB</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">95.8%</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">Environment Clearances & CTO</div>
        </div>

        <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/70 dark:bg-purple-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">Contract Labour (R&A) 1970</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">98.1%</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">EPFO, ESIC & High-Power Wages</div>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">MMDR & Mineral Concession</div>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">99.0%</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">IBM Mining Plan & Royalty</div>
        </div>
      </div>

      {/* Row 1: Open Violations & Overdue Corrective Actions Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <FileWarning className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Statutory Violations & Corrective Action Notices (CAN)</h3>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            {(['All', 'Critical', 'Major'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                  filterSeverity === sev ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Notice ID</th>
                <th className="py-2.5 px-3">Statute & Regulation</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Colliery / Mine</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Overdue Days</th>
                <th className="py-2.5 px-3">Responsible Officer</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
              {filteredViolations.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{v.id}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-white font-medium">{v.ruleCode}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300 max-w-xs truncate" title={v.description}>
                    {v.description}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">
                    {v.mine} ({v.subsidiary})
                  </td>
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        v.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400'
                          : 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400'
                      }`}
                    >
                      {v.severity}
                    </span>
                  </td>
                  <td className={`py-2.5 px-3 font-bold ${v.daysOverdue > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {v.daysOverdue > 0 ? `${v.daysOverdue} Days` : 'On Schedule'}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">{v.assignedOfficer}</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{v.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 2: Contractor Compliance Registry + Regulatory Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Contractor Registry (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Users2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Contractor Statutory Compliance & Risk Matrix
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">Shram Suvidha Verified</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Contractor Name</th>
                  <th className="py-2.5 px-3">Subsidiary</th>
                  <th className="py-2.5 px-3">Workers</th>
                  <th className="py-2.5 px-3">Labour License</th>
                  <th className="py-2.5 px-3">Training %</th>
                  <th className="py-2.5 px-3">PPE %</th>
                  <th className="py-2.5 px-3">Risk Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                {filteredContractors.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-white font-medium">{c.name}</td>
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">{c.subsidiary}</td>
                    <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">{c.workersCount}</td>
                    <td className="py-2.5 px-3 font-sans text-emerald-700 dark:text-emerald-400 font-medium">Valid ({c.licenseValidTill})</td>
                    <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{c.trainingComplianceRate}%</td>
                    <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">{c.ppeComplianceRate}%</td>
                    <td className="py-2.5 px-3 font-sans">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          c.riskRating === 'High'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400'
                            : c.riskRating === 'Medium'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400'
                        }`}
                      >
                        {c.riskRating} Risk
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Trail & SHA-256 Ledger (1 col) */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Immutable Audit Ledger
            </h4>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-medium">SHA-256</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>Today 09:45 AM</span>
                <span className="text-blue-600 dark:text-blue-400">DGMS-INSP</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200 mt-1 font-sans">
                Moonidih UG air velocity remediation plan accepted by DGMS Sirdar.
              </div>
              <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                Hash: b7f8a49c011e...e8d2
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>Today 08:12 AM</span>
                <span className="text-emerald-600 dark:text-emerald-400">SAP-ERP</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200 mt-1 font-sans">
                Monthly IBM Form H dispatch dataset digitally signed and pushed.
              </div>
              <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                Hash: 4a21d98e3b52...f091
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>Yesterday 21:00</span>
                <span className="text-amber-600 dark:text-amber-400">SPCB-OD</span>
              </div>
              <div className="text-slate-800 dark:text-slate-200 mt-1 font-sans">
                Talcher CAAQMS calibration logs verified with State Board server.
              </div>
              <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                Hash: 89ec41d66a2b...38da
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
