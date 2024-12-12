import React from 'react';
import { Save, X, Info } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { examsList } from '../../data/exams';

interface AppointmentFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
  selectedExam?: any;
}

export function AppointmentForm({ 
  onSubmit, 
  onCancel, 
  isLoading = false,
  selectedExam: initialExam
}: AppointmentFormProps) {
  const [formData, setFormData] = React.useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    examId: initialExam?.id || '',
    notes: '',
  });

  const selectedExam = initialExam || examsList.find(exam => exam.id === formData.examId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Dados do Agendamento</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Exame
        </label>
        {selectedExam ? (
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <img 
                src={selectedExam.image} 
                alt={selectedExam.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h4 className="font-medium text-blue-900">{selectedExam.name}</h4>
                <p className="text-sm text-blue-800 mt-1">{selectedExam.description}</p>
                <div className="mt-2 flex items-center space-x-4">
                  <span className="text-blue-600 font-medium">
                    {formatCurrency(selectedExam.price)}
                  </span>
                  <span className="text-blue-600">
                    Duração: {selectedExam.duration}
                  </span>
                </div>
              </div>
            </div>
            {selectedExam.preparation && (
              <div className="mt-4 flex items-start text-sm text-blue-800">
                <Info className="w-5 h-5 mr-2 flex-shrink-0 text-blue-600" />
                <p>
                  <strong>Preparação necessária:</strong> {selectedExam.preparation}
                </p>
              </div>
            )}
          </div>
        ) : (
          <select
            name="examId"
            value={formData.examId}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">Selecione o tipo de exame</option>
            {examsList.map(exam => (
              <option key={exam.id} value={exam.id}>
                {exam.name} - {formatCurrency(exam.price)}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Paciente
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Agendando...' : 'Agendar'}
        </button>
      </div>
    </form>
  );
}