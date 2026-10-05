import React, { useState } from 'react';
import {
  ClipboardList,
  Filter,
  Search,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import {
  SubsidiaryId,
  InspectionRecord,
  InspectionStatus,
  UserRole
} from '../../types/dashboard';
import { INSPECTIONS_DATA } from '../../data/mockData';
import { InspectionDetailModal } from '../Inspections/InspectionDetailModal';

interface InspectionsPanelProps {
  subsidiary: SubsidiaryId;
  role: UserRole;
  selectedInspectionFromParent?: InspectionRecord | null;
  onClearParentSelection?: () => void;
}

export const InspectionsPanel: React.FC<InspectionsPanelProps> = ({
  subsidiary,
  role,
  selectedInspectionFromParent,
  onClearParentSelection
}) => {
  const [inspectionsList, setInspectionsList] = useState<InspectionRecord[]>(INSPECTIONS_DATA);
  const [selectedInspection, setSelectedInspection] = useState<InspectionRecord | null>(
    selectedInspectionFromParent || null
  );

  React.useEffect(() => {
    if (selectedInspectionFromParent) {
      setSelectedInspection(selectedInspectionFromParent);
    }
  }, [selectedInspectionFromParent]);

  // Filters
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterRisk, setFilterRisk] = useState<string>('All');

  const filtered = inspectionsList.filter((insp) => {
    if (subsidiary !== 'ALL' && insp.subsidiary !== subsidiary) return false;
    if (filterType !== 'All' && insp.type !== filterType) return false;
    if (filterStatus !== 'All' && insp.status !== filterStatus) return false;
    if (filterRisk !== 'All' && insp.riskLevel !== filterRisk) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        insp.id.toLowerCase().includes(q) ||
        insp.mine.toLowerCase().includes(q) ||
        insp.area.toLowerCase().includes(q) ||
        insp.officer.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCount = filtered.length;
  const inProgressCount = filtered.filter((i) => i.status === 'In Progress').length;
  const reviewCount = filtered.filter((i) => i.status === 'Review').length;
  const completedCount = filtered.filter((i) => i.status === 'Verified' || i.status === 'Closed').length;
  const highRiskCount = filtered.filter((i) => i.riskLevel === 'Critical' || i.riskLevel === 'Major').length;

  const handleCloseModal = () => {
    setSelectedInspection(null);
    if (onClearParentSelection) {
      onClearParentSelection();
    }
  };

  const handleVerifyInModal = (id: string, notes: string) => {
    setInspectionsList((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: 'Verified', verificationNotes: notes, verifiedBy: role } : i
      )
    );
  };

  return (
    <div className="space-y-5">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            Inspections Management Module
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Schedule, monitor, review, and verify statutory and safety colliery field inspections.
          </p>
        </div>

        <button className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs">
          <Plus className="w-4 h-4" />
          <span>Schedule New Inspection</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-[11px] text-slate-500 font-medium">Total Inspections</span>
          <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">{totalCount}</div>
        </div>
        <div className="p-3 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30">
          <span className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">In Progress</span>
          <div className="text-xl font-bold font-mono text-blue-700 dark:text-blue-300 mt-0.5">{inProgressCount}</div>
        </div>
        <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/30">
          <span className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">Under Review</span>
          <div className="text-xl font-bold font-mono text-amber-700 dark:text-amber-300 mt-0.5">{reviewCount}</div>
        </div>
        <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30">
          <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">Verified & Closed</span>
          <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-300 mt-0.5">{completedCount}</div>
        </div>
        <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30">
          <span className="text-[11px] text-rose-700 dark:text-rose-300 font-medium">High-Risk Findings</span>
          <div className="text-xl font-bold font-mono text-rose-700 dark:text-rose-300 mt-0.5">{highRiskCount}</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, mine name, inspector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Audit Types</option>
            <option value="DGMS Statutory">DGMS Statutory</option>
            <option value="Safety Audit">Safety Audit</option>
            <option value="Environmental Inspection">Environmental Inspection</option>
            <option value="Structural Integrity">Structural Integrity</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Risk Levels</option>
            <option value="Critical">Critical</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Inspections Main Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-3 px-4">Inspection ID</th>
                <th className="py-3 px-4">Mine & Subsidiary</th>
                <th className="py-3 px-4">Inspection Area</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Officer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Findings</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((insp) => (
                <tr
                  key={insp.id}
                  onClick={() => setSelectedInspection(insp)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">{insp.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {insp.mine} <span className="text-slate-400 font-normal">({insp.subsidiary})</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">{insp.area}</td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{insp.type}</td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{insp.officer}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{insp.date}</td>
                  <td className="py-3 px-4 font-bold font-mono text-slate-900 dark:text-white">
                    {insp.findingsCount}
                  </td>
                  <td className="py-3 px-4">
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
                  <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{insp.status}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInspection(insp);
                      }}
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-colors shadow-xs"
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

      {/* Modal View */}
      <InspectionDetailModal
        inspection={selectedInspection}
        onClose={handleCloseModal}
        role={role}
        onVerifyInspection={handleVerifyInModal}
      />

    </div>
  );
};
