import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Upload,
  ShieldCheck,
  Search,
  Filter,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import {
  SubsidiaryId,
  CorrectiveActionItem,
  UserRole,
  ActionStatus
} from '../../types/dashboard';
import { CORRECTIVE_ACTIONS_DATA } from '../../data/mockData';

interface CorrectiveActionsPanelProps {
  subsidiary: SubsidiaryId;
  role: UserRole;
}

export const CorrectiveActionsPanel: React.FC<CorrectiveActionsPanelProps> = ({
  subsidiary,
  role
}) => {
  const [actions, setActions] = useState<CorrectiveActionItem[]>(CORRECTIVE_ACTIONS_DATA);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [selectedAction, setSelectedAction] = useState<CorrectiveActionItem | null>(null);

  const [evidenceNotes, setEvidenceNotes] = useState('');

  const filtered = actions.filter((act) => {
    if (subsidiary !== 'ALL' && act.subsidiary !== subsidiary) return false;
    if (filterStatus !== 'All' && act.status !== filterStatus) return false;
    if (filterPriority !== 'All' && act.priority !== filterPriority) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        act.id.toLowerCase().includes(q) ||
        act.issueTitle.toLowerCase().includes(q) ||
        act.mine.toLowerCase().includes(q) ||
        act.owner.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const countOpen = actions.filter((a) => a.status === 'OPEN').length;
  const countAssigned = actions.filter((a) => a.status === 'ASSIGNED').length;
  const countInProgress = actions.filter((a) => a.status === 'IN PROGRESS').length;
  const countVerification = actions.filter((a) => a.status === 'PENDING VERIFICATION').length;
  const countVerified = actions.filter((a) => a.status === 'VERIFIED').length;
  const countClosed = actions.filter((a) => a.status === 'CLOSED').length;

  const handleUpdateStatus = (id: string, newStatus: ActionStatus) => {
    setActions((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: newStatus,
              verificationDate: newStatus === 'VERIFIED' ? new Date().toISOString().split('T')[0] : a.verificationDate,
              verifiedBy: newStatus === 'VERIFIED' ? role : a.verifiedBy
            }
          : a
      )
    );
    if (selectedAction?.id === id) {
      setSelectedAction((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Corrective Action Tracker & Verification Center
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track statutory remediation notices through evidence submission, verification signoff, and immutable closure.
          </p>
        </div>
      </div>

      {/* Stage Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Open', count: countOpen, color: 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-900' },
          { label: 'Assigned', count: countAssigned, color: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-900' },
          { label: 'In Progress', count: countInProgress, color: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-900' },
          { label: 'Pending Verification', count: countVerification, color: 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/40 dark:border-purple-900' },
          { label: 'Verified', count: countVerified, color: 'bg-cyan-50 border-cyan-200 text-cyan-700 dark:bg-cyan-950/40 dark:border-cyan-900' },
          { label: 'Closed', count: countClosed, color: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-900' }
        ].map((s, idx) => (
          <div key={idx} className={`p-3 rounded-xl border ${s.color}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider">{s.label}</span>
            <div className="text-xl font-mono font-bold mt-1">{s.count}</div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search action ID, issue, owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Stages</option>
            <option value="OPEN">Open</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="PENDING VERIFICATION">Pending Verification</option>
            <option value="VERIFIED">Verified</option>
            <option value="CLOSED">Closed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-3 px-4">Action ID</th>
                <th className="py-3 px-4">Source Ref</th>
                <th className="py-3 px-4">Issue Title</th>
                <th className="py-3 px-4">Mine</th>
                <th className="py-3 px-4">Responsible Owner</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Workflow Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">{act.id}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{act.source}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white max-w-xs truncate" title={act.issueTitle}>
                    {act.issueTitle}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">{act.mine}</td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{act.owner}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        act.priority === 'Critical'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {act.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-rose-600">{act.dueDate}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[10px] font-bold">
                      {act.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-1.5">
                    {act.status === 'OPEN' && (
                      <button
                        onClick={() => handleUpdateStatus(act.id, 'IN PROGRESS')}
                        className="px-2 py-1 rounded bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-500 transition-colors"
                      >
                        Start Remediation
                      </button>
                    )}

                    {act.status === 'IN PROGRESS' && (
                      <button
                        onClick={() => handleUpdateStatus(act.id, 'PENDING VERIFICATION')}
                        className="px-2 py-1 rounded bg-purple-600 text-white text-[10px] font-bold hover:bg-purple-500 transition-colors"
                      >
                        Submit Evidence
                      </button>
                    )}

                    {act.status === 'PENDING VERIFICATION' && (
                      <button
                        onClick={() => handleUpdateStatus(act.id, 'VERIFIED')}
                        className="px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-500 transition-colors flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        Verify
                      </button>
                    )}

                    {act.status === 'VERIFIED' && (
                      <button
                        onClick={() => handleUpdateStatus(act.id, 'CLOSED')}
                        className="px-2 py-1 rounded bg-slate-800 text-white text-[10px] font-bold hover:bg-slate-700 transition-colors"
                      >
                        Close Action
                      </button>
                    )}

                    {act.status === 'CLOSED' && (
                      <span className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Closed
                      </span>
                    )}
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
