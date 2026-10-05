import React, { useState } from 'react';
import {
  X,
  ClipboardList,
  Calendar,
  MapPin,
  User,
  AlertTriangle,
  Building2,
  Shield,
  FileText,
  CheckCircle2
} from 'lucide-react';
import {
  SubsidiaryId,
  InspectionRecord,
  RiskLevel
} from '../../types/dashboard';
import { SUBSIDIARIES } from '../../data/mockData';

interface ScheduleInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleSuccess: (newInspection: InspectionRecord) => void;
  currentSubsidiary: SubsidiaryId;
}

export const ScheduleInspectionModal: React.FC<ScheduleInspectionModalProps> = ({
  isOpen,
  onClose,
  onScheduleSuccess,
  currentSubsidiary
}) => {
  const [subsidiary, setSubsidiary] = useState<SubsidiaryId>(
    currentSubsidiary === 'ALL' ? 'BCCL' : currentSubsidiary
  );
  const [mineName, setMineName] = useState('');
  const [area, setArea] = useState('');
  const [type, setType] = useState<InspectionRecord['type']>('DGMS Statutory');
  const [officer, setOfficer] = useState('');
  const [date, setDate] = useState('2026-10-06');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('Major');
  const [scopeNotes, setScopeNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!mineName.trim()) {
      setErrorMsg('Please enter the Mine / Colliery name.');
      return;
    }
    if (!area.trim()) {
      setErrorMsg('Please enter the Inspection Area / Location.');
      return;
    }
    if (!officer.trim()) {
      setErrorMsg('Please enter the Inspecting Officer name.');
      return;
    }

    const randomId = `INSP-2026-${Math.floor(200 + Math.random() * 800)}`;
    const subObj = SUBSIDIARIES.find((s) => s.id === subsidiary);

    const newRecord: InspectionRecord = {
      id: randomId,
      subsidiary,
      mine: mineName.trim(),
      area: area.trim(),
      type,
      officer: officer.trim(),
      date,
      status: 'In Progress',
      findingsCount: 0,
      riskLevel,
      locationLat: 23.7381,
      locationLng: 86.3456,
      findings: [
        {
          id: `FND-NEW-01`,
          ruleCode: 'CMR 2017 Reg 153',
          description: scopeNotes.trim() || 'Initial statutory inspection scheduled.',
          severity: riskLevel,
          status: 'Open',
          dueDate: date,
          assignedTo: officer.trim()
        }
      ],
      evidencePhotos: []
    };

    onScheduleSuccess(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Schedule New Inspection
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Issue a new statutory or safety inspection order across Coal India mines.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4 text-xs">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 flex items-center gap-2 font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Subsidiary */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Subsidiary
              </label>
              <select
                value={subsidiary}
                onChange={(e) => setSubsidiary(e.target.value as SubsidiaryId)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {SUBSIDIARIES.filter((s) => s.id !== 'ALL').map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.id} — {sub.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Audit Type */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                Inspection Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="DGMS Statutory">DGMS Statutory Audit</option>
                <option value="Safety Audit">Internal Safety Audit</option>
                <option value="Environmental Inspection">Environmental & ESG Compliance</option>
                <option value="Structural Integrity">Geotechnical & Slope Integrity</option>
              </select>
            </div>

            {/* Mine / Colliery Name */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Mine / Colliery Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Moonidih Underground Colliery"
                value={mineName}
                onChange={(e) => {
                  setMineName(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {/* Inspection Area / Location */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Inspection Area / Seam *
              </label>
              <input
                type="text"
                placeholder="e.g. Seam 3 Tailgate Airway #4"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {/* Inspecting Officer */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Inspecting Officer & Designation *
              </label>
              <input
                type="text"
                placeholder="e.g. Er. A. K. Banerjee (DGMS Sirdar)"
                value={officer}
                onChange={(e) => {
                  setOfficer(e.target.value);
                  setErrorMsg('');
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Scheduled Audit Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

          </div>

          {/* Risk Target Level */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
              Pre-Inspection Risk Categorization
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['Critical', 'Major', 'Minor', 'Low'] as RiskLevel[]).map((rl) => (
                <button
                  key={rl}
                  type="button"
                  onClick={() => setRiskLevel(rl)}
                  className={`p-2 rounded-xl border font-bold text-center transition-all ${
                    riskLevel === rl
                      ? rl === 'Critical'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : rl === 'Major'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : rl === 'Minor'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {rl}
                </button>
              ))}
            </div>
          </div>

          {/* Directives & Scope */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Inspection Scope & Directives
            </label>
            <textarea
              rows={3}
              placeholder="Specify statutory regulation checks, required anemometer/methanometer readings, or highwall berm inspections..."
              value={scopeNotes}
              onChange={(e) => setScopeNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Schedule Inspection Order</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
