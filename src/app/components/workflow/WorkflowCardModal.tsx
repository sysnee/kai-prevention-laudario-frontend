import React, { useState } from 'react';
import { useWorkflowStore } from '../../stores/workflowStore';
import { RescheduleModal } from './RescheduleModal';
import { CancelModal } from './CancelModal';
import { MedicalPrescriptionModal } from './MedicalPrescriptionModal';
import { TimelineSection } from './card/TimelineSection';
import { DocumentSection } from './card/DocumentSection';
import { ExamStatus } from './card/ExamStatus';
import { ActionButtons } from './card/ActionButtons';
import { NotesSection } from './card/NotesSection';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/material';

interface WorkflowCardModalProps {
  exam: any;
  onClose: () => void;
}

export function WorkflowCardModal({ exam, onClose }: WorkflowCardModalProps) {
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showMedicalPrescriptionModal, setShowMedicalPrescriptionModal] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [examStatuses, setExamStatuses] = useState<Record<string, 'waiting' | 'in_progress' | 'completed'>>(() => {
    const initialStatuses: Record<string, 'waiting' | 'in_progress' | 'completed'> = {};
    exam.exams.forEach((ex: any) => {
      initialStatuses[ex.id] = 'waiting';
    });
    return initialStatuses;
  });
  const [resumeReason, setResumeReason] = useState('');
  const [showResumeInput, setShowResumeInput] = useState(false);
  const theme = useTheme();

  const { addWorkflowNote, moveExam } = useWorkflowStore();

  const handleExamStatusChange = (examId: string) => {
    setExamStatuses(prev => {
      const currentStatus = prev[examId];
      const nextStatus = 
        currentStatus === 'waiting' ? 'in_progress' :
        currentStatus === 'in_progress' ? 'completed' :
        'waiting';
      
      return { ...prev, [examId]: nextStatus };
    });
  };

  const handleRoomChange = (examId: string, room: string) => {
    // Implementar lógica de mudança de sala
    console.log('Mudança de sala:', examId, room);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const currentUser = {
      id: 'user1',
      name: 'Dr. João Silva' 
    };
    addWorkflowNote(exam.id, { text: newNote, mentions: [], createdBy: currentUser});
    setNewNote('');
  };

  const handleReschedule = async (date: Date, time: string, reason: string) => {
    try {
      await moveExam(exam.id, exam.stage, 'planned', reason);
      toast.success('Exame reagendado com sucesso');
      onClose();
    } catch (error) {
      toast.error('Erro ao reagendar exame');
    }
  };

  const handleCancel = async (reason: string) => {
    try {
      await moveExam(exam.id, exam.stage, 'canceled', reason);
      toast.success('Exame cancelado com sucesso');
      onClose();
    } catch (error) {
      toast.error('Erro ao cancelar exame');
    }
  };

  const handlePause = async () => {
    try {
      await moveExam(exam.id, exam.stage, 'on_hold', 'Exame pausado');
      toast.success('Exame pausado com sucesso');
      onClose();
    } catch (error) {
      toast.error('Erro ao pausar exame');
    }
  };

  const handleResume = async () => {
    if (!resumeReason.trim()) {
      toast.error('Informe o motivo para retomar o exame');
      return;
    }

    try {
      await moveExam(exam.id, exam.stage, 'started', resumeReason);
      toast.success('Exame retomado com sucesso');
      onClose();
    } catch (error) {
      toast.error('Erro ao retomar exame');
    }
  };

  const handleProceed = async () => {
    const nextStage = exam.stage === 'planned' ? 'waiting' : 
                     exam.stage === 'waiting' ? 'started' : 
                     exam.stage === 'started' ? 'completed' : null;
    
    if (nextStage) {
      try {
        await moveExam(exam.id, exam.stage, nextStage, 'Progresso automático');
        toast.success(`Exame movido para ${nextStage}`);
        onClose();
      } catch (error) {
        toast.error('Erro ao prosseguir com o exame');
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className="rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col"
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6"
          style={{
            borderBottom: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{exam.patientName}</h2>
              <p className="text-gray-500">ID: {exam.patientId}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <DocumentSection
              documents={{
                prescription: Boolean(exam.medicalPrescription),
                questionnaire: Boolean(exam.questionnaire),
                consent: Boolean(exam.consentForm)
              }}
              onPrescriptionClick={() => setShowMedicalPrescriptionModal(true)}
              onQuestionnaireClick={() => toast('Link do questionário será implementado em breve', { icon: '📋' })}
              onConsentClick={() => toast('Link do termo de consentimento será implementado em breve', { icon: '📄' })}
            />

            <TimelineSection currentStage={exam.stage} />

            <div
              style={{
                color: theme.palette.text.primary
              }}
            >
              <h3 className="text-lg font-medium mb-4">Status dos Exames</h3>
              <div className="space-y-3">
                {exam.exams.map((ex: any) => (
                  <ExamStatus
                    key={ex.id}
                    examId={ex.id}
                    name={ex.name}
                    room={ex.room}
                    status={examStatuses[ex.id]}
                    onStatusChange={handleExamStatusChange}
                    onRoomChange={handleRoomChange}
                  />
                ))}
              </div>
            </div>

            <NotesSection
              notes={exam.workflowNotes}
              newNote={newNote}
              onNoteChange={setNewNote}
              onAddNote={handleAddNote}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6"
          style={{
            borderTop: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
          }}
        >
          <ActionButtons
            stage={exam.stage}
            onReschedule={() => setShowRescheduleModal(true)}
            onCancel={() => setShowCancelModal(true)}
            onPause={handlePause}
            onResume={handleResume}
            onProceed={handleProceed}
            resumeReason={resumeReason}
            showResumeInput={showResumeInput}
            onResumeReasonChange={setResumeReason}
            onShowResumeInput={() => setShowResumeInput(true)}
          />
        </div>
      </div>

      {/* Modals */}
      {showRescheduleModal && (
        <RescheduleModal
          isOpen={showRescheduleModal}
          onClose={() => setShowRescheduleModal(false)}
          onConfirm={handleReschedule}
        />
      )}

      {showCancelModal && (
        <CancelModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancel}
        />
      )}

      {showMedicalPrescriptionModal && (
        <MedicalPrescriptionModal
          isOpen={showMedicalPrescriptionModal}
          onClose={() => setShowMedicalPrescriptionModal(false)}
          onSave={(data) => {
            console.log('Medical prescription data:', data);
            setShowMedicalPrescriptionModal(false);
            toast.success('Pedido médico salvo com sucesso');
          }}
        />
      )}
    </div>
  );
}