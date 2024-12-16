import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stack,
  Box,
  FormHelperText
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { OTHER_PROFESSIONAL_ROLES, PROFESSIONAL_TYPES, User } from '@/src/app/types/user'
import { Role } from '@/src/app/types/permissions'
import { maskCPF, maskPhone } from '@/src/app/utils/format'

interface UserFormProps {
  user: User | null
  onSave: (user: User) => void
  onCancel: () => void
  roles: Role[]
  onSubmit: (data: User) => Promise<void>
}

const userFormSchema = z.object({
  fullName: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  gender: z.enum(['male', 'female', 'other']),
  cpf: z
    .string()
    .min(14, 'CPF inválido')
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  phone: z
    .string()
    .min(15, 'Telefone inválido')
    .regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
  status: z.enum(['active', 'inactive']),
  professionalType: z.string().optional(),
  isHealthcareProfessional: z.boolean().optional(),
  isOtherProfessional: z.boolean().optional(),
  registrationNumber: z.string().optional(),
  roleId: z.number().optional()
})

type UserFormData = z.infer<typeof userFormSchema>

export function UserForm({ user, onSave, onCancel, roles }: UserFormProps) {
  const [isHealthcareProfessional, setIsHealthcareProfessional] = useState(user?.isHealthcareProfessional ?? false)
  const [isOtherProfessional, setIsOtherProfessional] = useState(!user?.isHealthcareProfessional || false)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: user?.fullName ?? '',
      birthDate: user?.birthDate ?? '',
      gender: user?.gender ?? 'male',
      cpf: user?.cpf ?? '',
      phone: user?.phone ?? '',
      email: user?.email ?? '',
      status: user?.status ?? 'active',
      isHealthcareProfessional: user?.isHealthcareProfessional ?? false,
      isOtherProfessional: !!user?.isHealthcareProfessional,
      professionalType: user?.professionalType,
      registrationNumber: user?.registrationNumber ?? '',
      roleId: user?.role?.id
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: UserFormData) => {
    try {
      const baseUser = {
        fullName: data.fullName,
        birthDate: data.birthDate,
        gender: data.gender,
        cpf: data.cpf,
        phone: data.phone,
        email: data.email,
        status: data.status,
        roleId: +data.roleId,
        isHealthcareProfessional,
        professionalType: data.professionalType,
        registrationNumber: data.registrationNumber
      }

      await onSave(baseUser)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  function handleProfessionalTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked, name } = e.target
    if (name === 'isHealthcareProfessional') {
      setIsHealthcareProfessional(checked)
      if (checked) {
        setIsOtherProfessional(false)
        setValue('professionalType', '')
        setValue('registrationNumber', '')
      }
    } else if (name === 'isOtherProfessional') {
      setIsOtherProfessional(checked)
      if (checked) {
        setIsHealthcareProfessional(false)
        setValue('professionalType', '')
        setValue('registrationNumber', '')
      }
    }
  }

  return (
    <Dialog open onClose={onCancel} maxWidth='md' fullWidth>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>{user ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name='fullName'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField {...field} label='Nome Completo' fullWidth error={!!error} helperText={error?.message} />
                  )}
                />

                <Controller
                  name='email'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField {...field} label='Email' fullWidth error={!!error} helperText={error?.message} />
                  )}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name='birthDate'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      type='date'
                      label='Data de Nascimento'
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  name='gender'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Gênero</InputLabel>
                      <Select {...field}>
                        <MenuItem value='male'>Masculino</MenuItem>
                        <MenuItem value='female'>Feminino</MenuItem>
                        <MenuItem value='other'>Outro</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name='cpf'
                  control={control}
                  render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      value={value}
                      onChange={e => {
                        const maskedValue = maskCPF(e.target.value)
                        onChange(maskedValue)
                      }}
                      label='CPF'
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      inputProps={{ maxLength: 14 }}
                    />
                  )}
                />

                <Controller
                  name='phone'
                  control={control}
                  render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      value={value}
                      onChange={e => {
                        const maskedValue = maskPhone(e.target.value)
                        onChange(maskedValue)
                      }}
                      label='Telefone'
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      inputProps={{ maxLength: 15 }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select {...field}>
                        <MenuItem value='active'>Ativo</MenuItem>
                        <MenuItem value='inactive'>Inativo</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />

                <Controller
                  name='roleId'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.roleId}>
                      <InputLabel>Função</InputLabel>
                      <Select
                        {...field}
                        value={field.value || ''}
                        onChange={e => field.onChange(String(e.target.value))}>
                        {roles.map(role => (
                          <MenuItem key={role.id} value={String(role.id)}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.roleId && <FormHelperText>{errors.roleId.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isHealthcareProfessional}
                      onChange={handleProfessionalTypeChange}
                      name='isHealthcareProfessional'
                    />
                  }
                  label='Profissional de Saúde'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOtherProfessional}
                      onChange={handleProfessionalTypeChange}
                      name='isOtherProfessional'
                    />
                  }
                  label='Outro Profissional'
                />
              </Box>

              {isHealthcareProfessional && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Controller
                    name='professionalType'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Tipo de Profissional</InputLabel>
                        <Select
                          {...field}
                          value={field.value || ''}
                          defaultValue={field.value || ''}
                          onChange={e => {
                            field.onChange(e)
                          }}>
                          {PROFESSIONAL_TYPES.map(type => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />

                  <Controller
                    name='registrationNumber'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label='Número de Registro'
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                </Box>
              )}

              {isOtherProfessional && (
                <Controller
                  name='professionalType'
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Tipo de Profissional</InputLabel>
                      <Select
                        {...field}
                        value={field.value || ''}
                        defaultValue={field.value || ''}
                        onChange={e => {
                          field.onChange(e)
                        }}>
                        {OTHER_PROFESSIONAL_ROLES.map(type => (
                          <MenuItem key={type.id} value={type.id}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              )}
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
