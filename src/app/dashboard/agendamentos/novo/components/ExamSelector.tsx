import React, { useState } from 'react';
import { Search, Clock, AlertCircle, Info, AlertTriangleIcon } from 'lucide-react';
import { examsList } from '@/src/app/data/exams';
import { formatCurrency } from '@/src/app/utils/format';

interface ExamSelectorProps {
  selectedExam: any;
  onExamSelect: (exam: any) => void;
}

export function ExamSelector({ selectedExam, onExamSelect }: ExamSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(examsList.map(exam => exam.category)));

  const filteredExams = examsList.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || exam.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar exames..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <div className="flex-shrink-0">
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredExams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => onExamSelect(exam)}
            className={`text-left p-4 rounded-xl border transition-all ${selectedExam?.id === exam.id
              ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50'
              : 'border-gray-200 hover:border-blue-500 bg-white'
              }`}
          >
            <div className="flex items-start">
              {/* <img
                src={exam.image}
                alt={exam.name}
                className="w-20 h-20 object-cover rounded-lg"
              /> */}
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-900">{exam.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {exam.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <AlertTriangleIcon className="w-4 h-4 mr-1" />
                    Requer preparação prévia
                  </div>
                  <span className="font-medium text-blue-600">
                    R$ ---,--
                  </span>
                </div>
              </div>
            </div>
            {exam.preparation && (
              <div className="mt-3 flex items-start text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                <p>Modalidades: {exam.duration}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum exame encontrado
          </h3>
          <p className="text-gray-500">
            Tente ajustar seus filtros ou termo de busca
          </p>
        </div>
      )}
    </div>
  );
}