import React from 'react';
import {
  Pickaxe,
  Truck,
  ShieldAlert,
  FileWarning,
  Award,
  AlertTriangle,
  Users,
  Cpu,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { KpiMetric, Language } from '../types/dashboard';

interface TopKpiStripProps {
  metrics: KpiMetric[];
  onSelectMetric: (metric: KpiMetric) => void;
  language: Language;
}

export const TopKpiStrip: React.FC<TopKpiStripProps> = ({
  metrics,
  onSelectMetric,
  language
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'prod':
        return <Pickaxe className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'dispatch':
        return <Truck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
      case 'safety':
        return <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'violations':
        return <FileWarning className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'compliance':
        return <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'alerts':
        return <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'workforce':
        return <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'equipment':
        return <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getBorderColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-rose-300 dark:border-rose-500/40 hover:border-rose-400 bg-rose-50/50 dark:bg-rose-950/10';
      case 'warning':
        return 'border-amber-300 dark:border-amber-500/40 hover:border-amber-400 bg-amber-50/50 dark:bg-amber-950/10';
      case 'normal':
      default:
        return 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/80';
    }
  };

  // Helper to render responsive mini SVG sparkline
  const renderSparkline = (data: number[], isPositive: boolean) => {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

    const strokeColor = isPositive ? '#16a34a' : '#e11d48';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
      {metrics.map((kpi) => {
        const title = language === 'HI' ? kpi.titleHi : kpi.title;
        return (
          <div
            key={kpi.id}
            onClick={() => onSelectMetric(kpi)}
            className={`group relative rounded-xl border p-3.5 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 ${getBorderColor(
              kpi.severity
            )}`}
            title={`Click to inspect deep drill-down for ${title}`}
          >
            {/* Top row: Icon + Delta */}
            <div className="flex items-center justify-between gap-1 mb-2">
              <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700/60">
                  {getIcon(kpi.id)}
                </div>
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 line-clamp-1">
                  {title}
                </span>
              </div>
            </div>

            {/* Middle: Big Metric Value */}
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-xl font-bold font-mono tracking-tight text-slate-900 dark:text-white tabular-nums">
                {kpi.value}
              </div>
            </div>

            {/* Sparkline & Delta Row */}
            <div className="flex items-center justify-between gap-1 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-0.5 text-[10px] font-medium">
                {kpi.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-rose-600 dark:text-rose-400 shrink-0" />
                )}
                <span className={kpi.isPositive ? 'text-emerald-700 dark:text-emerald-400 font-mono' : 'text-rose-700 dark:text-rose-400 font-mono'}>
                  {kpi.delta}
                </span>
              </div>
              <div className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                {renderSparkline(kpi.sparkline, kpi.isPositive)}
              </div>
            </div>

            {/* Sub-label */}
            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
              {kpi.unit}
            </div>
          </div>
        );
      })}
    </div>
  );
};
