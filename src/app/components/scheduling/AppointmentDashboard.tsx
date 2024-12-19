import React from 'react';
import { Calendar, CheckCircle2, Clock, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { Skeleton } from '@mui/material';
import { useTheme } from '@mui/material';

interface AppointmentDashboardProps {
  date: Date;
  loading?: boolean;
}

// Mock data - replace with actual API integration
const getStats = (date: Date) => ({
  totalAppointments: 13,
  confirmedAppointments: 0,
  pendingAppointments: 13,
  canceledAppointments: 0,
  occupancyRate: 87,
});

function DashboardSkeleton({ theme }: { theme: any }) {
  const CardSkeleton = () => (
    <div
      className="rounded-xl border border-gray-200 p-6"
      style={{
        border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
      }}
    >
      <div className="flex items-center">
        <Skeleton variant="rounded" width={40} height={40} />
        <div className="ml-4 flex-1">
          <Skeleton variant="text" width={120} height={20} />
          <div className="flex items-baseline mt-1">
            <Skeleton variant="text" width={60} height={32} />
            <Skeleton variant="text" width={40} height={20} className="ml-2" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={40} height={20} />
        </div>
        <Skeleton variant="rounded" width="100%" height={8} className="mt-1" />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function AppointmentDashboard({ date, loading }: AppointmentDashboardProps) {
  const theme = useTheme();
  const stats = getStats(date);

  if (loading) {
    return <DashboardSkeleton theme={theme} />;
  }

  return (
    <div className="grid bg-transparent grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Appointments */}
      <div
        className="rounded-xl p-6"
        style={{
          border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
        }}
      >
        <div className="flex items-center">
          <div className="p-2 bg-kai-primary/10 to-ka rounded-lg">
            <Calendar className="w-6 h-6 text-kai-primary" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total de Exames</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold text-kai-text-primary mr-2">
                --
              </h3>
              <span className="text-sm text-green-600 font-medium">
                --%
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Taxa de ocupação</span>
            <span className="font-medium text-gray-900">--%</span>
          </div>
          <div className="mt-1 bg-kai-primary/10 rounded-full h-2">
            <div
              className="bg-kai-primary rounded-full h-2"
              style={{ width: `${stats.occupancyRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Confirmed */}
      <div
        className="rounded-xl p-6"
        style={{
          border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
        }}
      >
        <div className="flex items-center">
          <div className="p-2 bg-kai-primary/10 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-kai-primary" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Confirmados</p>
            <h3 className="text-2xl font-bold tetext-kai-text-primary">
              {stats.confirmedAppointments}
            </h3>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Taxa de confirmação</span>
            <span className="font-medium text-gray-900">
              {Math.round((stats.confirmedAppointments / stats.totalAppointments) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Pending */}
      <div
        className="rounded-xl p-6"
        style={{
          border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
        }}
      >
        <div className="flex items-center">
          <div className="p-2 bg-kai-primary/10 rounded-lg">
            <Clock className="w-6 h-6 text-kai-primary" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Com Pendências</p>
            <h3 className="text-2xl font-bold text-kai-text-primary">
              --
            </h3>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Necessitam ação</span>
            <span className="font-medium text-kai-primary">
              Confirmar
            </span>
          </div>
        </div>
      </div>

      {/* Canceled */}
      <div
        className="rounded-xl p-6"
        style={{
          border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)"
        }}
      >
        <div className="flex items-center">
          <div className="p-2 bg-kai-primary/10 rounded-lg">
            <XCircle className="w-6 h-6 text-kai-primary" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Cancelados</p>
            <h3 className="text-2xl font-bold text-kai-text-primary">
              {stats.canceledAppointments}
            </h3>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Taxa de cancelamento</span>
            <span className="font-medium text-gray-900">
              {Math.round((stats.canceledAppointments / stats.totalAppointments) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}