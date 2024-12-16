'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const theme = createTheme({
    // Suas customizações de tema aqui
})

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minuto
                retry: 1,
                refetchOnWindowFocus: false
            }
        }
    }))

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
} 