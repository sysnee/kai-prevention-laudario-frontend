"use client";

import React, { useState } from 'react';
import { CheckIcon, Plus, Search } from 'lucide-react';
import { ClientForm } from '../../components/clients/ClientForm';
import ClientsGrid from '../../components/clients/ClientsGrid';
import { Alert, CircularProgress, useTheme } from '@mui/material';
import axios, { AxiosError } from "axios";

export default function Clients() {
  const [showForm, setShowForm] = useState(false);
  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formMode, setFormMode] = useState<'edit' | 'view' | 'create'>('create');
  const [errorCPF, setErrorCPF] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [alertVisible, setAlertVisible] = useState(false);
  const theme = useTheme();

  const getClients = async () => {
    try {
        const clientesResponse = await axios.get("https://ris-api.kaiprevention.com.br/v1/clients");
        const clientesData = clientesResponse.data.data;
        setClientes(clientesData)
    } catch (err) {
        console.error("Erro ao buscar os dados:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getClients();
  }, []);

  const handleView = (client: any) => {
    setSelectedClient(client);
    setFormMode('view');
    setShowForm(true);
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleDelete = (client: any) => {
    console.log('remover cliente')
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedClient(null);
    setFormMode('create');
    setErrorCPF('')
    setErrorEmail('')
  };

  const handleCreateClient = async (data: any) => {
    try {
      setErrorCPF('');
      setErrorEmail('');
      const response = await axios.post('https://ris-api.kaiprevention.com.br/v1/clients', data);
  
      if (response.status === 200 || response.status === 201) {
        setAlertVisible(true);
        setTimeout(() => setAlertVisible(false), 3000);
        setShowForm(false);
        setSelectedClient(null);
        setFormMode('create');
        setErrorCPF('');
        setErrorEmail('');
      }
    } catch (error: unknown) {
        console.error('Erro ao enviar a requisição:', error);
        if (error instanceof AxiosError && error.response) {
          const errorMessage = error.response.data.message.message;
          if(errorMessage === "CPF already exists"){
            setErrorCPF("CPF já cadastrado.")
          }
          if(errorMessage === "Email already exists"){
            setErrorEmail('Email já cadastrado.')
          }
        }
    } finally {
      getClients();
    }
  };

  const handleEditClient = (data: any) => {
    console.log(data)
    setShowForm(false);
    setSelectedClient(null);
    setFormMode('create');
    setErrorCPF("");
    setErrorEmail("");
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4"
      style={{
        width: '100%'
      }}
    >
      <div
        style={{
          marginBottom: '1em'
        }}
      >
        {alertVisible && (
          <Alert variant='filled' icon={<CheckIcon fontSize="inherit" />} severity="success">
            Cliente cadastrado com sucesso.
          </Alert>
        )}
      </div>
      <div className="flex justify-between items-center mb-8 gap-6">
        <h1 className="text-3xl font-bold">Cadastro de Clientes</h1>
        <button
          onClick={() => {
            setSelectedClient(null);
            setFormMode('create');
            setShowForm(true);
          }}
          className={`flex items-center px-4 py-2 rounded-lg
            ${theme.palette.mode === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-600 hover:bg-gray-700'}
          `}
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Cliente
        </button>
      </div>

      <div className="mb-6 relative max-w-md">
        <input
          type="text"
          placeholder="Buscar clientes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kai-primary focus:border-transparent"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
      </div>
      
      {loading ? (
        <CircularProgress />
      ) : ( clientes.length != 0 ? (
          <ClientsGrid
            clientes={clientes}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchQuery={searchQuery}
          />
        ): (
          <span>Não foram encontrados clientes.</span>
        )
      )}

      {showForm && (
        <ClientForm
          client={selectedClient}
          onCreate={handleCreateClient}
          onEdit={handleEditClient}
          onCancel={handleClose}
          readOnly={formMode === 'view'}
          cpfError={errorCPF}
          emailError={errorEmail}
        />
      )}
    </div>
  );
}
