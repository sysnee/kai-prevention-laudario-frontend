'use client'

import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip, CircularProgress, Stack, useTheme } from "@mui/material";
import { Plus } from "lucide-react";
import { ServiceRequestForm } from "./form";
import api from "@/src/lib/api";

function renderStatus(status: 'PLANNED' | 'WAITING') {
    const colors: { [index: string]: 'success' | 'default' } = {
        PLANNED: 'success',
        WAITING: 'default',
    };

    const label = {
        PLANNED: 'PLANEJADO',
        WAITING: 'AGUARDANDO',
    }

    return <Chip label={label[status]} color={colors[status]} size="small" />;
}


const columns: GridColDef[] = [
    {
        field: 'examType',
        headerName: 'Serviço',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'clientName',
        headerName: 'Cliente',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'clientCpf',
        headerName: 'CPF',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 100,
    },
    {
        field: 'createdAt',
        headerName: 'Agendado em',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 120,
    },
    {
        field: 'dateTime',
        headerName: 'Agendado para',
        headerAlign: 'left',
        align: 'left',
        flex: 1,
        minWidth: 120,
    },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 80,
        renderCell: (params) => renderStatus(params.value as any),
    }
];

export default function AgendamentosPage() {
    const [serviceRequests, setServiceRequests] = useState([])
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState<boolean>(false);
    const theme = useTheme();

    const getServiceRequests = async () => {
        try {
            const clientesResponse = await api.get("service-requests");
            const clientesData = clientesResponse.data.data;
            setServiceRequests(clientesData)
        } catch (err) {
            console.error("Erro ao buscar os dados:", err);
        } finally {
            setLoading(false);
        }
    };

    const postServiceRequest = async (data: any) => {
        try {
            await api.post("service-requests", data, {
                headers: {
                    'api-key': 'AcN55Gg1Hfe30LMtZ2'
                }
            });
            // const clientesData = clientesResponse.data.data;
            // setServiceRequests(clientesData)
        } catch (err) {
            console.error("Erro ao criar:", err);
        } finally {
            setShowForm(false);
        }
    };

    useEffect(() => {
        getServiceRequests();
    }, [])

    // const rows = [

    //     { id: 'asdasdasd', examType: 'Exame 1', clientName: 'Cliente 1', dateTime: '2022-01-01 10:00', status: 'PLANNED' },
    //     { id: 'lkjoihjh', examType: 'Exame 2', clientName: 'Cliente 2', dateTime: '2022-01-02 12:00', status: 'WAITING' },
    //     //... more rows here...
    // ]

    const labelDisplayedRows = ({ from, to, count }: any) => {
        return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`;
    };

    return (
        <>
            <Stack spacing={6}>
                <Box display={'flex'} justifyContent={'space-between'} sx={{ marginTop: '20px !important' }}>
                    <h1 className="text-3xl font-bold text-kai-gray-900">Agendamentos</h1>
                    <button
                        onClick={() => {
                            // setSelectedClient(null);
                            // setFormMode('create');
                            setShowForm(true);
                        }}
                        className={`flex items-center px-4 py-2 rounded-lg
            ${theme.palette.mode === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-600 hover:bg-gray-700'}
          `}
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Novo Agendamento
                    </button>
                </Box>
                {loading ? (
                    <CircularProgress />
                ) : (serviceRequests.length !== 0 ? (
                    <Box sx={{ height: "100%", width: "100%" }}>
                        <DataGrid
                            columns={columns}
                            rows={serviceRequests}
                            density="compact"

                            checkboxSelection={false}
                            pageSizeOptions={[10, 20, 30]}
                            initialState={{
                                pagination: { paginationModel: { pageSize: 30 } },
                            }}
                            disableRowSelectionOnClick
                            localeText={{
                                MuiTablePagination: {
                                    labelDisplayedRows,
                                    labelRowsPerPage: "Linhas por página",
                                },
                            }}
                        />
                    </Box>
                ) : (
                    <span>Não foram encontrados clientes.</span>
                )
                )}
            </Stack>
            {
                showForm &&
                <ServiceRequestForm
                    client={null}
                    onCreate={postServiceRequest}
                    onEdit={() => { }}
                    onCancel={() => { setShowForm(false) }}
                    readOnly={false}
                    cpfError={''}
                    emailError={''}
                />
            }
        </>
    )
}