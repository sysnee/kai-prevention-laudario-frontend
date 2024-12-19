import React, { ReactNode, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { WorkflowColumn } from './WorkflowColumn';
import { WorkflowCard } from './WorkflowCard';
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
  AlertOctagon,
  ClockIcon
} from 'lucide-react';

export const WORKFLOW_STAGES = [
  {
    id: 'PLANNED',
    title: 'Planejado',
    icon: ClipboardList,
    color: 'text-kai-primary',
    description: 'Exames agendados'
  },
  {
    id: 'WAITING',
    title: 'Aguardando',
    icon: Clock,
    color: 'text-amber-500',
    description: 'Pacientes em espera'
  },
  {
    id: 'STARTED',
    title: 'Iniciado',
    icon: PlayCircle,
    color: 'text-blue-500',
    description: 'Em execução'
  },
  {
    id: 'ON_HOLD',
    title: 'Pausado',
    icon: PauseCircle,
    color: 'text-orange-500',
    description: 'Temporariamente pausado'
  },
  {
    id: 'COMPLETED',
    title: 'Concluído',
    icon: CheckCircle2,
    color: 'text-green-500',
    description: 'Exames finalizados'
  },
  {
    id: 'IN_TRANSCRIPTION',
    title: 'Transcrição',
    icon: FileText,
    color: 'text-purple-500',
    description: 'Em transcrição'
  },
  {
    id: 'IN_REVISION',
    title: 'Em Revisão',
    icon: ClockIcon,
    color: 'text-yellow-500',
    description: 'Exames em revisão'
  },
  {
    id: 'SIGNED',
    title: 'Laudado',
    icon: FileCheck,
    color: 'text-teal-500',
    description: 'Laudos finalizados'
  },
  {
    id: 'CANCELED',
    title: 'Cancelados',
    icon: XCircle,
    color: 'text-red-500',
    description: 'Exames cancelados'
  }
];

interface WorkflowBoardProps {
  planned: any[];
  waiting: any[];
  started: any[];
  on_hold: any[];
  completed: any[];
  transcription: any[];
  signed: any[];
  canceled: any[];
  in_revision: any[];
  searchQuery: string;
  selectedStatus: string | null;
  selectedDate: Date;
}

export function WorkflowBoard({
  planned,
  waiting,
  started,
  on_hold,
  completed,
  transcription,
  signed,
  canceled,
  in_revision,
  searchQuery,
  selectedStatus,
  selectedDate
}: WorkflowBoardProps) {
  const { serviceRequests, moveExam, setServiceRequests } = useWorkflowStore();


  useEffect(() => {
    setServiceRequests(
      [].concat(
        planned,
        waiting,
        started,
        on_hold,
        completed,
        transcription,
        signed,
        canceled,
        in_revision
      )
    )
  }, [
    planned,
    waiting,
    started,
    in_revision
  ])

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

  // const filteredExams = serviceRequests?.filter(sr => {
  //   // const matchesSearch = exam.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   //   exam.examType.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesStatus = !selectedStatus || sr.status === selectedStatus;
  //   // const matchesDate = selectedDate.toDateString() === new Date(exam.date).toDateString();
  //   return matchesStatus;
  // }) || [];

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="inline-flex gap-4 lg:gap-6 min-w-full py-4">
        {/* <pre>
          {JSON.stringify(serviceRequests, null, 2)}
        </pre> */}
        <DragDropContext onDragEnd={handleDragEnd}>
          {WORKFLOW_STAGES.map((status) => (
            <div
              key={status.id}
              className="w-[280px] md:w-[320px] lg:w-80 flex-shrink-0"
            >
              <Droppable droppableId={status.id}>
                {(provided, _) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="max-h-100"
                  >
                    <WorkflowColumn
                      title={status.title}
                      icon={status.icon}
                      color={status.color}
                      description={status.description}
                      count={serviceRequests.filter(sr => sr.status === status.id).length}
                    >
                      {serviceRequests
                        .filter(exam => exam.status === status.id)
                        .map((exam, index) => (
                          <WorkflowCard
                            key={exam.id}
                            exam={exam}
                            index={index}
                          />
                        ))}
                      {provided.placeholder}
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