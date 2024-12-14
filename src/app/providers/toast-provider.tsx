'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position='bottom-right'
      toastOptions={{
        style: {
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))'
        },
        className: 'text-foreground'
      }}
    />
  )
}
