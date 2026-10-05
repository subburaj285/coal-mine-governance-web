import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Sliders,
  Send,
  Flame
} from 'lucide-react';
import { SubsidiaryId } from '../../types/dashboard';

interface AiPredictivePanelProps {
  subsidiary: SubsidiaryId;
}

export const AiPredictivePanel: React.FC<AiPredictivePanelProps> = ({ subsidiary }) => {
  // What-if simulator state
  const [ventilationRate, setVentilationRate] = useState(14000); // m3/min
  const [productionTarget, setProductionTarget] = useState(2500000); // Tonnes
  const [rainfallAmount, setRainfallAmount] = useState(25); // mm

  // Compliance Copilot Chat State
  const [copilotInput, setCopilotInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      sender: 'ai',
      text: 'Namaste! I am the CIL Smart Compliance Copilot trained on Coal Mines Regulations (CMR 2017), Mines Act 1952, and DGMS circulars. Ask me any regulatory rule, risk diagnosis, or colliery compliance status.',
      time: '10:00 AM'
    },
    {
      sender: 'user',
      text: 'What are the statutory air velocity standards in underground roadways under CMR 2017 Regulation 153?',
      time: '10:01 AM'
    },
    {
      sender: 'ai',
      text: 'Under CMR 2017 Regulation 153(2), air velocity in underground roadways must not be less than: (a) 1.5 m/s in main return airways; (b) 1.0 m/s in longwall or mechanized faces; (c) 0.5 m/s in any working face. In gassy seams (Degree II & III), velocity must prevent methane layering. Our Moonidih face is currently at 1.2 m/s, requiring ventilation fan adjustment.',
      time: '10:01 AM'
    }
  ]);

  const handleSendCopilot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;

    const userMsg = copilotInput.trim();
    const newChat = [...chatHistory, { sender: 'user' as const, text: userMsg, time: 'Just now' }];
    setChatHistory(newChat);
    setCopilotInput('');

    setTimeout(() => {
      let reply = 'According to Coal India compliance protocols, all relevant DGMS standards are being tracked with verified automated audit logs.';
      const lower = userMsg.toLowerCase();
      if (lower.includes('methane') || lower.includes('ch4') || lower.includes('gas')) {
        reply = 'Methane levels must remain strictly below 0.80% in return airways (CMR 153) and 0.50% at intake faces. If CH4 exceeds 1.25%, all electrical power to the district must automatically trip via the intrinsically safe gateway.';
      } else if (lower.includes('gevra') || lower.includes('secl')) {
        reply = 'SECL Gevra Mega Pit is operating at 103.4% production capacity with all 34 HEMM telematics reporting nominal hydraulic temperatures. Dust suppression mist cannons are fully activated.';
      } else if (lower.includes('violation') || lower.includes('overdue')) {
        reply = 'Across the selected subsidiary, 3 corrective action notices are currently overdue (Moonidih UG air velocity, Lakhanpur berm height, and Umrer settling silt). Remediation plans have been submitted to DGMS.';
      } else if (lower.includes('rain') || lower.includes('slope') || lower.includes('dump')) {
        reply = 'Under DGMS Circular No. 2 of 2020, highwall slope stability factor of safety (FoS) must exceed 1.3 for static and 1.1 for dynamic monsoon conditions. Slope radar prisms are monitoring real-time creep.';
      }

      setChatHistory((prev) => [...prev, { sender: 'ai', text: reply, time: 'Just now' }]);
    }, 600);
  };

  // What-if simulated derived values
  const simulatedCh4 = Math.max(0.35, 1.25 - (ventilationRate - 10000) * 0.00008).toFixed(2);
  const simulatedSlopeFos = Math.max(1.05, 1.48 - rainfallAmount * 0.008).toFixed(2);
  const simulatedEquipmentStrain = (productionTarget / 2400000 * 82).toFixed(1);

  return (
    <div className="space-y-5">
      
      {/* Row 1: AI Risk Forecast & LSTM Gas Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Next 7/30-Day Risk Forecast Heatmap */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              AI 7-Day Forward Risk Probability Forecast
            </h3>
            <span className="text-[10px] font-mono text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-200">
              Monte Carlo Simulation
            </span>
          </div>

          <div className="space-y-3">
            {[
              { zone: 'BCCL Moonidih Longwall Face', risk: 84, trend: 'High Gas Inundation Risk', color: 'bg-rose-500' },
              { zone: 'SECL Kusmunda Highwall Face', risk: 62, trend: 'Monsoon Slope Creep Elevated', color: 'bg-amber-500' },
              { zone: 'MCL Talcher Seam IX Gate', risk: 48, trend: 'Ventilation Velocity Margin', color: 'bg-amber-500' },
              { zone: 'NCL Jayant Bench 4 Pit', risk: 18, trend: 'Nominal Stability Baseline', color: 'bg-emerald-500' },
              { zone: 'WCL Umrer Haul Road Ramp', risk: 26, trend: 'Berm Erosion Controlled', color: 'bg-emerald-500' }
            ].map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-900 dark:text-white">{item.zone}</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-200">Risk Score: {item.risk}/100</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-1">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.risk}%` }} />
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">{item.trend}</div>
              </div>
            ))}
          </div>
        </div>

        {/* LSTM Methane (CH4) 4-Hour Early Warning Curve */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              LSTM Neural Net Methane (CH4) Prediction
            </h3>
            <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-200">
              4-Hour Forecast Band
            </span>
          </div>

          <div className="h-44 flex items-end justify-between gap-1 pt-6 pb-2 border-b border-slate-200 dark:border-slate-800 relative">
            <div className="absolute top-4 left-0 right-0 border-b border-dashed border-rose-400 dark:border-rose-500/60 flex justify-between text-[10px] text-rose-600 dark:text-rose-400 font-mono px-2">
              <span>Statutory Trip Threshold: 0.80%</span>
            </div>

            {[0.52, 0.54, 0.58, 0.62, 0.66, 0.72, 0.79, 0.84, 0.78, 0.72, 0.65, 0.58].map((val, idx) => {
              const h = (val / 1.0) * 100;
              const isFuture = idx >= 6;
              const isDanger = val >= 0.8;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t transition-all ${
                      isDanger
                        ? 'bg-rose-500'
                        : isFuture
                        ? 'bg-cyan-500/80 border-t-2 border-cyan-400'
                        : 'bg-blue-600'
                    }`}
                    style={{ height: `${h}%` }}
                    title={`${isFuture ? 'Forecast' : 'Observed'}: ${val}% CH4`}
                  />
                  <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                    {idx < 6 ? `-${6 - idx}h` : `+${idx - 5}h`}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Actual Observed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> LSTM AI Forecast (+4h)
            </span>
            <span className="text-rose-600 dark:text-rose-400 font-mono font-medium">Surge Peak at +2h</span>
          </div>
        </div>

      </div>

      {/* Row 2: Interactive "What-If" Simulation Engine */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Interactive "What-If" Digital Twin Simulation</h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Physics-Based Mine Scenario Modeling</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Ventilation */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Main Fan Ventilation Airflow</span>
              <span className="text-cyan-700 dark:text-cyan-400 font-mono font-bold">{ventilationRate.toLocaleString()} m³/min</span>
            </div>
            <input
              type="range"
              min="9000"
              max="18000"
              step="500"
              value={ventilationRate}
              onChange={(e) => setVentilationRate(Number(e.target.value))}
              className="w-full accent-cyan-600"
            />
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex justify-between">
              <span>Predicted Return CH₄:</span>
              <span className={`font-mono font-bold ${Number(simulatedCh4) > 0.8 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {simulatedCh4}%
              </span>
            </div>
          </div>

          {/* Slider 2: Production Target */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Target Production Rate</span>
              <span className="text-blue-700 dark:text-blue-400 font-mono font-bold">{(productionTarget / 1000000).toFixed(2)} MT/day</span>
            </div>
            <input
              type="range"
              min="1800000"
              max="3200000"
              step="50000"
              value={productionTarget}
              onChange={(e) => setProductionTarget(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex justify-between">
              <span>Fleet Component Strain:</span>
              <span className={`font-mono font-bold ${Number(simulatedEquipmentStrain) > 90 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {simulatedEquipmentStrain}%
              </span>
            </div>
          </div>

          {/* Slider 3: Rainfall Intensity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 dark:text-slate-300 font-medium">Monsoon Rainfall Intensity</span>
              <span className="text-amber-700 dark:text-amber-400 font-mono font-bold">{rainfallAmount} mm / 24h</span>
            </div>
            <input
              type="range"
              min="0"
              max="120"
              step="5"
              value={rainfallAmount}
              onChange={(e) => setRainfallAmount(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex justify-between">
              <span>Highwall Factor of Safety (FoS):</span>
              <span className={`font-mono font-bold ${Number(simulatedSlopeFos) < 1.2 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {simulatedSlopeFos} (&gt;1.3 required)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Natural Language Compliance Copilot Chat */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Compliance & DGMS Statutory Copilot</h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Knowledge Base: CMR 2017 · Mines Act · DGMS Circulars</span>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-4 max-h-72 overflow-y-auto space-y-3 mb-3">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium shadow-xs'
                    : 'bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-xs'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1 font-mono">{msg.time}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendCopilot} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask Copilot e.g., 'What are highwall safety berm standards?' or 'Explain Moonidih gas status'..."
            value={copilotInput}
            onChange={(e) => setCopilotInput(e.target.value)}
            className="flex-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>

    </div>
  );
};
