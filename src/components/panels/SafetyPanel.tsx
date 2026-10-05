import React, { useState } from 'react';
import {
  Flame,
  Wind,
  Layers,
  HardHat,
  AlertTriangle,
  LifeBuoy,
  FileCheck2,
  GraduationCap,
  Volume2,
  TrendingDown
} from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';
import { GAS_TELEMETRY, SAFETY_INCIDENTS } from '../../data/mockData';

interface SafetyPanelProps {
  subsidiary: SubsidiaryId;
}

export const SafetyPanel: React.FC<SafetyPanelProps> = ({ subsidiary }) => {
  const [gasFilter, setGasFilter] = useState<'All' | 'Hazardous' | 'Warning'>('All');
  const [soundAlert, setSoundAlert] = useState(false);

  const filteredGas = GAS_TELEMETRY.filter((g) => {
    if (subsidiary !== 'ALL' && g.subsidiary !== subsidiary) return false;
    if (gasFilter === 'Hazardous') return g.status === 'Hazardous';
    if (gasFilter === 'Warning') return g.status === 'Warning' || g.status === 'Hazardous';
    return true;
  });

  const filteredIncidents = SAFETY_INCIDENTS.filter((i) => {
    if (subsidiary !== 'ALL' && i.subsidiary !== subsidiary) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      
      {/* Top Banner: Emergency Readiness & Live SOS status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Mine Rescue Station Status</div>
            <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Brigade Standby: 100%</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Response ETA: &lt; 4.2 mins</div>
          </div>
          <LifeBuoy className="w-8 h-8 text-emerald-600 dark:text-emerald-400 opacity-80" />
        </div>

        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-950/20 text-slate-800 dark:text-slate-200 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">DGMS Mock Drill Compliance</div>
            <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Quarterly Drill Completed</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Next Drill: 15 Oct 2026</div>
          </div>
          <FileCheck2 className="w-8 h-8 text-blue-600 dark:text-blue-400 opacity-80" />
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Underground Strata Seismic</div>
            <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Micro-tremors: 2 (Normal)</div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400">No roof fall warning</div>
          </div>
          <Layers className="w-8 h-8 text-indigo-600 dark:text-indigo-400 opacity-80" />
        </div>

        <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50/70 dark:bg-rose-950/20 text-slate-800 dark:text-slate-200 flex items-center justify-between shadow-xs">
          <div>
            <div className="text-[11px] text-rose-700 dark:text-rose-400 font-medium">SOS Distress Signal</div>
            <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Zero Active Beacons</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Underground mesh ping nominal</div>
          </div>
          <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400 opacity-80" />
        </div>
      </div>

      {/* Row 1: Live Gas Readings Table + Ventilation Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Gas Telemetry Table (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Live Gas Telemetry (Underground & Surface)</h3>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">CMR 2017 Reg 153/154</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                {(['All', 'Warning', 'Hazardous'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setGasFilter(filter)}
                    className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                      gasFilter === filter ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSoundAlert(!soundAlert)}
                className={`p-1.5 rounded-lg border text-xs transition-colors shadow-xs ${
                  soundAlert ? 'bg-rose-600 text-white border-rose-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
                title="Toggle Gas Threshold Audio Siren"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Sensor</th>
                  <th className="py-2.5 px-3 font-semibold">Zone / Subsidiary</th>
                  <th className="py-2.5 px-3 font-semibold">CH₄ (&lt;0.8%)</th>
                  <th className="py-2.5 px-3 font-semibold">CO (&lt;25ppm)</th>
                  <th className="py-2.5 px-3 font-semibold">O₂ (&gt;19%)</th>
                  <th className="py-2.5 px-3 font-semibold">H₂S</th>
                  <th className="py-2.5 px-3 font-semibold">Velocity</th>
                  <th className="py-2.5 px-3 font-semibold">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                {filteredGas.map((g) => (
                  <tr
                    key={g.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                      g.status === 'Hazardous'
                        ? 'bg-rose-50/60 dark:bg-rose-950/30'
                        : g.status === 'Warning'
                        ? 'bg-amber-50/60 dark:bg-amber-950/20'
                        : ''
                    }`}
                  >
                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400">{g.id}</td>
                    <td className="py-2 px-3 font-sans text-slate-900 dark:text-slate-200 font-medium">
                      {g.zone} <span className="text-[10px] text-slate-400 dark:text-slate-500">({g.subsidiary})</span>
                    </td>
                    <td className={`py-2 px-3 font-bold ${g.ch4 > 0.8 ? 'text-rose-600 dark:text-rose-400' : g.ch4 > 0.5 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {g.ch4.toFixed(2)}%
                    </td>
                    <td className={`py-2 px-3 font-bold ${g.co > 20 ? 'text-rose-600 dark:text-rose-400' : g.co > 10 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700 dark:text-slate-200'}`}>
                      {g.co.toFixed(1)} ppm
                    </td>
                    <td className="py-2 px-3 text-slate-700 dark:text-slate-300">{g.o2.toFixed(1)}%</td>
                    <td className="py-2 px-3 text-slate-500 dark:text-slate-400">{g.h2s.toFixed(1)} ppm</td>
                    <td className="py-2 px-3 text-cyan-700 dark:text-cyan-400">{g.airVelocity} m/s</td>
                    <td className="py-2 px-3 font-sans">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          g.status === 'Hazardous'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30'
                            : g.status === 'Warning'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
                        }`}
                      >
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ventilation Status & Gauges (1 col) */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Main Mechanical Fan Telemetry</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
              OPERATING
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Total Airflow Volume</span>
                <span className="text-slate-900 dark:text-white font-mono font-bold">14,200 m³/min</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-[10px] text-slate-500">Statutory minimum: 11,500 m³/min</span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Air Temperature (Wet Bulb)</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">30.8°C</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '74%' }}></div>
              </div>
              <span className="text-[10px] text-slate-500">DGMS Maximum limit: 33.5°C</span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Relative Humidity</span>
                <span className="text-slate-900 dark:text-white font-mono font-bold">82%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Main Fan Water Gauge Pressure:</span>
              <span className="font-mono text-slate-900 dark:text-white font-semibold">125 mm WG</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Roof & Strata Movement + PPE AI Compliance + Near Miss Trends */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Roof & Strata Movement */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Roof & Strata Convergence
            </h4>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">24h Continuous</span>
          </div>

          <div className="h-40 flex items-end gap-1.5 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            {[1.2, 1.4, 1.3, 1.8, 2.1, 2.0, 2.4, 2.2, 1.9, 2.5, 2.3, 2.1].map((val, idx) => {
              const h = (val / 5.0) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t transition-all bg-indigo-500 hover:bg-indigo-400"
                    style={{ height: `${h}%` }}
                    title={`Hour ${idx * 2}:00 - Convergence ${val} mm`}
                  />
                  <span className="text-[9px] font-mono text-slate-400">{idx * 2}h</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            <span>Critical Alarm Line: 5.0 mm</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono">Max: 2.5 mm (Safe)</span>
          </div>
        </div>

        {/* AI PPE Video Analytics Compliance */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <HardHat className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              AI CCTV PPE Detection
            </h4>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">97.8% Compliance</span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Safety Helmet with Chin Strap</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">99.4%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '99.4%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Steel-Toe Boots with Metatarsal Guard</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">98.2%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '98.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">High-Visibility Retro-reflective Vest</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">96.1%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '96.1%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Dust Mask / Self-Rescuer (FSR)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">97.5%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '97.5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Training & Vocational Center Status */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Vocational Safety Training (VTC)
            </h4>
            <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400">Mines Rules 1955</span>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Active Workforce VTC Certified</span>
                <span className="text-slate-900 dark:text-white font-mono font-bold">94.6%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '94.6%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Gas Testing & Sirdar Certificates</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">100% Valid</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Expiring within 30 days</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">28 Workers</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
              <span>Refresher Batches this month:</span>
              <span className="text-slate-900 dark:text-white font-semibold">12 Completed</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Statutory Incident & Near-Miss Log */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Statutory Incident & Near-Miss Register</h4>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">DGMS Classified · Shram Suvidha Synced</span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3 font-semibold">ID</th>
                <th className="py-2.5 px-3 font-semibold">Time & Date</th>
                <th className="py-2.5 px-3 font-semibold">Colliery / Mine</th>
                <th className="py-2.5 px-3 font-semibold">Zone Sector</th>
                <th className="py-2.5 px-3 font-semibold">Incident Type</th>
                <th className="py-2.5 px-3 font-semibold">Severity</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold">Investigator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{inc.id}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">{inc.time}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-slate-200 font-medium">
                    {inc.mine} ({inc.subsidiary})
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-500 dark:text-slate-400">{inc.zone}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">{inc.type}</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        inc.severity === 'Fatal'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400'
                          : inc.severity === 'Serious'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400'
                          : 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 dark:text-slate-300">{inc.status}</td>
                  <td className="py-2.5 px-3 font-sans text-slate-500 dark:text-slate-400">{inc.investigator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
