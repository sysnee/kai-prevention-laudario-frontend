'use client'

import React, { useState } from 'react'
import { Plus, Search, Edit2, Trash2, Key, UserCog, User, Shield } from 'lucide-react'
// import { UserForm } from './UserForm'
import { User as UserType } from '../../../app/types/types'

// Mock data with role information
const mockUsers: (UserType & { roleName: string })[] = [
  {
    id: '1',
    fullName: 'Dr. João Silva',
    birthDate: '1980-05-15',
    gender: 'male',
    cpf: '123.456.789-00',
    isHealthcareProfessional: true,
    professionalType: {
      id: 'doctor',
      name: 'Médico',
      councilCode: 'CRM',
      federalCouncil: 'CFM',
      description: 'Conselho Federal de Medicina'
    },
    registrationNumber: 'CRM-123456',
    contact: {
      phone: '(11) 98765-4321',
      email: 'joao.silva@example.com'
    },
    address: 'Rua Example, 123 - São Paulo, SP',
    status: 'active',
    lastAccess: '2024-03-15 14:30',
    roleId: '2',
    roleName: 'Médico'
  },
  {
    id: '2',
    fullName: 'Maria Santos',
    birthDate: '1985-08-20',
    gender: 'female',
    cpf: '987.654.321-00',
    isHealthcareProfessional: false,
    contact: {
      phone: '(11) 97654-3210',
      email: 'maria.santos@example.com'
    },
    address: 'Av. Example, 456 - São Paulo, SP',
    status: 'active',
    lastAccess: '2024-03-15 15:45',
    roleId: '3',
    roleName: 'Recepcionista'
  }
]

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserForm, setShowUserForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(UserType & { roleName: string }) | null>(null)

  const filteredUsers = users.filter(
    user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.cpf.includes(searchQuery)
  )

  const handleSave = (user: UserType) => {
    if (selectedUser) {
      setUsers(users.map(u => (u.id === selectedUser.id ? { ...user, roleName: selectedUser.roleName } : u)))
    } else {
      setUsers([...users, { ...user, roleName: 'Novo Perfil' }])
    }
    setShowUserForm(false)
    setSelectedUser(null)
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <div className='relative flex-1 max-w-md'>
          <input
            type='text'
            placeholder='Buscar usuários...'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          <Search className='w-5 h-5 text-gray-400 absolute left-3 top-2.5' />
        </div>
        <button
          onClick={() => {
            setSelectedUser(null)
            setShowUserForm(true)
          }}
          className='ml-4 px-4 py-2 bg-kai-primary text-white rounded-lg hover:bg-kai-primary/90 flex items-center'>
          <Plus className='w-5 h-5 mr-2' />
          Novo Usuário
        </button>
      </div>

      <div className='bg-white rounded-lg border border-gray-200'>
        <div className='grid grid-cols-7 gap-4 p-4 font-medium text-gray-500 border-b border-gray-200'>
          <div className='col-span-2'>Usuário</div>
          <div>Tipo</div>
          <div>Perfil</div>
          <div>Status</div>
          <div>Último Acesso</div>
          <div className='text-right'>Ações</div>
        </div>

        <div className='divide-y divide-gray-200'>
          {filteredUsers.map(user => (
            <div key={user.id} className='grid grid-cols-7 gap-4 p-4 items-center'>
              <div className='col-span-2'>
                <div className='font-medium text-gray-900'>{user.fullName}</div>
                <div className='text-sm text-gray-500'>{user.contact.email}</div>
              </div>
              <div className='text-gray-600 flex items-center'>
                {user.isHealthcareProfessional ? (
                  <>
                    <UserCog className='w-4 h-4 mr-2' />
                    <span>
                      {user.professionalType.councilCode} {user.registrationNumber}
                    </span>
                  </>
                ) : (
                  <>
                    <User className='w-4 h-4 mr-2' />
                    <span>Usuário Regular</span>
                  </>
                )}
              </div>
              <div className='flex items-center'>
                <Shield className='w-4 h-4 mr-2 text-kai-primary' />
                <span>{user.roleName}</span>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                  {user.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <div className='text-sm text-gray-500'>{user.lastAccess}</div>
              <div className='flex justify-end space-x-2'>
                <button
                  onClick={() => {
                    setSelectedUser(user)
                    setShowUserForm(true)
                  }}
                  className='p-2 text-gray-400 hover:text-kai-primary rounded-lg hover:bg-kai-gray-50'>
                  <Edit2 className='w-5 h-5' />
                </button>
                <button className='p-2 text-gray-400 hover:text-yellow-600 rounded-lg hover:bg-yellow-50'>
                  <Key className='w-5 h-5' />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
                      setUsers(users.filter(u => u.id !== user.id))
                    }
                  }}
                  className='p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50'>
                  <Trash2 className='w-5 h-5' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* {showUserForm && (
        <UserForm
          user={selectedUser}
          onSave={handleSave}
          onCancel={() => {
            setShowUserForm(false)
            setSelectedUser(null)
          }}
        />
      )} */}
    </div>
  )
}
