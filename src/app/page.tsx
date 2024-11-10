'use client'
import { SessionProvider } from "next-auth/react";
import Home from "./home";
import BaseLayout from "./components/BaseLayout";


export default function Public({
  session,
}: {
  children: React.ReactNode,
  session: any
}){

  return (
    <SessionProvider session={session}>
      <BaseLayout>
        <Home />
      </BaseLayout>
    </SessionProvider>
  );
}
