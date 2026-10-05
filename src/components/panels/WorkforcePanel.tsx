import React from 'react';
import {
  Users,
  HeartPulse,
  Brain,
  MessageSquareWarning,
  BadgeIndianRupee,
  HardHat,
  DoorOpen
} from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';

interface WorkforcePanelProps {
  subsidiary: SubsidiaryId;
}

export const WorkforcePanel: React.FC<WorkforcePanelProps> = ({ subsidiary }) => {
  return (
    <div className="space-y-5">
      
      {/* Top Strip: Live Underground Muster Board & Biometric Gate */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/70 dark:bg-purple-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] text-purple-700 dark:text-purple-400 font-medium">Underground Muster Board</div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">4,120 Persons</div>
            </div>
            <DoorOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-2 font-mono">100% Inbye/Outbye Accounted</div>
        </div>

        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">Surface & Opencast Muster</div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">10,772 Persons</div>
            </div>
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Biometric Aadhaar Gate Synced</div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">HPC Wage Compliance</div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">100% Verified</div>
            </div>
            <BadgeIndianRupee className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Direct Bank Transfer / EPFO active</div>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">SmartCap Fatigue Alarms</div>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">1 Incident</div>
            </div>
            <Brain className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Relief operator dispatched</div>
        </div>
      </div>

      {/* Row 1: Underground Pit Headcount Details + Fatigue Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Real-Time Underground Headcount by District (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <DoorOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Real-Time Underground Sector Headcount & Refuge Chamber Capacity
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">RFID Mesh Tracked</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Sector District</th>
                  <th className="py-2.5 px-3 font-semibold">Colliery</th>
                  <th className="py-2.5 px-3 font-semibold">Personnel Inside</th>
                  <th className="py-2.5 px-3 font-semibold">Overman / Sirdar</th>
                  <th className="py-2.5 px-3 font-semibold">Refuge Chamber</th>
                  <th className="py-2.5 px-3 font-semibold">Evacuation Clearance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">Longwall Face #3</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">Moonidih (BCCL)</td>
                  <td className="py-2.5 px-3 text-purple-700 dark:text-purple-400 font-bold">94 Persons</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">Er. A. K. Banerjee</td>
                  <td className="py-2.5 px-3 font-sans text-emerald-700 dark:text-emerald-400">120 Cap (Ready)</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400">
                      SECURED
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">Seam IX Continuous Miner Face</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">Talcher (MCL)</td>
                  <td className="py-2.5 px-3 text-purple-700 dark:text-purple-400 font-bold">115 Persons</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">S. R. Pradhan</td>
                  <td className="py-2.5 px-3 font-sans text-emerald-700 dark:text-emerald-400">150 Cap (Ready)</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400">
                      SECURED
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">Main Return Airway Inbye</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">Jhanjra (ECL)</td>
                  <td className="py-2.5 px-3 text-purple-700 dark:text-purple-400 font-bold">108 Persons</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">D. Mukherjee</td>
                  <td className="py-2.5 px-3 font-sans text-emerald-700 dark:text-emerald-400">140 Cap (Ready)</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400">
                      SECURED
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">Deep Block Dip Development</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">Jharia Deep (BCCL)</td>
                  <td className="py-2.5 px-3 text-purple-700 dark:text-purple-400 font-bold">88 Persons</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">R. C. Tiwari</td>
                  <td className="py-2.5 px-3 font-sans text-emerald-700 dark:text-emerald-400">100 Cap (Ready)</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400">
                      SECURED
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SmartCap Fatigue Monitoring & Operator Telemetry */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              SmartCap EEG Fatigue Index
            </h3>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-200">
              Real-Time EEG
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Level 1 - Fully Alert / Awake</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">94.8% Operators</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94.8%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Level 2 - Mild Inattention</span>
                <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">4.2%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '4.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Level 3 - Early Fatigue Warning</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">0.9%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '0.9%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Level 4 - Micro-sleep Risk Alert</span>
                <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">0.1% (1 Unit)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '0.1%' }}></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Auto-alarm protocol stops vehicle if Level 4 persists &gt; 15 seconds.
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Health Surveillance & Worker Grievance Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Periodic Medical Examination (PME) */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
            <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            Occupational Health Surveillance (PME)
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Workers due for 5-Year PME</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">142</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Completed this Quarter</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">138 (97.2%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Pneumoconiosis Chest X-ray (ILO)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">Zero Cases</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">Audiometry Hearing Check</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">100% Cleared</span>
            </div>
          </div>
        </div>

        {/* PPE Issuance & Smart Helmet Inventory */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
            <HardHat className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Statutory PPE Issuance Register
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">BIS Approved Helmets Issued</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">14,892 (100%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">LED Cap Lamps (Intrinsically Safe)</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">4,120 (UG)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Self-Rescuer Filter Canisters</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">100% Valid Date</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">Steel-Toe Boots Dispatched</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">14,892 Pairs</span>
            </div>
          </div>
        </div>

        {/* Worker Grievance Redressal (Samadhan Portal) */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
            <MessageSquareWarning className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Worker Grievance Redressal (Samadhan)
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total Grievances (Month)</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">18</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Resolved within 7 Days</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">16 (88.9%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Under Inquiry / Review</span>
              <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">2 Cases</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">Overdue Beyond 15 Days</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">0 Cases (Zero backlog)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
