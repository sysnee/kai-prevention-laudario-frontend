export type User = {
  id: number
  name: string
  email: string
  role: string
}

export type Estudo = {
  id: string
  nome: string
  imagens: Imagem[]
  status: string
  laudoId: string | null
}

export type Imagem = {
  id: string
  link: string
}

export type Laudo = {
  id: string
  medico: Medico
}

export type Medico = {
  id: string
  nome: string
  avatar: string
}

export type Achado = {
  id: string
  laudoId: string
  imagemId: string
  titulo: string
  orgao: string
  sistema: string
  patologias: string[]
  severidade: string
  observacoes: string
}

export interface BaseUser {
  id: string
  fullName: string
  birthDate: string
  gender: 'male' | 'female' | 'other'
  cpf: string
  contact: {
    phone: string
    email: string
  }
  address: string
  status: 'active' | 'inactive'
  lastAccess?: string
  roleId: string
}

export interface HealthcareProfessional extends BaseUser {
  isHealthcareProfessional: true
  professionalType: ProfessionalType
  registrationNumber: string
}

export interface OtherProfessional extends BaseUser {
  isHealthcareProfessional: false
  isOtherProfessional: true
  role: OtherProfessionalRole
}

export interface RegularUser extends BaseUser {
  isHealthcareProfessional: false
  isOtherProfessional: false
}

export type OtherProfessionalRole = (typeof OTHER_PROFESSIONAL_ROLES)[number]

export const OTHER_PROFESSIONAL_ROLES = [
  'Secretária/Recepcionista',
  'Concierge',
  'Equipe Administrativa/Financeira',
  'Assistente de Faturamento',
  'Operador de Call Center/Atendimento ao Cliente',
  'Coordenador de Operações',
  'Analista de TI',
  'Supervisor de Qualidade e Conformidade',
  'Gerente de Clínica'
] as const

export interface ProfessionalType {
  id: string
  name: string
  councilCode: string
  federalCouncil: string
  description: string
}

export const PROFESSIONAL_TYPES: ProfessionalType[] = [
  {
    id: 'doctor',
    name: 'Médico',
    councilCode: 'CRM',
    federalCouncil: 'CFM',
    description: 'Conselho Federal de Medicina'
  },
  {
    id: 'biomedic',
    name: 'Biomédico',
    councilCode: 'CRBM',
    federalCouncil: 'CFBM',
    description: 'Conselho Federal de Biomedicina'
  },
  {
    id: 'nurse',
    name: 'Enfermeiro',
    councilCode: 'COREN',
    federalCouncil: 'COFEN',
    description: 'Conselho Federal de Enfermagem'
  },
  {
    id: 'pharmacist',
    name: 'Farmacêutico',
    councilCode: 'CRF',
    federalCouncil: 'CFF',
    description: 'Conselho Federal de Farmácia'
  },
  {
    id: 'physio',
    name: 'Fisioterapeuta',
    councilCode: 'CREFITO',
    federalCouncil: 'COFFITO',
    description: 'Conselho Federal de Fisioterapia'
  },
  {
    id: 'occupational_therapist',
    name: 'Terapeuta Ocupacional',
    councilCode: 'CREFITO',
    federalCouncil: 'COFFITO',
    description: 'Conselho Federal de Fisioterapia e Terapia Ocupacional'
  },
  {
    id: 'nutritionist',
    name: 'Nutricionista',
    councilCode: 'CRN',
    federalCouncil: 'CFN',
    description: 'Conselho Federal de Nutricionistas'
  },
  {
    id: 'psychologist',
    name: 'Psicólogo',
    councilCode: 'CRP',
    federalCouncil: 'CFP',
    description: 'Conselho Federal de Psicologia'
  },
  {
    id: 'dentist',
    name: 'Dentista',
    councilCode: 'CRO',
    federalCouncil: 'CFO',
    description: 'Conselho Federal de Odontologia'
  },
  {
    id: 'speech_therapist',
    name: 'Fonoaudiólogo',
    councilCode: 'CREFONO',
    federalCouncil: 'CFFa',
    description: 'Conselho Federal de Fonoaudiologia'
  },
  {
    id: 'social_worker',
    name: 'Assistente Social',
    councilCode: 'CRESS',
    federalCouncil: 'CFESS',
    description: 'Conselho Federal de Serviço Social'
  },
  {
    id: 'radiology_tech',
    name: 'Tecnólogo em Radiologia',
    councilCode: 'CRTR',
    federalCouncil: 'CONTER',
    description: 'Conselho Nacional de Técnicos em Radiologia'
  },
  {
    id: 'nursing_tech',
    name: 'Técnico em Enfermagem',
    councilCode: 'COREN',
    federalCouncil: 'COFEN',
    description: 'Conselho Federal de Enfermagem'
  },
  {
    id: 'physical_educator',
    name: 'Educador Físico',
    councilCode: 'CREF',
    federalCouncil: 'CONFEF',
    description: 'Conselho Federal de Educação Física'
  }
]

export enum PermissionType {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum ResourceType {
  LAUDARIO = 'laudario',
  USER = 'user',
  ROLES = 'roles',
  AGENDA = 'agenda',
  CLIENTS = 'clients',
  WORKFLOW_PLANNED = 'workflow_planned',
  WORKFLOW_WAITING = 'workflow_waiting',
  WORKFLOW_STARTED = 'workflow_started',
  WORKFLOW_ONHOLD = 'workflow_onhold',
  WORKFLOW_COMPLETED = 'workflow_completed',
  WORKFLOW_TRANSCRIPTION = 'workflow_transcription',
  WORKFLOW_SIGNED = 'workflow_signed'
}

export interface Permission {
  id: number
  permission: PermissionType
  resource: ResourceType
}

export interface Role {
  id: number
  name: string
  permissions: Permission[]
}
