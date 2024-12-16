import React, { useEffect, useState } from 'react';
import { Clock, User, Edit2, Trash2, CalendarX, Eye } from 'lucide-react';
import { CircularProgress, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import api from '@/src/lib/api';
import Link from 'next/link';
import { useWorkflowStore } from '../../stores/workflowStore'

// Interface do componente
interface AppointmentListProps {
  date: Date;
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

export function AppointmentList({ date }: AppointmentListProps) {
  // Estado para armazenar os agendamentos e o status de carregamento
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para traduzir status
  const translateStatus = (status: string): string => {
    const translations: { [key: string]: string } = {
      PLANNED: "PLANEJADO",
      CONFIRMED: "CONFIRMADO",
      CANCELED: "CANCELADO",
    };
    return translations[status] || status;
  };

  const { setSelectedAppointment } = useWorkflowStore()

  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  // Função para formatar a data
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função de busca de agendamentos na API
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

  // Usando useEffect para rodar a função de busca
  useEffect(() => {
    fetchAppointments();
  }, [date]);

  // Formatação da data selecionada
  const formattedDate = formatDate(date);

  // Filtrando os agendamentos pela data
  const filteredAppointments = appointments?.filter(
    (appointment) => appointment.dateTime.startsWith(formattedDate)
  ) || [];

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

  // Definindo as colunas do DataGrid
  const columns: GridColDef[] = [
    { field: 'dateTime', headerName: 'Horário', minWidth: 100, flex: 0.4 },
    {
      field: 'clientName',
      headerName: 'Paciente',
      renderCell: (params) => (
        <div className="col-span-2 flex items-center">
          <User className="w-8 h-8 text-gray-400 mr-3" />
          {params.row.clientName}
        </div>
      ),
      minWidth: 400,
      flex: 0.4
    },
    { field: 'examType', headerName: 'Exame', minWidth: 150, flex: 0.4 },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: (params) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${params.row.status === 'CONFIRMADO'
          ? 'bg-green-100 text-green-800'
          : params.row.status === 'PLANEJADO'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
          }`}>
          {params.row.status}
        </span>
      ),
      minWidth: 150,
      flex: 0.4
    },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (
        <div className="flex">
          <Link href='/dashboard/workflow'>
            <button
              className="p-2 text-gray-400 hover:text-kai-primary rounded-lg hover:bg-kai-primary/10"
              onClick={() => handleSelectAppointment(params.row)}
            >
              <Eye className="w-5 h-5" />
            </button>
          </Link>
        </div>
      ),
      minWidth: 200,
      flex: 0.4
    },
  ];

  // Preparando as linhas do DataGrid
  const rows: GridRowsProp = filteredAppointments.map((appointment) => ({
    id: appointment.id,
    dateTime: appointment.dateTime.split(', ')[1], // Formata para exibir só o horário
    clientName: appointment.clientName,
    examType: appointment.examType,
    status: translateStatus(appointment.status),
  }));

  const labelDisplayedRows = ({ from, to, count }: any) => {
    return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`;
  };

  return (
    <div className="rounded-md">
      <Box>
        <DataGrid
          sx={{
            '.MuiDataGrid-columnHeaders': {
              fontSize: '15px',
            },
            '.MuiDataGrid-footerContainer': {
              backgroundColor: 'transparent !important',
              fontSize: '15px',
            },
            '.MuiDataGrid-cell': {
              fontSize: '15px',
            },
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          localeText={{
            MuiTablePagination: {
              labelDisplayedRows,
              labelRowsPerPage: "Linhas por página",
            },
          }}
        />
      </Box>
    </div>
  );
}
