import React from 'react';
import { Check } from 'lucide-react';
import { useTheme } from '@mui/material';

interface ExamStatusProps {
  examId: string;
  name: string;
  room: string;
  status: 'waiting' | 'in_progress' | 'completed';
  onStatusChange: (examId: string) => void;
  onRoomChange: (examId: string, room: string) => void;
}

export function ExamStatus({ 
  examId, 
  name, 
  room, 
  status, 
  onStatusChange, 
  onRoomChange 
}: ExamStatusProps) {
  const theme = useTheme();

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
    <div className="flex items-center justify-between p-4 rounded-lg transition-all"
      style={{
        border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
        color: theme.palette.text.primary
      }}
    >
      <div className="flex-1">
        <h4 className="font-medium">{name}</h4>
        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-500 mr-4">Sala:</span>
          <input
            type="text"
            value={room}
            onChange={(e) => onRoomChange(examId, e.target.value)}
            placeholder="Informe a sala"
            className="px-3 py-1 rounded-md text-sm focus:ring-1 focus:ring-kai-primary focus:border-kai-primary"
            style={{
              border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
            }}
          />
        </div>
      </div>
      <button
        onClick={() => onStatusChange(examId)}
        className={`px-4 py-2 rounded-full flex items-center space-x-2 ${getStatusColor(status)}`}
      >
        {status === 'completed' && <Check className="w-4 h-4" />}
        <span>{getStatusText(status)}</span>
      </button>
    </div>
  );
}