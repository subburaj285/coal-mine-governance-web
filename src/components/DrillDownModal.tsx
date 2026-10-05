import React, { useState } from 'react';
import { X, ChevronRight, Download, CheckCircle2, Activity, Cpu } from 'lucide-react';
import { KpiMetric, MineZone } from '../types/dashboard';
import { MINE_ZONES } from '../data/mockData';

interface DrillDownModalProps {
  metric: KpiMetric | null;
  onClose: () => void;
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({ metric, onClose }) => {
  if (!metric) return null;

  const [selectedZone, setSelectedZone] = useState<MineZone | null>(MINE_ZONES[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                  Deep Governance Telemetry Drill-Down
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">CIL-PSID-26024</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{metric.title}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-base font-normal">[{metric.value}]</span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Breadcrumb drill level indicator */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800/80 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span className="text-slate-700 dark:text-slate-300">Coal India Limited</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-blue-600 dark:text-blue-400">{selectedZone?.subsidiary || 'All Subsidiaries'}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-emerald-600 dark:text-emerald-400">{selectedZone?.name || 'Zone Root'}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Active Sensor Array / Record Node</span>
        </div>

        {/* Modal Body: Split 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 overflow-y-auto flex-1">
          
          {/* Left column: Zone list selector */}
          <div className="p-4 space-y-2 overflow-y-auto max-h-[60vh] bg-slate-50/50 dark:bg-slate-900/40">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-1 mb-2 uppercase tracking-wider">
              Select Colliery / Pit Zone ({MINE_ZONES.length})
            </div>
            {MINE_ZONES.map((zone) => {
              const isSelected = selectedZone?.id === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/90 dark:bg-blue-950/40 text-blue-950 dark:text-white shadow-xs font-medium'
                      : 'border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-slate-900 dark:text-slate-200">{zone.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-blue-700 border border-slate-200 dark:bg-slate-800 dark:text-blue-300 dark:border-slate-700">
                      {zone.subsidiary}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{zone.type}</span>
                    <span className="font-mono">Risk: {zone.riskScore}/100</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 2 columns: Zone deep telemetry & raw records */}
          <div className="p-6 md:col-span-2 space-y-5 overflow-y-auto bg-white dark:bg-slate-900">
            {selectedZone && (
              <>
                {/* Zone Health Card */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-4 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">{selectedZone.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Lat: {selectedZone.lat.toFixed(4)}°N, Lng: {selectedZone.lng.toFixed(4)}°E · Type: {selectedZone.type} Colliery
                      </p>
                    </div>
                    <span
                      className={`text-xs font-mono font-medium px-2 py-1 rounded-md ${
                        selectedZone.riskScore > 70
                          ? 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400'
                          : selectedZone.riskScore > 40
                          ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400'
                      }`}
                    >
                      Zone Risk Score: {selectedZone.riskScore}
                    </span>
                  </div>

                  {/* Multi-parameter Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">CH4 Methane</div>
                      <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">{selectedZone.ch4Level}%</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Limit: 0.80%</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">CO Carbon Monoxide</div>
                      <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">{selectedZone.coLevel} ppm</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Limit: 25.0 ppm</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">Airflow Volume</div>
                      <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">{selectedZone.airflow} m³/min</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Fan: Nominal</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">Personnel Logged</div>
                      <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">{selectedZone.workersCount} active</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">Muster Synced</div>
                    </div>
                  </div>
                </div>

                {/* Live Raw Sensor Stream Table */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      Live Sensor Feeds for this Sector
                    </h5>
                    <button
                      onClick={() => alert(`Exporting calibrated CSV data for zone ${selectedZone.name}...`)}
                      className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download Raw CSV
                    </button>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="py-2.5 px-3 font-semibold">Sensor Tag</th>
                          <th className="py-2.5 px-3 font-semibold">Parameter</th>
                          <th className="py-2.5 px-3 font-semibold">Current Value</th>
                          <th className="py-2.5 px-3 font-semibold">Statutory Standard</th>
                          <th className="py-2.5 px-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900/60 font-mono">
                        <tr>
                          <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-medium">SN-CH4-091</td>
                          <td className="py-2.5 px-3 font-sans text-slate-800 dark:text-slate-300">Infrared Methane Detector</td>
                          <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">{selectedZone.ch4Level}%</td>
                          <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">&lt; 0.80% (CMR 153)</td>
                          <td className="py-2.5 px-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400">
                              PASS
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-medium">SN-CO-084</td>
                          <td className="py-2.5 px-3 font-sans text-slate-800 dark:text-slate-300">Electrochemical CO Sensor</td>
                          <td className="py-2.5 px-3 text-amber-600 dark:text-amber-400 font-bold">{selectedZone.coLevel} ppm</td>
                          <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">&lt; 25.0 ppm</td>
                          <td className="py-2.5 px-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400">
                              MONITOR
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-medium">SN-STR-012</td>
                          <td className="py-2.5 px-3 font-sans text-slate-800 dark:text-slate-300">Strata Convergence Gauge</td>
                          <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">1.8 mm / 24h</td>
                          <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">&lt; 5.0 mm / 24h</td>
                          <td className="py-2.5 px-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400">
                              STABLE
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 font-medium">SN-ANEM-04</td>
                          <td className="py-2.5 px-3 font-sans text-slate-800 dark:text-slate-300">Ultrasonic Air Anemometer</td>
                          <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400 font-bold">2.4 m/s</td>
                          <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">&gt; 1.5 m/s</td>
                          <td className="py-2.5 px-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400">
                              OPTIMAL
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Telemetry calibrated via CIL-IoT edge gateway. Integrity hash verified.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium transition-colors shadow-xs"
          >
            Close Drill-Down
          </button>
        </div>

      </div>
    </div>
  );
};
