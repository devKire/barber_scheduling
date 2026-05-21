import { EditorialBarbers } from '@/components/editorial/editorial-barbers';
import { EditorialFooter } from '@/components/editorial/editorial-footer';
import { EditorialHero } from '@/components/editorial/editorial-hero';
import { EditorialServices } from '@/components/editorial/editorial-services';
import { EditorialShell } from '@/components/editorial/editorial-shell';
import { EditorialTicker } from '@/components/editorial/editorial-ticker';
import { FinalCta } from '@/components/editorial/final-cta';
import { HeadroomHeader } from '@/components/editorial/headroom-header';
import { MethodProcess } from '@/components/editorial/method-process';
import { TestimonialsAtmosphere } from '@/components/editorial/testimonials-atmosphere';
import { TopBarEditorial } from '@/components/editorial/topbar-editorial';
import { formatCurrency } from '@/lib/money';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [barbers, services] = await Promise.all([
    prisma.barber.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      take: 6,
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        bio: true,
      },
    }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
      take: 12,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
        duration: true,
      },
    }),
  ]);

  const editorialServices = services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.description,
    priceLabel: formatCurrency(service.price),
    durationLabel: `${service.duration} min`,
    imageUrl: service.imageUrl,
  }));

  const editorialBarbers = barbers.map((barber) => ({
    id: barber.id,
    name: barber.name,
    bio: barber.bio,
    avatarUrl: barber.avatarUrl,
  }));

  return (
    <EditorialShell>
      {/* 1. Topbar editorial */}
      <TopBarEditorial barberCount={editorialBarbers.length} />

      {/* 2. Header sticky com headroom */}
      <HeadroomHeader />

      {/* 3-4. Side rails decorativos + hero editorial */}
      <EditorialHero
        barberCount={editorialBarbers.length}
        serviceCount={editorialServices.length}
      />

      {/* 5. Marquee / ticker editorial */}
      <EditorialTicker />

      {/* 6. Serviços */}
      <EditorialServices services={editorialServices} />

      {/* 7. Barbeiros */}
      <EditorialBarbers barbers={editorialBarbers} />

      {/* 8. Método / processo */}
      <MethodProcess />

      {/* 9. Depoimentos / atmosfera */}
      <TestimonialsAtmosphere />

      {/* 10. CTA final */}
      <FinalCta />

      {/* 11. Footer editorial */}
      <EditorialFooter />
    </EditorialShell>
  );
}
