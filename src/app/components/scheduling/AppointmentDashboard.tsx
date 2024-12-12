import React from 'react';
import { Calendar, CheckCircle2, Clock, XCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface AppointmentDashboardProps {
  date: Date;
}

// Mock data - replace with actual API integration
const getStats = (date: Date) => ({
  totalAppointments: 13,
  confirmedAppointments: 0,
  pendingAppointments: 13,
  canceledAppointments: 0,
  occupancyRate: 87,
});

export function AppointmentDashboard({ date }: AppointmentDashboardProps) {
  const stats = getStats(date);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Appointments */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-kai-primary/10 to-ka rounded-lg">
            <Calendar className="w-6 h-6 text-kai-primary" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total de Exames</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold text-kai-text-primary mr-2">
                {stats.totalAppointments}
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
      <div className="bg-white rounded-xl border border-gray-200 p-6">
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
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-kai-primary/10 rounded-lg">
            <Clock className="w-6 h-6 text-kai-primary" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Com Pendências</p>
            <h3 className="text-2xl font-bold text-kai-text-primary">
              {stats.pendingAppointments}
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
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-red-50 rounded-lg">
            <XCircle className="w-6 h-6 text-red-600" />
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