import React, { useState } from 'react';
import { AlertCircle, FileText, CheckCircle } from 'lucide-react';

interface ConsentFormProps {
  exam: any;
  onAccept: () => void;
}

export function ConsentForm({ exam, onAccept }: ConsentFormProps) {
  const [hasRead, setHasRead] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-yellow-50 rounded-lg p-4 mb-6 flex items-start">
        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-yellow-900">Termo de Consentimento</h4>
          <p className="text-sm text-yellow-800 mt-1">
            Este exame requer a aplicação de contraste. Por favor, leia atentamente o termo de consentimento abaixo.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center mb-4">
          <FileText className="w-5 h-5 text-[#FF8046] mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            Termo de Consentimento para Uso de Contraste
          </h3>
        </div>

        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            Eu, paciente devidamente identificado, declaro que fui informado(a) de forma clara e compreensível sobre:
          </p>
          
          <ol className="list-decimal pl-4 space-y-2 mt-4">
            <li>A necessidade da administração do meio de contraste para a realização do exame;</li>
            <li>Os benefícios esperados do procedimento;</li>
            <li>Os riscos e possíveis complicações relacionadas ao uso do contraste;</li>
            <li>As alternativas existentes, quando aplicáveis;</li>
            <li>A possibilidade de reações alérgicas;</li>
          </ol>

          <p className="mt-4">
            Declaro que tive a oportunidade de fazer perguntas e esclarecer todas as minhas dúvidas sobre o procedimento.
          </p>

          <p className="mt-4">
            Estou ciente que posso revogar este consentimento a qualquer momento antes da realização do procedimento.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={hasRead}
            onChange={(e) => setHasRead(e.target.checked)}
            className="h-5 w-5 text-[#FF8046] rounded mt-0.5"
          />
          <span className="ml-2 text-sm text-gray-600">
            Declaro que li e compreendi todas as informações apresentadas neste termo de consentimento
            e concordo voluntariamente com a realização do procedimento.
          </span>
        </label>

        <button
          onClick={onAccept}
          disabled={!hasRead}
          className={`w-full px-4 py-3 rounded-lg flex items-center justify-center ${
            hasRead
              ? 'bg-[#FF8046] text-white hover:bg-[#FF8046]/90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
}