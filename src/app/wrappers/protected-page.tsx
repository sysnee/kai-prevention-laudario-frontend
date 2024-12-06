'use client'
import { CircularProgress, Stack } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

export default function ProtectedPage({ children }: { children: React.ReactNode, }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('auth0')
    },
  })

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center" style={{ height: '100vh' }}>
        <Stack className="text-center" spacing={3}>
          <div className="items-center">
            <CircularProgress />
          </div>
          <Stack>
            <h1 className='text-2xl'>Radiological Information System</h1>
            <h2 className='text-sm opacity-75'>KAI Prevention Center</h2>
          </Stack>
        </Stack>
      </div>
    )
  }

  return (
    <div>
      {/* <div style={{ maxWidth: '300px', overflowX: 'scroll' }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div> */}
      {children}
    </div>
  )
}