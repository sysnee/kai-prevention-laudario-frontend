import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

interface PatientSearchProps {
  onSelect: (patient: any) => void;
}

// Mock data - replace with actual API integration
const mockPatients = Array.from({ length: 10 }, (_, i) => ({
  id: `patient-${i + 1}`,
  name: `Paciente ${i + 1}`,
  cpf: `${Math.random().toString().slice(2, 13)}`,
  birthDate: new Date(1960 + i * 2, 0, 1).toLocaleDateString('pt-BR'),
}));

export function PatientSearch({ onSelect }: PatientSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<typeof mockPatients>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 3) {
      const filtered = mockPatients.filter(
        patient =>
          patient.name.toLowerCase().includes(query.toLowerCase()) ||
          patient.cpf.includes(query)
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nome ou CPF..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
      </div>

      {results.length > 0 && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {results.map((patient) => (
            <button
              key={patient.id}
              onClick={() => onSelect(patient)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3"
            >
              <User className="w-8 h-8 text-gray-400" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {patient.name}
                </div>
                <div className="text-sm text-gray-500">
                  CPF: {patient.cpf} • Nascimento: {patient.birthDate}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {searchQuery.length >= 3 && results.length === 0 && (
        <div className="mt-2 text-sm text-gray-500 text-center py-3">
          Nenhum paciente encontrado
        </div>
      )}
    </div>
  );
}