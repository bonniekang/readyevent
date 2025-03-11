"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Client() {
  const { data: session } = useSession();

  return session ? (
    <button onClick={() => signOut()}>Sign out</button>
  ) : (
    <button onClick={() => signIn("google")}>Sign in</button>
  );
}
