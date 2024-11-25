import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function CancelModal({ isOpen, onClose, onConfirm }: CancelModalProps) {
  const [reason, setReason] = useState('');
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      onConfirm(reason);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="rounded-lg p-6 max-w-md w-full mx-4"
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-center mb-2">
          Cancelar Exame
        </h3>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Motivo do Cancelamento
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kai-primary focus:border-transparent"
              placeholder="Informe o motivo do cancelamento..."
              required
            />
          </div>

          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Confirmar Cancelamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}