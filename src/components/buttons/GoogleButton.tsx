"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      <Image
        src="/google.svg"
        alt="Google logo"
        width={20}
        height={20}
      />
      Continuar con Google
    </button>
  );
} 