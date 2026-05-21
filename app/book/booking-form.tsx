'use client';

import {
  useActionState,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { createBookingAction, getSlotsAction } from '@/app/actions/booking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/money';
import type { ActionResult, BookingSlot } from '@/lib/types';
import Image from 'next/image';
import { SectionLabel } from '@/components/brand/section-label';

type BarberOption = {
  id: string;
  name: string;
  bio: string | null;
  avatarUrl: string | null;
};

type ServiceOption = {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  imageUrl: string | null;
};

type ProductOption = {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
};

const initialState: ActionResult<{ whatsappUrl: string }> = { ok: true };

export function BookingForm({
  barbers,
  services,
  products,
}: {
  barbers: BarberOption[];
  services: ServiceOption[];
  products: ProductOption[];
}) {
  const [barberId, setBarberId] = useState(barbers[0]?.id ?? '');
  const [serviceIds, setServiceIds] = useState<string[]>([]);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState<BookingSlot[] | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isLoadingSlots, startSlotTransition] = useTransition();
  const [state, formAction, isPending] = useActionState(
    createBookingAction,
    initialState
  );

  const selectedBarber = useMemo(
    () => barbers.find((barber) => barber.id === barberId),
    [barberId, barbers]
  );

  const selectedServices = useMemo(
    () => services.filter((service) => serviceIds.includes(service.id)),
    [serviceIds, services]
  );
  const selectedProducts = useMemo(
    () => products.filter((product) => productIds.includes(product.id)),
    [productIds, products]
  );
  const total =
    selectedServices.reduce((sum, service) => sum + service.price, 0) +
    selectedProducts.reduce((sum, product) => sum + product.price, 0);
  const duration = selectedServices.reduce(
    (sum, service) => sum + service.duration,
    0
  );

  useEffect(() => {
    if (!barberId || serviceIds.length === 0 || !date) {
      return;
    }

    startSlotTransition(async () => {
      const result = await getSlotsAction({ barberId, serviceIds, date });
      setSlots(result.ok ? (result.data ?? []) : []);
    });
  }, [barberId, date, serviceIds]);

  function toggleValue(
    value: string,
    current: string[],
    update: (next: string[]) => void
  ) {
    update(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  if (state.ok && state.data?.whatsappUrl) {
    return (
      <Card className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
          Pedido recebido
        </p>
        <h1 className="font-display mt-5 text-5xl leading-none">
          Falta só enviar no WhatsApp.
        </h1>
        <p className="mt-5 text-neutral-700">{state.message}</p>
        <a href={state.data.whatsappUrl} target="_blank" rel="noreferrer">
          <Button className="mt-8">Finalizar via WhatsApp</Button>
        </a>
      </Card>
    );
  }

  return (
    <>
      <section className="mb-14 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel>Agendamento</SectionLabel>
          <h1 className="font-display text-6xl leading-none tracking-[-0.05em] md:text-8xl">
            Escolha o ritmo do seu corte.
          </h1>
        </div>
        <p className="max-w-2xl self-end text-lg leading-8 text-neutral-700">
          Selecione barbeiro, serviços e horário. O pedido nasce pendente e a
          confirmação final acontece pelo WhatsApp.
        </p>
      </section>
      <form
        action={formAction}
        className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]"
      >
        <input type="hidden" name="barberId" value={barberId} />
        <input type="hidden" name="startsAt" value={selectedSlot} />
        {serviceIds.map((id) => (
          <input key={id} type="hidden" name="serviceIds" value={id} />
        ))}
        {productIds.map((id) => (
          <input key={id} type="hidden" name="productIds" value={id} />
        ))}

        <div className="space-y-8">
          <section>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
              01 / Barbeiro
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {barbers.map((barber) => (
                <button
                  key={barber.id}
                  type="button"
                  onClick={() => {
                    setBarberId(barber.id);
                    setSelectedSlot('');
                    setSlots(null);
                  }}
                  className={`relative overflow-hidden border p-5 text-left transition ${
                    barberId === barber.id
                      ? 'border-neutral-950 bg-neutral-950 text-stone-50'
                      : 'border-neutral-300 hover:border-neutral-950'
                  }`}
                >
                  {barberId !== barber.id && barber.avatarUrl ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${barber.avatarUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#fbf7ef] via-[#fbf7ef]/95 to-[#fbf7ef]/50" />
                    </>
                  ) : barberId !== barber.id ? (
                    <div className="absolute inset-0 bg-[#fbf7ef]" />
                  ) : null}
                  <span className="relative z-10 font-display text-3xl">
                    {barber.name}
                  </span>
                  {barber.bio ? (
                    <span className="relative z-10 mt-3 block text-sm opacity-75">
                      {barber.bio}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
              02 / Serviços
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    toggleValue(service.id, serviceIds, setServiceIds);
                    setSelectedSlot('');
                    setSlots(null);
                  }}
                  className={`relative overflow-hidden border p-5 text-left transition ${
                    serviceIds.includes(service.id)
                      ? 'border-neutral-950 bg-neutral-950 text-stone-50'
                      : 'border-neutral-300 hover:border-neutral-950'
                  }`}
                >
                  {!serviceIds.includes(service.id) ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${service.imageUrl})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#fbf7ef] via-[#fbf7ef]/95 to-[#fbf7ef]/50" />
                    </>
                  ) : null}
                  <span className="relative z-10 font-display block text-3xl text-coral">
                    {service.name}
                  </span>
                  <span className="relative z-10 mt-3 block text-sm opacity-75">
                    {service.duration} min · {formatCurrency(service.price)}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {products.length > 0 ? (
            <section>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
                03 / Extras
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() =>
                      toggleValue(product.id, productIds, setProductIds)
                    }
                    className={`relative overflow-hidden border px-4 py-3 text-left text-sm transition ${
                      productIds.includes(product.id)
                        ? 'border-neutral-950 bg-neutral-950 text-stone-50'
                        : 'border-neutral-300 hover:border-neutral-950'
                    }`}
                  >
                    {!productIds.includes(product.id) ? (
                      <>
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${product.imageUrl})`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf7ef] via-[#fbf7ef]/95 to-[#fbf7ef]/50" />
                      </>
                    ) : null}
                    <span className="relative z-10">{product.name}</span>
                    <span className="relative z-10 block opacity-75">
                      {formatCurrency(product.price)}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <section>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
              04 / Data e horário
            </p>
            <Input
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(event) => {
                setDate(event.target.value);
                setSelectedSlot('');
                setSlots(null);
              }}
            />
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {isLoadingSlots ? (
                <p className="col-span-full text-sm text-neutral-600">
                  Carregando horários...
                </p>
              ) : slots && slots.length > 0 ? (
                slots.map((slot) => (
                  <button
                    key={slot.startsAt}
                    type="button"
                    onClick={() => setSelectedSlot(slot.startsAt)}
                    className={`relative overflow-hidden border px-4 py-3 text-sm transition ${
                      selectedSlot === slot.startsAt
                        ? 'border-neutral-950 bg-neutral-950 text-stone-50'
                        : 'border-neutral-300 hover:border-neutral-950'
                    }`}
                  >
                    {selectedSlot !== slot.startsAt ? (
                      <>
                        <div className="absolute inset-0 bg-[#fbf7ef]" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf7ef] via-[#fbf7ef]/95 to-[#fbf7ef]/50" />
                      </>
                    ) : null}
                    <span className="relative z-10">{slot.label}</span>
                  </button>
                ))
              ) : (
                <p className="col-span-full text-sm text-neutral-600">
                  Escolha barbeiro, serviço e data para ver horários.
                </p>
              )}
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.24em]">
                Nome completo
              </label>
              <Input name="customerName" placeholder="Seu nome" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.24em]">
                WhatsApp
              </label>
              <Input name="customerPhone" placeholder="(00) 00000-0000" />
            </div>
          </section>

          {!state.ok ? (
            <p className="border border-[#8a3d2b] bg-[#8a3d2b]/10 p-4 text-sm text-[#8a3d2b]">
              {state.error}
            </p>
          ) : null}
        </div>

        <aside className="h-fit border border-neutral-950 bg-[#fbf7ef] p-6 lg:sticky lg:top-8">
          <div className="relative h-48 w-full overflow-hidden">
            {selectedBarber?.avatarUrl ? (
              <Image
                src={selectedBarber.avatarUrl}
                alt={selectedBarber.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 400px"
              />
            ) : (
              <div className="h-full w-full bg-neutral-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-neutral-950/20" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
                Seu barbeiro
              </p>
              <h3 className="font-display text-2xl text-stone-50">
                {selectedBarber?.name ?? 'Selecione um barbeiro'}
              </h3>
            </div>
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.32em] text-[#8a3d2b]">
            Resumo
          </p>
          <h2 className="font-display mt-4 text-4xl">Seu horário</h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4 border-b border-neutral-200 pb-3">
              <dt>Duração</dt>
              <dd>{duration} min</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-neutral-200 pb-3">
              <dt>Serviços</dt>
              <dd>{selectedServices.length}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-neutral-200 pb-3">
              <dt>Extras</dt>
              <dd>{selectedProducts.length}</dd>
            </div>
            <div className="flex justify-between gap-4 text-lg font-semibold">
              <dt>Total</dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
          </dl>
          <Button className="mt-8 w-full" disabled={isPending || !selectedSlot}>
            {isPending ? 'Finalizando...' : 'Finalizar via WhatsApp'}
          </Button>
        </aside>
      </form>
    </>
  );
}
