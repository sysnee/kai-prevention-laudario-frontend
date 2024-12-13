'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, Key, User, Shield } from 'lucide-react'
import api from '../../../lib/api'
import { User as UserType, Role } from '../../../app/types/types'
import { UserForm } from './components/user-form'

export default function UserManagement() {
  const [users, setUsers] = useState<UserType[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserForm, setShowUserForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      setUsers(response)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error)
      setIsLoading(false)
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await api.get('/roles')
      setRoles(response)
    } catch (error) {
      console.error('Error fetching roles:', error)
    }
  }

  const getRolePermissions = (roleName: string) => {
    const role = roles.find(r => r.name === roleName)
    return role?.permissions || []
  }

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSave = async (user: UserType) => {
    try {
      if (selectedUser) {
        await api.put(`/users/${selectedUser.id}`, user)
      } else {
        await api.post('/users', user)
      }
      fetchUsers() // Refresh the users list
      setShowUserForm(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error saving user:', error)
      // Handle error (show notification, etc.)
    }
  }

  const handleDelete = async (userId: number) => {
    try {
      await api.delete(`/users/${userId}`)
      fetchUsers() // Refresh the users list
    } catch (error) {
      console.error('Error deleting user:', error)
      // Handle error (show notification, etc.)
    }
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
        <div className='grid grid-cols-5 gap-4 p-4 font-medium text-gray-500 border-b border-gray-200'>
          <div className='col-span-2'>Usuário</div>
          <div>Perfil</div>
          <div>Permissões</div>
          <div className='text-right'>Ações</div>
        </div>

        <div className='divide-y divide-gray-200'>
          {isLoading ? (
            <div className='p-4 text-center'>Carregando...</div>
          ) : (
            filteredUsers.map(user => {
              const userPermissions = getRolePermissions(user.role)
              return (
                <div key={user.id} className='grid grid-cols-5 gap-4 p-4 items-center'>
                  <div className='col-span-2'>
                    <div className='font-medium text-gray-900'>{user.name}</div>
                    <div className='text-sm text-gray-500'>{user.email}</div>
                  </div>
                  <div className='flex items-center'>
                    <Shield className='w-4 h-4 mr-2 text-kai-primary' />
                    <span>{user.role}</span>
                  </div>
                  <div>
                    <div className='text-sm text-gray-500'>{userPermissions.length} permissões</div>
                    <div className='text-xs text-gray-400'>
                      {userPermissions.slice(0, 2).map(p => (
                        <span key={p.id} className='mr-1'>
                          {p.permission}:{p.resource},
                        </span>
                      ))}
                      {userPermissions.length > 2 && '...'}
                    </div>
                  </div>
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
                          handleDelete(user.id)
                        }
                      }}
                      className='p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50'>
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {showUserForm && (
        <UserForm
          user={selectedUser}
          roles={roles}
          onSave={handleSave}
          onCancel={() => {
            setShowUserForm(false)
            setSelectedUser(null)
          }}
        />
      )}
    </div>
  )
}
