import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

type AdminImageCardProps = {
  imageUrl?: string | null;
  children: ReactNode;
  className?: string;
};

export function AdminImageCard({
  imageUrl,
  children,
  className = '',
}: AdminImageCardProps) {
  return (
    <Card className={`relative overflow-hidden shadow-none ${className}`}>
      {imageUrl ? (
        <>
          <div
            className="admin-card-image absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf7ef] via-[#fbf7ef]/95 to-[#fbf7ef]/50" />
        </>
      ) : null}
      <div className="relative z-10">{children}</div>
    </Card>
  );
}
