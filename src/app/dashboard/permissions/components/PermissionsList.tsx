'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box
} from '@mui/material'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import { Role } from '../../../types/types'

interface PermissionsListProps {
  roles: Role[]
  onView: (role: Role) => void
  onEdit: (role: Role) => void
  onDelete: (role: Role) => void
}

export default function PermissionsList({ roles, onView, onEdit, onDelete }: PermissionsListProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome do Perfil</TableCell>
            <TableCell>Permissões</TableCell>
            <TableCell align='right'>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map(role => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {role.permissions.map(permission => (
                    <Chip
                      key={permission.id}
                      label={`${permission.permission}:${permission.resource}`}
                      size='small'
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </TableCell>
              <TableCell align='right'>
                <IconButton size='small' onClick={() => onView(role)}>
                  <Eye size={20} />
                </IconButton>
                <IconButton size='small' onClick={() => onEdit(role)}>
                  <Edit2 size={20} />
                </IconButton>
                <IconButton size='small' onClick={() => onDelete(role)}>
                  <Trash2 size={20} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
