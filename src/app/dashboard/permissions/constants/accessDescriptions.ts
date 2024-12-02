import { AccessLevel, ExamStatus, Role } from "@/src/app/types/pemissions/permissions";

type AccessDescription = string | Partial<Record<Role, string>>;

export const examAccessDescriptions: Record<
  ExamStatus,
  Record<AccessLevel, string | Partial<Record<Role, string>>>
> = {
  planned: {
    none: "Acesso não autorizado",
    read: "Visualizar / Consultar",
    write: {
      Recepcionista: "Gerenciar exames: agendar, editar, cancelar e reagendar",
    },
    full: "Acesso completo",
  },
  waiting: {
    none: "Acesso não autorizado",
    read: "Visualizar / Consultar",
    write: {
      Recepcionista: "Confirmar chegada, atualizar status",
    },
    full: "Acesso completo",
  },
  started: {
    none: "Acesso não autorizado",
    read: "Visualizar / Consultar",
    write: {
      Enfermeiro: "Assistir paciente: preparar e atualizar observações",
      Biomedico: "Executar exame: iniciar, realizar, registrar observações",
    },
    full: "Acesso completo",
  },
  onhold: {
    none: "Acesso não autorizado",
    read: "Visualizar / Consultar",
    write: {
      Enfermeiro: "Assistir paciente: preparar e atualizar observações",
      Biomedico: "Executar exame: iniciar, realizar, registrar observações",
    },
    full: "Acesso completo",
  },
  completed: {
    none: "Acesso não autorizado",
    read: "Visualizar / Consultar",
    write: {
      Enfermeiro: "Assistir paciente: preparar e atualizar observações",
      Biomedico: "Executar exame: iniciar, realizar, registrar observações",
    },
    full: "Acesso completo",
  },
  transcription: {
    none: "Acesso não autorizado",
    read: "Visualizar / Consultar",
    write: {
      Recepcionista: "Transcrever, criar, editar achados",
    },
    full: "Acesso completo",
  },
  revision: {
    none: "Acesso não autorizado",
    read: "Visualizar / Consultar",
    write: {
      Recepcionista: "Transcrever, assinar laudo",
    },
    full: "Acesso completo",
  },
  signed: {
    none: "Acesso não autorizado",
    read: "Visualizar / Consultar",
    write: "Não aplicável",
    full: "Acesso completo",
  },
};

export const patientAccessDescriptions: Record<AccessLevel, AccessDescription> =
  {
    none: "Acesso não autorizado",
    read: "Visualizar informações do paciente",
    write: {
      Recepcionista: "Criar e editar registros de pacientes",
      Enfermeiro: "Gerenciar informações clínicas do paciente",
      HeadDoctor: "Aprovar modificações em registros de pacientes",
    },
    full: "Acesso e controle total sobre registros de pacientes",
  };