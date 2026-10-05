import React from 'react';
import { Sparkles, ShieldAlert, AlertCircle, CheckCircle, RefreshCw, UserCheck } from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';

interface AiInsightsPanelProps {
  subsidiary: SubsidiaryId;
}

export const AiInsightsPanel: React.FC<AiInsightsPanelProps> = ({ subsidiary }) => {
  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            AI-Assisted Risk Insights & Pattern Recognition
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated compliance pattern analysis, recurring risk observation, and recommended human review actions.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-mono text-xs font-bold">
          AI-ASSISTED · HUMAN IN THE LOOP REQUIRED
        </span>
      </div>

      {/* Pattern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: 'Repeated Air Velocity Margin Deficit',
            mine: 'Moonidih Underground Colliery (BCCL)',
            confidence: 91,
            pattern: '3 statutory observations in last 30 days regarding CMR 2017 Reg 153 air velocity.',
            suggestedAction: 'Escalate to Chief Mechanical Engineer for Fan House #2 overhaul.',
            status: 'Requires Safety Officer Review'
          },
          {
            title: 'Overburden Bench Slope Stability Creep',
            mine: 'Kusmunda Open Pit (SECL)',
            confidence: 86,
            pattern: 'Rainfall correlation indicates factor of safety drop (FoS 1.22) during heavy precipitation.',
            suggestedAction: 'Schedule drone prism survey & highwall berm expansion.',
            status: 'Geotechnical Review Recommended'
          },
          {
            title: 'Dust Suppression Filter Maintenance Spike',
            mine: 'Talcher Seam IX CHP (MCL)',
            confidence: 88,
            pattern: 'Dry fog nozzle clogging recorded 4 times in 14 days at Transfer Point 2.',
            suggestedAction: 'Replace primary intake water filter housing and flush lines.',
            status: 'Maintenance Action Suggested'
          },
          {
            title: 'Shift-End Haul Road Speeding Anomalies',
            mine: 'Jayant OCP (NCL)',
            confidence: 94,
            pattern: 'Telematics indicate 14% higher average dumper speed during final 30 mins of Shift B.',
            suggestedAction: 'Issue advisory to Shift Incharge & Logistics Supervisor.',
            status: 'Workforce Advisor Review'
          }
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-xs shadow-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                AI-SUGGESTED
              </span>
              <span className="font-mono text-xs font-bold text-slate-500">
                Confidence: <b className="text-purple-600">{item.confidence}%</b>
              </span>
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h3>
            <div className="text-slate-500 font-semibold">{item.mine}</div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.pattern}</p>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                Recommended Human Action:
              </div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">{item.suggestedAction}</div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
              <span>Status: {item.status}</span>
              <button className="text-blue-600 font-bold hover:underline">Accept Suggestion →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
