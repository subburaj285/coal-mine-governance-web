import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertOctagon,
  ShieldAlert,
  CheckCircle,
  CloudLightning,
  BellRing,
  Activity
} from 'lucide-react';
import { SubsidiaryId, ActiveAlert } from '../../types/dashboard';
import { ACTIVE_ALERTS } from '../../data/mockData';

interface AlertsPanelProps {
  subsidiary: SubsidiaryId;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ subsidiary }) => {
  const [alerts, setAlerts] = useState<ActiveAlert[]>(ACTIVE_ALERTS);
  const [selectedSeverity, setSelectedSeverity] = useState<'All' | 'Critical' | 'High' | 'Medium'>('All');

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const filtered = alerts.filter((a) => {
    if (subsidiary !== 'ALL' && a.subsidiary !== subsidiary) return false;
    if (selectedSeverity !== 'All' && a.severity !== selectedSeverity) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      
      {/* Statutory Escalation Ladder Architecture Banner */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-500" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Three-Tier Statutory Escalation Ladder (DGMS SOP 2024)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between items-center text-blue-700 dark:text-blue-400 font-bold">
              <span>Level 1: Local Colliery</span>
              <span className="font-mono text-[10px]">T + 0 min</span>
            </div>
            <div className="text-slate-900 dark:text-white font-medium">Mine Manager & Shift Safety Sirdar</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Immediate automated SMS, control room audio alarm & push notification dispatched.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between items-center text-amber-700 dark:text-amber-400 font-bold">
              <span>Level 2: Subsidiary HQ</span>
              <span className="font-mono text-[10px]">T + 15 min</span>
            </div>
            <div className="text-slate-900 dark:text-white font-medium">CGM / Area GM & Director Technical</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Triggered if Critical/High alarm unacknowledged after 15 minutes.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="flex justify-between items-center text-rose-700 dark:text-rose-400 font-bold">
              <span>Level 3: Regulatory Authority</span>
              <span className="font-mono text-[10px]">T + 30 min</span>
            </div>
            <div className="text-slate-900 dark:text-white font-medium">DGMS Regional Inspector & Ministry of Coal</div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Statutory auto-escalation logged to National Mining Safety Portal.
            </p>
          </div>
        </div>
      </div>

      {/* Row 1: Active Alert Queue with Filter */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Active Alarm Queue ({filtered.length})</h3>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            {(['All', 'Critical', 'High', 'Medium'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                  selectedSeverity === sev ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((alert) => {
            const isCrit = alert.severity === 'Critical';
            const isHigh = alert.severity === 'High';

            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border text-xs transition-all shadow-xs ${
                  alert.acknowledged
                    ? 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 opacity-75'
                    : isCrit
                    ? 'border-rose-300 bg-rose-50/70 text-rose-900 dark:border-rose-500/40 dark:bg-rose-950/20 dark:text-rose-100'
                    : isHigh
                    ? 'border-amber-300 bg-amber-50/70 text-amber-900 dark:border-amber-500/40 dark:bg-amber-950/20 dark:text-amber-100'
                    : 'border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isCrit ? (
                      <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
                    )}
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{alert.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{alert.timestamp}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Location:</span> {alert.location} ({alert.subsidiary})
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Escalation State:</span> Level {alert.escalationLevel} ({alert.escalatedTo})
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                      {alert.category}
                    </span>
                    {alert.acknowledged ? (
                      <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" /> Acknowledged
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAcknowledge(alert.id)}
                        className="px-3 py-1 rounded-md text-[11px] font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-xs"
                      >
                        Acknowledge & Dispatch Action
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: AI Anomaly Alerts & Severe Weather Radar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* AI Anomaly Detection */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Machine Learning Sensor Drift & Pattern Anomalies
            </h4>
            <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-200">
              Auto-Detected
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center font-bold text-slate-900 dark:text-white">
                <span>Sensor SN-CO-084 Drift Anomaly</span>
                <span className="text-amber-700 dark:text-amber-400 font-mono text-[10px]">99.2% Confidence</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Zero baseline calibration drifted by +3.4 ppm over 48h without correlated air velocity fluctuation. Flagged for technician recalibration.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center font-bold text-slate-900 dark:text-white">
                <span>Highwall Creep Rate Accel (Kusmunda OCP)</span>
                <span className="text-rose-700 dark:text-rose-400 font-mono text-[10px]">Critical</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Radar prism displacement increased from 0.4 mm/day to 1.8 mm/day after recent heavy monsoon shower. Berm standoff widened to 60m.
              </p>
            </div>
          </div>
        </div>

        {/* IMD Severe Weather Warning Integration */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <CloudLightning className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              India Meteorological Department (IMD) Early Warning
            </h4>
            <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-200">
              Live Doppler
            </span>
          </div>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-100 text-xs space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Yellow Alert: Severe Thunderstorm & Lightning Hazard</span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300">
              Valid for Talcher, Ib Valley & Korba coal mining belts. Forecasted precipitation 45-65 mm with wind gusts up to 55 km/h.
            </p>
            <div className="text-[10px] text-amber-800 dark:text-amber-300 font-medium pt-1">
              Statutory SOP: Cease opencast blasting operations 60 minutes prior to active lightning cell arrival.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
