import React, { useState, useEffect } from 'react'
import { X, Save, Info } from 'lucide-react'
import {
  User,
  HealthcareProfessional,
  OtherProfessional,
  RegularUser,
  PROFESSIONAL_TYPES,
  OTHER_PROFESSIONAL_ROLES
} from '../../../types/types'

interface UserFormProps {
  user: User | null
  onSave: (user: User) => void
  onCancel: () => void
}

// Mock roles - replace with actual roles from your permission store
const mockRoles = [
  { id: '1', name: 'Administrador', type: 'system' },
  { id: '2', name: 'Médico', type: 'healthcare' },
  { id: '3', name: 'Recepcionista', type: 'custom' },
  { id: '4', name: 'Técnico', type: 'custom' },
  { id: '5', name: 'Supervisor', type: 'custom' }
]

export function UserForm({ user, onSave, onCancel }: UserFormProps) {
  const [isHealthcareProfessional, setIsHealthcareProfessional] = useState(false)
  const [isOtherProfessional, setIsOtherProfessional] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    gender: 'male',
    cpf: '',
    phone: '',
    email: '',
    address: '',
    status: 'active',
    professionalType: '',
    registrationNumber: '',
    role: '' as (typeof OTHER_PROFESSIONAL_ROLES)[number],
    roleId: ''
  })

  const selectedProfessionalType = PROFESSIONAL_TYPES.find(type => type.id === formData.professionalType)

  useEffect(() => {
    if (user) {
      setIsHealthcareProfessional(user.isHealthcareProfessional)
      setIsOtherProfessional('isOtherProfessional' in user && user.isOtherProfessional)
      setFormData({
        fullName: user.fullName,
        birthDate: user.birthDate,
        gender: user.gender,
        cpf: user.cpf,
        phone: user.contact.phone,
        email: user.contact.email,
        address: user.address,
        status: user.status,
        professionalType: user.isHealthcareProfessional ? user.professionalType.id : '',
        registrationNumber: user.isHealthcareProfessional ? user.registrationNumber : '',
        role: 'isOtherProfessional' in user ? user.role : ('' as (typeof OTHER_PROFESSIONAL_ROLES)[number]),
        roleId: user.roleId
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const baseUser = {
      id: user?.id || Date.now().toString(),
      fullName: formData.fullName,
      birthDate: formData.birthDate,
      gender: formData.gender as 'male' | 'female' | 'other',
      cpf: formData.cpf,
      contact: {
        phone: formData.phone,
        email: formData.email
      },
      address: formData.address,
      status: formData.status as 'active' | 'inactive',
      lastAccess: new Date().toISOString(),
      roleId: formData.roleId
    }

    let finalUser: User

    if (isHealthcareProfessional) {
      const professionalType = PROFESSIONAL_TYPES.find(type => type.id === formData.professionalType)
      if (!professionalType) throw new Error('Professional type not found')

      finalUser = {
        ...baseUser,
        isHealthcareProfessional: true,
        professionalType,
        registrationNumber: formData.registrationNumber
      } as HealthcareProfessional
    } else if (isOtherProfessional) {
      finalUser = {
        ...baseUser,
        isHealthcareProfessional: false,
        isOtherProfessional: true,
        role: formData.role
      } as OtherProfessional
    } else {
      finalUser = {
        ...baseUser,
        isHealthcareProfessional: false,
        isOtherProfessional: false
      } as RegularUser
    }

    onSave(finalUser)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProfessionalTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target
    if (name === 'isHealthcareProfessional') {
      setIsHealthcareProfessional(checked)
      if (checked) setIsOtherProfessional(false)
    } else if (name === 'isOtherProfessional') {
      setIsOtherProfessional(checked)
      if (checked) setIsHealthcareProfessional(false)
    }
  }

  // Filter roles based on user type
  const availableRoles = mockRoles.filter(role => {
    if (isHealthcareProfessional) {
      return role.type === 'healthcare'
    }
    if (isOtherProfessional) {
      return role.type === 'custom'
    }
    return role.type !== 'healthcare'
  })

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-lg font-semibold'>{user ? 'Editar Usuário' : 'Novo Usuário'}</h3>
          <button onClick={onCancel} className='p-2 hover:bg-gray-100 rounded-full'>
            <X className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Nome Completo</label>
              <input
                type='text'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Data de Nascimento</label>
              <input
                type='date'
                name='birthDate'
                value={formData.birthDate}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Gênero</label>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'>
                <option value='male'>Masculino</option>
                <option value='female'>Feminino</option>
                <option value='other'>Outro</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>CPF</label>
              <input
                type='text'
                name='cpf'
                value={formData.cpf}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Telefone</label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'
              />
            </div>

            <div className='col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>E-mail</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'
              />
            </div>

            <div className='col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Endereço</label>
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'
              />
            </div>

            <div className='col-span-2 space-y-2'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='isHealthcareProfessional'
                  checked={isHealthcareProfessional}
                  onChange={handleProfessionalTypeChange}
                  className='h-4 w-4 text-kai-primary border-gray-300 rounded focus:ring-kai-primary'
                />
                <span className='ml-2 text-sm text-gray-700'>Profissional de Saúde</span>
              </label>

              <label className='flex items-center'>
                <input
                  type='checkbox'
                  name='isOtherProfessional'
                  checked={isOtherProfessional}
                  onChange={handleProfessionalTypeChange}
                  className='h-4 w-4 text-kai-primary border-gray-300 rounded focus:ring-kai-primary'
                />
                <span className='ml-2 text-sm text-gray-700'>Outros Profissionais</span>
              </label>
            </div>

            {isHealthcareProfessional && (
              <>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Tipo de Profissional</label>
                  <select
                    name='professionalType'
                    value={formData.professionalType}
                    onChange={handleChange}
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'>
                    <option value=''>Selecione</option>
                    {PROFESSIONAL_TYPES.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Número de Registro</label>
                  <div className='relative'>
                    <input
                      type='text'
                      name='registrationNumber'
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      required
                      placeholder={selectedProfessionalType?.councilCode}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'
                    />
                    {selectedProfessionalType && (
                      <div className='absolute right-0 top-0 bottom-0 flex items-center pr-3'>
                        <div className='text-sm text-gray-500'>{selectedProfessionalType.councilCode}</div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedProfessionalType && (
                  <div className='col-span-2 bg-blue-50 p-4 rounded-lg flex items-start'>
                    <Info className='w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0' />
                    <div className='ml-3'>
                      <p className='text-sm text-blue-900'>
                        <strong>{selectedProfessionalType.federalCouncil}</strong> -{' '}
                        {selectedProfessionalType.description}
                      </p>
                      <p className='text-sm text-blue-700 mt-1'>
                        Registro profissional: {selectedProfessionalType.councilCode}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {isOtherProfessional && (
              <div className='col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Função</label>
                <select
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'>
                  <option value=''>Selecione a função</option>
                  {OTHER_PROFESSIONAL_ROLES.map(role => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className='col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Perfil de Acesso</label>
              <select
                name='roleId'
                value={formData.roleId}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'>
                <option value=''>Selecione um perfil</option>
                {availableRoles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Status</label>
              <select
                name='status'
                value={formData.status}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent'>
                <option value='active'>Ativo</option>
                <option value='inactive'>Inativo</option>
              </select>
            </div>
          </div>

          <div className='flex justify-end space-x-3'>
            <button
              type='button'
              onClick={onCancel}
              className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'>
              Cancelar
            </button>
            <button
              type='submit'
              className='px-4 py-2 text-sm font-medium text-white bg-kai-primary rounded-md hover:bg-kai-primary/90 flex items-center'>
              <Save className='w-4 h-4 mr-2' />
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
