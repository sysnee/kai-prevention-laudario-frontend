import { create } from 'zustand';
import toast from 'react-hot-toast';
//import { pacsService } from '../services/pacsService';
import { WorkflowNote, WorkflowTransition } from '../types/workflow/workflow';

interface Exam {
  id: string;
  patientName: string;
  patientId: string;
  examType: string;
  priority: 'low' | 'medium' | 'high';
  stage: string;
  timeInStage: string;
  doctor: string;
  room: string;
  scheduledTime: string;
  startTime: string;
  date: Date;
  notes?: string;
  exams: Array<{
    id: string;
    name: string;
    room: string;
  }>;
  workflowNotes: WorkflowNote[];
  transitions: WorkflowTransition[];
  cancellationReason?: string;
  canceledAt?: string;
  canceledBy?: {
    id: string;
    name: string;
  };
  medicalPrescription?: {
    doctorName: string;
    crm: string;
    phone?: string;
    fileUrl?: string;
  };
}

interface WorkflowStore {
  exams: Exam[];
  addExam: (exam: Exam) => void;
  updateExam: (examId: string, data: Partial<Exam>) => void;
  moveExam: (examId: string, fromStage: string, toStage: string, reason?: string) => Promise<void>;
  addWorkflowNote: (examId: string, note: Omit<WorkflowNote, 'id' | 'createdAt'>) => void;
  cancelExam: (examId: string, reason: string) => void;
  rescheduleExam: (examId: string, newDate: Date, newTime: string, reason: string) => void;
}

// Mock data para cada fase do workflow
const mockExams: Exam[] = [
  {
    id: 'exam-1',
    patientName: 'João Silva',
    patientId: 'PAT001',
    examType: 'Raio-X Tórax',
    priority: 'high',
    stage: 'planned',
    timeInStage: '30min',
    doctor: 'Dr. Maria Santos',
    room: 'Sala 3',
    scheduledTime: '09:30',
    startTime: '2024-03-20T09:30:00',
    date: new Date(),
    notes: 'Paciente com dificuldade de locomoção',
    exams: [
      { id: 'ex1', name: 'Raio-X Tórax PA', room: 'Sala 3' },
      { id: 'ex2', name: 'Raio-X Tórax Perfil', room: 'Sala 3' },
      { id: 'ex3', name: 'Raio-X Coluna Cervical', room: 'Sala 4' }
    ],
    workflowNotes: [
      {
        id: 'note-1',
        text: 'Paciente agendado',
        createdAt: '2024-03-20T09:00:00',
        createdBy: {
          id: 'user1',
          name: 'Dr. Maria Santos'
        },
        mentions: []
      }
    ],
    transitions: [
      {
        from: 'created',
        to: 'planned',
        timestamp: '2024-03-20T09:00:00',
        userId: 'user1',
        reason: 'Agendamento inicial'
      }
    ]
  },
  {
    id: 'exam-2',
    patientName: 'Maria Oliveira',
    patientId: 'PAT002',
    examType: 'Tomografia',
    priority: 'medium',
    stage: 'waiting',
    timeInStage: '15min',
    doctor: 'Dr. João Santos',
    room: 'Sala 2',
    scheduledTime: '10:00',
    startTime: '2024-03-20T10:00:00',
    date: new Date(),
    exams: [
      { id: 'ex4', name: 'Tomografia de Crânio', room: 'Sala 2' },
      { id: 'ex5', name: 'Tomografia de Seios da Face', room: 'Sala 2' },
      { id: 'ex6', name: 'Tomografia de Pescoço', room: 'Sala 2' },
      { id: 'ex7', name: 'Angiotomografia', room: 'Sala 1' }
    ],
    workflowNotes: [],
    transitions: []
  },
  {
    id: 'exam-3',
    patientName: 'Pedro Santos',
    patientId: 'PAT003',
    examType: 'Ressonância',
    priority: 'low',
    stage: 'started',
    timeInStage: '45min',
    doctor: 'Dra. Ana Silva',
    room: 'Sala 1',
    scheduledTime: '11:00',
    startTime: '2024-03-20T11:00:00',
    date: new Date(),
    exams: [
      { id: 'ex8', name: 'Ressonância de Coluna Cervical', room: 'Sala 1' },
      { id: 'ex9', name: 'Ressonância de Coluna Lombar', room: 'Sala 1' },
      { id: 'ex10', name: 'Ressonância de Crânio', room: 'Sala 1' },
      { id: 'ex11', name: 'Angioressonância', room: 'Sala 5' },
      { id: 'ex12', name: 'Ressonância de ATM', room: 'Sala 1' }
    ],
    workflowNotes: [],
    transitions: []
  }
];

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  exams: mockExams,
  
  addExam: (exam) => set((state) => ({ 
    exams: [...state.exams, exam] 
  })),

  updateExam: (examId, data) => set((state) => ({
    exams: state.exams.map(exam => 
      exam.id === examId ? { ...exam, ...data } : exam
    )
  })),
  
  moveExam: async (examId, fromStage, toStage, reason) => {
    const exam = get().exams.find(e => e.id === examId);
    if (!exam) {
      toast.error('Exame não encontrado');
      return;
    }

    try {
      // If moving to waiting stage, send to PACS
      if (toStage === 'waiting') {
        try {
          const pacsData = {
            id: exam.patientId,
            name: exam.patientName,
            birthDate: '1985-06-15', // Mock data
            gender: 'M',
            cpf: '12345678900',
            examType: exam.examType,
            accessionNumber: 'ACC001',
            referringPhysician: exam.doctor,
            modality: exam.examType.includes('Raio-X') ? 'CR' : 
                     exam.examType.includes('Tomografia') ? 'CT' : 'MR',
            scheduledDate: exam.date
          };

          //await pacsService.sendToWorklist(pacsData);
        } catch (error) {
          console.error('Error sending to PACS:', error);
          toast.error('Erro ao enviar para o PACS');
          return;
        }
      }

      // Add transition record
      const transition: WorkflowTransition = {
        from: fromStage,
        to: toStage,
        timestamp: new Date().toISOString(),
        userId: 'user1', // In a real app, this would be the logged-in user's ID
        reason
      };

      // Update exam stage and add transition
      set((state) => ({
        exams: state.exams.map((e) =>
          e.id === examId ? { 
            ...e, 
            stage: toStage,
            transitions: [...e.transitions, transition]
          } : e
        )
      }));

      toast.success(`Exame movido para ${toStage}`);

    } catch (error) {
      console.error('Error moving exam:', error);
      toast.error('Erro ao mover exame');
    }
  },

  addWorkflowNote: (examId, note) => {
    const newNote: WorkflowNote = {
      id: crypto.randomUUID(),
      text: note.text,
      createdAt: new Date().toISOString(),
      createdBy: {
        id: note.createdBy.id,
        name: note.createdBy.name
      },
      mentions: note.mentions
    };

    set((state) => ({
      exams: state.exams.map((exam) =>
        exam.id === examId ? {
          ...exam,
          workflowNotes: [...exam.workflowNotes, newNote]
        } : exam
      )
    }));

    toast.success('Anotação adicionada com sucesso');
  },

  cancelExam: (examId, reason) => {
    const cancelInfo = {
      cancellationReason: reason,
      canceledAt: new Date().toISOString(),
      canceledBy: {
        id: 'user1',
        name: 'Dr. João Silva'
      },
      stage: 'canceled'
    };

    set((state) => ({
      exams: state.exams.map((exam) =>
        exam.id === examId ? {
          ...exam,
          ...cancelInfo,
          transitions: [...exam.transitions, {
            from: exam.stage,
            to: 'canceled',
            timestamp: cancelInfo.canceledAt,
            userId: 'user1',
            reason: cancelInfo.cancellationReason
          }]
        } : exam
      )
    }));

    toast.success('Exame cancelado com sucesso');
  },

  rescheduleExam: (examId, newDate, newTime, reason) => {
    set((state) => ({
      exams: state.exams.map((exam) =>
        exam.id === examId ? {
          ...exam,
          date: newDate,
          scheduledTime: newTime,
          stage: 'planned',
          transitions: [...exam.transitions, {
            from: exam.stage,
            to: 'planned',
            timestamp: new Date().toISOString(),
            userId: 'user1',
            reason
          }],
          workflowNotes: [...exam.workflowNotes, {
            id: crypto.randomUUID(),
            text: `Exame reagendado para ${newDate.toLocaleDateString()} às ${newTime}. Motivo: ${reason}`,
            createdAt: new Date().toISOString(),
            createdBy: {
              id: 'user1',
              name: 'Dr. João Silva'
            },
            mentions: []
          }]
        } : exam
      )
    }));

    toast.success('Exame reagendado com sucesso');
  }
}));