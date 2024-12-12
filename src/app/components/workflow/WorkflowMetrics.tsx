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
  total: number; // Total number of exams in the workflow
}

export function WorkflowMetrics({ date, total }: WorkflowMetricsProps) {
  const theme = useTheme();

  const metrics = {
    totalExams: total,
    inProgress: 0,
    completed: 0,
    delayed: 0,
    avgCompletionTime: '-- min',
    occupancyRate: 85,
    patientWaitTime: '-- min',
    scheduledExams: total
  };

  return (
    <div
      className="rounded-xl p-6 shadow-sm"
      style={{
        border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold kai-text-primary">
          Métricas do Fluxo
        </h3>
        <div className="flex items-center kai-text-secondary">
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
          className="from-kai-primary/5 to-kai-primary/10 rounded-lg p-4"
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
            <span className="text-sm text-kai-text-primary">
              Exames
            </span>
          </div>
          <div
            className="mt-2 flex items-center text-xs"
            style={{
              color: theme.palette.mode === 'dark' ? "#9CA3AF" : theme.palette.text.primary
            }}
          >
            <TrendingUp className="w-4 h-4 mr-1 text-kai-success" />
            <span>
              +--% em relação à média
            </span>
          </div>
        </div>

        {/* Taxa de Ocupação */}
        <div
          className="bg-gradient-to-br from-kai-primary/5 to-kai-primary/10 rounded-lg p-4"
          style={{
            border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-kai-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-kai-primary" />
            </div>
            <span className="text-xs font-medium text-kai-primary bg-kai-primary/10 px-2 py-1 rounded-full">
              Ocupação
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <h4 className="text-2xl font-bold text-kai-text-primary">
              {metrics.occupancyRate}%
            </h4>
            <span className="text-sm text-kai-text-primary">
              Capacidade
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full h-2 bg-kai-primary/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-kai-primary transition-all duration-500 rounded-full"
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
            <div className="p-2 bg-kai-primary/10 rounded-lg">
              <Timer className="w-5 h-5 text-kai-primary" />
            </div>
            <span className="text-xs font-medium text-kai-primary bg-kai-primary/10 px-2 py-1 rounded-full">
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
          <div
            className="mt-2 flex items-center text-xs text-kai-text-secondary"
            style={{
              color: theme.palette.mode === 'dark' ? "#9CA3AF" : theme.palette.text.primary
            }}
          >
            <Clock className="w-4 h-4 mr-1" />
            <span>Espera média: {metrics.patientWaitTime}</span>
          </div>
        </div>

        {/* Status */}
        <div
          className="rounded-lg p-4"
          style={{
            border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-kai-primary/10">
              <CheckCircle2 className="w-5 h-5 text-kai-primary" />
            </div>
            <span className="text-xs font-medium bg-kai-primary/10 text-kai-primary px-2 py-1 rounded-full">
              Situação
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