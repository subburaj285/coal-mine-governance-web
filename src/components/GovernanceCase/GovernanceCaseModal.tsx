import React, { useState } from 'react';
import {
  X,
  ClipboardList,
  Camera,
  Scale,
  CheckCircle2,
  ShieldCheck,
  History,
  ArrowRight,
  FileCheck,
  Check,
  MapPin,
  Calendar,
  User,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

interface GovernanceCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GovernanceCaseModal: React.FC<GovernanceCaseModalProps> = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Field Inspection',
      subtitle: 'DGMS Sirdar Audit',
      icon: ClipboardList,
      color: 'text-blue-600 border-blue-500 bg-blue-50 dark:bg-blue-950/40'
    },
    {
      num: 2,
      title: 'Finding & Evidence',
      subtitle: 'Photo & GPS Metadata',
      icon: Camera,
      color: 'text-amber-600 border-amber-500 bg-amber-50 dark:bg-amber-950/40'
    },
    {
      num: 3,
      title: 'Compliance Mapping',
      subtitle: 'CMR 2017 Reg 153',
      icon: Scale,
      color: 'text-purple-600 border-purple-500 bg-purple-50 dark:bg-purple-950/40'
    },
    {
      num: 4,
      title: 'Corrective Action',
      subtitle: 'Remediation Assigned',
      icon: CheckCircle2,
      color: 'text-rose-600 border-rose-500 bg-rose-50 dark:bg-rose-950/40'
    },
    {
      num: 5,
      title: 'Corrective Evidence',
      subtitle: 'Photo Proof Uploaded',
      icon: FileCheck,
      color: 'text-cyan-600 border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40'
    },
    {
      num: 6,
      title: 'Verification & Closure',
      subtitle: 'Manager Signoff',
      icon: ShieldCheck,
      color: 'text-emerald-600 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      num: 7,
      title: 'Immutable Audit Trail',
      subtitle: 'SHA-256 Ledger',
      icon: History,
      color: 'text-slate-700 dark:text-slate-300 border-slate-500 bg-slate-100 dark:bg-slate-800'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50 dark:bg-slate-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                CASE-2026-00421
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400">
                Critical Severity
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
                Verified & Closed
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              Underground Air Velocity Deficiency — Moonidih Colliery (BCCL)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Demonstration of full governance lifecycle from field inspection to verified closure and SHA-256 audit.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 7-Step Interactive Workflow Stepper Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[700px] gap-2">
            {steps.map((st) => {
              const Icon = st.icon;
              const isActive = activeStep === st.num;
              return (
                <button
                  key={st.num}
                  onClick={() => setActiveStep(st.num)}
                  className={`flex-1 flex flex-col items-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    isActive
                      ? `${st.color} shadow-sm ring-2 ring-blue-500/30 font-bold`
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 mb-1">
                    <span>STEP {st.num}</span>
                  </div>
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">{st.title}</span>
                  <span className="text-[9px] text-slate-400 font-normal mt-0.5">{st.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Detail Content Viewport */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          
          {/* STEP 1: FIELD INSPECTION */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 text-blue-600 font-bold font-mono">
                  STEP 1
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Field Inspection Logged</h3>
                  <p className="text-xs text-slate-500">Inspector initiated statutory audit on underground airway district.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
                    Inspection Metadata
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inspection ID:</span>
                    <span className="font-mono font-bold text-blue-600">INSP-2026-401</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inspecting Officer:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Er. A. K. Banerjee (DGMS Sirdar)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mine & Area:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Moonidih Colliery Tailgate #3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Time:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">2026-10-04 10:15 AM</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                  <div className="font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-200 dark:border-slate-800">
                    What Happens at this Step?
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    The DGMS Sirdar conducts physical anemometer measurement at underground airway Station 4B. The recorded air velocity is 1.1 m/s, triggering an immediate non-compliance warning.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FINDING & EVIDENCE */}
          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 text-amber-600 font-bold font-mono">
                  STEP 2
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Non-Compliance Finding & Photographic Evidence</h3>
                  <p className="text-xs text-slate-500">Field evidence attached with verified GPS timestamp metadata.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Finding Details</h4>
                  <div className="p-2.5 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-800 dark:text-rose-300 font-medium">
                    Air velocity in return airway measured at 1.1 m/s against minimum statutory standard of 1.5 m/s.
                  </div>
                  <div className="space-y-1 text-slate-600 dark:text-slate-300">
                    <div>Finding Code: <b className="font-mono text-slate-900 dark:text-white">FND-101</b></div>
                    <div>Severity Level: <b className="text-rose-600 font-bold">Critical</b></div>
                    <div>Assigned Owner: <b className="text-slate-900 dark:text-white">Safety Officer (Moonidih)</b></div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
                    alt="Anemometer Evidence"
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3 space-y-1 text-xs">
                    <div className="font-bold text-slate-900 dark:text-white">Anemometer station reading photo</div>
                    <div className="text-[10px] font-mono text-slate-500">Location: Station 4B (Lat: 23.7381, Lng: 86.3456)</div>
                    <div className="text-[10px] font-mono text-blue-600">Timestamp: 2026-10-04 10:15 AM</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: COMPLIANCE MAPPING */}
          {activeStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950 border border-purple-200 text-purple-600 font-bold font-mono">
                  STEP 3
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Statutory Regulation Mapping</h3>
                  <p className="text-xs text-slate-500">Finding mapped to DGMS Coal Mines Regulations 2017 rule code.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 text-xs space-y-2">
                <div className="font-mono text-sm font-bold text-purple-700 dark:text-purple-300">
                  CMR 2017 Regulation 153(2) — Underground Air Velocity Standards
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  "Under Regulation 153(2), air velocity in underground main return airways shall not be less than 1.5 m/s to prevent dangerous accumulation of inflammable gas (methane CH4)."
                </p>
                <div className="pt-2 border-t border-purple-200 dark:border-purple-800 font-semibold text-rose-600">
                  Deficit Impact: Non-compliance deducts 1.2% from Moonidih colliery statutory compliance score.
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CORRECTIVE ACTION */}
          {activeStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950 border border-rose-200 text-rose-600 font-bold font-mono">
                  STEP 4
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Corrective Action Issued (ACT-2026-801)</h3>
                  <p className="text-xs text-slate-500">Remediation order assigned with fixed SLA deadline.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="text-[10px] text-slate-500 font-medium">Assigned Officer</span>
                  <div className="font-bold text-slate-900 dark:text-white">Safety Officer (Moonidih)</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="text-[10px] text-slate-500 font-medium">Statutory SLA Deadline</span>
                  <div className="font-bold font-mono text-rose-600">2026-10-07 (3 Days SLA)</div>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                  <span className="text-[10px] text-slate-500 font-medium">Remediation Directive</span>
                  <div className="font-bold text-blue-600">Overhaul Fan House #2 & Seal Booster Doors</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CORRECTIVE EVIDENCE */}
          {activeStep === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 text-cyan-600 font-bold font-mono">
                  STEP 5
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Corrective Evidence Submitted</h3>
                  <p className="text-xs text-slate-500">Engineering team uploads proof of blade pitch adjustment and door seal.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/30 text-xs space-y-2">
                <div className="font-bold text-cyan-900 dark:text-cyan-300">Submitted Proof of Remediation</div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Fan pitch increased by +4° at Fan House #2 and intake booster door rubber gaskets replaced. Anemometer re-test logged at 1.62 m/s.
                </p>
                <div className="font-mono text-[10px] text-slate-500">Uploaded by Civil & Mechanical Team · Timestamp: 2026-10-05 09:30 AM</div>
              </div>
            </div>
          )}

          {/* STEP 6: VERIFICATION & CLOSURE */}
          {activeStep === 6 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-600 font-bold font-mono">
                  STEP 6
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Authorized Re-Inspection & Verified Closure</h3>
                  <p className="text-xs text-slate-500">Closure approved by Authorized Mine Manager.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-100/60 dark:bg-emerald-950/40 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  CASE VERIFIED & OFFICIALLY CLOSED
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  Re-inspection confirmed return airway velocity restored to 1.62 m/s (above 1.5 m/s limit). Signed off by Mine Manager B. Pattnaik.
                </p>
              </div>
            </div>
          )}

          {/* STEP 7: IMMUTABLE AUDIT TRAIL */}
          {activeStep === 7 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 text-slate-700 dark:text-slate-300 font-bold font-mono">
                  STEP 7
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Immutable Audit Trail</h3>
                  <p className="text-xs text-slate-500">Cryptographically signed history log.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 font-mono text-xs space-y-2">
                <div className="text-slate-500 text-[10px]">CASE-2026-00421 Complete Ledger Record</div>
                <div className="text-slate-900 dark:text-white">
                  State: <span className="text-emerald-600 font-bold">VERIFIED_CLOSED</span>
                </div>
                <div className="text-blue-600 text-[11px]">
                  Cryptographic Hash: sha256-b7f8a49c011e42a98f12c8e4d2
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs">
          <button
            disabled={activeStep === 1}
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
              activeStep === 1
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
            }`}
          >
            ← Previous Step
          </button>

          <span className="font-mono text-slate-500 font-semibold">
            Step {activeStep} of 7
          </span>

          {activeStep < 7 ? (
            <button
              onClick={() => setActiveStep((prev) => Math.min(7, prev + 1))}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors shadow-xs flex items-center gap-1"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-xs"
            >
              Finish Judge Journey
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
