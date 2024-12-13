'use client'

import React from 'react'
import { Card, CardContent, Chip, Tooltip, Typography, Divider, IconButton, Box } from '@mui/material'
import { RolePermissions, ServiceStatus } from '../../../types/pemissions/permissions'
import { useTheme } from '@mui/material/styles'
import AccessChip from './AccessChip'
import ActionButtons from './ActionButtons'
import { Eye, Edit2, Trash2 } from 'lucide-react'
import { Role } from '../../../types/types'

interface AccessCardProps {
  rolePermission: RolePermissions
  onView: (role: RolePermissions) => void
  onEdit: (role: RolePermissions) => void
  onDelete: (role: RolePermissions) => void
}

const TRANSLATIONS = {
  stages: {
    planned: 'Planejado',
    waiting: 'Aguardando',
    started: 'Iniciado',
    onhold: 'Pausado',
    completed: 'Concluído',
    transcription: 'Transcrição',
    revision: 'Revisão',
    signed: 'Assinado'
  },
  accessLevels: {
    none: 'Nulo',
    read: 'Visualizar',
    write: 'Modificar',
    full: 'Completo'
  }
} as const

type AccessLevelKey = keyof typeof TRANSLATIONS.accessLevels

const translateStage = (stage: ServiceStatus): string => TRANSLATIONS.stages[stage] || stage

const translateAccess = (access: AccessLevelKey): string => TRANSLATIONS.accessLevels[access] || access

export default function AccessCard({ rolePermission: role, onView, onEdit, onDelete }: AccessCardProps) {
  const theme = useTheme()

  return (
    <Card
      sx={{
        backgroundColor: 'white',
        border: `1px solid ${theme.palette.divider}`,
        padding: 2,
        minWidth: 350
      }}>
      {/* Cabeçalho */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing(2)
        }}>
        <Typography variant='h6' component='h3' sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
          {role.name}
        </Typography>
        <Chip
          label={role.isActive ? 'Ativo' : 'Inativo'}
          size='small'
          sx={{
            backgroundColor: role.isActive ? theme.palette.success.light : theme.palette.grey[300],
            color: role.isActive ? theme.palette.success.dark : theme.palette.text.secondary
          }}
        />
      </div>

      {/* Divisória */}
      <Divider sx={{ marginBottom: theme.spacing(2) }} />

      {/* Conteúdo Principal */}
      <CardContent sx={{ padding: 0 }}>
        <div style={{ marginBottom: theme.spacing(2) }}>
          <Typography
            variant='subtitle2'
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              marginBottom: theme.spacing(1)
            }}>
            Módulo de Clientes
          </Typography>
          <Tooltip
            title={`Módulo de Pacientes: ${translateAccess(
              (role.permissions.find(p => p.module === 'client')?.access as AccessLevelKey) || 'none'
            )}`}
            arrow>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: theme.spacing(1),
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius
              }}>
              <Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
                Clientes
              </Typography>
              <AccessChip
                access={role.permissions.find(p => p.module === 'client')?.access || 'none'}
                description={translateAccess(
                  (role.permissions.find(p => p.module === 'client')?.access as AccessLevelKey) || 'none'
                )}
              />
            </div>
          </Tooltip>
        </div>

        <div>
          <Typography
            variant='subtitle2'
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 600,
              marginBottom: theme.spacing(1)
            }}>
            Etapas do Exame
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: theme.spacing(1)
            }}>
            {role.examStages.map(stage => (
              <Tooltip
                key={stage.stage}
                title={`${translateStage(stage.stage)}: ${translateAccess(stage.access as AccessLevelKey)}`}
                arrow>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: theme.spacing(1),
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius
                  }}>
                  <Typography variant='body2' sx={{ color: theme.palette.text.secondary, fontSize: '0.8rem' }}>
                    {translateStage(stage.stage)}
                  </Typography>
                  <AccessChip access={stage.access} description={translateAccess(stage.access as AccessLevelKey)} />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Divisória */}
      <Divider sx={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: theme.spacing(1)
        }}>
        <ActionButtons
          onView={() => onView(role)}
          onEdit={() => onEdit(role)}
          onDelete={() => onDelete(role)}
          size='medium'
        />
      </div>
    </Card>
  )
}
