"use client";

import { Chip } from '@mui/material';

interface StatusChipProps {
  isActive: boolean;
}

export default function StatusChip({ isActive }: StatusChipProps) {
  return (
    <Chip
      label={isActive ? 'Active' : 'Inactive'}
      color={isActive ? 'success' : 'default'}
      size="small"
    />
  );
}