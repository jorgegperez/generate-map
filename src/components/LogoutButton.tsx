"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-accent hover:bg-accent-hover text-white py-2 px-4 rounded-md transition-colors duration-200"
    >
      Cerrar Sesión
    </button>
  );
}
