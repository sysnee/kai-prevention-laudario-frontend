import React, { useState } from 'react';
import { Calendar, Clock, User, MoreVertical, Calendar as CalendarIcon, Trash2, Edit2 } from 'lucide-react';

interface PatientListProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

// Mock data - replace with actual API integration
const mockAppointments = Array.from({ length: 8 }, (_, i) => ({
  id: `apt-${i + 1}`,
  patientName: `Paciente ${i + 1}`,
  examType: ['Raio-X', 'Tomografia', 'Ressonância'][i % 3],
  time: `${Math.floor(i/2) + 8}:${i % 2 === 0 ? '00' : '30'}`,
  status: ['confirmado', 'pendente', 'cancelado'][i % 3],
}));

export function PatientList({ selectedDate, onDateSelect }: PatientListProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const formattedDate = selectedDate.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleReschedule = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
    setActiveMenu(null);
  };

  const handleDelete = async (appointmentId: string) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      try {
        // Aqui você implementaria a chamada à API para deletar o agendamento
        console.log('Cancelando agendamento:', appointmentId);
        // Após sucesso, atualizaria a lista de agendamentos
      } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
      }
    }
    setActiveMenu(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 capitalize">
          {formattedDate}
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {mockAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-6 hover:bg-gray-50 transition-colors relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {appointment.patientName}
                  </h3>
                  <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {appointment.time}
                    </div>
                    <span>•</span>
                    <div>{appointment.examType}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      appointment.status === 'confirmado'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'pendente'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }
                  `}
                >
                  {appointment.status}
                </span>
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === appointment.id ? null : appointment.id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                  
                  {activeMenu === appointment.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu">
                        <button
                          onClick={() => handleReschedule(appointment)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Reagendar
                        </button>
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Reagendamento */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Reagendar Consulta
            </h3>
            <p className="text-gray-600 mb-4">
              Paciente: {selectedAppointment?.patientName}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nova Data
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Novo Horário
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>08:00</option>
                <option>08:30</option>
                <option>09:00</option>
                {/* Adicione mais opções de horário conforme necessário */}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Implementar lógica de reagendamento
                  setShowRescheduleModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}