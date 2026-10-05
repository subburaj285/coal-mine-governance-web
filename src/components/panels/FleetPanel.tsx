import React from 'react';
import {
  Truck,
  Cpu,
  Gauge,
  Fuel,
  Wrench,
  Radio,
  Activity
} from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';
import { FLEET_TELEMETRY } from '../../data/mockData';

interface FleetPanelProps {
  subsidiary: SubsidiaryId;
}

export const FleetPanel: React.FC<FleetPanelProps> = ({ subsidiary }) => {
  const filteredFleet = FLEET_TELEMETRY.filter((eq) => {
    if (subsidiary !== 'ALL' && eq.subsidiary !== subsidiary) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      
      {/* Fleet Utilization & Health KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">Active HEMM Deployed</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">842 Units</div>
            </div>
            <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Dumpers: 580 · Shovels: 142 · Dozers: 120</div>
        </div>

        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Fleet Availability (OEE)</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">88.4%</div>
            </div>
            <Gauge className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">Operating: 78% · Idle: 10% · Maint: 12%</div>
        </div>

        <div className="p-3.5 rounded-xl border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] text-cyan-700 dark:text-cyan-400 font-medium">Specific Fuel Consumption</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">0.68 L/t-km</div>
            </div>
            <Fuel className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold mt-2">↓ 4.2% below CIL norm (0.71)</div>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">Proximity Collision Warning</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">0 Active Alarms</div>
            </div>
            <Radio className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">RFID radar mesh fully operational</div>
        </div>
      </div>

      {/* Row 1: Live Equipment Telemetry & Remaining Useful Life (RUL) Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Live HEMM Health Telematics & Predictive Maintenance</h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">CAN-Bus IoT Stream</span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Equipment Tag</th>
                <th className="py-2.5 px-3">Model & Type</th>
                <th className="py-2.5 px-3">Mine Location</th>
                <th className="py-2.5 px-3">Operator</th>
                <th className="py-2.5 px-3">Hydraulic Temp (&lt;85°C)</th>
                <th className="py-2.5 px-3">Engine Oil Press (&gt;45psi)</th>
                <th className="py-2.5 px-3">Tyre Temp (&lt;75°C)</th>
                <th className="py-2.5 px-3">Predictive RUL</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
              {filteredFleet.map((eq) => (
                <tr key={eq.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">{eq.tag}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">{eq.type}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">
                    {eq.mine} ({eq.subsidiary})
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">{eq.operator}</td>
                  <td className={`py-2.5 px-3 font-bold ${eq.hydraulicTemp > 85 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    {eq.hydraulicTemp}°C
                  </td>
                  <td className={`py-2.5 px-3 font-bold ${eq.engineOilPress < 45 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {eq.engineOilPress} psi
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{eq.tyreTemp}°C</td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400 font-bold">{eq.rulHours} hrs</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        eq.status === 'Operating'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400'
                          : eq.status === 'Maintenance'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {eq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 2: Automated Shovel-Dumper Dispatch Optimization Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Dynamic Shovel-Dumper Dispatch Matching
            </h4>
            <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-200">
              AI Optimized
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Shovel SHV-P&H-202 (Bench 4 Face)</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Target Loading Rate: 1,800 T/hr</div>
              </div>
              <div className="text-right">
                <div className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">5 Dumpers Assigned</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Queue Time: 1.2 min (Zero Wait)</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Shovel BE-195B (Jharia East)</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Status: Scheduled Servicing</div>
              </div>
              <div className="text-right">
                <div className="text-amber-600 dark:text-amber-400 font-mono font-bold">Rerouted to Face 2</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Haul distance balanced</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Surface Miner SM-WIRTGEN-2</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Continuous Milling Face</div>
              </div>
              <div className="text-right">
                <div className="text-blue-600 dark:text-blue-400 font-mono font-bold">Direct Conveyor Feed</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Zero Dumper Requirement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Maintenance Alerts & Component Health */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              HEMM Predictive Maintenance Queue
            </h4>
            <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-200">
              3 Work Orders
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-white">DMP-KOM-85 · Differential Oil Wear</span>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">RUL: 180 hrs</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Acoustic vibration anomaly indicates rear differential bearing wear. Scheduled overhaul at next shift change.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-white">SHV-BE-195B · Hydraulic Filter Bypass</span>
                <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">URGENT</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Pressure drop delta across return line filter reached 32 psi. Filter cartridge replacement kit staged.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-white">DMP-777D-104 · Tyre Position 3 Wear</span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">RUL: 1,420 hrs</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Tread depth 62 mm remaining. TPMS temperature within baseline.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
