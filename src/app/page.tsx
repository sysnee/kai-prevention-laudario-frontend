'use client'
import { SessionProvider } from "next-auth/react";
import Dashboard from "./dashboard/page";

export default function Public(){
  
  return (
    <SessionProvider>
        <Dashboard />
    </SessionProvider>
  );
}
