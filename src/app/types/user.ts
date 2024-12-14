import { Role } from './permissions'

export interface User {
  id: number
  fullName: string
  email: string
  birthDate: string
  gender: 'male' | 'female' | 'other'
  cpf: string
  phone: string
  status: 'active' | 'inactive'
  role: Role
  roleId: string
  isHealthcareProfessional: boolean
  professionalType: ProfessionalType | OtherProfessionalType
  registrationNumber?: string
}

export interface ProfessionalType {
  id: string
  name: string
}

export interface OtherProfessionalType {
  id: string
  name: string
}

export const OTHER_PROFESSIONAL_ROLES: OtherProfessionalType[] = [
  { id: 'secretary', name: 'Secretária/Recepcionista' },
  { id: 'concierge', name: 'Concierge' },
  { id: 'administrative_team', name: 'Equipe Administrativa/Financeira' },
  { id: 'billing_assistant', name: 'Assistente de Faturamento' },
  { id: 'call_center_operator', name: 'Operador de Call Center/Atendimento ao Cliente' },
  { id: 'operations_coordinator', name: 'Coordenador de Operações' },
  { id: 'it_analyst', name: 'Analista de TI' },
  { id: 'quality_supervisor', name: 'Supervisor de Qualidade e Conformidade' },
  { id: 'clinic_manager', name: 'Gerente de Clínica' }
]

export const PROFESSIONAL_TYPES: ProfessionalType[] = [
  {
    id: 'doctor',
    name: 'Médico'
  },
  {
    id: 'biomedic',
    name: 'Biomédico'
  },
  {
    id: 'nurse',
    name: 'Enfermeiro'
  },
  {
    id: 'pharmacist',
    name: 'Farmacêutico'
  },
  {
    id: 'physio',
    name: 'Fisioterapeuta'
  },
  {
    id: 'occupational_therapist',
    name: 'Terapeuta Ocupacional'
  },
  {
    id: 'nutritionist',
    name: 'Nutricionista'
  },
  {
    id: 'psychologist',
    name: 'Psicólogo'
  },
  {
    id: 'dentist',
    name: 'Dentista'
  },
  {
    id: 'speech_therapist',
    name: 'Fonoaudiólogo'
  },
  {
    id: 'social_worker',
    name: 'Assistente Social'
  },
  {
    id: 'radiology_tech',
    name: 'Tecnólogo em Radiologia'
  },

  {
    id: 'nursing_tech',
    name: 'Técnico em Enfermagem'
  },
  {
    id: 'physical_educator',
    name: 'Educador Físico'
  }
]
