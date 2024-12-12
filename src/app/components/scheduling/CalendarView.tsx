import React, { useEffect, useState } from 'react';
import { Clock, User, AlertCircle } from 'lucide-react';
import api from '@/src/lib/api';
import { CircularProgress } from '@mui/material';

interface CalendarViewProps {
  date: Date;
  onDateSelect: (date: Date) => void;
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

export function CalendarView({ date, onDateSelect }: CalendarViewProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

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

  if (loading) {
    return <CircularProgress />;
  }

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const appointmentsByTime = appointments?.filter(apt => {
    const appointmentDate = new Date(apt.dateTime);
    const selectedDate = new Date(date);
    return appointmentDate.getDate() === selectedDate.getDate() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getFullYear() === selectedDate.getFullYear();
  }) || [];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 divide-y divide-gray-200">
        {appointmentsByTime.map((appointment) => {
          const appointmentTime = formatTime(appointment.dateTime);
          const isCurrentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) === appointmentTime;

          return (
            <div
              key={appointment.id}
              className={`min-h-[80px] grid grid-cols-[120px,1fr] ${isCurrentTime ? 'bg-blue-50' : ''}`}
            >
              <div className="p-4 border-r border-gray-200 flex items-center">
                <Clock className={`w-4 h-4 mr-2 ${isCurrentTime ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={`font-medium ${isCurrentTime ? 'text-blue-600' : 'text-gray-600'}`}>
                  {appointmentTime}
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
                      {appointment.status}
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
