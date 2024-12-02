import React from 'react';
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from '@mui/material';

interface NotesSectionProps {
  notes: Array<{
    text: string;
    createdAt: string;
    createdBy: {
      name: string;
    };
  }>;
  newNote: string;
  onNoteChange: (note: string) => void;
  onAddNote: () => void;
}

export function NotesSection({ notes, newNote, onNoteChange, onAddNote }: NotesSectionProps) {
  const theme = useTheme();

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Anotações</h3>
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={newNote}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Digite sua anotação..."
            className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            style={{
              border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
            }}
            rows={2}
          />
          <button
            onClick={onAddNote}
            className="absolute bottom-3 right-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 max-h-48 overflow-y-auto">
          {notes.map((note, index) => (
            <div key={index} className="rounded-lg p-4"
              style={{
                border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{note.createdBy.name}</span>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true, locale: ptBR })}
                </span>
              </div>
              <p className="text-gray-500">{note.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}