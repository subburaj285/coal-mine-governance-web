import React from 'react';
import {
  Leaf,
  Droplets,
  Wind,
  Volume2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';
import { AIR_QUALITY_SENSORS } from '../../data/mockData';

interface EnvironmentPanelProps {
  subsidiary: SubsidiaryId;
}

export const EnvironmentPanel: React.FC<EnvironmentPanelProps> = ({ subsidiary }) => {
  const filteredAir = AIR_QUALITY_SENSORS.filter((a) => {
    if (subsidiary !== 'ALL' && a.subsidiary !== subsidiary) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      
      {/* Top Cards: Environmental Clearance & Consent to Operate */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">SPCB Consent to Operate (CTO)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">VALID</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">All 318 Mines Covered</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Air & Water Act Sec 21/25</div>
        </div>

        <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-blue-700 dark:text-blue-400 font-medium">Biological Reclamation</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300">104.2%</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">4,820 Hectares Planted</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">FY Target: 4,600 Ha (Surpassed)</div>
        </div>

        <div className="p-3.5 rounded-xl border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-cyan-700 dark:text-cyan-400 font-medium">Mine Water Treatment & Supply</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-500/20 text-cyan-800 dark:text-cyan-300">ACTIVE</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">284 MLD Treated</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Supplied to 142 fringe villages</div>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20 text-slate-800 dark:text-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-amber-700 dark:text-amber-400 font-medium">Solar Power Capacity</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300">GREEN</span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">310 MW Commissioned</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Scope 2 offset: 28,400 tCO₂e/mo</div>
        </div>
      </div>

      {/* Row 1: Ambient Air Quality (CAAQMS) + Dust Suppression Network */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Continuous Ambient Air Monitoring Station Table */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Continuous Ambient Air Quality (CAAQMS)</h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">CPCB NAAQS Standards 24h</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3">Colliery Location</th>
                  <th className="py-2.5 px-3">PM2.5 (limit 60)</th>
                  <th className="py-2.5 px-3">PM10 (limit 100)</th>
                  <th className="py-2.5 px-3">SO₂ (limit 80)</th>
                  <th className="py-2.5 px-3">NOx (limit 80)</th>
                  <th className="py-2.5 px-3">AQI Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                {filteredAir.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 text-slate-500 dark:text-slate-400">{a.id}</td>
                    <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-slate-200 font-medium">{a.location}</td>
                    <td className={`py-2.5 px-3 font-bold ${a.pm25 > 60 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {a.pm25} µg/m³
                    </td>
                    <td className={`py-2.5 px-3 font-bold ${a.pm10 > 100 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {a.pm10} µg/m³
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{a.so2} µg/m³</td>
                    <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{a.nox} µg/m³</td>
                    <td className="py-2.5 px-3 font-sans">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          a.status === 'Severe'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-400'
                            : a.status === 'Moderate'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400'
                        }`}
                      >
                        {a.status} ({a.aqi})
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dust Suppression Infrastructure */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Automated Dust Suppression
            </h3>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200">
              100% ONLINE
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-200">High-Pressure Mist Cannons</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Fixed & Mobile at Stockpiles</div>
              </div>
              <span className="text-slate-900 dark:text-white font-mono font-bold">48 Units Active</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-200">Road Sprinkling Tankers</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">GPS tracked on main haulways</div>
              </div>
              <span className="text-slate-900 dark:text-white font-mono font-bold">112 Tankers / Shift</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-200">Belt Conveyor Mist Spray</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Transfer point shrouding</div>
              </div>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">Operating</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <div className="font-medium text-slate-800 dark:text-slate-200">Truck Wheel Washing Units</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">At Colliery exit gates</div>
              </div>
              <span className="text-slate-900 dark:text-white font-mono font-bold">14 Stations Online</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Water Quality Discharge + Noise Levels + EC Condition Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Mine Water Discharge Effluent */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Effluent Discharge Quality (ETP)
          </h4>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">pH Level (Permissible 6.5 - 8.5)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">7.4 (Neutral)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total Suspended Solids (TSS &lt; 100 mg/L)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">42 mg/L</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Oil & Grease (&lt; 10 mg/L)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">2.1 mg/L</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Total Iron as Fe (&lt; 3.0 mg/L)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">0.8 mg/L</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-600 dark:text-slate-400">Heavy Metals (As, Cd, Pb, Cr)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">Below Detection Limit</span>
            </div>
          </div>
        </div>

        {/* Ambient Noise Level Monitoring */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Noise Levels (Boundary vs Pit)
          </h4>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Lease Boundary Day (Limit: 75 dB)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">64.2 dB</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Lease Boundary Night (Limit: 70 dB)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">58.0 dB</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Shovel / In-Pit Zone (8h TWA limit 85)</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">78.4 dB</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Noise acoustic barrier trees planted: 3-tier green belt
            </div>
          </div>
        </div>

        {/* MoEFCC Environmental Clearance (EC) Checklist */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            MoEFCC EC Conditions Tracker
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-slate-800 dark:text-slate-300">Continuous Ambient Air Monitoring Linked to CPCB Portal</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-slate-800 dark:text-slate-300">Rainwater Harvesting & Ground Water Recharge Pits</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-slate-800 dark:text-slate-300">Annual Afforestation Rate matched to EC Letter</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="text-slate-800 dark:text-slate-300">Topsoil Segregation & Storage Bund Stability Review</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
