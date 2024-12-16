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
  IconButton
} from '@mui/material'
import { User } from '../../types/user'
import { Role } from '../../types/permissions'
import { TABLE_HEADERS, USER_MANAGEMENT, getProfessionalTypeName } from '../../constants/translations'
import { showToast } from '../../../lib/toast'

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserForm, setShowUserForm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
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

  const filteredUsers = users.filter(
    user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSave = async (user: User) => {
    try {
      if (selectedUser) {
        await api.patch(`/users/${selectedUser.id}`, user)
      } else {
        await api.post('/users', user)
      }

      showToast.success('Usuário salvo com sucesso')
      fetchUsers()
      setShowUserForm(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  const handleDelete = async (userId: number) => {
    try {
      await api.delete(`/users/${userId}`)
      showToast.success('Usuário deletado com sucesso')
      fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const onSubmit = async (data: User) => {
    try {
      const submitData = {
        fullName: data.fullName,
        birthDate: data.birthDate,
        gender: data.gender,
        cpf: data.cpf,
        phone: data.phone,
        email: data.email,
        status: data.status,
        roleId: parseInt(data.roleId),
        isHealthcareProfessional: data.isHealthcareProfessional,
        professionalType: data.professionalType,
        registrationNumber: data.isHealthcareProfessional ? data.registrationNumber : null
      }

      debugger
      await handleSave(submitData)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
      <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        {USER_MANAGEMENT.title}
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
          placeholder={USER_MANAGEMENT.searchPlaceholder}
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
          {USER_MANAGEMENT.newUser}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '25%' }}>{TABLE_HEADERS.name}</TableCell>
              <TableCell sx={{ width: '25%' }}>{TABLE_HEADERS.email}</TableCell>
              <TableCell sx={{ width: '20%' }}>{TABLE_HEADERS.profile}</TableCell>
              <TableCell sx={{ width: '15%' }}>{TABLE_HEADERS.profession}</TableCell>
              <TableCell sx={{ width: '15%' }} align='right'>
                {TABLE_HEADERS.actions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  {USER_MANAGEMENT.loading}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Typography variant='subtitle1'>{user.fullName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{user.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Shield className='text-primary' size={16} />
                      <span>{user.role.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>{getProfessionalTypeName(user.professionalType)}</Typography>
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
                    <IconButton
                      onClick={() => {
                        if (window.confirm(USER_MANAGEMENT.deleteConfirmation)) {
                          handleDelete(user.id)
                        }
                      }}
                      color='error'
                      size='small'>
                      <Trash2 />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
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
          onSubmit={onSubmit}
        />
      )}
    </Box>
  )
}
