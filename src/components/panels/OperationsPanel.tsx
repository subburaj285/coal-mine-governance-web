import React from 'react';
import { Layers, Pickaxe, Users, Truck } from 'lucide-react';
import { SubsidiaryId, OperationsSubTab } from '../../types/dashboard';
import { ProductionPanel } from './ProductionPanel';
import { WorkforcePanel } from './WorkforcePanel';
import { FleetPanel } from './FleetPanel';

interface OperationsPanelProps {
  subsidiary: SubsidiaryId;
  activeSubTab: OperationsSubTab;
  onSelectSubTab: (subTab: OperationsSubTab) => void;
}

export const OperationsPanel: React.FC<OperationsPanelProps> = ({
  subsidiary,
  activeSubTab,
  onSelectSubTab
}) => {
  return (
    <div className="space-y-5">
      {/* Operations Header & Sub-nav */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            Mine Operations Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Management overview of Coal Production & Offtake, Workforce Attendance, and Equipment Availability.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            onClick={() => onSelectSubTab('production')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'production'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Pickaxe className="w-3.5 h-3.5" />
            <span>Production & Offtake</span>
          </button>

          <button
            onClick={() => onSelectSubTab('workforce')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'workforce'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Workforce & Muster</span>
          </button>

          <button
            onClick={() => onSelectSubTab('equipment')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSubTab === 'equipment'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Equipment & Fleet</span>
          </button>
        </div>
      </div>

      {/* Submodule Viewport */}
      <div>
        {activeSubTab === 'production' && <ProductionPanel subsidiary={subsidiary} />}
        {activeSubTab === 'workforce' && <WorkforcePanel subsidiary={subsidiary} />}
        {activeSubTab === 'equipment' && <FleetPanel subsidiary={subsidiary} />}
      </div>
    </div>
  );
};
