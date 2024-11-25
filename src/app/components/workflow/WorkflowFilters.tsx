import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { WORKFLOW_STAGES } from './WorkflowBoard';

interface WorkflowFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function WorkflowFilters({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedDate,
  onDateChange
}: WorkflowFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex-1 min-w-[300px]">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por paciente ou tipo de exame..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <select
            value={selectedStatus || ''}
            onChange={(e) => onStatusChange(e.target.value || null)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            <option value="">Todas as etapas</option>
            {WORKFLOW_STAGES.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.title}
              </option>
            ))}
          </select>
          <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="relative">
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => onDateChange(new Date(e.target.value))}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>
    </div>
  );
}