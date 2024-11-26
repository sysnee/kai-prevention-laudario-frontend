'use client'

import * as React from 'react';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import MainGrid from './components/MainGrid';
import ProtectedPage from '../wrappers/protected-page';

export default function Dashboard() {
  return (
    <ProtectedPage>
      <MainGrid />
    </ProtectedPage>
  );
}
