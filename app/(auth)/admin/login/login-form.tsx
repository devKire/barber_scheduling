'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ActionResult } from '@/lib/types';

const initialState: ActionResult<{ redirectTo: string }> = { ok: true };

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <Input
        name="password"
        type="password"
        placeholder="Senha administrativa"
      />
      {!state.ok ? (
        <p className="text-sm text-[#8a3d2b]">{state.error}</p>
      ) : null}
      <Button disabled={isPending} className="w-full">
        {isPending ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}
