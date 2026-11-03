import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  CheckCircle2,
  Clock,
  Info,
  Loader2,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { createReservation, listAdditionals, listVehicles } from "@/lib/api";
import { brl, daysBetween, shortDate } from "@/lib/format";
import { company, RENTAL_LOCATIONS } from "@/lib/env";
import type { CatalogAdditional, Vehicle } from "@/lib/types";
import {
  buildDirectReservationWhatsAppMessage,
  buildDirectReservationWhatsAppUrl,
  DirectReservationOptionalItem,
} from "@/lib/checkout";
import { cn } from "@/lib/utils";
import { DateRangePicker } from "@/components/site/DateRangePicker";

interface Search {
  inicio?: string;
  fim?: string;
  horaInicio?: string;
  horaFim?: string;
  localRetirada?: string;
  localDevolucao?: string;
  categoria?: string;
  veiculo?: string;
}

export const Route = createFileRoute("/reserva")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    ...(typeof s["inicio"] === "string" ? { inicio: s["inicio"] } : {}),
    ...(typeof s["fim"] === "string" ? { fim: s["fim"] } : {}),
    ...(typeof s["horaInicio"] === "string" ? { horaInicio: s["horaInicio"] } : {}),
    ...(typeof s["horaFim"] === "string" ? { horaFim: s["horaFim"] } : {}),
    ...(typeof s["localRetirada"] === "string" ? { localRetirada: s["localRetirada"] } : {}),
    ...(typeof s["localDevolucao"] === "string" ? { localDevolucao: s["localDevolucao"] } : {}),
    ...(typeof s["categoria"] === "string" ? { categoria: s["categoria"] } : {}),
    ...(typeof s["veiculo"] === "string" ? { veiculo: s["veiculo"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Solicitar Locação pelo WhatsApp | Sol & Mar Rent a Car" },
      {
        name: "description",
        content:
          "Escolha datas, horários, locais, veículo e opcionais em Fortaleza. Envie suas preferências diretamente pelo WhatsApp da Sol & Mar Rent a Car.",
      },
      { property: "og:title", content: "Solicitar Locação | Sol & Mar Rent a Car" },
      {
        property: "og:description",
        content:
          "Monte sua solicitação de locação e continue diretamente pelo WhatsApp da Sol & Mar Rent a Car (+55 85 99974-3558).",
      },
    ],
  }),
  component: ReservationFlow,
});

const STEPS = ["Dados da locação", "Escolha do veículo", "Opcionais", "Revisão e WhatsApp"];

const HOURS = [
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "21:00",
  "22:00",
];

const inputClass =
  "h-12 w-full rounded-xl border border-input bg-surface px-4 text-sm text-foreground outline-none transition-colors focus:border-primary sm:text-base";

function ReservationFlow() {
  const search = Route.useSearch();
  const topAnchorRef = useRef<HTMLDivElement>(null);

  // Carrega lista de veículos
  const { data: vehicles = [], isLoading: isLoadingVehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: listVehicles,
  });

  // Carrega opcionais ativos cadastrados pela locadora
  const { data: catalogAdditionals = [], isLoading: isLoadingAdditionals } = useQuery({
    queryKey: ["additionals", "active"],
    queryFn: () => listAdditionals(true),
  });

  const activeVehicles = useMemo(() => vehicles.filter((v) => v.active), [vehicles]);

  // Identifica se o cliente veio com um veículo já pré-selecionado (Fluxo B)
  const initialVehicleId = search.veiculo ?? null;
  const [vehicleId, setVehicleId] = useState<string | null>(initialVehicleId);

  // Etapa atual:
  // FLUXO A (sem veículo inicial): Começa em 0 (Dados da locação) -> 1 (Veículo) -> 2 (Opcionais) -> 3 (Contato) -> 4 (Revisão)
  // FLUXO B (com veículo pré-selecionado): Começa em 0 (Dados da locação) -> Pula 1 direto para 2 (Opcionais) -> 3 -> 4
  const [step, setStep] = useState(0);

  // Rolagem suave para o topo do formulário a cada mudança de etapa
  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        if (topAnchorRef.current) {
          topAnchorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 220, behavior: "smooth" });
        }
      }, 50);
    }
  };

  // Requisito 1: Cada nova reserva começa com estado limpo, sem datas fictícias ou resíduos de reservas anteriores.
  // Somente utiliza datas se tiverem sido explicitamente passadas nos parâmetros da URL.
  const [start, setStart] = useState<string>(search.inicio ? search.inicio : "");
  const [startTime, setStartTime] = useState<string>(search.horaInicio ? search.horaInicio : "");
  const [end, setEnd] = useState<string>(search.fim ? search.fim : "");
  const [endTime, setEndTime] = useState<string>(search.horaFim ? search.horaFim : "");

  const [pickupLocation, setPickupLocation] = useState<string>(
    search.localRetirada && search.localRetirada.trim().length > 0
      ? search.localRetirada
      : company.defaultPickupLocation,
  );
  const [returnLocation, setReturnLocation] = useState<string>(
    search.localDevolucao && search.localDevolucao.trim().length > 0
      ? search.localDevolucao
      : company.defaultPickupLocation,
  );

  // Etapa 3: Quantidade selecionada de cada opcional (map de ID para quantidade)
  const [optionalQuantities, setOptionalQuantities] = useState<Record<string, number>>({});

  const chosenVehicle = useMemo(
    () => vehicles.find((v) => v.id === vehicleId) ?? null,
    [vehicles, vehicleId],
  );

  // Cálculo de diárias (somente quando ambas as datas estiverem preenchidas)
  const hasBothDates = Boolean(start && end);
  const calculatedDays = useMemo(() => {
    if (!start || !end) return 0;
    const diff = daysBetween(start, end);
    return Math.max(1, diff);
  }, [start, end]);

  // Validação da Etapa 1 (Datas, horários e consistência)
  const isPeriodValid = useMemo(() => {
    if (!start || !end) return false;
    if (!startTime || !endTime) return false;
    if (end < start) return false;
    if (end === start && endTime <= startTime) return false;
    return true;
  }, [start, end, startTime, endTime]);

  // Identifica se um item é serviço único/cobertura (máximo 1 unidade)
  const isSingleUnitItem = (opt: CatalogAdditional): boolean => {
    const lower = opt.name.toLowerCase();
    return (
      lower.includes("condutor adicional") ||
      lower.includes("proteção") ||
      lower.includes("protecao") ||
      lower.includes("seguro") ||
      lower.includes("cobertura")
    );
  };

  // Limite máximo permitido por opcional
  const getItemMaxLimit = (opt: CatalogAdditional): number => {
    if (isSingleUnitItem(opt)) return 1;
    if (
      typeof opt.stock_quantity === "number" &&
      opt.stock_quantity > 0 &&
      opt.stock_quantity < 99
    ) {
      return Math.min(opt.stock_quantity, 4);
    }
    return 4;
  };

  const getQuantity = (id: string): number => {
    return optionalQuantities[id] || 0;
  };

  const updateQuantity = (id: string, delta: number, maxLimit: number) => {
    setOptionalQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, Math.min(maxLimit, current + delta));
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  // Lista dos opcionais selecionados com quantidade > 0 e subtotais calculados
  const chosenAdditionalsList = useMemo<DirectReservationOptionalItem[]>(() => {
    const list: DirectReservationOptionalItem[] = [];
    for (const opt of catalogAdditionals) {
      const qty = optionalQuantities[opt.id] || 0;
      if (qty > 0) {
        const itemSubtotal =
          calculatedDays > 0
            ? opt.type === "per_day"
              ? opt.price * qty * calculatedDays
              : opt.price * qty
            : opt.price * qty;

        list.push({
          id: opt.id,
          name: opt.name,
          price: opt.price,
          type: opt.type,
          quantity: qty,
          total: itemSubtotal,
        });
      }
    }
    return list;
  }, [optionalQuantities, catalogAdditionals, calculatedDays]);

  // Subtotal financeiro de todos os opcionais
  const optionalsSubtotal = useMemo(() => {
    return chosenAdditionalsList.reduce((acc, item) => acc + (item.total || 0), 0);
  }, [chosenAdditionalsList]);

  // Quantidade total de unidades físicas/serviços de opcionais (ex: 2 cadeirinhas + 1 bebê = 3 unidades)
  const totalOptionalUnits = useMemo(() => {
    return chosenAdditionalsList.reduce((acc, item) => acc + item.quantity, 0);
  }, [chosenAdditionalsList]);

  const vehicleDailyRate = chosenVehicle ? chosenVehicle.daily_rate : 0;
  const dailySubtotal = vehicleDailyRate * calculatedDays;
  const rentalTotal = dailySubtotal + optionalsSubtotal;

  // Parâmetros para a mensagem oficial do WhatsApp (sem emojis, completa e precisa)
  const whatsappParams = useMemo(() => {
    const vehicleExactName = chosenVehicle ? chosenVehicle.name : "Veículo a definir";

    return {
      vehicleName: vehicleExactName,
      vehicleCategory: chosenVehicle?.category,
      days: calculatedDays,
      startDateFormatted: start ? shortDate(start) : "",
      startTime: startTime || "09:00",
      endDateFormatted: end ? shortDate(end) : "",
      endTime: endTime || "09:00",
      pickupLocation: pickupLocation || company.defaultPickupLocation,
      returnLocation: returnLocation || company.defaultPickupLocation,
      dailyRate: vehicleDailyRate,
      dailySubtotal,
      optionalsSubtotal,
      rentalTotal,
      optionals: chosenAdditionalsList,
    };
  }, [
    chosenVehicle,
    calculatedDays,
    start,
    startTime,
    end,
    endTime,
    pickupLocation,
    returnLocation,
    vehicleDailyRate,
    dailySubtotal,
    optionalsSubtotal,
    rentalTotal,
    chosenAdditionalsList,
  ]);

  const whatsappUrl = useMemo(() => {
    return buildDirectReservationWhatsAppUrl(whatsappParams);
  }, [whatsappParams]);

  // Limpa todos os dados para iniciar uma nova reserva limpa e independente
  const handleStartFreshReservation = () => {
    setStart("");
    setEnd("");
    setStartTime("");
    setEndTime("");
    setVehicleId(null);
    setOptionalQuantities({});
    setPickupLocation(company.defaultPickupLocation);
    setReturnLocation(company.defaultPickupLocation);
    goToStep(0);
    toast.info("Nova reserva iniciada com formulário limpo.");
  };

  // Ação ao avançar da Etapa 0 (Dados da Locação)
  const handleAdvanceFromLocationStep = () => {
    if (!isPeriodValid) {
      toast.error("Preencha as datas e horários de retirada e devolução para continuar.");
      return;
    }

    // Se o cliente já escolheu um veículo (Fluxo B), avança direto para a Etapa 2 (Opcionais)
    if (chosenVehicle) {
      goToStep(2);
    } else {
      // Fluxo A: Avança para a Etapa 1 (Escolha do veículo)
      goToStep(1);
    }
  };

  // Ação ao selecionar um veículo na Etapa 1 (Fluxo A)
  const handleSelectVehicle = (id: string) => {
    setVehicleId(id);
    // Avança suavemente para a Etapa 2 (Opcionais) conforme Requisito 3
    goToStep(2);
  };

  // Registro assíncrono para o painel administrativo interno (/admin)
  const registerReservationMutation = useMutation({
    mutationFn: async () => {
      if (!chosenVehicle) return null;
      return createReservation({
        vehicle_id: chosenVehicle.id,
        start_date: start,
        end_date: end,
        start_time: startTime || "09:00",
        end_time: endTime || "09:00",
        pickup_location: pickupLocation,
        return_location: returnLocation,
        additionals: chosenAdditionalsList.map((a) => {
          const opt = catalogAdditionals.find((c) => c.name === a.name);
          return {
            id: opt?.id ?? a.name,
            name: a.name,
            price: opt?.price ?? 0,
            type: opt?.type ?? "per_rental",
            total: a.total ?? 0,
          };
        }),
        customer: {
          name: "Cliente WhatsApp",
        },
      });
    },
    onError: () => {
      // Erro secundário de log no painel não bloqueia a conversa no WhatsApp
    },
  });

  const handleProceedToWhatsApp = () => {
    try {
      registerReservationMutation.mutate();
    } catch {
      // Continua para abrir o WhatsApp
    }
    toast.success("Abrindo WhatsApp...");
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Solicitação Direta via WhatsApp"
        title={
          <>
            Simule sua locação em <span className="italic text-primary">Fortaleza</span>
          </>
        }
        description="Escolha seu veículo, datas, locais e opcionais. Ao final, abra a conversa diretamente pelo WhatsApp oficial com a mensagem pronta para atendimento."
      />

      <section ref={topAnchorRef} className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        {/* Banner informativo quando o cliente já selecionou um veículo diretamente da frota (Fluxo B) */}
        {chosenVehicle && step === 0 ? (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/30 bg-primary/10 p-4">
            <div className="flex items-center gap-3">
              {chosenVehicle.images[0] ? (
                <img
                  src={chosenVehicle.images[0]}
                  alt={chosenVehicle.name}
                  className="h-12 w-16 rounded-lg object-cover bg-surface"
                />
              ) : (
                <div className="grid h-12 w-16 place-items-center rounded-lg bg-surface text-primary">
                  <Car className="size-6" />
                </div>
              )}
              <div>
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-accent block">
                  Veículo pré-selecionado
                </span>
                <p className="font-bold text-foreground text-sm sm:text-base">
                  {chosenVehicle.name}{" "}
                  <span className="font-normal text-muted-foreground text-xs">
                    ({chosenVehicle.category || "Veículo"})
                  </span>
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" onClick={() => goToStep(1)} className="text-xs h-8">
              Trocar veículo
            </Button>
          </div>
        ) : null}

        {/* Barra de Progresso das Etapas */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground">
              Etapa {step + 1} de {STEPS.length}:{" "}
              <strong className="text-foreground">{STEPS[step]}</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStartFreshReservation}
              className="text-[0.72rem] text-muted-foreground hover:text-foreground h-7 gap-1"
            >
              <RotateCcw className="size-3" />
              Limpar dados e reiniciar
            </Button>
          </div>

          <ol className="grid grid-cols-4 gap-2">
            {STEPS.map((label, i) => (
              <li key={label} className="min-w-0">
                <button
                  type="button"
                  onClick={() => {
                    if (i < step) goToStep(i);
                  }}
                  disabled={i > step}
                  className={cn(
                    "w-full text-left transition-opacity",
                    i > step ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                  )}
                >
                  <div
                    className={cn(
                      "h-1.5 w-full rounded-full transition-colors duration-300",
                      i <= step ? "bg-primary" : "bg-border",
                    )}
                  />
                  <p
                    className={cn(
                      "mt-2 truncate text-[0.68rem] font-medium sm:text-xs",
                      i === step
                        ? "font-semibold text-primary"
                        : i < step
                          ? "text-foreground"
                          : "text-muted-foreground",
                    )}
                  >
                    <span className="hidden sm:inline">{i + 1}. </span>
                    {label}
                  </p>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* ============================================================ */}
        {/* ETAPA 1: DADOS DA LOCAÇÃO                                     */}
        {/* ============================================================ */}
        {step === 0 ? (
          <div className="glass-panel animate-in fade-in space-y-6 rounded-3xl p-6 shadow-elevate sm:p-8">
            <div className="border-b border-border/70 pb-4">
              <h2 className="text-xl font-semibold sm:text-2xl text-foreground">
                1. Onde e quando você precisa do veículo?
              </h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Selecione as datas e horários de retirada e devolução, além dos locais desejados em
                Fortaleza.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Local de Retirada */}
              <label className="flex flex-col gap-1.5 text-xs text-muted-foreground sm:col-span-2">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <MapPin className="size-4 text-primary" />
                  Local de Retirada *
                </span>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className={inputClass}
                >
                  {RENTAL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </label>

              {/* Período da locação interativo com DateRangePicker com suporte a campos limpos */}
              <div className="sm:col-span-2">
                <DateRangePicker
                  start={start}
                  end={end}
                  onChangeRange={(s, e) => {
                    setStart(s);
                    setEnd(e);
                  }}
                  startTime={startTime}
                  endTime={endTime}
                  onChangeStartTime={(t) => setStartTime(t)}
                  onChangeEndTime={(t) => setEndTime(t)}
                  hours={HOURS}
                />
              </div>

              {/* Local de Devolução */}
              <label className="flex flex-col gap-1.5 text-xs text-muted-foreground sm:col-span-2">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <MapPin className="size-4 text-primary" />
                  Local de Devolução *
                </span>
                <select
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className={inputClass}
                >
                  {RENTAL_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Alertas orientativos caso datas ou horários não estejam completos */}
            {!start || !end ? (
              <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground">
                <Info className="size-4 shrink-0 text-primary" />
                <span>Clique no campo acima para selecionar as datas de retirada e devolução.</span>
              </div>
            ) : !startTime || !endTime ? (
              <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground">
                <Clock className="size-4 shrink-0 text-primary" />
                <span>Selecione os horários de retirada e devolução para continuar.</span>
              </div>
            ) : !isPeriodValid ? (
              <div className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                <span>A data e horário de devolução devem ser posteriores aos da retirada.</span>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-5">
              <div className="text-xs text-muted-foreground">
                <span>Período calculado: </span>
                <strong className="text-foreground">
                  {hasBothDates && isPeriodValid
                    ? `${calculatedDays} diária(s)`
                    : "Aguardando seleção"}
                </strong>
              </div>

              <Button
                variant="hero"
                size="lg"
                disabled={!isPeriodValid}
                onClick={handleAdvanceFromLocationStep}
              >
                {chosenVehicle ? (
                  <>
                    Avançar para opcionais
                    <ArrowRight className="size-4" />
                  </>
                ) : (
                  <>
                    Avançar para escolha do veículo
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : null}

        {/* ============================================================ */}
        {/* ETAPA 2: ESCOLHA DO VEÍCULO                                   */}
        {/* ============================================================ */}
        {step === 1 ? (
          <div className="animate-in fade-in space-y-6">
            <div className="glass-panel flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold sm:text-2xl text-foreground">
                  2. Selecione o veículo desejado
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {start && end ? (
                    <>
                      {shortDate(start)} ({startTime}) → {shortDate(end)} ({endTime}) ·{" "}
                      <strong className="text-foreground">{calculatedDays} diária(s)</strong>
                    </>
                  ) : (
                    "Escolha o veículo para a sua viagem"
                  )}
                </p>
              </div>
              <Button variant="glass" size="sm" onClick={() => goToStep(0)}>
                Alterar período ou locais
              </Button>
            </div>

            {isLoadingVehicles ? (
              <div className="flex justify-center py-20">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {activeVehicles.map((v) => {
                  const isSelected = vehicleId === v.id;
                  const estimatedForVehicle =
                    calculatedDays > 0 ? v.daily_rate * calculatedDays : 0;

                  return (
                    <div
                      key={v.id}
                      onClick={() => handleSelectVehicle(v.id)}
                      className={cn(
                        "card-hover group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card p-4 transition-all",
                        isSelected
                          ? "border-primary ring-2 ring-primary/60 bg-surface/90"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      <div className="flex gap-4">
                        {v.cover_image || v.images[0] ? (
                          <img
                            src={v.cover_image || v.images[0]}
                            alt={v.name}
                            className="h-24 w-32 shrink-0 rounded-xl object-cover bg-surface-2"
                          />
                        ) : (
                          <div className="grid h-24 w-32 shrink-0 place-items-center rounded-xl bg-surface-2 text-xs text-muted-foreground">
                            <Car className="size-6 text-muted-foreground/60" />
                          </div>
                        )}

                        <div className="flex flex-1 flex-col justify-between py-0.5">
                          <div>
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[0.68rem] font-bold tracking-wider text-accent uppercase">
                                {v.category || "Veículo"}
                              </span>
                              {isSelected ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[0.68rem] font-bold text-primary">
                                  <Check className="size-3" /> Selecionado
                                </span>
                              ) : null}
                            </div>
                            <h3 className="font-bold text-foreground text-sm sm:text-base mt-0.5">
                              {v.name}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {[
                                v.transmission,
                                v.fuel,
                                v.passengers ? `${v.passengers} lugares` : null,
                                v.year ? `Ano ${v.year}` : null,
                              ]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                          </div>

                          <div className="mt-2 flex items-baseline justify-between border-t border-border/50 pt-1.5">
                            <span className="text-[0.68rem] text-muted-foreground">
                              {v.daily_rate > 0 ? `${brl(v.daily_rate)}/dia` : "Tarifa"}
                            </span>
                            <span className="font-semibold text-primary text-sm sm:text-base">
                              {v.daily_rate > 0 && estimatedForVehicle > 0
                                ? brl(estimatedForVehicle)
                                : "Consulte a diária"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between gap-4 border-t border-border/70 pt-6">
              <Button variant="glass" size="lg" onClick={() => goToStep(0)}>
                <ArrowLeft className="size-4" /> Voltar aos dados da locação
              </Button>
              <Button variant="hero" size="lg" disabled={!vehicleId} onClick={() => goToStep(2)}>
                Avançar para opcionais
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        ) : null}

        {/* ============================================================ */}
        {/* ETAPA 3: OPCIONAIS DISPONÍVEIS                                */}
        {/* ============================================================ */}
        {step === 2 && chosenVehicle ? (
          <div className="animate-in fade-in space-y-8">
            <div className="border-b border-border/70 pb-4">
              <h2 className="text-xl font-bold sm:text-2xl text-foreground">
                3. Opcionais desejados
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                Selecione os itens opcionais e defina as quantidades para sua locação. Se não
                precisar de nenhum item, basta avançar.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.35fr_1.05fr]">
              {/* Lista de Opcionais Reais do Catálogo */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
                    Itens e Acessórios Cadastrados
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {chosenAdditionalsList.length} item(ns) · {totalOptionalUnits} unidade(s)
                  </span>
                </div>

                <div className="space-y-3.5">
                  {isLoadingAdditionals ? (
                    <div className="py-8 text-center text-xs text-muted-foreground">
                      Carregando opcionais disponíveis...
                    </div>
                  ) : catalogAdditionals.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground bg-card">
                      Nenhum opcional cadastrado no momento. Você pode prosseguir normalmente.
                    </div>
                  ) : (
                    catalogAdditionals.map((opt) => {
                      const qty = getQuantity(opt.id);
                      const maxLimit = getItemMaxLimit(opt);
                      const isSelected = qty > 0;
                      const itemSubtotal =
                        calculatedDays > 0
                          ? opt.type === "per_day"
                            ? opt.price * qty * calculatedDays
                            : opt.price * qty
                          : opt.price * qty;

                      return (
                        <div
                          key={opt.id}
                          className={cn(
                            "flex flex-col gap-3 rounded-2xl border p-4.5 transition-all bg-card",
                            isSelected
                              ? "border-primary bg-primary/5 ring-1 ring-primary/40 shadow-xs"
                              : "border-border/90 hover:border-primary/40",
                          )}
                        >
                          {/* Cabeçalho do Cartão: Nome e Preço Unitário */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-foreground text-sm sm:text-base leading-snug">
                                {opt.name}
                              </h4>
                              {opt.description ? (
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                  {opt.description}
                                </p>
                              ) : null}
                            </div>

                            <div className="text-right shrink-0">
                              <span className="inline-block text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                                {brl(opt.price)}
                                <span className="text-[0.68rem] font-normal text-muted-foreground ml-1">
                                  {opt.type === "per_day" ? "por unidade/dia" : "por unidade"}
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Linha de Controles: Seletor [-] QTD [+] e Subtotal Calculado */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
                            {/* Controles de Quantidade */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                Quantidade:
                              </span>
                              <div className="inline-flex items-center rounded-xl border border-input bg-surface p-1 shadow-xs">
                                <button
                                  type="button"
                                  aria-label={`Diminuir quantidade de ${opt.name}`}
                                  disabled={qty === 0}
                                  onClick={() => updateQuantity(opt.id, -1, maxLimit)}
                                  className="grid size-7 place-items-center rounded-lg text-foreground hover:bg-surface-2 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                >
                                  <Minus className="size-3.5 stroke-[2.5]" />
                                </button>
                                <span className="w-8 text-center text-xs sm:text-sm font-bold text-foreground">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Aumentar quantidade de ${opt.name}`}
                                  disabled={qty >= maxLimit}
                                  onClick={() => updateQuantity(opt.id, 1, maxLimit)}
                                  className="grid size-7 place-items-center rounded-lg text-foreground hover:bg-surface-2 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                >
                                  <Plus className="size-3.5 stroke-[2.5]" />
                                </button>
                              </div>
                              {maxLimit === 1 ? (
                                <span className="text-[0.68rem] text-muted-foreground italic">
                                  (serviço único)
                                </span>
                              ) : (
                                <span className="text-[0.68rem] text-muted-foreground italic">
                                  (máx. {maxLimit} unids.)
                                </span>
                              )}
                            </div>

                            {/* Subtotal compacto associado à quantidade */}
                            <div className="text-right">
                              {qty > 0 ? (
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-xs text-muted-foreground">
                                    {opt.type === "per_day"
                                      ? `Subtotal (${qty}x · ${calculatedDays} d):`
                                      : `Subtotal (${qty}x):`}
                                  </span>
                                  <span className="text-sm font-bold text-primary">
                                    {brl(itemSubtotal)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  Não selecionado
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Resumo do Veículo Escolhido */}
              <div className="glass-panel space-y-5 rounded-3xl p-6 sm:p-7 shadow-elevate h-fit border border-border/90">
                <div className="flex items-center justify-between border-b border-border/70 pb-3">
                  <h3 className="text-base font-bold text-foreground">Veículo Selecionado</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => goToStep(1)}
                    className="text-xs h-7 text-primary hover:text-primary"
                  >
                    Trocar veículo
                  </Button>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-surface/60 p-3.5 border border-border/60">
                  {chosenVehicle.images[0] ? (
                    <img
                      src={chosenVehicle.images[0]}
                      alt={chosenVehicle.name}
                      className="size-16 rounded-xl object-cover bg-surface-2 shrink-0 ring-1 ring-border/50"
                    />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.68rem] font-bold text-accent uppercase tracking-wider">
                      {chosenVehicle.category}
                    </p>
                    <p className="font-bold text-sm sm:text-base text-foreground truncate">
                      {chosenVehicle.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Diária base:{" "}
                      <strong className="text-foreground font-semibold">
                        {chosenVehicle.daily_rate > 0
                          ? `${brl(chosenVehicle.daily_rate)}/dia`
                          : "Sob consulta"}
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Diárias ({calculatedDays}x)</span>
                    <span className="text-foreground font-semibold">
                      {chosenVehicle.daily_rate > 0 ? brl(dailySubtotal) : "Sob consulta"}
                    </span>
                  </div>

                  {/* Opcionais com identificação de cada item e quantidade */}
                  {chosenAdditionalsList.length > 0 ? (
                    <div className="space-y-2 border-t border-border/60 pt-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">
                          Opcionais ({chosenAdditionalsList.length}{" "}
                          {chosenAdditionalsList.length === 1 ? "item" : "itens"},{" "}
                          {totalOptionalUnits} {totalOptionalUnits === 1 ? "unidade" : "unidades"}):
                        </span>
                        <span className="font-bold text-primary">+{brl(optionalsSubtotal)}</span>
                      </div>
                      <ul className="space-y-1.5 pl-1">
                        {chosenAdditionalsList.map((item) => (
                          <li
                            key={item.id || item.name}
                            className="flex items-start justify-between gap-2 text-xs"
                          >
                            <span className="text-muted-foreground leading-snug">
                              • {item.name}{" "}
                              <strong className="text-foreground font-medium">
                                ({item.quantity} {item.quantity === 1 ? "unidade" : "unidades"})
                              </strong>
                            </span>
                            <span className="text-foreground font-semibold shrink-0">
                              {brl(item.total || 0)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Total estimado proporcional (sem "Sob consulta" gigante) */}
                  <div className="rounded-2xl bg-surface/90 border border-primary/25 p-4 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">Total Estimado</span>
                      {chosenVehicle.daily_rate > 0 ? (
                        <span className="font-display text-xl sm:text-2xl font-bold text-primary">
                          {brl(rentalTotal)}
                        </span>
                      ) : (
                        <div className="text-right">
                          <span className="text-sm sm:text-base font-bold text-foreground">
                            Sob consulta
                          </span>
                          {optionalsSubtotal > 0 ? (
                            <span className="block text-[0.7rem] text-primary font-medium">
                              +{brl(optionalsSubtotal)} opcionais
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="xl"
                  className="w-full font-bold shadow-gold text-sm sm:text-base h-12"
                  onClick={() => goToStep(3)}
                >
                  Avançar para revisão
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between gap-4 border-t border-border/70 pt-6">
              <Button
                variant="glass"
                size="lg"
                onClick={() => {
                  // Se veio do Fluxo B (com veículo pré-selecionado), voltar vai para a Etapa 0
                  if (initialVehicleId) {
                    goToStep(0);
                  } else {
                    goToStep(1);
                  }
                }}
              >
                <ArrowLeft className="size-4" />{" "}
                {initialVehicleId ? "Voltar aos dados da locação" : "Voltar à escolha do veículo"}
              </Button>
              <Button variant="hero" size="lg" onClick={() => goToStep(3)}>
                Avançar para revisão <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        ) : null}

        {/* ============================================================ */}
        {/* ETAPA 4: REVISE SUA RESERVA E WHATSAPP                        */}
        {/* ============================================================ */}
        {step === 3 && chosenVehicle ? (
          <div className="animate-in fade-in space-y-6">
            <div className="glass-panel space-y-6 rounded-3xl p-6 shadow-elevate sm:p-8">
              <div className="border-b border-border/70 pb-4">
                <h2 className="text-xl font-bold sm:text-2xl text-foreground">
                  Revise sua reserva
                </h2>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  Confira as informações da sua locação antes de prosseguir para o atendimento pelo
                  WhatsApp.
                </p>
              </div>

              {/* Quadro Resumo das Escolhas */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Veículo & Dados da locação */}
                <div className="space-y-4">
                  {/* Veículo */}
                  <div className="space-y-2.5 rounded-2xl border border-border bg-card p-5 text-xs">
                    <p className="font-bold text-foreground text-sm border-b border-border/70 pb-2 flex items-center gap-2">
                      <Car className="size-4 text-primary" />
                      Veículo
                    </p>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-muted-foreground">Modelo escolhido:</span>
                      <strong className="text-foreground text-right">{chosenVehicle.name}</strong>
                    </div>
                    {chosenVehicle.category ? (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Categoria:</span>
                        <span className="text-foreground font-medium">
                          {chosenVehicle.category}
                        </span>
                      </div>
                    ) : null}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Diária base:</span>
                      <span className="text-foreground font-semibold">
                        {chosenVehicle.daily_rate > 0
                          ? `${brl(chosenVehicle.daily_rate)}/dia`
                          : "Sob consulta"}
                      </span>
                    </div>
                  </div>

                  {/* Dados da locação */}
                  <div className="space-y-2.5 rounded-2xl border border-border bg-card p-5 text-xs">
                    <p className="font-bold text-foreground text-sm border-b border-border/70 pb-2 flex items-center gap-2">
                      <Clock className="size-4 text-primary" />
                      Dados da locação
                    </p>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-muted-foreground">Retirada:</span>
                      <span className="text-foreground font-semibold text-right">
                        {start ? shortDate(start) : "A definir"} às {startTime || "09:00"}
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-muted-foreground">Local de retirada:</span>
                      <span className="text-foreground text-right max-w-[14rem]">
                        {pickupLocation}
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-muted-foreground">Devolução:</span>
                      <span className="text-foreground font-semibold text-right">
                        {end ? shortDate(end) : "A definir"} às {endTime || "09:00"}
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-muted-foreground">Local de devolução:</span>
                      <span className="text-foreground text-right max-w-[14rem]">
                        {returnLocation}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-border/60 pt-2 font-medium">
                      <span className="text-muted-foreground">Duração da locação:</span>
                      <span className="text-foreground font-bold">{calculatedDays} diária(s)</span>
                    </div>
                  </div>
                </div>

                {/* Opcionais e Resumo dos valores */}
                <div className="space-y-4">
                  {/* Opcionais: omitido completamente se não houver opcionais selecionados */}
                  {chosenAdditionalsList.length > 0 ? (
                    <div className="space-y-2.5 rounded-2xl border border-border bg-card p-5 text-xs">
                      <p className="font-bold text-foreground text-sm border-b border-border/70 pb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Sparkles className="size-4 text-primary" />
                          Opcionais
                        </span>
                        <span className="text-muted-foreground text-xs font-normal">
                          {totalOptionalUnits} {totalOptionalUnits === 1 ? "unidade" : "unidades"}
                        </span>
                      </p>
                      <ul className="space-y-2">
                        {chosenAdditionalsList.map((item) => (
                          <li
                            key={item.id || item.name}
                            className="flex items-start justify-between gap-2"
                          >
                            <span className="text-muted-foreground leading-snug">
                              • {item.name}{" "}
                              <strong className="text-foreground font-medium">
                                ({item.quantity} {item.quantity === 1 ? "unidade" : "unidades"})
                              </strong>
                            </span>
                            <span className="text-foreground font-semibold shrink-0">
                              {brl(item.total || 0)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {/* Resumo dos valores */}
                  <div className="space-y-2.5 rounded-2xl border border-border bg-card p-5 text-xs">
                    <p className="font-bold text-foreground text-sm border-b border-border/70 pb-2">
                      Resumo dos valores
                    </p>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Diárias do veículo ({calculatedDays}x):</span>
                      <span className="text-foreground font-semibold">
                        {chosenVehicle.daily_rate > 0 ? brl(dailySubtotal) : "Sob consulta"}
                      </span>
                    </div>

                    {chosenAdditionalsList.length > 0 ? (
                      <div className="flex justify-between items-center text-muted-foreground">
                        <span>Opcionais selecionados:</span>
                        <span className="text-foreground font-semibold">
                          +{brl(optionalsSubtotal)}
                        </span>
                      </div>
                    ) : null}

                    <div className="flex justify-between items-center border-t border-border/60 pt-2 text-sm font-bold text-foreground">
                      <span>Total estimado:</span>
                      {chosenVehicle.daily_rate > 0 ? (
                        <span className="text-base sm:text-lg font-bold text-primary">
                          {brl(rentalTotal)}
                        </span>
                      ) : (
                        <span className="text-sm sm:text-base font-bold text-foreground">
                          Sob consulta
                          {optionalsSubtotal > 0 ? ` (+ ${brl(optionalsSubtotal)})` : ""}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões da Parte Inferior: estritamente dois botões */}
              <div className="space-y-3 pt-4 border-t border-border/70">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleProceedToWhatsApp}
                  className="flex items-center justify-center gap-2.5 w-full rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base sm:text-lg h-14 px-8 shadow-lg shadow-emerald-600/20 transition-all text-center cursor-pointer"
                >
                  Continuar pelo WhatsApp
                </a>

                <Button
                  asChild
                  variant="ghost"
                  size="default"
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  <Link to="/">Voltar à página inicial</Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-start">
              <Button variant="ghost" size="sm" onClick={() => goToStep(2)} className="text-xs">
                <ArrowLeft className="size-3.5 mr-1" /> Voltar aos opcionais
              </Button>
            </div>
          </div>
        ) : null}
      </section>
    </SiteLayout>
  );
}
