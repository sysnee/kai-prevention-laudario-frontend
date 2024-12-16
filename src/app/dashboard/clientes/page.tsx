'use client'

import React, { useState } from 'react'
import { CheckIcon, Plus, Search } from 'lucide-react'
import { ClientForm } from '../../components/clients/ClientForm'
import ClientsGrid from '../../components/clients/ClientsGrid'
import { Alert, AlertColor, CircularProgress, useTheme } from '@mui/material'
import api from '@/src/lib/api'
import { ConfirmationModal } from '../../components/shared/ConfirmationModal'

export default function Clients() {
  const [showForm, setShowForm] = useState(false)
  const [clientes, setClientes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [formMode, setFormMode] = useState<'edit' | 'view' | 'create'>('create')
  const [errorCPF, setErrorCPF] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [alertInfo, setAlertInfo] = useState<{
    visible: boolean
    message: string
    severity: AlertColor | undefined
  }>({
    visible: false,
    message: '',
    severity: undefined
  })
  const theme = useTheme()

  const getClients = async () => {
    try {
      const clientesResponse = await api.get('clients')
      const clientesData = clientesResponse.data
      setClientes(clientesData)
    } catch (err) {
      console.error('Erro ao buscar os dados:', err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    getClients()
  }, [])

  const showAlert = (message: string, severity: AlertColor) => {
    setAlertInfo({
      visible: true,
      message,
      severity
    })

    setTimeout(() => {
      setAlertInfo({ visible: false, message: '', severity: undefined })
    }, 3000)
  }

  const handleView = (client: any) => {
    setSelectedClient(client)
    setFormMode('view')
    setShowForm(true)
  }

  const handleEdit = (client: any) => {
    setSelectedClient(client)
    setFormMode('edit')
    setShowForm(true)
  }

  const handleDelete = (client: any) => {
    setDeleteModal(true)
    setSelectedClient(client)
  }

  const handleClose = () => {
    setShowForm(false)
    setSelectedClient(null)
    setFormMode('create')
    setErrorCPF('')
    setErrorEmail('')
  }

  const handleCloseModal = () => {
    setDeleteModal(false)
    selectedClient(null)
  }

  const handleCreateClient = async (data: any) => {
    try {
      setErrorCPF('')
      setErrorEmail('')
      const response = await api.post('clients', data)

      if (response.status === 200 || response.status === 201) {
        showAlert('Cliente cadastrado com sucesso.', 'success')
        setShowForm(false)
        setSelectedClient(null)
        setFormMode('create')
        setErrorCPF('')
        setErrorEmail('')
      }
    } catch (error: unknown | any | Error) {
      console.error('Erro ao enviar a requisição:', error)
      if (error.response) {
        const errorMessage = error.response.data.message.message
        if (errorMessage === 'CPF already exists') {
          setErrorCPF('CPF já cadastrado.')
        }
        if (errorMessage === 'Email already exists') {
          setErrorEmail('Email já cadastrado.')
        }
      }
    } finally {
      getClients()
    }
  }

  const handleEditClient = async (data: any) => {
    try {
      setErrorCPF('')
      setErrorEmail('')
      const { id, ...dataWithoutId } = data
      const response = await api.post(`clients/${data.id}`, dataWithoutId)

      if (response.status === 200 || response.status === 201) {
        showAlert('Cliente atualizado com sucesso.', 'success')
        setShowForm(false)
        setSelectedClient(null)
        setFormMode('create')
        setErrorCPF('')
        setErrorEmail('')
      }
    } catch (error: unknown | any | Error) {
      console.error('Erro ao enviar a requisição:', error)
      if (error.response) {
        const errorMessage = error.response.data.message.message
        if (errorMessage === 'CPF already exists') {
          setErrorCPF('CPF já cadastrado.')
        }
        if (errorMessage === 'Email already exists') {
          setErrorEmail('Email já cadastrado.')
        }
      }
    } finally {
      getClients()
    }
  }

  const handleDeleteClient = async () => {
    try {
      const response = await api.delete(`clients/${selectedClient.id}`)

      if (response.status === 200 || response.status === 201) {
        showAlert('Cliente excluído com sucesso.', 'success')
        setDeleteModal(false)
        setSelectedClient(null)
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error)
    } finally {
      getClients()
    }
  }

  return (
    <div
      className='max-w-7xl mx-auto py-8 px-4'
      style={{
        width: '100%'
      }}>
      <div
        style={{
          marginBottom: '1em'
        }}>
        {alertInfo.visible && alertInfo.severity && (
          <Alert variant='filled' icon={<CheckIcon fontSize='inherit' />} severity={alertInfo.severity}>
            {alertInfo.message}
          </Alert>
        )}
      </div>
      <div className='flex justify-between items-center mb-8 gap-6'>
        <h1 className='text-3xl font-bold'>Cadastro de Clientes</h1>
        <button
          onClick={() => {
            setSelectedClient(null)
            setFormMode('create')
            setShowForm(true)
          }}
          className={`flex items-center px-4 py-2 rounded-lg
            ${theme.palette.mode === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-600 hover:bg-gray-700'}
          `}>
          <Plus className='w-5 h-5 mr-2' />
          Novo Cliente
        </button>
      </div>

      <div className='mb-6 relative max-w-md'>
        <input
          type='text'
          placeholder='Buscar clientes...'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kai-primary focus:border-transparent'
        />
        <Search className='w-5 h-5 text-gray-400 absolute left-3 top-2.5' />
      </div>

      {loading ? (
        <CircularProgress />
      ) : clientes?.length !== 0 ? (
        <ClientsGrid
          clientes={clientes}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchQuery={searchQuery}
        />
      ) : (
        <span>Não foram encontrados clientes.</span>
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

      {deleteModal && (
        <ConfirmationModal
          isOpen={deleteModal}
          onClose={handleCloseModal}
          onConfirm={handleDeleteClient}
          itemName={selectedClient?.name}
          itemType='perfil'
        />
      )}
    </div>
  )
}
