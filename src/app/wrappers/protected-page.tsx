'use client'
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProtectedPage({ children }: { children: React.ReactNode, }) {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('auth0')
    },
  })

  if (status === "loading") {
    return <>loading...</>
  }

  return (
    <div>
      <div className="background-white" style={{ maxWidth: '300px', overflowX: 'scroll' }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      {children}
    </div>
  )
}