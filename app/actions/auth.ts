'use server';

import { redirect } from 'next/navigation';
import { clearAdminSession, setAdminSession } from '@/lib/auth';
import type { ActionResult } from '@/lib/types';

export async function loginAction(
  _previousState: ActionResult<{ redirectTo: string }>,
  formData: FormData
): Promise<ActionResult<{ redirectTo: string }>> {
  const password = formData.get('password');

  if (typeof password !== 'string' || password.length === 0) {
    return { ok: false, error: 'Informe a senha.' };
  }

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return { ok: false, error: 'Senha inválida.' };
  }

  await setAdminSession();
  redirect('/admin');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/login');
}
