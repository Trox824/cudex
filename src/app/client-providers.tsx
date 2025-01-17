"use client";

import { SessionProvider } from "next-auth/react";
import { TRPCProvider } from "./providers";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <TRPCProvider>{children}</TRPCProvider>
    </SessionProvider>
  );
}
