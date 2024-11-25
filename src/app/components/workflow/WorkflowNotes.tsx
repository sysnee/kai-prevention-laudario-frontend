import React, { useState, useRef, useEffect } from 'react';
import { Send, User, X } from 'lucide-react';
import { WorkflowNote } from '../../types/workflow/workflow';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface WorkflowNotesProps {
  notes: WorkflowNote[];
  onAddNote: (note: { text: string; mentions: string[] }) => void;
  onClose: () => void;
}

// Mock users for mention suggestions
const mockUsers = [
  { id: 'user1', name: 'Dr. João Silva', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 'user2', name: 'Dra. Maria Santos', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 'user3', name: 'Dr. Carlos Oliveira', avatar: 'https://i.pravatar.cc/150?u=3' },
];

export function WorkflowNotes({ notes, onAddNote, onClose }: WorkflowNotesProps) {
  const [newNote, setNewNote] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mentionedUsers, setMentionedUsers] = useState<string[]>([]);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(mentionFilter.toLowerCase())
  );

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const position = e.target.selectionStart || 0;
    setNewNote(value);
    setCursorPosition(position);

    // Check if we should show mention suggestions
    const lastChar = value.charAt(position - 1);
    if (lastChar === '@') {
      setShowMentions(true);
      setMentionFilter('');
    } else if (showMentions) {
      const textBeforeCursor = value.slice(0, position);
      const lastAtSymbol = textBeforeCursor.lastIndexOf('@');
      if (lastAtSymbol >= 0) {
        setMentionFilter(textBeforeCursor.slice(lastAtSymbol + 1));
      } else {
        setShowMentions(false);
      }
    }
  };

  const insertMention = (user: { id: string; name: string }) => {
    const textBeforeCursor = newNote.slice(0, cursorPosition);
    const lastAtSymbol = textBeforeCursor.lastIndexOf('@');
    const textAfterCursor = newNote.slice(cursorPosition);
    
    const newText = `${textBeforeCursor.slice(0, lastAtSymbol)}@${user.name} ${textAfterCursor}`;
    setNewNote(newText);
    setShowMentions(false);
    setMentionedUsers([...mentionedUsers, user.id]);
    
    if (textareaRef.current) {
      const newCursorPosition = lastAtSymbol + user.name.length + 2; // +2 for @ and space
      textareaRef.current.focus();
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = newCursorPosition;
          textareaRef.current.selectionEnd = newCursorPosition;
        }
      }, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote({
        text: newNote,
        mentions: mentionedUsers
      });
      setNewNote('');
      setMentionedUsers([]);
    }
  };

  // Close mentions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (textareaRef.current && !textareaRef.current.contains(e.target as Node)) {
        setShowMentions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Anotações do Fluxo</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="flex space-x-3">
              {note.createdBy.avatar ? (
                <img
                  src={note.createdBy.avatar}
                  alt={note.createdBy.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
              )}
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {note.createdBy.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(note.createdAt), {
                        addSuffix: true,
                        locale: ptBR
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-1 whitespace-pre-wrap">
                    {note.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={newNote}
              onChange={handleInput}
              placeholder="Digite sua anotação... Use @ para mencionar alguém"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kai-primary focus:border-transparent resize-none"
              rows={3}
            />

            {showMentions && (
              <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => insertMention(user)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-400" />
                    )}
                    <span>{user.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={!newNote.trim()}
              className="px-4 py-2 bg-kai-primary text-white rounded-lg hover:bg-kai-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}