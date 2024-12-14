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
  Grid,
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
  registrationNumber: z.string().optional(),
  role: z.string().optional(),
  roleId: z.union([z.string(), z.number()]).transform(val => String(val))
})

type UserFormData = z.infer<typeof userFormSchema>

export function UserForm({ user, onSave, onCancel, roles }: UserFormProps) {
  const [isHealthcareProfessional, setIsHealthcareProfessional] = useState(false)
  const [isOtherProfessional, setIsOtherProfessional] = useState(false)

  const {
    control,
    handleSubmit,
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
      professionalType: user?.isHealthcareProfessional ? user.professionalType.id : '',
      registrationNumber: user?.isHealthcareProfessional ? user.registrationNumber : '',
      role: '',
      roleId: user?.roleId ? String(user.roleId) : ''
    },
    mode: 'onBlur'
  })

  const onSubmit = async (data: UserFormData) => {
    try {
      const baseUser = {
        id: user?.id,
        fullName: data.fullName,
        birthDate: data.birthDate,
        gender: data.gender,
        cpf: data.cpf,

        phone: data.phone,
        email: data.email,

        status: data.status,
        roleId: data.roleId,
        role: data.role as Role
      }

      let finalUser: User

      if (isHealthcareProfessional) {
        const professionalType = PROFESSIONAL_TYPES.find(type => type.id === data.professionalType).id
        if (!professionalType) throw new Error('Professional type not found')

        finalUser = {
          ...baseUser,
          isHealthcareProfessional: true,
          professionalType,
          registrationNumber: data.registrationNumber
        }
      } else if (isOtherProfessional) {
        finalUser = {
          ...baseUser,
          isHealthcareProfessional: false,
          professionalType: OTHER_PROFESSIONAL_ROLES.find(type => type.id === data.professionalType).id
        }
      } else {
        finalUser = {
          ...baseUser,
          isHealthcareProfessional: false,
          professionalType: null
        }
      }

      await onSave(finalUser)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  function handleProfessionalTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked, name } = e.target
    if (name === 'isHealthcareProfessional') {
      setIsHealthcareProfessional(checked)
      if (checked) setIsOtherProfessional(false)
    } else if (name === 'isOtherProfessional') {
      setIsOtherProfessional(checked)
      if (checked) setIsHealthcareProfessional(false)
    }
  }

  return (
    <Dialog open onClose={onCancel} maxWidth='md' fullWidth>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>{user ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Controller
                  name='fullName'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField {...field} label='Nome Completo' fullWidth error={!!error} helperText={error?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name='email'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TextField {...field} label='Email' fullWidth error={!!error} helperText={error?.message} />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
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
              </Grid>

              <Grid item xs={12} md={6}>
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
              </Grid>

              <Grid item xs={12} md={6}>
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
                      inputProps={{
                        maxLength: 14 // 999.999.999-99
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
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
                      inputProps={{
                        maxLength: 15 // (99) 99999-9999
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
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
              </Grid>

              <Grid item xs={12} md={6}>
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
              </Grid>

              <Grid item xs={12}>
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
              </Grid>

              {isHealthcareProfessional && (
                <>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='professionalType'
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel>Tipo de Profissional</InputLabel>
                          <Select {...field}>
                            {PROFESSIONAL_TYPES.map(type => (
                              <MenuItem key={type.id} value={type.id}>
                                {type.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
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
                  </Grid>
                </>
              )}

              {isOtherProfessional && (
                <Grid item xs={12} md={6}>
                  <Controller
                    name='professionalType'
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Tipo de Profissional</InputLabel>
                        <Select {...field}>
                          {OTHER_PROFESSIONAL_ROLES.map(type => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              )}
            </Grid>
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
