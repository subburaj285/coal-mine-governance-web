import React from 'react';
import { ShieldCheck, CheckCircle2, ClipboardList, AlertCircle, FileSearch, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  iconType?: 'check' | 'inspection' | 'alert' | 'ai' | 'search';
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  iconType = 'check',
  actionLabel,
  onAction
}) => {
  let Icon = ShieldCheck;
  let color = 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';

  if (iconType === 'inspection') {
    Icon = ClipboardList;
    color = 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
  } else if (iconType === 'alert') {
    Icon = AlertCircle;
    color = 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
  } else if (iconType === 'ai') {
    Icon = Sparkles;
    color = 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800';
  } else if (iconType === 'search') {
    Icon = FileSearch;
    color = 'text-slate-500 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
  }

  return (
    <div className="p-8 text-center flex flex-col items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3 my-4">
      <div className={`p-3.5 rounded-2xl border ${color}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-bold text-base text-slate-900 dark:text-white mt-1">{title}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-xs"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
