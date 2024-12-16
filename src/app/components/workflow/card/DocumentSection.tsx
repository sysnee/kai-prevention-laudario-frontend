import React from 'react';
import { Upload, LinkIcon, FileText } from 'lucide-react';
import { DocumentStatus } from './DocumentStatus';
import { useTheme } from '@mui/material';
import Link from 'next/link';

interface DocumentSectionProps {
  documents: {
    prescription: boolean;
    questionnaire: boolean;
    consent: boolean;
  };
  exam: any
  onPrescriptionClick: () => void;
  onQuestionnaireClick?: () => void;
  onConsentClick: () => void;
}

export function DocumentSection({
  documents,
  onPrescriptionClick,
  exam,
  onConsentClick
}: DocumentSectionProps) {

  const theme = useTheme();

  return (
    <div className="flex space-x-4 p-4 rounded-lg"
      style={{
        border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
        color: theme.palette.text.primary
      }}
    >
      <button
        onClick={onPrescriptionClick}
        className="flex-1 p-4 rounded-lg transition-colors"
        style={{
          border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Pedido Médico</span>
          <Upload className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 mb-2">Upload e dados do médico</p>
        <DocumentStatus type="prescription" status={documents.prescription} />
      </button>
      <Link className='flex-1 rounded-lg transition-colors p-3' style={{
        border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
      }} target="_blank" rel="noopener noreferrer" href={`https://questionario.kaiprevention.com.br/${exam.questionnaireToken}`}>
        {/* <button
          className="flex-1 p-4 rounded-lg transition-colors"
          style={{
            border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
          }}
        > */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-700">Questionário</span>
          <LinkIcon className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 mb-2">Acessar questionário</p>
        <DocumentStatus type="questionnaire" status={documents.questionnaire} />
        {/* </button> */}

      </Link>

      <button
        onClick={onConsentClick}
        className="flex-1 p-4 rounded-lg transition-colors"
        style={{
          border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Termo de Consentimento</span>
          <FileText className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 mb-2">Visualizar termo</p>
        <DocumentStatus type="consent" status={documents.consent} />
      </button>
    </div>
  );
}