import React from 'react';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  Timer
} from 'lucide-react';
import { useTheme } from '@mui/material';

interface WorkflowMetricsProps {
  date: Date;
}

export function WorkflowMetrics({ date }: WorkflowMetricsProps) {
  const theme = useTheme();
  // Mock data - replace with actual API integration
  const metrics = {
    totalExams: 24,
    inProgress: 8,
    completed: 12,
    delayed: 4,
    avgCompletionTime: '45min',
    occupancyRate: 75,
    patientWaitTime: '12min',
    scheduledExams: 18
  };

  return (
    <div 
      className="bg-gradient-to-r from-pure-white to-frost-white rounded-xl shadow-lg p-6"
      style={{
        border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-kai-text-primary">
          Métricas do Fluxo
        </h3>
        <div className="flex items-center text-kai-text-secondary">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {date.toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total de Exames */}
        <div 
          className="bg-gradient-to-br from-kai-primary/5 to-kai-primary/10 rounded-lg p-4"
          style={{
            border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-kai-primary/10 rounded-lg">
              <ClipboardList className="w-5 h-5 text-kai-primary" />
            </div>
            <span className="text-xs font-medium text-kai-primary bg-kai-primary/10 px-2 py-1 rounded-full">
              Total
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <h4 className="text-2xl font-bold text-kai-text-primary">
              {metrics.totalExams}
            </h4>
            <span className="text-sm text-kai-text-secondary">
              Exames
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-kai-text-secondary">
            <TrendingUp className="w-4 h-4 mr-1 text-kai-success" />
            <span>+12% em relação à média</span>
          </div>
        </div>

        {/* Taxa de Ocupação */}
        <div 
          className="bg-gradient-to-br from-kai-secondary/5 to-kai-secondary/10 rounded-lg p-4"
          style={{
            border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-kai-secondary/10 rounded-lg">
              <Users className="w-5 h-5 text-kai-secondary" />
            </div>
            <span className="text-xs font-medium text-kai-secondary bg-kai-secondary/10 px-2 py-1 rounded-full">
              Ocupação
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <h4 className="text-2xl font-bold text-kai-text-primary">
              {metrics.occupancyRate}%
            </h4>
            <span className="text-sm text-kai-text-secondary">
              Capacidade
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full h-2 bg-kai-secondary/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-kai-secondary transition-all duration-500 rounded-full"
                style={{ width: `${metrics.occupancyRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tempo Médio */}
        <div 
          className="bg-gradient-to-br from-kai-accent/5 to-kai-accent/10 rounded-lg p-4"
          style={{
            border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-kai-accent rounded-lg">
              <Timer className="w-5 h-5 text-kai-primary" />
            </div>
            <span className="text-xs font-medium text-kai-primary bg-kai-accent px-2 py-1 rounded-full">
              Tempo Médio
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <h4 className="text-2xl font-bold text-kai-text-primary">
              {metrics.avgCompletionTime}
            </h4>
            <span className="text-sm text-kai-text-secondary">
              Por Exame
            </span>
          </div>
          <div className="mt-2 flex items-center text-xs text-kai-text-secondary">
            <Clock className="w-4 h-4 mr-1" />
            <span>Espera média: {metrics.patientWaitTime}</span>
          </div>
        </div>

        {/* Status */}
        <div 
          className="bg-gradient-to-br from-kai-surface/50 to-kai-surface rounded-lg p-4"
          style={{
            border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-kai-success" />
            </div>
            <span className="text-xs font-medium text-kai-text-primary px-2 py-1 rounded-full">
              Status
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-kai-text-secondary">Em Andamento</span>
              <span className="text-sm font-medium text-kai-text-primary">{metrics.inProgress}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-kai-text-secondary">Concluídos</span>
              <span className="text-sm font-medium text-kai-success">{metrics.completed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-kai-text-secondary">Atrasados</span>
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-500">{metrics.delayed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}