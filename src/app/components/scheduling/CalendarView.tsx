import React, { useEffect, useState } from 'react';
import { Clock, User, AlertCircle, CalendarX } from 'lucide-react';
import api from '@/src/lib/api';
import { CircularProgress } from '@mui/material';

interface CalendarViewProps {
  date: Date;
}

interface Appointment {
  id: string;
  clientCpf: string;
  clientName: string;
  dateTime: string;
  examType: string;
  status: string;
  questionnaireIsPending: boolean;
  createdAt: string;
}

export function CalendarView({ date }: CalendarViewProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const translateStatus = (status: string): string => {
    const translations: { [key: string]: string } = {
      PLANNED: "Planejado",
      CONFIRMED: "Confirmado",
      CANCELED: "Cancelado",
    };
    return translations[status] || status;
  };

  // Função para formatar a data
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("service-requests");
      setAppointments(data);
    } catch (err) {
      console.error("Erro ao buscar os dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [date]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PLANNED':
        return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-green-100 border-green-200 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 border-red-200 text-red-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const formattedDate = formatDate(date);

  const filteredAppointments = appointments?.filter(
    (appointment) =>
      appointment.dateTime.startsWith(formattedDate)
  ) || [];

  if (loading) {
    return <CircularProgress />;
  }


  if (filteredAppointments.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <CalendarX className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum agendamento encontrado
        </h3>
        <p className="text-gray-500">
          Não há agendamentos para esta data ou filtro aplicado.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => {

          return (
            <div
              key={appointment.id}
              className={`min-h-[80px] grid grid-cols-[120px,1fr]`}
            >
              <div className="p-4 border-r border-gray-200 flex items-center">
                <Clock className={`w-4 h-4 mr-2 'text-gray-400'}`} />
                <span className={`font-medium 'text-gray-600'}`}>
                  {appointment.dateTime.split(', ')[1]}
                </span>
              </div>
              <div className="p-2">
                <div className={`h-full p-3 rounded-lg border ${getStatusColor(appointment.status)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2 text-gray-500" />
                      <div>
                        <div className="font-medium">{appointment.clientName}</div>
                        <div className="text-sm">{appointment.examType}</div>
                      </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                      {translateStatus(appointment.status)}
                    </span>
                  </div>
                  {appointment.questionnaireIsPending && (
                    <div className="mt-2 flex items-start text-sm">
                      <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                      Questionário pendente
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
