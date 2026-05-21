import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'barber_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function getSecret() {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret';
}

function signPayload(payload: string) {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

export function createSessionToken() {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${signPayload(payload)}`;
}

export function verifySessionToken(token?: string) {
  if (!token) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  const [role, expiresAt, signature] = parts;
  if (role !== 'admin' || Number(expiresAt) < Date.now()) {
    return false;
  }

  return safeEqual(signature, signPayload(`${role}.${expiresAt}`));
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function requireAdmin() {
  if (!(await getAdminSession())) {
    redirect('/admin/login');
  }
}
