import { SideRails } from './side-rails';

export function EditorialShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="editorial-home relative overflow-hidden bg-paper text-ink">
      <SideRails />
      {children}
    </main>
  );
}
