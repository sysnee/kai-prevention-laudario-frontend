import React from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '@mui/material';

interface TimelineSectionProps {
  currentStage: string;
}

export function TimelineSection({ currentStage }: TimelineSectionProps) {
  const stages = [
    { id: 'PLANNED', label: 'Planejado' },
    { id: 'WAITING', label: 'Aguardando' },
    { id: 'STARTED', label: 'Iniciado' },
    { id: 'ON_HOLD', label: 'Pausado' },
    { id: 'COMPLETED', label: 'Concluído' },
    { id: 'IN_TRANSCRIPTION', label: 'Em Transcrição' },
    { id: 'SIGNED', label: 'Laudado' },
    // { id: 'CANCELED', label: 'Cancelado', time: '0min' }
  ];
  const theme = useTheme();

  const currentIndex = stages.findIndex(stage => stage.id === currentStage);

  return (
    <div
      style={{
        color: theme.palette.text.primary
      }}
    >
      <h3 className="text-lg font-medium mb-4">Linha do Tempo</h3>
      <div className="relative">
        {/* Linha de progresso base */}
        <div className={`absolute top-4 left-0 w-full h-0.5 
         ${theme.palette.mode === 'light' ? 'bg-gray-300' : 'bg-gray-500'}`}>

        </div>

        {/* Linha de progresso preenchida */}
        <div
          className="absolute top-4 left-0 h-0.5 bg-blue-600 transition-all duration-500"
        />

        {/* Estágios */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const isActive = index <= currentIndex;

            return (
              <div key={stage.id} className="flex flex-col items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isActive ? theme.palette.mode === 'dark' ? 'bg-blue-600' : 'bg-blue-400' :
                      theme.palette.mode === 'dark' ? 'bg-gray-600' : 'bg-gray-400'}
                  `}
                >
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className={`
                  mt-2 text-xs font-medium
                  ${theme.palette.mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                `}>
                  {stage.label}
                </span>
                <span className={`mt-1 text-xs
                  ${theme.palette.mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}
                `}>
                  {/* {stage.time} */}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}