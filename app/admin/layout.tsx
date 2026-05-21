import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/admin-nav';
import { getAdminSession } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await getAdminSession();

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen">
      <AdminNav />
      {children}
    </div>
  );
}
