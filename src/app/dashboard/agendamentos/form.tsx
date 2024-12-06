import React, { useEffect, useState } from 'react';
import { X, Save, Send, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/material';
import { QuestionnaireAnswersModal } from '../../components/clients/QuestionnaireAnswersModal';
import axios from 'axios';

interface ClientFormProps {
    client?: any;
    onCreate: (data: any) => void;
    onEdit: (data: any) => void;
    onCancel: () => void;
    readOnly?: boolean;
    cpfError: string;
    emailError: string;
}

export function ServiceRequestForm({ client, onCreate, onEdit, onCancel, readOnly = false, cpfError, emailError }: ClientFormProps) {
    const theme = useTheme();
    const [clients, setClients] = useState<any>([]);
    const [, setSelectedClient] = useState<any>();
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<any>(null);

    const getClients = async () => {
        try {
            const clientesResponse = await axios.get("https://ris-api.kaiprevention.com.br/v1/clients");
            const clientesData = clientesResponse.data.data;
            setClients(clientesData)
        } catch (err) {
            console.error("Erro ao buscar os dados:", err);
        } finally {
            //   setLoading(false);
        }
    };

    useEffect(() => {
        getClients();
    }, [])

    const formatCEP = (cep: string) => {
        return cep.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    const formatCPF = (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    };


    const formatPhone = (value: string): string => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .slice(0, 15);
    };

    const phoneFormatted = client?.phone ? formatPhone(client.phone) : '';
    const cpfFormatted = client?.cpf ? formatCPF(client.cpf) : '';
    const zipcodeFormatted = client?.zipcode ? formatCEP(client.zipcode) : '';

    const [formData, setFormData] = useState({
        // Personal Information
        name: client?.name || '',
        birthdate: client?.birthdate || '',
        gender: client?.gender
            ? client.gender === 'male'
                ? 'male'
                : client.gender === 'female'
                    ? 'female'
                    : 'other'
            : '',
        cpf: cpfFormatted,
        examType: '',
        date: '',
        minute: 0,
        hour: 0,

        // Contact Information
        phone: phoneFormatted,
        email: client?.email || '',
        zipcode: zipcodeFormatted,
        street: client?.street || '',
        number: client?.number || '',
        complement: client?.complement || '',
        neighborhood: client?.neighborhood || '',
        city: client?.city || '',
        state: client?.state || '',
    });


    const handleResendQuestionnaire = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success('Link do questionário reenviado com sucesso');
        } catch (error) {
            toast.error('Erro ao reenviar questionário');
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        if (readOnly) return;

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClientChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const selectedClient = clients.find((client: any) => client.cpf === e.target.value);
        setSelectedClient(selectedClient)
        setFormData(prev => ({
            ...prev,
            cpf: selectedClient.cpf,
        }));
    };

    const removeFormatting = (value: string) => {
        return value.replace(/\D/g, '');
    };

    const handleSubmitCreate = (e: React.FormEvent): void => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            date: formData.date.split('T')[0],
        }
        onCreate(formattedData);
    };

    const handleSubmitEdit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!readOnly) {
            const cleanedData = {
                ...formData,
                zipcode: removeFormatting(formData.zipcode),
                cpf: removeFormatting(formData.cpf),
                phone: removeFormatting(formData.phone),
            };

            onEdit(cleanedData);
        }
    };

    const renderQuestionnaireHistory = () => {
        if (!client?.questionnaires?.length) return null;

        return (
            <div className="col-span-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Histórico de Questionários</h3>
                        <button
                            type="button"
                            onClick={() => handleResendQuestionnaire()}
                            className="px-4 py-2 bg-kai-primary text-white rounded-lg hover:bg-kai-primary/90 flex items-center text-sm"
                        >
                            <Send className="w-4 h-4 mr-2" />
                            Reenviar Questionário
                        </button>
                    </div>

                    <div className="space-y-4">
                        {client.questionnaires.map((questionnaire: any) => (
                            <div
                                key={questionnaire.id}
                                className={`p-4 rounded-lg border ${questionnaire.status === 'completed'
                                    ? 'border-green-200 bg-green-50'
                                    : 'border-amber-200 bg-amber-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {questionnaire.status === 'completed' ? (
                                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                                        ) : (
                                            <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {questionnaire.status === 'completed' ? 'Questionário Preenchido' : 'Questionário Pendente'}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {questionnaire.date}
                                            </div>
                                        </div>
                                    </div>
                                    {questionnaire.status === 'completed' && (
                                        <button
                                            type="button"
                                            onClick={() => setSelectedQuestionnaire(questionnaire)}
                                            className="px-3 py-1 text-sm text-kai-primary bg-white rounded-md hover:bg-kai-primary/10"
                                        >
                                            Ver Respostas
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col"
                style={{
                    backgroundColor: theme.palette.background.default
                }}
            >
                <div className="p-6 flex justify-between items-center"
                    style={{
                        borderBottom: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                    }}
                >
                    <h2 className="text-xl font-semibold">
                        {readOnly ? 'Detalhes do Cliente' : client ? 'Editar Cliente' : 'Novo Agendamento'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-400 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={client ? handleSubmitEdit : handleSubmitCreate} className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Cliente existente */}
                            <div className="col-span-2 p-4 rounded-lg"
                                style={{
                                    border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                                }}
                            >
                                <h3 className="text-lg font-medium mb-4">Selecionar cliente</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {clients.length > 0 && <div>
                                        <select
                                            name="cpf"
                                            value={formData.cpf}
                                            onChange={handleClientChange}
                                            required
                                            disabled={readOnly}
                                            className={`w-full px-3 py-2 rounded-md ${readOnly ? '' : 'focus:ring-2 focus:ring-kai-primary focus:border-transparent'
                                                }`}
                                            style={{
                                                border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                                                backgroundColor: theme.palette.mode == 'light' ? 'white' : '#3b3b3b',
                                            }}
                                        >
                                            <option value="">Selecione</option>
                                            {
                                                clients.map((client: any) => {
                                                    return <option key={client.cpf} value={client.cpf}>{client.name}, CPF: {client.cpf}</option>
                                                })
                                            }
                                        </select>
                                    </div>}
                                </div>
                            </div>

                            {/* Contato e Endereço */}
                            <div className="col-span-2 p-4 rounded-lg"
                                style={{
                                    border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                                }}
                            >
                                <h3 className="text-lg font-medium mb-4">Dados</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm mb-1">
                                            Tipo de Exame
                                        </label>
                                        <select
                                            name="examType"
                                            value={formData.examType}
                                            onChange={handleChange}
                                            required
                                            disabled={readOnly}
                                            className={`w-full px-3 py-2 rounded-md ${readOnly ? '' : 'focus:ring-2 focus:ring-kai-primary focus:border-transparent'
                                                }`}
                                            style={{
                                                border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                                                backgroundColor: theme.palette.mode == 'light' ? 'white' : '#3b3b3b',
                                            }}
                                        >
                                            <option value="">Selecione</option>
                                            <option value="HI-LIGHT">HI - Light</option>
                                            <option value="HI-AEROS">HI - Aeros</option>
                                            <option value="HI-DEEP">HI - Deep</option>
                                            <option value="HI-FOCUS">HI - Focus</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm mb-1">
                                            Data de Hora
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            readOnly={readOnly}
                                            className={`w-full px-3 py-2 rounded-md ${readOnly ? '' : 'focus:ring-2 focus:ring-kai-primary focus:border-transparent'
                                                }`}
                                            style={{
                                                border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6"
                        style={{
                            borderTop: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                        }}
                    >
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                className={`px-4 py-2 text-sm font-medium rounded-md
                  ${theme.palette.mode === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-300'}
                `}
                                style={{
                                    border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                                }}
                            >
                                {readOnly ? 'Fechar' : 'Cancelar'}
                            </button>
                            {!readOnly && (
                                <button
                                    type='submit'
                                    className={`px-4 py-2 text-sm font-medium rounded-md flex items-center
                    ${theme.palette.mode === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-300'}
                  `}
                                    style={{
                                        border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                                    }}
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Salvar
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
            {selectedQuestionnaire && (
                <QuestionnaireAnswersModal
                    questionnaire={selectedQuestionnaire}
                    onClose={() => setSelectedQuestionnaire(null)}
                />
            )}
        </div>
    );
}


