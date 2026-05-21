import Link from 'next/link';
import { logoutAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';

const links = [
  ['Dashboard', '/admin'],
  ['Agendamentos', '/admin/appointments'],
  ['Barbeiros', '/admin/barbers'],
  ['Serviços', '/admin/services'],
  ['Produtos', '/admin/products'],
  ['Horários', '/admin/availability'],
];

export function AdminNav() {
  return (
    <header className="border-b border-neutral-950 bg-[#f8f0e3] px-6 py-5 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link
          href="/admin"
          className="text-xs font-bold uppercase tracking-[0.34em]"
        >
          Atelier Admin
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-[#8a3d2b]">
              {label}
            </Link>
          ))}
          <form action={logoutAction}>
            <Button variant="ghost" className="min-h-0 px-2 py-1 text-xs">
              Sair
            </Button>
          </form>
        </nav>
      </div>
    </header>
  );
}
