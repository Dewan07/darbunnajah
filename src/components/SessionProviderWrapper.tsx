"use client"; // Menandakan ini adalah komponen klien

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const SessionProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
