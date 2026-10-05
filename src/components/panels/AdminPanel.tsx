import React from 'react';
import { SlidersHorizontal, ShieldCheck, Lock, Users, Key } from 'lucide-react';
import { UserRole } from '../../types/dashboard';

interface AdminPanelProps {
  currentRole: UserRole;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ currentRole }) => {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-blue-600" />
            Governance Administration & Role Permissions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage user roles, colliery access scopes, digital signature keys, and statutory audit configurations.
          </p>
        </div>

        <span className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold font-mono">
          Active Lens: {currentRole}
        </span>
      </div>

      {/* Role Permissions Matrix */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Role Access & Authorization Matrix
        </h3>

        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Role Title</th>
                <th className="py-2.5 px-3">Overview</th>
                <th className="py-2.5 px-3">Inspections</th>
                <th className="py-2.5 px-3">Compliance</th>
                <th className="py-2.5 px-3">Action Verification</th>
                <th className="py-2.5 px-3">Audit Log Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
              {[
                { role: 'Mine Manager', ov: 'Full', insp: 'Create & View', comp: 'Full', ver: 'Authorized', audit: 'Full' },
                { role: 'DGMS Inspector', ov: 'Full', insp: 'Statutory Signoff', comp: 'Full', ver: 'Statutory Signoff', audit: 'Full Immutable' },
                { role: 'Corporate Leadership', ov: 'Pan-India', insp: 'Read-Only', comp: 'Pan-India', ver: 'View Only', audit: 'Executive Audit' },
                { role: 'Safety Officer', ov: 'Colliery Scope', insp: 'Audit Lead', comp: 'Safety Focus', ver: 'Primary Inspector', audit: 'Colliery Scope' },
                { role: 'Environment Officer', ov: 'Colliery Scope', insp: 'Env Audit', comp: 'EP Act Focus', ver: 'Primary Inspector', audit: 'Colliery Scope' },
                { role: 'Contractor Supervisor', ov: 'Contract Scope', insp: 'View Assigned', comp: 'Labour Act', ver: 'Submit Evidence', audit: 'Restricted' }
              ].map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{r.role}</td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{r.ov}</td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{r.insp}</td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{r.comp}</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">{r.ver}</td>
                  <td className="py-2.5 px-3 text-slate-600 font-mono">{r.audit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
