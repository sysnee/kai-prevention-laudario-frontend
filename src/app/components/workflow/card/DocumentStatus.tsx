import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface DocumentStatusProps {
  type: 'prescription' | 'questionnaire' | 'consent';
  status: boolean;
}

export function DocumentStatus({ type, status }: DocumentStatusProps) {
  if (status) {
    return (
      <div className="flex items-center text-green-600">
        <CheckCircle className="w-4 h-4 mr-1" />
        <span className="text-xs">Preenchido</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-amber-600">
      <AlertTriangle className="w-4 h-4 mr-1" />
      <span className="text-xs">Pendente</span>
    </div>
  );
}