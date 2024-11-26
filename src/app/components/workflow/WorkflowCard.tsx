import React, { useState } from 'react';
import { 
  MoreVertical,
  Calendar,
  XCircle,
  PlayCircle,
  AlertCircle,
  Clock,
  User
} from 'lucide-react';
import { useWorkflowStore } from '../../stores/workflowStore';
import { WorkflowCardModal } from './WorkflowCardModal';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Draggable } from '@hello-pangea/dnd';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/material';

interface WorkflowCardProps {
  exam: any;
  index: number;
}

export function WorkflowCard({ exam, index }: WorkflowCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const { moveExam, cancelExam } = useWorkflowStore();
  const theme = useTheme();

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowActions(!showActions);
  };

  const handleAction = async (action: string) => {
    setShowActions(false);

    switch (action) {
      case 'proceed':
        if (exam.stage === 'planned') {
          await moveExam(exam.id, exam.stage, 'waiting', 'Confirmação de chegada');
          toast.success('Paciente confirmado na recepção');
        } else if (exam.stage === 'waiting') {
          await moveExam(exam.id, exam.stage, 'started', 'Início do exame');
          toast.success('Exame iniciado');
        }
        break;
      case 'hold':
        const holdReason = prompt('Por favor, informe o motivo da pausa:');
        if (holdReason) {
          await moveExam(exam.id, exam.stage, 'on_hold', holdReason);
          toast.success('Exame pausado');
        }
        break;
      default:
        setShowModal(true);
    }
  };

  return (
    <Draggable draggableId={exam.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3 last:mb-0 group cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <div 
            className={`
              rounded-lg p-4 hover:shadow-md hover:border-kai-primary/30 transition-all
              ${snapshot.isDragging ? 'shadow-lg' : ''}
            `}
            style={{
              border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
              color: theme.palette.text.primary
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <User className="w-8 h-8" />
                <div className="ml-3">
                  <h4 className="font-medium">{exam.patientName}</h4>
                  <p className="text-sm text-gray-400">ID: {exam.patientId}</p>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={handleActionClick}
                  className="p-2 text-gray-400 hover:text-kai-primary rounded-lg hover:border"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
                {showActions && (
                  <div 
                    className="absolute right-0 top-full mt-1 w-48 rounded-lg shadow-lg z-10"
                    style={{
                      backgroundColor: theme.palette.background.default,
                      border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
                    }}
                  >
                    {exam.stage === 'planned' && (
                      <>
                        <button
                          onClick={() => handleAction('proceed')}
                          className="w-full px-4 py-2 text-left text-sm flex items-center"
                        >
                          <PlayCircle className="w-4 h-4 mr-2 text-green-500" />
                          Confirmar Chegada
                        </button>
                      </>
                    )}
                    {exam.stage === 'waiting' && (
                      <>
                        <button
                          onClick={() => handleAction('proceed')}
                          className="w-full px-4 py-2 text-left text-sm flex items-center"
                        >
                          <PlayCircle className="w-4 h-4 mr-2 text-green-500" />
                          Iniciar Exame
                        </button>
                      </>
                    )}
                    {exam.stage === 'started' && (
                      <>
                        <button
                          onClick={() => handleAction('hold')}
                          className="w-full px-4 py-2 text-left text-sm text-orange-600 flex items-center"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Pausar
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-500 rounded p-2 mb-3">
              {exam.examType}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {format(new Date(exam.startTime), 'HH:mm', { locale: ptBR })}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                exam.priority === 'high' ? 'bg-red-100 text-red-800' :
                exam.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {exam.priority === 'high' ? 'Alta' :
                 exam.priority === 'medium' ? 'Média' : 'Baixa'}
              </span>
            </div>
          </div>

          {showModal && (
            <WorkflowCardModal
              exam={exam}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      )}
    </Draggable>
  );
}