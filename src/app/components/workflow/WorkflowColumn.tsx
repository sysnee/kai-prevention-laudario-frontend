import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '@mui/material';
import { borderBottom } from '@mui/system';

interface WorkflowColumnProps {
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  children: React.ReactNode;
  count: number;
}

export function WorkflowColumn({ title, icon: Icon, color, description, children, count }: WorkflowColumnProps) {
  const theme = useTheme();

  return (
    <div 
      className="bg-gradient-to-b from-pure-white to-frost-white rounded-xl shadow-lg h-full"
      style={{
        border: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
      }}
    >
      <div 
        className="p-4 bg-gradient-to-r from-pure-white to-ice-white"
        style={{
          borderBottom: theme.palette.mode === 'light' ? "1px solid rgba(229,231,235,255)" : "1px solid hsla(220, 20%, 25%, 0.6)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className={`p-2.5 bg-kai-primary/10 rounded-lg mr-3 transition-transform hover:scale-105`}>
              <Icon className={`w-5 h-5 text-kai-primary`} />
            </div>
            <div>
              <h3 className="font-medium text-kai-text-primary">{title}</h3>
              <p className="text-sm text-kai-text-secondary">{description}</p>
            </div>
          </div>
          <span className="inline-flex items-center justify-center w-7 h-7 text-sm font-medium text-kai-primary bg-kai-primary/10 rounded-full">
            {count}
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin scrollbar-thumb-kai-primary/20 scrollbar-track-transparent">
        {children}
      </div>
    </div>
  );
}