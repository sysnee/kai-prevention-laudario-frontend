import React from 'react';
import { Clock, Calendar as CalendarIcon, Users } from 'lucide-react';

interface ScheduleDetailsProps {
  date: Date;
}

export function ScheduleDetails({ date }: ScheduleDetailsProps) {
  const formattedDate = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Mock data - replace with actual API integration
  const scheduleStats = {
    totalAppointments: 12,
    availableSlots: 6,
    confirmedAppointments: 8,
    pendingAppointments: 4,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Detalhes da Agenda
      </h3>

      <div className="flex items-center text-sm text-gray-600 mb-4">
        <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
        <span className="capitalize">{formattedDate}</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-900">
              Horários Disponíveis
            </span>
          </div>
          <span className="text-lg font-semibold text-blue-600">
            {scheduleStats.availableSlots}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <Users className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-900">
              Agendamentos Confirmados
            </span>
          </div>
          <span className="text-lg font-semibold text-green-600">
            {scheduleStats.confirmedAppointments}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-yellow-900">
              Agendamentos Pendentes
            </span>
          </div>
          <span className="text-lg font-semibold text-yellow-600">
            {scheduleStats.pendingAppointments}
          </span>
        </div>
      </div>
    </div>
  );
}