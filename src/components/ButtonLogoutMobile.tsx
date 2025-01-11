"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    
    <Button className="mt-5" onClick={() => signOut()}>
      Sign out
    </Button>
  );
}
