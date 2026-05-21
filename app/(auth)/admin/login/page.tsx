import Link from 'next/link';
import { LoginForm } from '@/app/(auth)/admin/login/login-form';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md">
        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]"
        >
          Atelier Zero Barber
        </Link>
        <h1 className="font-display mt-8 text-5xl leading-none">
          Painel reservado.
        </h1>
        <p className="mt-4 text-sm leading-6 text-neutral-700">
          Acesse para gerenciar agenda, serviços, barbeiros e horários.
        </p>
        <LoginForm />
      </Card>
    </main>
  );
}
