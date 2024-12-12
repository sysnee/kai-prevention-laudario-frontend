import React, { ReactNode } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useWorkflowStore } from '../../stores/workflowStore';
import {
  ClipboardList,
  Clock,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  FileText,
  ShieldCheck,
  FileCheck,
  XCircle,
  AlertOctagon
} from 'lucide-react';
import { WorkflowCard } from './WorkflowCard';
import { WorkflowColumn } from './WorkflowColumn';

export const WORKFLOW_STAGES = [
  {
    id: 'planned',
    title: 'Planejado',
    icon: ClipboardList,
    color: 'text-kai-primary',
    description: 'Exames agendados'
  },
  {
    id: 'waiting',
    title: 'Aguardando',
    icon: Clock,
    color: 'text-amber-500',
    description: 'Pacientes em espera'
  },
  {
    id: 'started',
    title: 'Iniciado',
    icon: PlayCircle,
    color: 'text-blue-500',
    description: 'Em execução'
  },
  {
    id: 'on_hold',
    title: 'Pausado',
    icon: PauseCircle,
    color: 'text-orange-500',
    description: 'Temporariamente pausado'
  },
  {
    id: 'completed',
    title: 'Concluído',
    icon: CheckCircle2,
    color: 'text-green-500',
    description: 'Exames finalizados'
  },
  {
    id: 'transcription',
    title: 'Transcrição',
    icon: FileText,
    color: 'text-purple-500',
    description: 'Em transcrição'
  },
  {
    id: 'quality',
    title: 'Controle de Qualidade',
    icon: ShieldCheck,
    color: 'text-indigo-500',
    description: 'Revisão técnica'
  },
  {
    id: 'relevant_findings',
    title: 'Achados Relevantes',
    icon: AlertOctagon,
    color: 'text-yellow-500',
    description: 'Achados importantes identificados'
  },
  {
    id: 'reported',
    title: 'Laudado',
    icon: FileCheck,
    color: 'text-teal-500',
    description: 'Laudos finalizados'
  },
  {
    id: 'canceled',
    title: 'Cancelados',
    icon: XCircle,
    color: 'text-red-500',
    description: 'Exames cancelados'
  }
];

interface WorkflowBoardProps {
  searchQuery: string;
  selectedStatus: string | null;
  selectedDate: Date;
}

export function WorkflowBoard({ searchQuery, selectedStatus, selectedDate }: WorkflowBoardProps) {
  const { exams, moveExam } = useWorkflowStore();

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      try {
        await moveExam(draggableId, source.droppableId, destination.droppableId);
      } catch (error) {
        console.error('Error moving exam:', error);
      }
    }
  };

  const filteredExams = exams?.filter(exam => {
    const matchesSearch = exam.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || exam.stage === selectedStatus;
    const matchesDate = selectedDate.toDateString() === new Date(exam.date).toDateString();
    return matchesSearch && matchesStatus && matchesDate;
  }) || [];

  return (
    <div className="overflow-x-auto workflow-scroll-x -mx-4 px-4">
      <div className="inline-flex gap-4 lg:gap-6 min-w-full py-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          {WORKFLOW_STAGES.map((stage) => (
            <div
              key={stage.id}
              className="w-[280px] md:w-[320px] lg:w-80 flex-shrink-0"
            >
              <Droppable droppableId={stage.id}>
                {(provided, _) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="workflow-scroll overflow-y-auto max-h-[calc(100vh-24rem)]"
                  >
                    <WorkflowColumn
                      title={stage.title}
                      icon={stage.icon}
                      color={stage.color}
                      description={stage.description}
                      count={filteredExams.filter(exam => exam.stage === stage.id).length}
                    >
                      {filteredExams
                        .filter(exam => exam.stage === stage.id)
                        .map((exam, index) => (
                          <WorkflowCard
                            key={exam.id}
                            exam={exam}
                            index={index}
                          />
                        ))}
                      {provided.placeholder as ReactNode}
                    </WorkflowColumn>
                  </div>
                )}

              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}