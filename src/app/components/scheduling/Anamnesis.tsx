import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface AnamnesisProps {
  examType: string;
  onComplete: (data: any) => void;
}

export function Anamnesis({ examType, onComplete }: AnamnesisProps) {
  const [formData, setFormData] = useState({
    pregnancy: 'no',
    claustrophobia: 'no',
    metalImplants: 'no',
    pacemaker: 'no',
    allergies: '',
    medications: '',
    previousExams: 'no',
    observations: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-blue-900">Questionário de Segurança</h4>
          <p className="text-sm text-blue-800 mt-1">
            Por favor, responda todas as perguntas com atenção. Estas informações são importantes para sua segurança.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Existe possibilidade de gravidez?
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="pregnancy"
                value="no"
                checked={formData.pregnancy === 'no'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Não</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="pregnancy"
                value="yes"
                checked={formData.pregnancy === 'yes'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Sim</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Possui claustrofobia?
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="claustrophobia"
                value="no"
                checked={formData.claustrophobia === 'no'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Não</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="claustrophobia"
                value="yes"
                checked={formData.claustrophobia === 'yes'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Sim</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Possui implantes metálicos, próteses ou placas?
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="metalImplants"
                value="no"
                checked={formData.metalImplants === 'no'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Não</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="metalImplants"
                value="yes"
                checked={formData.metalImplants === 'yes'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Sim</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Possui marca-passo cardíaco?
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="pacemaker"
                value="no"
                checked={formData.pacemaker === 'no'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Não</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="pacemaker"
                value="yes"
                checked={formData.pacemaker === 'yes'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Sim</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Possui alergias a medicamentos?
          </label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Liste suas alergias, se houver"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medicamentos em uso
          </label>
          <textarea
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Liste os medicamentos que está utilizando atualmente"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Já realizou este exame anteriormente?
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="previousExams"
                value="no"
                checked={formData.previousExams === 'no'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Não</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="previousExams"
                value="yes"
                checked={formData.previousExams === 'yes'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Sim</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações adicionais
          </label>
          <textarea
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Informe qualquer outra informação relevante"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}