import { prisma } from '@/lib/prisma';
import { AppointmentStatus } from '@prisma/client';
import { Decimal } from 'decimal.js';
import 'dotenv/config';

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // ---------------------------------------------------------------------------
  // Barbeiros
  // ---------------------------------------------------------------------------
  const barbers = await Promise.all([
    prisma.barber.upsert({
      where: { id: 'barber-1' },
      update: {},
      create: {
        id: 'barber-1',
        name: 'Carlos Silva',
        avatarUrl: 'https://i.pravatar.cc/150?img=11',
        bio: '10 anos de experiência em cortes clássicos e modernos. Especialista em degradê e barba.',
        isActive: true,
      },
    }),
    prisma.barber.upsert({
      where: { id: 'barber-2' },
      update: {},
      create: {
        id: 'barber-2',
        name: 'Rafael Souza',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
        bio: 'Especializado em cortes navalhados e design de barba. Formado pela Escola Brasileira de Barbearia.',
        isActive: true,
      },
    }),
    prisma.barber.upsert({
      where: { id: 'barber-3' },
      update: {},
      create: {
        id: 'barber-3',
        name: 'Lucas Mendes',
        avatarUrl: 'https://i.pravatar.cc/150?img=13',
        bio: 'Jovem talento com foco em cortes modernos e coloração masculina.',
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${barbers.length} barbeiros criados.`);

  // ---------------------------------------------------------------------------
  // Disponibilidade (Seg–Sex 09:00–19:00 | Sáb 09:00–17:00)
  // ---------------------------------------------------------------------------
  const weekdays = [1, 2, 3, 4, 5]; // Segunda a Sexta
  const availabilityData = barbers.flatMap((barber) => [
    ...weekdays.map((day) => ({
      barberId: barber.id,
      dayOfWeek: day,
      startTime: '09:00',
      endTime: '19:00',
    })),
    {
      barberId: barber.id,
      dayOfWeek: 6, // Sábado
      startTime: '09:00',
      endTime: '17:00',
    },
  ]);

  for (const avail of availabilityData) {
    await prisma.availability.upsert({
      where: {
        barberId_dayOfWeek: {
          barberId: avail.barberId,
          dayOfWeek: avail.dayOfWeek,
        },
      },
      update: {},
      create: avail,
    });
  }

  console.log(`✅ Disponibilidade configurada para todos os barbeiros.`);

  // ---------------------------------------------------------------------------
  // Serviços
  // ---------------------------------------------------------------------------
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'service-1' },
      update: {},
      create: {
        id: 'service-1',
        name: 'Corte Masculino',
        description: 'Corte tradicional ou moderno com acabamento na navalha.',
        price: new Decimal('35.00'),
        duration: 30,
        imageUrl:
          'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400',
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-2' },
      update: {},
      create: {
        id: 'service-2',
        name: 'Barba',
        description: 'Modelagem e aparação de barba com toalha quente e óleo.',
        price: new Decimal('25.00'),
        duration: 20,
        imageUrl:
          'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-3' },
      update: {},
      create: {
        id: 'service-3',
        name: 'Corte + Barba',
        description:
          'Combo completo: corte masculino e barba com acabamento perfeito.',
        price: new Decimal('55.00'),
        duration: 50,
        imageUrl:
          'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-4' },
      update: {},
      create: {
        id: 'service-4',
        name: 'Degradê (Fade)',
        description: 'Especialidade em degradê americano, baixo ou médio.',
        price: new Decimal('40.00'),
        duration: 40,
        imageUrl:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-5' },
      update: {},
      create: {
        id: 'service-5',
        name: 'Hidratação Capilar',
        description:
          'Tratamento profundo com produtos premium para cabelos ressecados.',
        price: new Decimal('45.00'),
        duration: 30,
        imageUrl: null,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-6' },
      update: {},
      create: {
        id: 'service-6',
        name: 'Relaxamento',
        description:
          'Relaxamento capilar masculino com produtos de alta qualidade.',
        price: new Decimal('80.00'),
        duration: 60,
        imageUrl: null,
        isActive: false, // serviço pausado
      },
    }),
  ]);

  console.log(`✅ ${services.length} serviços criados.`);

  // ---------------------------------------------------------------------------
  // Produtos
  // ---------------------------------------------------------------------------
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 'product-1' },
      update: {},
      create: {
        id: 'product-1',
        name: 'Pomada Modeladora Matte',
        price: new Decimal('42.00'),
        imageUrl:
          'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400',
        isActive: true,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product-2' },
      update: {},
      create: {
        id: 'product-2',
        name: 'Óleo para Barba (30ml)',
        price: new Decimal('35.00'),
        imageUrl: null,
        isActive: true,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product-3' },
      update: {},
      create: {
        id: 'product-3',
        name: 'Shampoo Anticaspa Premium',
        price: new Decimal('28.00'),
        imageUrl: null,
        isActive: true,
      },
    }),
    prisma.product.upsert({
      where: { id: 'product-4' },
      update: {},
      create: {
        id: 'product-4',
        name: 'Balm Pós-Barba',
        price: new Decimal('32.00'),
        imageUrl: null,
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${products.length} produtos criados.`);

  // ---------------------------------------------------------------------------
  // Agendamentos de exemplo
  // ---------------------------------------------------------------------------

  // Agendamento 1 — CONFIRMED, apenas serviço
  await prisma.appointment.upsert({
    where: { id: 'appt-1' },
    update: {},
    create: {
      id: 'appt-1',
      customerName: 'João Pereira',
      customerPhone: '(47) 99123-4567',
      startTime: new Date('2025-07-10T09:00:00'),
      endTime: new Date('2025-07-10T09:30:00'),
      totalPrice: new Decimal('35.00'),
      status: AppointmentStatus.CONFIRMED,
      barberId: 'barber-1',
      services: {
        create: [
          {
            serviceId: 'service-1',
            priceAtTime: new Decimal('35.00'),
          },
        ],
      },
    },
  });

  // Agendamento 2 — CONFIRMED, combo + produto
  await prisma.appointment.upsert({
    where: { id: 'appt-2' },
    update: {},
    create: {
      id: 'appt-2',
      customerName: 'Marcos Lima',
      customerPhone: '(47) 98765-4321',
      startTime: new Date('2025-07-10T10:00:00'),
      endTime: new Date('2025-07-10T10:50:00'),
      totalPrice: new Decimal('87.00'),
      status: AppointmentStatus.CONFIRMED,
      barberId: 'barber-2',
      services: {
        create: [
          {
            serviceId: 'service-3',
            priceAtTime: new Decimal('55.00'),
          },
        ],
      },
      products: {
        create: [
          {
            productId: 'product-1',
            quantity: 1,
            priceAtTime: new Decimal('42.00'),
          },
        ],
      },
    },
  });

  // Agendamento 3 — COMPLETED
  await prisma.appointment.upsert({
    where: { id: 'appt-3' },
    update: {},
    create: {
      id: 'appt-3',
      customerName: 'Thiago Costa',
      customerPhone: '(47) 91234-5678',
      startTime: new Date('2025-07-09T14:00:00'),
      endTime: new Date('2025-07-09T14:40:00'),
      totalPrice: new Decimal('40.00'),
      status: AppointmentStatus.COMPLETED,
      barberId: 'barber-1',
      services: {
        create: [
          {
            serviceId: 'service-4',
            priceAtTime: new Decimal('40.00'),
          },
        ],
      },
    },
  });

  // Agendamento 4 — CANCELED
  await prisma.appointment.upsert({
    where: { id: 'appt-4' },
    update: {},
    create: {
      id: 'appt-4',
      customerName: 'Bruno Alves',
      customerPhone: '(47) 99876-5432',
      startTime: new Date('2025-07-11T11:00:00'),
      endTime: new Date('2025-07-11T11:20:00'),
      totalPrice: new Decimal('25.00'),
      status: AppointmentStatus.CANCELED,
      barberId: 'barber-3',
      services: {
        create: [
          {
            serviceId: 'service-2',
            priceAtTime: new Decimal('25.00'),
          },
        ],
      },
    },
  });

  // Agendamento 5 — PENDING, múltiplos serviços + produto
  await prisma.appointment.upsert({
    where: { id: 'appt-5' },
    update: {},
    create: {
      id: 'appt-5',
      customerName: 'Felipe Rodrigues',
      customerPhone: '(47) 98001-1234',
      startTime: new Date('2025-07-12T09:00:00'),
      endTime: new Date('2025-07-12T10:10:00'),
      totalPrice: new Decimal('132.00'),
      status: AppointmentStatus.PENDING,
      barberId: 'barber-2',
      services: {
        create: [
          {
            serviceId: 'service-3',
            priceAtTime: new Decimal('55.00'),
          },
          {
            serviceId: 'service-5',
            priceAtTime: new Decimal('45.00'),
          },
        ],
      },
      products: {
        create: [
          {
            productId: 'product-2',
            quantity: 1,
            priceAtTime: new Decimal('35.00'),
          },
          {
            productId: 'product-4',
            quantity: 1,
            priceAtTime: new Decimal('32.00'),
          },
        ],
      },
    },
  });

  console.log(`✅ 5 agendamentos de exemplo criados.`);
  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
