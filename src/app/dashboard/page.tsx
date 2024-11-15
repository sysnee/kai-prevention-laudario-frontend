'use client'

import * as React from 'react';
import type { } from '@mui/x-date-pickers/themeAugmentation';
import type { } from '@mui/x-charts/themeAugmentation';
import type { } from '@mui/x-data-grid/themeAugmentation';
import type { } from '@mui/x-tree-view/themeAugmentation';
import MainGrid from './components/MainGrid';

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <MainGrid />
  );
}
