 "use client"
import { login } from "@/services/authService";
import { getAuthToken } from "@/utils/cookies";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  useEffect(() => {
    if (getAuthToken()) {
      router.push('/dashboard');
    }
  }, [router]);

  if (getAuthToken()) {
    return null; // Ou um spinner de carregamento enquanto redireciona
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login({ email, password });
      
      // Armazenar o token no cookie
      document.cookie = `auth-token=${token}; path=/;`;

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setError('Login falhou. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {error && <div className="mt-4 text-center text-red-600">{error}</div>}
        <div className="mt-6 text-center">
          <a href="/registrar" className="text-sm text-blue-600 hover:underline">
            Não tem uma conta? Faça seu cadastro.
          </a>
        </div>
      </div>
    </div>
  );
}
