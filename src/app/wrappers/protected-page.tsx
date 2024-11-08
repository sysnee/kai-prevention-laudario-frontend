'use client'
import { signIn, useSession } from "next-auth/react";

export default function ProtectedPage({ children }: { children: React.ReactNode, }) {
  const { status } = useSession({
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
      {children}
    </div>
  )
}