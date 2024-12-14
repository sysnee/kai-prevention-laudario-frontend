'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, Key, Shield } from 'lucide-react'
import api from '../../../lib/api'
import { UserForm } from './components/user-form'
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip
} from '@mui/material'
import { User } from '../../types/user'

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
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSave = async (user: User) => {
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
    <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
      <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Gerenciamento de Usuários
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          marginBottom: 3,
          flexWrap: 'wrap'
        }}>
        <TextField
          variant='outlined'
          placeholder='Buscar usuários...'
          size='medium'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search size={18} style={{ marginRight: 8 }} />
          }}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setSelectedUser(null)
            setShowUserForm(true)
          }}
          startIcon={<Plus />}>
          Novo Usuário
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '40%' }}>Usuário</TableCell>
              <TableCell sx={{ width: '20%' }}>Perfil</TableCell>
              <TableCell sx={{ width: '25%' }}>Permissões</TableCell>
              <TableCell sx={{ width: '15%' }} align='right'>
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  Carregando...
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => {
                const userPermissions = getRolePermissions(user.role)
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Typography variant='subtitle1'>{user.name}</Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {user.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Shield className='text-primary' size={16} />
                        <span>{user.role.name}</span>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2' color='text.secondary'>
                        {userPermissions.length} permissões
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        {userPermissions.slice(0, 2).map(p => (
                          <Chip
                            key={p.id}
                            label={`${p.permission}:${p.resource}`}
                            size='small'
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                        {userPermissions.length > 2 && '...'}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton
                        onClick={() => {
                          setSelectedUser(user)
                          setShowUserForm(true)
                        }}
                        color='primary'
                        size='small'>
                        <Edit2 />
                      </IconButton>
                      <IconButton color='warning' size='small'>
                        <Key />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
                            handleDelete(user.id)
                          }
                        }}
                        color='error'
                        size='small'>
                        <Trash2 />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Box>
  )
}
