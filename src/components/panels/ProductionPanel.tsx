import React from 'react';
import {
  Pickaxe,
  Truck,
  TrainTrack,
  Layers,
  Bomb,
  CheckCircle,
  Flame
} from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';

interface ProductionPanelProps {
  subsidiary: SubsidiaryId;
}

export const ProductionPanel: React.FC<ProductionPanelProps> = ({ subsidiary }) => {
  return (
    <div className="space-y-5">
      
      {/* Top Strip: Target vs Actual Bullet Meters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Daily Production Target vs Actual</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">2,481,200 T</div>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
              103.4% Target
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
            <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" style={{ width: '100%' }}></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span>Target: 2,400,000 T</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+81,200 T Surplus</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Monthly Offtake / Dispatch</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">64.82 MT</div>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20">
              102.1% MTD
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
            <div className="bg-cyan-600 dark:bg-cyan-500 h-full rounded-full" style={{ width: '92%' }}></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span>Target: 63.5 MT</span>
            <span className="text-cyan-700 dark:text-cyan-400 font-semibold">+1.32 MT</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Overburden Removal (OBR)</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">5.42 M.BCM</div>
            </div>
            <span className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-500/20">
              Stripping: 2.18
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '95%' }}></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
            <span>Target: 5.60 M.BCM</span>
            <span>Ratio Plan: 2.25</span>
          </div>
        </div>
      </div>

      {/* Row 1: Coal Raised by Shift + Dispatch Modal Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Coal Raised by Shift & Subsidiary */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Pickaxe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Coal Raised by Mine Subsidiary & Shift (Today)
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Tonnes</span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'SECL (Gevra, Kusmunda, Dipka)', total: '584,000 T', shA: 210, shB: 200, shC: 174 },
              { name: 'MCL (Talcher, Ib Valley, Lakhanpur)', total: '522,000 T', shA: 190, shB: 180, shC: 152 },
              { name: 'NCL (Jayant, Nigahi, Dudhichua)', total: '412,000 T', shA: 150, shB: 140, shC: 122 },
              { name: 'CCL (Piparwar, Ashoka, North Karanpura)', total: '295,000 T', shA: 105, shB: 100, shC: 90 },
              { name: 'WCL & BCCL (Umrer, Moonidih, Jharia)', total: '242,000 T', shA: 88, shB: 82, shC: 72 }
            ].map((sub, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{sub.name}</span>
                  <span className="text-slate-900 dark:text-white font-mono font-bold">{sub.total}</span>
                </div>
                <div className="flex h-3 w-full rounded-md overflow-hidden bg-slate-100 dark:bg-slate-850">
                  <div className="bg-blue-500" style={{ width: `${(sub.shA / 600) * 100}%` }} title={`Shift A: ${sub.shA}k T`} />
                  <div className="bg-cyan-500" style={{ width: `${(sub.shB / 600) * 100}%` }} title={`Shift B: ${sub.shB}k T`} />
                  <div className="bg-indigo-500" style={{ width: `${(sub.shC / 600) * 100}%` }} title={`Shift C: ${sub.shC}k T`} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Shift A (06:00 - 14:00)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
              <span>Shift B (14:00 - 22:00)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span>Shift C (22:00 - 06:00)</span>
            </div>
          </div>
        </div>

        {/* Dispatch Modal Split */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <TrainTrack className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Evacuation & Dispatch Infrastructure
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Today: 2.51 MT</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <TrainTrack className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Indian Railways Rakes</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">324 Rakes</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">1,328,000 Tonnes (52.8%)</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Merry-Go-Round (MGR)</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">142 Trips</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">682,000 Tonnes (27.1%)</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Highway Road Trucks</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">6,840 Trucks</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">342,000 Tonnes (13.6%)</div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Cross-Pit Conveyor</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">Direct Feed</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">162,800 Tonnes (6.5%)</div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex justify-between items-center">
            <span>Thermal Power Plant (NTPC/State GENCO) Critical Stocks:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">18.4 Days (Adequate)</span>
          </div>
        </div>

      </div>

      {/* Row 2: Stockpile Inventory & Grade Quality Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Stockpile Levels */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            Coal Stockpile Inventory & Quality Grading (FSA Standard)
          </h3>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 font-sans">
                <tr>
                  <th className="py-2.5 px-3">Grade Code</th>
                  <th className="py-2.5 px-3">GCV Band (kcal/kg)</th>
                  <th className="py-2.5 px-3">Ash Content %</th>
                  <th className="py-2.5 px-3">Moisture %</th>
                  <th className="py-2.5 px-3">Current Stock</th>
                  <th className="py-2.5 px-3">Major Destination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">G4 (Non-coking)</td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">6101 - 6400</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">18.2%</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">8.4%</td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">482,000 T</td>
                  <td className="py-2.5 px-3 font-sans text-slate-500 dark:text-slate-400">Cement & Captive Power</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">G8 (Thermal)</td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">4901 - 5200</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">26.4%</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">11.8%</td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">1,840,000 T</td>
                  <td className="py-2.5 px-3 font-sans text-slate-500 dark:text-slate-400">NTPC Vindhyachal / Talcher</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">G11 (Power Grade)</td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">4001 - 4300</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">34.8%</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">12.5%</td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">3,240,000 T</td>
                  <td className="py-2.5 px-3 font-sans text-slate-500 dark:text-slate-400">State Electricity Boards</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">W-II (Washery Coking)</td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">5400 - 5800</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">21.5%</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">6.2%</td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">290,000 T</td>
                  <td className="py-2.5 px-3 font-sans text-slate-500 dark:text-slate-400">SAIL Bokaro Steel Plant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Drilling & Blasting Records */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Bomb className="w-4 h-4 text-rose-500" />
              Drilling & Controlled Blasting
            </h3>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200">
              DGMS Cleared
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Blast Holes Drilled (Today)</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">480 Holes</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Slurry Emulsion Consumed</span>
              <span className="text-slate-900 dark:text-white font-mono font-bold">42,600 kg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Powder Factor (OB)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">2.14 m³/kg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Vibration PPV at Boundary</span>
              <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">2.8 mm/s (&lt; 5.0)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">Next Scheduled Blast Window</span>
              <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">13:30 - 14:00 (Sirens Armed)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
