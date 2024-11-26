import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  roleName: string;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, roleName }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-red-100 rounded-full p-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          Confirmar Exclusão
        </h3>
        
        <p className="text-sm text-gray-500 text-center mb-6">
          Tem certeza que deseja excluir o perfil <span className="font-medium text-gray-900">"{roleName}"</span>? 
          Esta ação não poderá ser desfeita.
        </p>

        <div className="flex justify-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}