import React, { useState } from 'react';
import {
  X,
  ClipboardList,
  FileText,
  Camera,
  Scale,
  CheckCircle2,
  ShieldCheck,
  History,
  Sparkles,
  MapPin,
  Calendar,
  User,
  AlertTriangle
} from 'lucide-react';
import { InspectionRecord, UserRole } from '../../types/dashboard';

interface InspectionDetailModalProps {
  inspection: InspectionRecord | null;
  onClose: () => void;
  role: UserRole;
  onVerifyInspection?: (id: string, notes: string) => void;
}

export const InspectionDetailModal: React.FC<InspectionDetailModalProps> = ({
  inspection,
  onClose,
  role,
  onVerifyInspection
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'findings' | 'evidence' | 'compliance' | 'actions' | 'verification' | 'audit'
  >('overview');

  const [verificationNotes, setVerificationNotes] = useState('');
  const [isVerified, setIsVerified] = useState(inspection?.status === 'Verified' || inspection?.status === 'Closed');

  if (!inspection) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationNotes.trim()) return;
    setIsVerified(true);
    if (onVerifyInspection) {
      onVerifyInspection(inspection.id, verificationNotes);
    }
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: FileText },
    { id: 'findings' as const, label: `Findings (${inspection.findings.length})`, icon: AlertTriangle },
    { id: 'evidence' as const, label: 'Evidence Media', icon: Camera },
    { id: 'compliance' as const, label: 'Compliance Mapping', icon: Scale },
    { id: 'actions' as const, label: 'Corrective Actions', icon: CheckCircle2 },
    { id: 'verification' as const, label: 'Verification Signoff', icon: ShieldCheck },
    { id: 'audit' as const, label: 'Audit History', icon: History }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50 dark:bg-slate-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                {inspection.id}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  inspection.riskLevel === 'Critical'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                }`}
              >
                {inspection.riskLevel} Risk
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Status: <b className="text-slate-900 dark:text-white">{inspection.status}</b>
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {inspection.type} — {inspection.mine}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Area: {inspection.area} ({inspection.subsidiary})</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-800 px-4 bg-white dark:bg-slate-900 no-scrollbar">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body Viewport */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <span className="text-[10px] text-slate-500 font-medium">Inspection Date</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">{inspection.date}</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <span className="text-[10px] text-slate-500 font-medium">Inspecting Officer</span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5 truncate">{inspection.officer}</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <span className="text-[10px] text-slate-500 font-medium">Total Findings</span>
                  <div className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">{inspection.findings.length}</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <span className="text-[10px] text-slate-500 font-medium">Verification Status</span>
                  <div className="font-bold text-emerald-600 mt-0.5">{isVerified ? 'Verified' : 'Pending Verification'}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white">Inspection Summary Scope</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Statutory inspection carried out under DGMS directives at {inspection.mine}, covering {inspection.area}. Audit evaluated ventilation parameters, strata stability, haulage berms, and environmental compliance limits.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: FINDINGS */}
          {activeTab === 'findings' && (
            <div className="space-y-3">
              {inspection.findings.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">No non-compliance findings recorded during this inspection.</div>
              ) : (
                inspection.findings.map((fnd) => (
                  <div key={fnd.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-600">{fnd.id}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              fnd.severity === 'Critical'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                            }`}
                          >
                            {fnd.severity}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mt-1">{fnd.title}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold">
                        {fnd.status}
                      </span>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300">{fnd.description}</p>

                    {/* AI Suggestion Box */}
                    {fnd.aiSuggestion && (
                      <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-purple-700 dark:text-purple-300 font-bold">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            AI-ASSISTED REMEDIATION RECOMMENDATION
                          </span>
                          <span>Confidence: {fnd.aiConfidence}%</span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 text-xs font-medium">{fnd.aiSuggestion}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 font-mono">
                      <span>Regulation: <b className="text-blue-600">{fnd.complianceRef}</b></span>
                      <span>Owner: <b className="text-slate-800 dark:text-slate-200">{fnd.owner}</b></span>
                      <span>Due: <b className="text-rose-600">{fnd.dueDate}</b></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: EVIDENCE MEDIA */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Field Evidence Media & Digital Metadata</h4>
              
              {inspection.findings.flatMap((f) => f.evidence).length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 border border-dashed rounded-xl">
                  No photographic/video evidence attached yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {inspection.findings.flatMap((f) => f.evidence).map((ev) => (
                    <div key={ev.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden text-xs">
                      <img src={ev.url} alt={ev.caption} className="w-full h-40 object-cover" />
                      <div className="p-3 space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white">{ev.caption}</div>
                        <div className="text-[10px] text-slate-500 font-mono">Uploader: {ev.uploader}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{ev.location}</div>
                        <div className="text-[10px] text-blue-600 font-mono">{ev.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: COMPLIANCE MAPPING */}
          {activeTab === 'compliance' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/30">
                <h4 className="font-bold text-blue-900 dark:text-blue-300">Mapped Statutory Regulations</h4>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  The findings in this inspection directly impact DGMS statutory compliance scores under Coal Mines Regulations 2017.
                </p>
              </div>

              {inspection.findings.map((f) => (
                <div key={f.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="font-mono font-bold text-blue-600">{f.complianceRef}</div>
                  <div className="font-medium text-slate-900 dark:text-white mt-0.5">{f.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Status: {f.status}</div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: CORRECTIVE ACTIONS */}
          {activeTab === 'actions' && (
            <div className="space-y-3 text-xs">
              {inspection.findings.map((f) => (
                <div key={f.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-900 dark:text-white">{f.title}</span>
                    <span className="text-rose-600 font-mono">Due: {f.dueDate}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Assigned To: {f.owner}</div>
                  <div className="text-[11px] font-semibold text-blue-600">Action Status: {f.status}</div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: VERIFICATION SIGNOFF */}
          {activeTab === 'verification' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-1">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300">Statutory Re-Inspection & Verification Policy</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  An inspection finding cannot be marked CLOSED without verification evidence and signoff by an Authorized Mine Manager or DGMS Inspector.
                </p>
              </div>

              {isVerified ? (
                <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-100/50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    This inspection has been verified and signed off by <b>{inspection.verifiedBy || role}</b>.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleVerify} className="space-y-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <label className="block font-bold text-slate-900 dark:text-white">Verification Signoff Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Enter re-inspection verification details, instrument checks, and signoff approval..."
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-xs"
                  >
                    Authorize & Sign-off Verification
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 7: AUDIT HISTORY */}
          {activeTab === 'audit' && (
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex justify-between font-mono text-[10px] text-slate-500">
                  <span>{inspection.date} 10:15 AM</span>
                  <span className="text-blue-600 font-bold">{inspection.officer}</span>
                </div>
                <div className="font-semibold text-slate-900 dark:text-white">Inspection record logged into immutable governance ledger.</div>
                <div className="font-mono text-[9px] text-slate-400">SHA-256: sha256-b7f8a49c011e42a98f12c8e4d2</div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
