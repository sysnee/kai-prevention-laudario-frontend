import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Link, 
  FileText, 
  Send,
  Calendar,
  Clock,
  PlayCircle,
  XCircle,
  AlertCircle,
  User,
  CheckCircle2,
  PauseCircle,
  Check
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useWorkflowStore } from '../../stores/workflowStore';
import { RescheduleModal } from './RescheduleModal';
import { CancelModal } from './CancelModal';
import { MedicalPrescriptionModal } from './MedicalPrescriptionModal';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

interface WorkflowCardModalProps {
  exam: any;
  onClose: () => void;
}

export function WorkflowCardModal({ exam, onClose }: WorkflowCardModalProps) {
  const theme = useTheme();
  const [newNote, setNewNote] = useState('');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showMedicalPrescriptionModal, setShowMedicalPrescriptionModal] = useState(false);
  const { addWorkflowNote, cancelExam, rescheduleExam, moveExam } = useWorkflowStore();
  const [examStatuses, setExamStatuses] = useState<Record<string, 'waiting' | 'in_progress' | 'completed'>>({});

  useEffect(() => {
    // Inicializar status dos exames
    const initialStatuses: Record<string, 'waiting' | 'in_progress' | 'completed'> = {};
    exam.exams.forEach((ex: any) => {
      initialStatuses[ex.id] = 'waiting';
    });
    setExamStatuses(initialStatuses);
  }, [exam.exams]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
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

  const handleReschedule = (date: Date, time: string, reason: string) => {
    rescheduleExam(exam.id, date, time, reason);
    setShowRescheduleModal(false);
    toast.success('Exame reagendado com sucesso');
  };

  const handleCancel = (reason: string) => {
    cancelExam(exam.id, reason);
    setShowCancelModal(false);
    toast.success('Exame cancelado com sucesso');
    onClose();
  };

  const handleProceed = async () => {
    const nextStage = exam.stage === 'planned' ? 'waiting' : 
                     exam.stage === 'waiting' ? 'started' : 
                     exam.stage === 'started' ? 'completed' : null;
    
    if (nextStage) {
      await moveExam(exam.id, exam.stage, nextStage, 'Progresso automático');
      toast.success(`Exame movido para ${nextStage}`);
      onClose();
    }
  };

  const handlePause = async () => {
    if (exam.stage === 'started') {
      await moveExam(exam.id, exam.stage, 'on_hold', 'Exame pausado');
      toast.success('Exame pausado');
      onClose();
    }
  };

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

  const getStatusColor = (status: 'waiting' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
    }
  };

  const getStatusText = (status: 'waiting' | 'in_progress' | 'completed') => {
    switch (status) {
      case 'waiting':
        return 'Aguardando';
      case 'in_progress':
        return 'Em Andamento';
      case 'completed':
        return 'Concluído';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div 
        className = "rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col overflow-hidden"
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{exam.patientName}</h2>
              <p>ID: {exam.patientId}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm">Médico</p>
                <p className="font-medium">{exam.doctor}</p>
              </div>
              <div>
                <p className="text-sm">Data e Hora</p>
                <p className="font-medium">{exam.scheduledTime}</p>
              </div>
              <div>
                <p className="text-sm">Prioridade</p>
                <p className="font-medium">Alta</p>
              </div>
            </div>

            {/* Documents */}
            <div className="flex space-x-4 border p-4 rounded-lg">
              <button
                onClick={() => setShowMedicalPrescriptionModal(true)}
                className="flex-1 p-4 rounded-lg transition-colors border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Pedido Médico</span>
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-sm">Upload e dados do médico</p>
              </button>

              <button
                onClick={() => toast('Link do questionário será implementado em breve', { icon: '📋' })}
                className="flex-1 p-4 rounded-lg transition-colors border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Questionário</span>
                  <Link className="w-5 h-5" />
                </div>
                <p className="text-sm">Acessar questionário</p>
              </button>

              <button
                onClick={() => toast('Link do termo de consentimento será implementado em breve', { icon: '📄' })}
                className="flex-1 p-4 rounded-lg transition-colors border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Termo de Consentimento</span>
                  <FileText className="w-5 h-5" />
                </div>
                <p className="text-sm">Visualizar termo</p>
              </button>
            </div>

            {/* Exam Status */}
            <div>
              <h3 className="text-lg font-medium mb-4">Status dos Exames</h3>
              <div className="space-y-3">
                {exam.exams.map((ex: any) => (
                  <div 
                    key={ex.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-kai-primary/30 transition-all"
                  >
                    <div>
                      <h4 className="font-medium">{ex.name}</h4>
                      <p className="text-sm">Sala: {ex.room}</p>
                    </div>
                    <button
                      onClick={() => handleExamStatusChange(ex.id)}
                      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${getStatusColor(examStatuses[ex.id])}`}
                    >
                      {examStatuses[ex.id] === 'completed' && <Check className="w-4 h-4" />}
                      <span>{getStatusText(examStatuses[ex.id])}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-lg font-medium mb-4">Linha do Tempo</h3>
              <div className="relative">
                <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200"></div>
                <div className="relative flex justify-between">
                  {[
                    { id: 'planned', label: 'Planejado', time: '30min' },
                    { id: 'waiting', label: 'Aguardando', time: '15min' },
                    { id: 'started', label: 'Iniciado', time: '45min' },
                    { id: 'on_hold', label: 'Pausado', time: '10min' },
                    { id: 'completed', label: 'Concluído', time: '20min' },
                    { id: 'transcription', label: 'Transcrição', time: '25min' },
                    { id: 'quality', label: 'Controle de Qualidade', time: '15min' },
                    { id: 'relevant_findings', label: 'Achados Relevantes', time: '20min' },
                    { id: 'reported', label: 'Laudado', time: '30min' },
                    { id: 'canceled', label: 'Cancelado', time: '0min' }
                  ].map((stage, index, stages) => {
                    const currentIndex = stages.findIndex(s => s.id === exam.stage);
                    const isActive = index <= currentIndex;
                    return (
                      <div key={stage.id} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive ? 'bg-blue-400 text-white' : 'bg-gray-300 text-white'
                        }`}>
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="mt-2 text-xs font-medium">{stage.label}</span>
                        <span className="mt-1 text-xs">{stage.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowRescheduleModal(true)}
                className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
              >
                <Calendar className="w-4 h-4 mr-2 inline" />
                Reagendar
              </button>
              <button
                onClick={() => setShowCancelModal(true)}
                className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
              >
                <XCircle className="w-4 h-4 mr-2 inline" />
                Cancelar
              </button>
              {exam.stage === 'started' && (
                <button
                  onClick={handlePause}
                  className="flex-1 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100"
                >
                  <PauseCircle className="w-4 h-4 mr-2 inline" />
                  Pausar
                </button>
              )}
              {exam.stage !== 'completed' && (
                <button
                  onClick={handleProceed}
                  className="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                >
                  <PlayCircle className="w-4 h-4 mr-2 inline" />
                  Prosseguir
                </button>
              )}
            </div>

            {/* Notes */}
            <div>
              <h3 className="text-lg font-medium mb-4">Anotações</h3>
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Digite sua anotação..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={2}
                  />
                  <button
                    onClick={handleAddNote}
                    className="absolute bottom-2 right-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 max-h-48 overflow-y-auto">
                  {exam.workflowNotes?.map((note: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{note.createdBy.name}</span>
                        <span className="text-sm">
                          {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true, locale: ptBR })}
                        </span>
                      </div>
                      <p>{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
    </div>
  );
}