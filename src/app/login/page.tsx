"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleLogin() {
    // futuramente você coloca autenticação real aqui
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#52555A]">
      <div className="bg-[#56767D] w-[350px] p-10 rounded-3xl shadow-xl flex flex-col gap-6">
        <h1 className="text-center text-xl font-semibold text-white">
          Login
        </h1>

        <label className="text-white">
          User:
          <input
            type="text"
            className="w-full mt-1 p-2 bg-[#1C1E22] text-white rounded-xl outline-none"
          />
        </label>

        <label className="text-white">
          Senha:
          <input
            type="password"
            className="w-full mt-1 p-2 bg-[#1C1E22] text-white rounded-xl outline-none"
          />
        </label>

        <button
          onClick={handleLogin}
          className="mt-2 bg-black text-white w-full py-2 rounded-xl hover:bg-gray-900 transition"
        >
          Entrar
        </button>
      </div>
    </main>
  );
}
