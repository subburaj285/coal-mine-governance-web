import React, { useState } from 'react';
import { Bell, CheckCheck, AlertTriangle, ShieldAlert, Clock, Filter } from 'lucide-react';
import { SubsidiaryId, ActiveAlert } from '../../types/dashboard';
import { ACTIVE_ALERTS } from '../../data/mockData';

interface NotificationsPanelProps {
  subsidiary: SubsidiaryId;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ subsidiary }) => {
  const [alerts, setAlerts] = useState<ActiveAlert[]>(ACTIVE_ALERTS);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filtered = alerts.filter((a) => {
    if (subsidiary !== 'ALL' && a.subsidiary !== subsidiary) return false;
    if (filterCategory !== 'All' && a.category !== filterCategory) return false;
    return true;
  });

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, acknowledged: true })));
  };

  const handleToggleAck = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
  };

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Governance Notification Center & Escalation Desk
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time critical statutory violation alerts, deadline escalations, and verification requests.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <CheckCheck className="w-4 h-4 text-emerald-600" />
          <span>Mark All Acknowledged</span>
        </button>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
        {['All', 'Gas', 'Strata', 'Environment', 'Fleet', 'Workforce', 'Weather'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              filterCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat} {cat === 'All' ? `(${alerts.length})` : ''}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {filtered.map((alt) => (
          <div
            key={alt.id}
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all ${
              alt.acknowledged
                ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-75'
                : alt.severity === 'Critical'
                ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 shadow-xs'
                : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 shadow-xs'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    alt.severity === 'Critical' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                  }`}
                >
                  {alt.severity}
                </span>
                <span className="font-mono text-[10px] text-slate-500">{alt.timestamp}</span>
                <span className="font-semibold text-blue-600">Category: {alt.category}</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{alt.title}</h4>
              <div className="text-slate-600 dark:text-slate-400">
                Location: <b className="text-slate-800 dark:text-slate-200">{alt.location}</b> ({alt.subsidiary})
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Escalated To: {alt.escalatedTo}</div>
            </div>

            <button
              onClick={() => handleToggleAck(alt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                alt.acknowledged
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xs'
              }`}
            >
              {alt.acknowledged ? 'Acknowledged' : 'Acknowledge Alert'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
