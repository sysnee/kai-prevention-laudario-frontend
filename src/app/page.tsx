'use client'
import { SessionProvider } from "next-auth/react";
import Home from "./home";
import BaseLayout from "./components/BaseLayout";

export default function Public(){

  return (
    <SessionProvider>
      <BaseLayout>
        <Home />
      </BaseLayout>
    </SessionProvider>
  );
}
