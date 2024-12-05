import React from 'react';
import { X, Clock, CheckCircle } from 'lucide-react';

interface QuestionnaireAnswersModalProps {
  questionnaire: any;
  onClose: () => void;
}

export function QuestionnaireAnswersModal({ questionnaire, onClose }: QuestionnaireAnswersModalProps) {
  // Mock de respostas do questionário
  const mockAnswers = [
    {
      question: 'Possui alguma alergia a medicamentos?',
      answer: 'Não',
      category: 'Alergias'
    },
    {
      question: 'Faz uso de algum medicamento contínuo?',
      answer: 'Sim - Losartana 50mg (Pressão Alta)',
      category: 'Medicamentos'
    },
    {
      question: 'Já realizou cirurgias?',
      answer: 'Sim - Apendicectomia em 2018',
      category: 'Histórico Cirúrgico'
    },
    {
      question: 'Possui alguma doença crônica?',
      answer: 'Sim - Hipertensão',
      category: 'Condições Médicas'
    },
    {
      question: 'Histórico familiar de doenças cardíacas?',
      answer: 'Sim - Pai e avô paterno',
      category: 'Histórico Familiar'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Respostas do Questionário</h2>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>Preenchido em {questionnaire.date}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {Object.entries(
              mockAnswers.reduce((acc: any, curr) => {
                if (!acc[curr.category]) {
                  acc[curr.category] = [];
                }
                acc[curr.category].push(curr);
                return acc;
              }, {})
            ).map(([category, questions]: [string, any]) => (
              <div key={category} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{category}</h3>
                <div className="space-y-4">
                  {questions.map((item: any, index: number) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">{item.question}</p>
                      <p className="text-gray-900">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}