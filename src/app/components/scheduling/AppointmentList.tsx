import React, { useEffect, useState } from 'react';
import { Clock, User, MoreVertical, Edit2, Trash2, CalendarX } from 'lucide-react';
import { CircularProgress } from '@mui/material';

// Interface do componente
interface AppointmentListProps {
  date: Date;
  searchQuery: string;
}

// Interface para os dados do agendamento
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

export function AppointmentList({ date, searchQuery }: AppointmentListProps) {
  // Estado para armazenar os agendamentos e o status de carregamento
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para formatar a data
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função que simula a obtenção dos agendamentos (mocando os dados)
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Dados mocados
      const mockAppointments: Appointment[] = [
        {
          id: '1',
          clientCpf: '123.456.789-00',
          clientName: 'João Silva',
          dateTime: '2024-12-12, 10:00',
          examType: 'Exame de Sangue',
          status: 'PLANNED',
          questionnaireIsPending: true,
          createdAt: '2024-12-01T12:00:00Z',
        },
        {
          id: '2',
          clientCpf: '987.654.321-00',
          clientName: 'Maria Oliveira',
          dateTime: '2024-12-12, 11:30',
          examType: 'Raio-X',
          status: 'CONFIRMED',
          questionnaireIsPending: false,
          createdAt: '2024-12-02T14:00:00Z',
        },
        {
          id: '3',
          clientCpf: '456.789.123-00',
          clientName: 'Carlos Souza',
          dateTime: '2024-12-12, 15:00',
          examType: 'Ultrassonografia',
          status: 'CANCELLED',
          questionnaireIsPending: false,
          createdAt: '2024-12-03T16:00:00Z',
        },
      ];

      // Simulando a resposta da API
      setAppointments(mockAppointments);
      console.log(mockAppointments);
    } catch (err) {
      console.error("Erro ao buscar os dados:", err);
    } finally {
      setLoading(false);
    }
  };

  // Usando useEffect para rodar a função de busca (simulação)
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Formatação da data selecionada
  const formattedDate = formatDate(date);

  // Filtrando os agendamentos com base na data e no termo de pesquisa
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.examType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.dateTime.startsWith(formattedDate)
  );

  // Caso os dados estejam carregando, mostra o spinner
  if (loading) {
    return <CircularProgress />;
  }

  // Caso não haja agendamentos filtrados, exibe uma mensagem
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
      <div className="grid grid-cols-6 gap-4 p-4 font-medium text-gray-500 border-b border-gray-200">
        <div>Horário</div>
        <div className="col-span-2">Paciente</div>
        <div>Exame</div>
        <div>Status</div>
        <div className="text-right">Ações</div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50"
          >
            <div className="flex items-center text-gray-900">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              {appointment.dateTime.split(', ')[1]}
            </div>
            <div className="col-span-2 flex items-center">
              <User className="w-8 h-8 text-gray-400 mr-3" />
              <div>
                <div className="font-medium text-gray-900">
                  {appointment.clientName}
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-900">{appointment.examType}</div>
            </div>
            <div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appointment.status === 'PLANNED'
                  ? 'bg-yellow-100 text-yellow-800'
                  : appointment.status === 'CONFIRMED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}
              >
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </span>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
