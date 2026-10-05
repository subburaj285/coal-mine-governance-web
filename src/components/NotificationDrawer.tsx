import React from 'react';
import { X, AlertTriangle, AlertOctagon, Check, ShieldAlert } from 'lucide-react';
import { ActiveAlert } from '../types/dashboard';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: ActiveAlert[];
  onAcknowledgeAlert: (id: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onAcknowledgeAlert
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-500" />
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Active Alerts & Escalations</h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {alerts.filter(a => !a.acknowledged).length} unacknowledged events
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Alert List */}
          <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50/40 dark:bg-slate-900">
            {alerts.map((alert) => {
              const isCrit = alert.severity === 'Critical';
              const isHigh = alert.severity === 'High';

              return (
                <div
                  key={alert.id}
                  className={`p-3.5 rounded-xl border text-xs transition-all shadow-xs ${
                    alert.acknowledged
                      ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/50 opacity-75'
                      : isCrit
                      ? 'border-rose-300 bg-rose-50/80 text-rose-900 dark:border-rose-500/50 dark:bg-rose-950/20 dark:text-rose-100'
                      : isHigh
                      ? 'border-amber-300 bg-amber-50/80 text-amber-900 dark:border-amber-500/50 dark:bg-amber-950/20 dark:text-amber-100'
                      : 'border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-bold">
                      {isCrit ? (
                        <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
                      )}
                      <span>{alert.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">{alert.timestamp}</span>
                  </div>

                  <div className="mt-2 text-slate-700 dark:text-slate-300 text-[11px]">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Location:</span> {alert.location} ({alert.subsidiary})
                  </div>

                  <div className="mt-1 text-slate-700 dark:text-slate-300 text-[11px]">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Escalation Ladder:</span> Level {alert.escalationLevel} → {alert.escalatedTo}
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800/80">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                      {alert.category}
                    </span>
                    {alert.acknowledged ? (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                        <Check className="w-3 h-3" /> Acknowledged
                      </span>
                    ) : (
                      <button
                        onClick={() => onAcknowledgeAlert(alert.id)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-xs"
                      >
                        Acknowledge Alarm
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-center text-[11px] text-slate-500 dark:text-slate-400">
            Escalation rules compliant with DGMS Standard Operating Procedure 2024
          </div>

        </div>
      </div>
    </div>
  );
};
