import React, { useState } from 'react';
import {
  X,
  ClipboardList,
  Camera,
  Scale,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  User,
  MapPin,
  Calendar,
  AlertTriangle,
  Lock
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
      title: 'Inspection',
      subtitle: 'DGMS Audit',
      icon: ClipboardList,
      color: 'text-blue-600 border-blue-500 bg-blue-50 dark:bg-blue-950/40'
    },
    {
      num: 2,
      title: 'Finding',
      subtitle: 'Air Velocity Defect',
      icon: AlertTriangle,
      color: 'text-amber-600 border-amber-500 bg-amber-50 dark:bg-amber-950/40'
    },
    {
      num: 3,
      title: 'Compliance',
      subtitle: 'CMR 2017 Reg 153',
      icon: Scale,
      color: 'text-purple-600 border-purple-500 bg-purple-50 dark:bg-purple-950/40'
    },
    {
      num: 4,
      title: 'Corrective Action',
      subtitle: 'Fan Overhaul Order',
      icon: CheckCircle2,
      color: 'text-rose-600 border-rose-500 bg-rose-50 dark:bg-rose-950/40'
    },
    {
      num: 5,
      title: 'Verification',
      subtitle: 'Re-test & Evidence',
      icon: ShieldCheck,
      color: 'text-emerald-600 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
    },
    {
      num: 6,
      title: 'Closed',
      subtitle: 'Verified Record',
      icon: Lock,
      color: 'text-slate-600 border-slate-500 bg-slate-100 dark:bg-slate-800'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50 dark:bg-slate-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                CASE-2026-00421
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400">
                Critical Issue
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                Closed & Verified
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              Underground Air Velocity Deficiency — Moonidih Colliery
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Connected Governance Lifecycle Flow
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Small Visual Lifecycle Stepper Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[640px] gap-2">
            {steps.map((st) => {
              const Icon = st.icon;
              const isActive = activeStep === st.num;
              return (
                <button
                  key={st.num}
                  onClick={() => setActiveStep(st.num)}
                  className={`flex-1 flex flex-col items-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    isActive
                      ? `${st.color} shadow-sm ring-2 ring-blue-500/30 font-bold`
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">{st.title}</span>
                  <span className="text-[9px] text-slate-400 font-normal mt-0.5">{st.subtitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Detail Viewport */}
        <div className="p-6 flex-1 overflow-y-auto space-y-5">
          
          {/* STEP 1: INSPECTION */}
          {activeStep === 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-blue-600" />
                1. Field Inspection
              </h3>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Inspector:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Er. A. K. Banerjee (DGMS Sirdar)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mine:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Moonidih Colliery (BCCL)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">2026-10-04</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FINDING */}
          {activeStep === 2 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                2. Finding Identified
              </h3>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Underground Air Velocity Deficiency</div>
                <p className="text-rose-600 font-semibold leading-relaxed">
                  Measured velocity at Tailgate Airway #3 was 1.1 m/s (below statutory minimum limit of 1.5 m/s).
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: COMPLIANCE */}
          {activeStep === 3 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-purple-600" />
                3. Map to Compliance
              </h3>
              <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 text-xs space-y-2">
                <div className="font-mono text-sm font-bold text-purple-700 dark:text-purple-300">
                  CMR 2017 Regulation 153(2) — Underground Air Velocity
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Mandatory requirement to maintain minimum 1.5 m/s air velocity in main return ventilation airways.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: CORRECTIVE ACTION */}
          {activeStep === 4 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                4. Assign Corrective Action
              </h3>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-2">
                <div>Action Assigned To: <b className="text-slate-900 dark:text-white">Safety Officer (Moonidih)</b></div>
                <div>Task Required: <b className="text-blue-600">Adjust main fan blade pitch & seal air stoppings in seam 3.</b></div>
                <div>Status: <b className="text-emerald-600">Completed (2026-10-05)</b></div>
              </div>
            </div>
          )}

          {/* STEP 5: VERIFICATION */}
          {activeStep === 5 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                5. Verify Corrective Action
              </h3>
              <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-xs space-y-2">
                <div className="font-bold text-emerald-900 dark:text-emerald-200">
                  Re-measurement confirmed air velocity restored to 1.62 m/s.
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  Verified by Mine Manager B. Pattnaik with anemometer photo log.
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: CLOSED */}
          {activeStep === 6 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-600" />
                6. Verified Closure
              </h3>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-xs space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">
                  Case Status: CLOSED & AUDITABLE
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  Full inspection record, evidence photo, compliance mapping, and signoff logged into central audit record.
                </p>
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
            Step {activeStep} of 6
          </span>

          {activeStep < 6 ? (
            <button
              onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors shadow-xs cursor-pointer"
            >
              Close Case
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
