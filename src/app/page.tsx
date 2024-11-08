'use client'
import { SessionProvider } from "next-auth/react";
import Home from "./home";


export default function Public({
  session,
}: {
  children: React.ReactNode,
  session: any
}){

  return (
    <SessionProvider session={session}>
      <Home />
    </SessionProvider>
  );
}
