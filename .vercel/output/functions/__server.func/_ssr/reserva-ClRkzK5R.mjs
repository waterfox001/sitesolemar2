import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { $ as ArrowLeft, A as Info, E as LoaderCircle, H as CircleAlert, K as Check, Q as ArrowRight, R as Copy, S as MapPin, V as CircleCheck, b as MessageCircle, q as Car, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, b as todayISO, c as brl, d as company, f as daysBetween, m as longDate, n as PageHero, s as addDaysISO, t as Button, u as cn } from "./SiteLayout-Do4h_GJx.mjs";
import { c as listVehicles, o as listAdditionals, t as createReservation } from "./api-CTawiNw0.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./reserva-Dl_Kq-GN.mjs";
import { t as DateRangePicker } from "./DateRangePicker-Cws5I0xU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reserva-ClRkzK5R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
/**
* Prepara e valida a sessão de checkout de uma reserva recém-criada.
*
* FUTURA INTEGRAÇÃO:
* Quando o proprietário definir a plataforma de pagamento (ex.: Mercado Pago, PagBank, etc.),
* insira a chamada de criação de preferência/cobrança dentro desta função:
*
* ```ts
* if (gatewayCredentialsAvailable) {
*   const preference = await createPaymentGatewaySession({
*     external_reference: reservation.code,
*     items: [...],
*     preauthorization: reservation.deposit_amount, // se suportado pelo gateway
*   });
*   return { ... result, ready: true, checkoutUrl: preference.init_point };
* }
* ```
*/
async function preparePaymentCheckoutSession(reservation, vehicle, customer) {
	const breakdown = {
		reservationId: reservation.id,
		reservationCode: reservation.code,
		vehicleName: vehicle.name,
		vehicleCategory: vehicle.category,
		days: reservation.days,
		periodText: `${longDate(reservation.start_date)} às ${reservation.start_time || "09:00"} até ${longDate(reservation.end_date)} às ${reservation.end_time || "09:00"}`,
		pickupLocation: reservation.pickup_location || company.defaultPickupLocation,
		returnLocation: reservation.return_location || company.defaultPickupLocation,
		dailyRate: vehicle.daily_rate,
		dailySubtotal: reservation.daily_subtotal ?? reservation.days * vehicle.daily_rate,
		additionals: reservation.additionals || [],
		additionalsSubtotal: reservation.additionals_subtotal ?? 0,
		rentalTotal: reservation.rental_total,
		depositAmount: reservation.deposit_amount ?? vehicle.deposit_amount ?? 0,
		advancePaymentAmount: reservation.advance_payment_amount ?? 0,
		balanceOnPickup: reservation.balance_on_pickup ?? reservation.rental_total,
		customerName: customer.name,
		customerPhone: customer.phone,
		customerEmail: customer.email
	};
	return {
		ready: false,
		reservationCode: reservation.code,
		status: "pendente_checkout",
		providerConfigured: false,
		providerName: null,
		checkoutUrl: null,
		message: "Reserva provisória registrada com sucesso no catálogo. A confirmação e as instruções de garantia/pagamento serão combinadas diretamente com a equipe da Sol & Mar.",
		breakdown
	};
}
/**
* Gera a mensagem estruturada oficial para encaminhamento pelo WhatsApp
* apresentando cada valor discriminado conforme solicitado pela locadora.
*/
function buildReservationWhatsAppMessage(breakdown) {
	const { reservationCode, vehicleName, vehicleCategory, days, periodText, pickupLocation, returnLocation, dailyRate, dailySubtotal, additionals, additionalsSubtotal, rentalTotal, depositAmount, advancePaymentAmount, balanceOnPickup, customerName, customerPhone, customerEmail } = breakdown;
	const lines = [
		`*SOL & MAR RENT A CAR — RESERVA PROVISÓRIA REGISTRADA*`,
		`Código da Reserva: *${reservationCode}*`,
		`Status: *Pendente de Confirmação*`,
		``,
		`*1. VEÍCULO ESCOLHIDO:*`,
		`• Modelo: *${vehicleName}*${vehicleCategory ? ` (${vehicleCategory})` : ""}`,
		dailyRate > 0 ? `• Diária base: ${brl(dailyRate)}/dia` : `• Diária base: A consultar com a equipe`,
		``,
		`*2. PERÍODO DA LOCAÇÃO:*`,
		`• Período: ${periodText}`,
		`• Quantidade de diárias: *${days} diária(s)*`,
		`• Local de retirada: ${pickupLocation}`,
		`• Local de devolução: ${returnLocation}`,
		``,
		`*3. OPCIONAIS SELECIONADOS:*`
	];
	if (additionals.length > 0) {
		for (const opt of additionals) lines.push(`• ${opt.name} (${opt.type === "per_day" ? `${brl(opt.price)}/dia` : `${brl(opt.price)} taxa única`}): ${brl(opt.total)}`);
		lines.push(`• Subtotal de opcionais: ${brl(additionalsSubtotal)}`);
	} else lines.push(`• Nenhum opcional selecionado.`);
	lines.push(``);
	lines.push(`*4. DISCRIMINAÇÃO DOS VALORES:*`);
	if (dailyRate > 0) {
		lines.push(`• Diárias do veículo (${days}x): ${brl(dailySubtotal)}`);
		if (additionalsSubtotal > 0) lines.push(`• Opcionais selecionados: +${brl(additionalsSubtotal)}`);
		lines.push(`• *Valor Total da Locação:* *${brl(rentalTotal)}*`);
	} else lines.push(`• Valor da locação: Diária sob consulta com a equipe`);
	lines.push(``);
	lines.push(`*5. GARANTIA DA LOCAÇÃO (CAUÇÃO):*`);
	if (depositAmount > 0) {
		lines.push(`• *Caução Exigida:* *${brl(depositAmount)}*`);
		lines.push(`• *Nota sobre a caução:* Bloqueio temporário (pré-autorização) no cartão de crédito na retirada, liberado integralmente após a devolução do veículo sem avarias ou multas. Não é uma cobrança definitiva.`);
	} else lines.push(`• Caução de garantia: A combinar no atendimento (bloqueio no cartão de crédito na retirada).`);
	lines.push(``);
	lines.push(`*6. CONDIÇÕES DE PAGAMENTO:*`);
	if (advancePaymentAmount > 0) {
		lines.push(`• *Valor antecipado para reserva:* ${brl(advancePaymentAmount)}`);
		lines.push(`• *Saldo restante da locação a pagar na retirada:* ${brl(balanceOnPickup)}`);
	} else {
		lines.push(`• *Valor a pagar antecipadamente:* R$ 0,00 (isenção de sinal antecipado)`);
		if (dailyRate > 0) lines.push(`• *Saldo da locação a acertar na retirada:* ${brl(balanceOnPickup)}`);
		else lines.push(`• *Saldo da locação a acertar na retirada:* A combinar no atendimento`);
	}
	lines.push(``);
	lines.push(`*7. DADOS DO CLIENTE:*`);
	lines.push(`• Nome completo: ${customerName}`);
	lines.push(`• Telefone / WhatsApp: ${customerPhone}`);
	if (customerEmail) lines.push(`• E-mail: ${customerEmail}`);
	lines.push(``);
	lines.push(`_Aguardando conferência e validação da equipe da Sol & Mar Rent a Car (${company.phoneInternational})._`);
	return lines.join("\n");
}
var _jsxFileName = "/app/applet/src/routes/reserva.tsx?tsr-split=component";
var STEPS = [
	"Dados da locação",
	"Escolha do veículo",
	"Revisão e opcionais",
	"Seus dados",
	"Revisão e envio"
];
var HOURS = [
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
	"22:00"
];
var inputClass = "h-12 w-full rounded-xl border border-input bg-surface px-4 text-sm text-foreground outline-none transition-colors focus:border-primary sm:text-base";
function ReservationFlow() {
	const search = Route.useSearch();
	const initialStep = search.veiculo ? 1 : 0;
	const [step, setStep] = (0, import_react.useState)(initialStep);
	const [start, setStart] = (0, import_react.useState)(search.inicio ?? todayISO());
	const [startTime, setStartTime] = (0, import_react.useState)(search.horaInicio ?? "09:00");
	const [end, setEnd] = (0, import_react.useState)(search.fim ?? addDaysISO(todayISO(), 3));
	const [endTime, setEndTime] = (0, import_react.useState)(search.horaFim ?? "09:00");
	const [pickupLocation, setPickupLocation] = (0, import_react.useState)(search.localRetirada ?? company.defaultPickupLocation);
	const [returnLocation, setReturnLocation] = (0, import_react.useState)(search.localDevolucao ?? company.defaultPickupLocation);
	const [vehicleId, setVehicleId] = (0, import_react.useState)(search.veiculo ?? null);
	const [selectedOptionals, setSelectedOptionals] = (0, import_react.useState)([]);
	const [customer, setCustomer] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		notes: ""
	});
	const [confirmedSession, setConfirmedSession] = (0, import_react.useState)(null);
	const { data: vehicles = [], isLoading: isLoadingVehicles } = useQuery({
		queryKey: ["vehicles"],
		queryFn: listVehicles
	});
	const { data: catalogAdditionals = [], isLoading: isLoadingAdditionals } = useQuery({
		queryKey: ["additionals", "active"],
		queryFn: () => listAdditionals(true)
	});
	const activeVehicles = (0, import_react.useMemo)(() => vehicles.filter((v) => v.active), [vehicles]);
	const chosenVehicle = (0, import_react.useMemo)(() => vehicles.find((v) => v.id === vehicleId) ?? null, [vehicles, vehicleId]);
	const rawDays = daysBetween(start, end);
	const calculatedDays = rawDays < 1 ? 1 : rawDays;
	const optionalsSubtotal = (0, import_react.useMemo)(() => {
		return selectedOptionals.reduce((acc, id) => {
			const opt = catalogAdditionals.find((o) => o.id === id);
			if (!opt) return acc;
			return acc + (opt.type === "per_day" ? opt.price * calculatedDays : opt.price);
		}, 0);
	}, [
		selectedOptionals,
		catalogAdditionals,
		calculatedDays
	]);
	const vehicleDailyRate = chosenVehicle ? chosenVehicle.daily_rate : 0;
	const dailySubtotal = vehicleDailyRate * calculatedDays;
	const rentalTotal = dailySubtotal + optionalsSubtotal;
	const depositAmount = chosenVehicle?.deposit_amount ?? 0;
	const advancePaymentAmount = 0;
	const balanceOnPickup = rentalTotal;
	const isPeriodValid = (0, import_react.useMemo)(() => {
		if (!start || !end) return false;
		if (end < start) return false;
		if (end === start && endTime <= startTime) return false;
		return true;
	}, [
		start,
		end,
		startTime,
		endTime
	]);
	const isCustomerValid = (0, import_react.useMemo)(() => {
		const validName = customer.name.trim().length >= 3;
		const validPhone = customer.phone.replace(/\D/g, "").length >= 10;
		const validEmail = !customer.email.trim() || /\S+@\S+\.\S+/.test(customer.email.trim());
		return validName && validPhone && validEmail;
	}, [customer]);
	const toggleOptional = (id) => {
		setSelectedOptionals((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
	};
	const finalizeReservationMutation = useMutation({
		mutationFn: async () => {
			if (!chosenVehicle) throw new Error("Selecione um veículo");
			const selectedList = selectedOptionals.map((id) => catalogAdditionals.find((o) => o.id === id)).filter((o) => Boolean(o)).map((o) => ({
				id: o.id,
				name: o.name,
				price: o.price,
				type: o.type
			}));
			const { reservation, vehicle } = await createReservation({
				vehicle_id: chosenVehicle.id,
				start_date: start,
				end_date: end,
				start_time: startTime,
				end_time: endTime,
				pickup_location: pickupLocation,
				return_location: returnLocation,
				additionals: selectedList,
				advance_payment_amount: advancePaymentAmount,
				customer: {
					name: customer.name.trim(),
					phone: customer.phone.trim(),
					email: customer.email.trim() || void 0,
					notes: customer.notes.trim() || void 0
				}
			});
			return await preparePaymentCheckoutSession(reservation, vehicle, {
				id: reservation.customer_id,
				name: customer.name.trim(),
				phone: customer.phone.trim(),
				email: customer.email.trim() || null,
				created_at: reservation.created_at
			});
		},
		onSuccess: (session) => {
			setConfirmedSession(session);
			toast.success("Reserva provisória registrada com sucesso!");
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Erro ao processar reserva.");
		}
	});
	const quoteCode = (0, import_react.useMemo)(() => {
		return `SM-COT-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
	}, []);
	const generateWhatsAppMessage = () => {
		const optNames = selectedOptionals.map((id) => DEMO_OPTIONALS.find((o) => o.id === id)?.name).filter(Boolean).join(", ");
		return [
			`*SOLICITAÇÃO DE ORÇAMENTO — SOL & MAR RENT A CAR*`,
			`Protocolo: ${quoteCode}`,
			``,
			`*Dados da Locação em Fortaleza:*`,
			`• Retirada: ${longDate(start)} às ${startTime}`,
			`• Local Retirada: ${pickupLocation}`,
			`• Devolução: ${longDate(end)} às ${endTime}`,
			`• Local Devolução: ${returnLocation}`,
			`• Período: ${calculatedDays} diária(s)`,
			``,
			`*Veículo Selecionado:*`,
			`• Veículo: ${chosenVehicle?.name ?? "Não especificado"}${chosenVehicle?.category ? ` (${chosenVehicle.category})` : ""}`,
			vehicleDailyRate > 0 ? `• Diária: ${brl(vehicleDailyRate)}` : `• Diária: Consulte a diária (a confirmar com a equipe)`,
			optNames ? `• Opcionais selecionados: ${optNames}` : `• Opcionais: Nenhum`,
			vehicleDailyRate > 0 ? `• Total estimado: ${brl(totalEstimated)}` : `• Total: A confirmar com a equipe`,
			``,
			`*Dados do Solicitante:*`,
			`• Nome: ${customer.name}`,
			`• WhatsApp: ${customer.phone}`,
			`• E-mail: ${customer.email}`,
			customer.notes.trim() ? `• Observações: ${customer.notes.trim()}` : "",
			``,
			`_Obs: Solicitação de orçamento e disponibilidade sujeita à confirmação pela equipe da Sol & Mar Rent a Car._`
		].filter(Boolean).join("\n");
	};
	const handleSendToWhatsApp = () => {
		const message = generateWhatsAppMessage();
		setSubmittedMessage(message);
		const url = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
		window.open(url, "_blank");
		toast.success("Solicitação pronta! Redirecionando para o WhatsApp da Sol & Mar...");
	};
	if (confirmedSession) {
		const b = confirmedSession.breakdown;
		const whatsappText = buildReservationWhatsAppMessage(b);
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-panel animate-in fade-in space-y-6 rounded-3xl border border-border p-6 shadow-elevate sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid size-16 place-items-center rounded-3xl bg-amber-500/15 text-amber-500 border border-amber-500/30",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-9 stroke-[2.2]" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 195,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "mt-4 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-500",
								children: "Reserva Provisória Registrada · Aguardando Confirmação"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-2 text-2xl font-display font-bold text-foreground sm:text-3xl",
								children: ["Protocolo: #", b.reservationCode]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-xs text-muted-foreground sm:text-sm max-w-lg",
								children: "Sua reserva provisória foi registrada com sucesso no sistema da Sol & Mar Rent a Car. A unidade deste modelo foi pré-reservada para o período informado."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 193,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-border bg-card p-5 space-y-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-bold text-foreground text-sm border-b border-border/70 pb-2",
								children: "Resumo Discriminado da Reserva"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[0.68rem] text-muted-foreground uppercase font-bold block",
										children: "1. Veículo Escolhido"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-bold text-foreground text-sm mt-0.5",
										children: b.vehicleName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 19
									}, this),
									b.vehicleCategory ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-accent font-semibold text-[0.7rem]",
										children: ["Categoria: ", b.vehicleCategory]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 221,
										columnNumber: 40
									}, this) : null
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[0.68rem] text-muted-foreground uppercase font-bold block",
										children: [
											"2. Período da Locação (",
											b.days,
											" diárias)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 227,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-medium text-foreground mt-0.5",
										children: b.periodText
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 230,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-muted-foreground text-[0.7rem] mt-0.5",
										children: ["Retirada: ", b.pickupLocation]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 231,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border-t border-border/70 pt-3 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											"3. Valor das diárias (",
											b.days,
											"x ",
											brl(b.dailyRate),
											"):"
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 240,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-semibold text-foreground",
											children: brl(b.dailySubtotal)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 243,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 239,
										columnNumber: 17
									}, this),
									b.additionals.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
												"4. Opcionais selecionados (",
												b.additionals.length,
												" item[ns]):"
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 248,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-foreground",
												children: ["+", brl(b.additionalsSubtotal)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 249,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 247,
											columnNumber: 21
										}, this), b.additionals.map((opt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between pl-3 text-[0.7rem] text-muted-foreground/80",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
												"• ",
												opt.name,
												" (",
												opt.type === "per_day" ? `${brl(opt.price)}/dia` : "taxa única",
												"):"
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 254,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: brl(opt.total) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 258,
												columnNumber: 25
											}, this)]
										}, opt.id, true, {
											fileName: _jsxFileName,
											lineNumber: 253,
											columnNumber: 47
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 246,
										columnNumber: 45
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "4. Opcionais:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 261,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Nenhum opcional selecionado" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 262,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 260,
										columnNumber: 28
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between border-t border-border/60 pt-2 text-sm font-bold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Valor Total da Locação:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 266,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-primary text-base",
											children: brl(b.rentalTotal)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 267,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 265,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 238,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-1 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between font-bold text-amber-500",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 275,
											columnNumber: 21
										}, this), "5. Caução de Garantia da Locação:"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 274,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm",
										children: b.depositAmount > 0 ? brl(b.depositAmount) : "A combinar na retirada"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 278,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 273,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[0.72rem] text-amber-300/90 leading-relaxed",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Importante:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 283,
											columnNumber: 19
										}, this),
										" A caução é uma garantia temporária exigida para a locação deste veículo e funciona como um",
										" ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "bloqueio (pré-autorização) de limite no cartão de crédito" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 285,
											columnNumber: 19
										}, this),
										" no ato da retirada. O valor ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "é liberado integralmente" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 286,
											columnNumber: 40
										}, this),
										" após a devolução do veículo sem avarias. ",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Não é cobrança definitiva nem antecipada." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 287,
											columnNumber: 40
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 282,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl border border-border/80 bg-surface/50 p-3.5 space-y-1.5 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "6. Valor a pagar antecipadamente para reservar:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 294,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-bold text-foreground",
											children: [brl(b.advancePaymentAmount), " (R$ 0,00)"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 295,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 293,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between font-bold text-foreground border-t border-border/60 pt-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "7. Valor restante da locação a acertar na retirada:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 300,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-primary font-semibold",
											children: brl(b.balanceOnPickup)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 301,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 299,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-[0.68rem] text-muted-foreground pt-1",
										children: "* Formas de pagamento aceitas na retirada: PIX, cartão de crédito ou débito."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 303,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 292,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border-t border-border/70 pt-3 text-[0.72rem] text-muted-foreground flex flex-wrap gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Cliente:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 311,
											columnNumber: 19
										}, this),
										" ",
										b.customerName
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 310,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "WhatsApp:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 314,
											columnNumber: 19
										}, this),
										" ",
										b.customerPhone
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 313,
										columnNumber: 17
									}, this),
									b.customerEmail ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "E-mail:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 317,
											columnNumber: 21
										}, this),
										" ",
										b.customerEmail
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 316,
										columnNumber: 36
									}, this) : null
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 309,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 210,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs text-muted-foreground leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-bold text-foreground block mb-1",
							children: "Próximo Passo: Validação pelo WhatsApp"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 324,
							columnNumber: 15
						}, this), "Nossa equipe comercial da Sol & Mar confirmará a disponibilidade física, contrato e orientará sobre a liberação da pré-autorização da caução. Clique no botão abaixo para abrir a conversa com os dados preenchidos."]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 323,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-3 pt-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "hero",
							size: "xl",
							className: "flex-1 gap-2 font-bold shadow-gold",
							onClick: () => {
								const url = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappText)}`;
								window.open(url, "_blank");
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 338,
									columnNumber: 17
								}, this),
								"Conversar no WhatsApp com a Reserva #",
								b.reservationCode
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 334,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "xl",
							onClick: () => {
								navigator.clipboard.writeText(whatsappText);
								toast.success("Resumo da reserva copiado!");
							},
							className: "gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 346,
								columnNumber: 17
							}, this), "Copiar Resumo"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 342,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 333,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "text-center pt-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								setConfirmedSession(null);
								setStep(0);
							},
							className: "text-xs text-muted-foreground hover:text-foreground",
							children: "Iniciar nova simulação"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 352,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 351,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 191,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 190,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 189,
			columnNumber: 12
		}, this);
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHero, {
		eyebrow: "Solicitação de Orçamento",
		title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Simule sua locação em ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "italic text-primary",
			children: "Fortaleza"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 365,
			columnNumber: 35
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 364,
			columnNumber: 59
		}, this),
		description: "Preencha os dados em 5 passos rápidos para solicitar seu orçamento personalizado diretamente com a equipe da Sol & Mar."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 364,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-5xl px-5 pb-24 sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-10",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
					className: "grid grid-cols-5 gap-2",
					children: STEPS.map((label, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => {
								if (i < step) setStep(i);
							},
							disabled: i > step,
							className: cn("w-full text-left transition-opacity", i > step ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: cn("h-1.5 w-full rounded-full transition-colors duration-300", i <= step ? "bg-primary" : "bg-border") }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 377,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: cn("mt-2.5 truncate text-[0.68rem] font-medium sm:text-xs", i === step ? "font-semibold text-primary" : i < step ? "text-foreground" : "text-muted-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "hidden sm:inline",
									children: [i + 1, ". "]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 379,
									columnNumber: 21
								}, this), label]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 378,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 373,
							columnNumber: 17
						}, this)
					}, label, false, {
						fileName: _jsxFileName,
						lineNumber: 372,
						columnNumber: 38
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 371,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 370,
				columnNumber: 9
			}, this),
			step === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-panel animate-in fade-in space-y-6 rounded-3xl p-6 shadow-elevate sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-b border-border/70 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-semibold sm:text-2xl",
							children: "1. Onde e quando você precisa do veículo?"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 392,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-xs text-muted-foreground sm:text-sm",
							children: "Informe o período da sua estadia em Fortaleza para simular a quantidade de diárias."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 395,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 391,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1.5 text-xs text-muted-foreground sm:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1.5 font-medium text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 404,
											columnNumber: 19
										}, this), "Local de Retirada"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 403,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: pickupLocation,
										onChange: (e) => setPickupLocation(e.target.value),
										className: inputClass,
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "Aeroporto Internacional de Fortaleza",
												children: "Aeroporto Internacional de Fortaleza (opção provisória a confirmar)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 408,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "Avenida da Abolição, 1894, Meireles (Sede comercial - a combinar)",
												children: "Avenida da Abolição, 1894, Meireles (Sede comercial - entrega a combinar)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 411,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "A combinar com a equipe comercial em Fortaleza",
												children: "A combinar com a equipe comercial em Fortaleza (hotel / endereço)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 414,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 407,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[0.7rem] text-muted-foreground",
										children: "* Opção provisória de simulação. A operação exata de entrega/retirada será alinhada diretamente com a equipe da Sol & Mar."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 418,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 402,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DateRangePicker, {
									start,
									end,
									onChangeRange: (s, e) => {
										setStart(s);
										setEnd(e);
									},
									startTime,
									endTime,
									onChangeStartTime: (t) => setStartTime(t),
									onChangeEndTime: (t) => setEndTime(t),
									hours: HOURS
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 426,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 425,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1.5 text-xs text-muted-foreground sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1.5 font-medium text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-4 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 435,
										columnNumber: 19
									}, this), "Local de Devolução"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 434,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: returnLocation,
									onChange: (e) => setReturnLocation(e.target.value),
									className: inputClass,
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Aeroporto Internacional de Fortaleza",
											children: "Aeroporto Internacional de Fortaleza (opção provisória a confirmar)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 439,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Avenida da Abolição, 1894, Meireles (Sede comercial - a combinar)",
											children: "Avenida da Abolição, 1894, Meireles (Sede comercial - entrega a combinar)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 442,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "A combinar com a equipe comercial em Fortaleza",
											children: "A combinar com a equipe comercial em Fortaleza (hotel / endereço)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 445,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 438,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 433,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 400,
						columnNumber: 13
					}, this),
					!isPeriodValid ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "size-4 shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 454,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "A data e horário de devolução devem ser posteriores aos da retirada." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 455,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 453,
						columnNumber: 31
					}, this) : null,
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 border-t border-border/70 pt-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Período calculado: " }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 461,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
								className: "text-foreground",
								children: isPeriodValid ? `${calculatedDays} diária(s)` : "Período inválido"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 462,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 460,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "hero",
							size: "lg",
							disabled: !isPeriodValid,
							onClick: () => setStep(1),
							children: ["Avançar para escolha do veículo", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 469,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 467,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 459,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 390,
				columnNumber: 23
			}, this) : null,
			step === 1 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "animate-in fade-in space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-panel flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-semibold sm:text-2xl",
							children: "2. Selecione a categoria ou modelo"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 480,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								longDate(start),
								" (",
								startTime,
								") → ",
								longDate(end),
								" (",
								endTime,
								") ·",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-foreground",
									children: [calculatedDays, " diária(s)"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 485,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 483,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 479,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "glass",
							size: "sm",
							onClick: () => setStep(0),
							children: "Alterar período"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 488,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 478,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "* O catálogo abaixo apresenta grupos de veículos demonstrativos. A confirmação do modelo exato ou similar ocorrerá com a equipe de atendimento."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 493,
						columnNumber: 13
					}, this),
					isLoadingVehicles ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-center py-20",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-8 animate-spin text-primary" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 499,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 498,
						columnNumber: 34
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: activeVehicles.map((v) => {
							const isSelected = vehicleId === v.id;
							const estimatedForVehicle = v.daily_rate * calculatedDays;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								onClick: () => setVehicleId(v.id),
								className: cn("card-hover group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card p-4 transition-all", isSelected ? "border-primary ring-2 ring-primary/60 bg-surface/90" : "border-border hover:border-primary/40"),
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex gap-4",
									children: [v.cover_image || v.images[0] ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: v.cover_image || v.images[0],
										alt: v.name,
										className: "h-24 w-32 shrink-0 rounded-xl object-cover bg-surface-2"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 506,
										columnNumber: 57
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid h-24 w-32 shrink-0 place-items-center rounded-xl bg-surface-2 text-xs text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Car, { className: "size-6 text-muted-foreground/60" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 507,
											columnNumber: 29
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 506,
										columnNumber: 183
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex flex-1 flex-col justify-between py-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center justify-between gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-[0.68rem] font-bold tracking-wider text-accent uppercase",
													children: [v.group_code ? `${v.group_code} · ` : "", v.category]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 513,
													columnNumber: 31
												}, this), isSelected ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[0.68rem] font-bold text-primary",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 518,
														columnNumber: 35
													}, this), " Selecionado"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 517,
													columnNumber: 45
												}, this) : null]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 512,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
												className: "font-bold text-foreground text-sm sm:text-base mt-0.5",
												children: v.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 521,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: [
													v.transmission,
													v.fuel,
													v.passengers ? `${v.passengers} lugares` : null,
													v.year ? `Ano ${v.year}` : null
												].filter(Boolean).join(" · ")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 524,
												columnNumber: 29
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 511,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "mt-2 flex items-baseline justify-between border-t border-border/50 pt-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[0.68rem] text-muted-foreground",
												children: v.daily_rate > 0 ? `${brl(v.daily_rate)}/dia` : "Tarifa"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 530,
												columnNumber: 29
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-primary text-sm sm:text-base",
												children: v.daily_rate > 0 ? brl(estimatedForVehicle) : "Consulte a diária"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 533,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 529,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 510,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 505,
									columnNumber: 23
								}, this)
							}, v.id, false, {
								fileName: _jsxFileName,
								lineNumber: 504,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 500,
						columnNumber: 24
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-between gap-4 border-t border-border/70 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "glass",
							size: "lg",
							onClick: () => setStep(0),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 546,
								columnNumber: 17
							}, this), " Voltar aos dados da locação"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 545,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "hero",
							size: "lg",
							disabled: !vehicleId,
							onClick: () => setStep(2),
							children: ["Avançar para opcionais e valores", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 550,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 548,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 544,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 477,
				columnNumber: 23
			}, this) : null,
			step === 2 && chosenVehicle ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "animate-in fade-in space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-b border-border/70 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-bold sm:text-2xl text-foreground",
							children: "3. Opcionais e estimativa de valores"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 560,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1.5 text-xs text-muted-foreground sm:text-sm",
							children: "Selecione serviços opcionais para compor sua cotação. Nenhum pagamento é cobrado neste momento."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 563,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 559,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-8 lg:grid-cols-[1.35fr_1.05fr]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-sm font-bold tracking-wide text-foreground uppercase",
										children: "Serviços e Itens Opcionais"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 573,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground",
										children: [selectedOptionals.length, " selecionado(s)"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 576,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 572,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-3.5",
									children: isLoadingAdditionals ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "py-8 text-center text-xs text-muted-foreground",
										children: "Carregando opcionais disponíveis..."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 582,
										columnNumber: 43
									}, this) : catalogAdditionals.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "rounded-2xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground bg-card",
										children: "Nenhum opcional cadastrado no momento. Você pode prosseguir com a locação padrão do veículo."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 584,
										columnNumber: 64
									}, this) : catalogAdditionals.map((opt) => {
										const isChecked = selectedOptionals.includes(opt.id);
										const optTotal = opt.type === "per_day" ? opt.price * calculatedDays : opt.price;
										return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											onClick: () => toggleOptional(opt.id),
											className: cn("card-hover flex cursor-pointer items-start gap-4 rounded-2xl border p-4.5 transition-all", isChecked ? "border-primary bg-primary/10 ring-1 ring-primary/40 shadow-xs" : "border-border/90 bg-card hover:border-primary/40"),
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: cn("mt-1 grid size-5.5 shrink-0 place-items-center rounded-md border transition-colors", isChecked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-surface"),
												children: isChecked ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5 stroke-[3]" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 592,
													columnNumber: 42
												}, this) : null
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 591,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex-1 min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "flex items-start justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
															className: "font-bold text-foreground text-sm sm:text-base",
															children: opt.name
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 597,
															columnNumber: 31
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "text-xs sm:text-sm font-bold text-primary shrink-0 bg-primary/10 px-2.5 py-1 rounded-lg",
															children: [
																"+",
																brl(opt.price),
																/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
																	className: "text-[0.68rem] font-normal text-muted-foreground ml-1",
																	children: opt.type === "per_day" ? "/dia" : "taxa única"
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 602,
																	columnNumber: 33
																}, this)
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 600,
															columnNumber: 31
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 596,
														columnNumber: 29
													}, this),
													opt.description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
														className: "mt-1.5 text-xs text-muted-foreground leading-relaxed",
														children: opt.description
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 607,
														columnNumber: 48
													}, this) : null,
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "mt-2.5 flex items-center gap-2 text-xs text-muted-foreground",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: opt.type === "per_day" ? `Subtotal para ${calculatedDays} diária(s):` : "Taxa fixa para todo o período:" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 611,
															columnNumber: 31
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
															className: "text-foreground font-semibold",
															children: brl(optTotal)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 614,
															columnNumber: 31
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 610,
														columnNumber: 29
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 595,
												columnNumber: 27
											}, this)]
										}, opt.id, true, {
											fileName: _jsxFileName,
											lineNumber: 590,
											columnNumber: 24
										}, this);
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 581,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start gap-3 rounded-2xl bg-surface/70 p-4 text-xs text-muted-foreground border border-border/80",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Info, { className: "size-4 shrink-0 text-primary mt-0.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 624,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "leading-relaxed",
										children: "A disponibilidade dos itens e a conferência dos acessórios serão checadas diretamente pela equipe da Sol & Mar na validação do pedido."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 625,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 623,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 571,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "glass-panel space-y-6 rounded-3xl p-6 sm:p-7 shadow-elevate h-fit border border-border/90",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between border-b border-border/70 pb-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-base sm:text-lg font-bold text-foreground",
										children: "Resumo da Cotação"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 635,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md",
										children: [
											calculatedDays,
											" ",
											calculatedDays === 1 ? "diária" : "diárias"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 638,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 634,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3.5 rounded-2xl bg-surface/60 p-3.5 border border-border/60",
									children: [chosenVehicle.images[0] ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: chosenVehicle.images[0],
										alt: chosenVehicle.name,
										className: "size-16 sm:size-18 rounded-xl object-cover bg-surface-2 shrink-0 ring-1 ring-border/50"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 645,
										columnNumber: 46
									}, this) : null, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-[0.68rem] font-bold text-accent uppercase tracking-wider",
												children: [chosenVehicle.group_code ? `${chosenVehicle.group_code} · ` : "", chosenVehicle.category]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 647,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "font-bold text-sm sm:text-base text-foreground truncate",
												children: chosenVehicle.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 651,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-xs text-muted-foreground mt-0.5",
												children: [
													"Diária base:",
													" ",
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
														className: "text-foreground",
														children: brl(chosenVehicle.daily_rate)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 656,
														columnNumber: 23
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 654,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 646,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 644,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-3 text-xs sm:text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
												"Diárias do veículo (",
												calculatedDays,
												"x)"
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 664,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-foreground font-semibold",
												children: brl(dailySubtotal)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 665,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 663,
											columnNumber: 19
										}, this),
										selectedOptionals.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center justify-between text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Opcionais selecionados" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 669,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-foreground font-semibold",
												children: ["+", brl(optionalsSubtotal)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 670,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 668,
											columnNumber: 51
										}, this) : null,
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-start justify-between text-muted-foreground pt-1 border-t border-border/50",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "shrink-0",
												children: "Local retirada"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 676,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-foreground font-medium text-right text-xs max-w-[13rem] truncate",
												children: pickupLocation
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 677,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 675,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "rounded-2xl bg-surface/90 border border-primary/25 p-4 mt-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-baseline justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-sm font-bold text-foreground",
														children: "Total da Locação"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 684,
														columnNumber: 23
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "font-display text-2xl sm:text-3xl font-extrabold text-primary",
														children: brl(rentalTotal)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 685,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 683,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-muted-foreground flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-3.5 text-amber-500" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 693,
															columnNumber: 25
														}, this), "Caução de garantia:"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 692,
														columnNumber: 23
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "font-bold text-amber-500",
														children: depositAmount > 0 ? brl(depositAmount) : "A combinar"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 696,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 691,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
													className: "mt-1 text-[0.68rem] text-muted-foreground leading-relaxed",
													children: "* A caução é garantia via bloqueio temporário no cartão de crédito na retirada, liberada na devolução."
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 700,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 682,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 662,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "hero",
									size: "xl",
									className: "w-full font-bold shadow-gold text-sm sm:text-base h-12",
									onClick: () => setStep(3),
									children: ["Continuar para identificação", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4 ml-1.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 709,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 707,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 633,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 569,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-between gap-4 border-t border-border/70 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "glass",
							size: "lg",
							onClick: () => setStep(1),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 716,
								columnNumber: 17
							}, this), " Voltar à escolha do veículo"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 715,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "hero",
							size: "lg",
							onClick: () => setStep(3),
							children: ["Continuar ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 719,
								columnNumber: 27
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 718,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 714,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 558,
				columnNumber: 40
			}, this) : null,
			step === 3 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-panel animate-in fade-in space-y-6 rounded-3xl p-6 shadow-elevate sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-b border-border/70 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-semibold sm:text-2xl",
							children: "4. Como nossa equipe deve entrar em contato?"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 729,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-xs text-muted-foreground sm:text-sm",
							children: "Apenas informações essenciais para prepararmos o orçamento. Não solicitamos dados de pagamento nem documentos completos neste momento."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 732,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 728,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1.5 text-xs text-muted-foreground sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium text-foreground",
									children: "Nome completo *"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 740,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									placeholder: "Seu nome e sobrenome",
									value: customer.name,
									onChange: (e) => setCustomer({
										...customer,
										name: e.target.value
									}),
									className: inputClass,
									required: true
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 741,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 739,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1.5 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1.5 font-medium text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "size-4 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 749,
											columnNumber: 19
										}, this), "Telefone / WhatsApp *"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 748,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "tel",
										placeholder: "(85) 99999-9999",
										value: customer.phone,
										onChange: (e) => setCustomer({
											...customer,
											phone: e.target.value
										}),
										className: inputClass,
										required: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 752,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[0.68rem] text-muted-foreground",
										children: "Usaremos para enviar o retorno do orçamento."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 756,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 747,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1.5 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-medium text-foreground",
										children: "E-mail para contato (opcional)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 762,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "email",
										placeholder: "seuemail@exemplo.com (opcional)",
										value: customer.email,
										onChange: (e) => setCustomer({
											...customer,
											email: e.target.value
										}),
										className: inputClass
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 763,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[0.68rem] text-muted-foreground",
										children: "Opcional. Se informado, usaremos para enviar confirmação e cópia da proposta."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 767,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 761,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1.5 text-xs text-muted-foreground sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium text-foreground",
									children: "Observações ou necessidades (opcional)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 773,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
									placeholder: "Ex: número do voo de chegada, horário estimado de pouso ou dúvidas específicas...",
									value: customer.notes,
									onChange: (e) => setCustomer({
										...customer,
										notes: e.target.value
									}),
									rows: 3,
									className: "w-full rounded-xl border border-input bg-surface p-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 776,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 772,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 738,
						columnNumber: 13
					}, this),
					!isCustomerValid ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "* Preencha seu nome e WhatsApp com DDD para avançar para a revisão final. O e-mail é opcional."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 783,
						columnNumber: 33
					}, this) : null,
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-between gap-4 border-t border-border/70 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "glass",
							size: "lg",
							onClick: () => setStep(2),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 790,
								columnNumber: 17
							}, this), " Voltar aos opcionais"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 789,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "hero",
							size: "lg",
							disabled: !isCustomerValid,
							onClick: () => setStep(4),
							children: ["Avançar para revisão e envio", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 794,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 792,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 788,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 727,
				columnNumber: 23
			}, this) : null,
			step === 4 && chosenVehicle ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "animate-in fade-in space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-panel space-y-6 rounded-3xl p-6 shadow-elevate sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border-b border-border/70 pb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "rounded-full bg-primary/20 px-3 py-0.5 text-xs font-semibold text-primary",
										children: ["Código Provisório: ", quoteCode]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 806,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 805,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
									className: "mt-2 text-xl font-semibold sm:text-2xl",
									children: "5. Revise seus dados antes de enviar"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 810,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-xs text-muted-foreground sm:text-sm",
									children: [
										"Esta mensagem será encaminhada para o WhatsApp oficial da Sol & Mar Rent a Car (",
										company.phoneInternational,
										") para verificação de disponibilidade e proposta formal."
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 813,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 804,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3 rounded-2xl border border-border bg-card p-5 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-semibold text-foreground text-sm border-b border-border/70 pb-2",
										children: "1. Veículo & Período da Locação"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 824,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "Veículo Escolhido:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 828,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
											className: "text-foreground",
											children: chosenVehicle.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 829,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 827,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "Categoria:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 832,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground",
											children: chosenVehicle.category || "A confirmar"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 833,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 831,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "Retirada:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 838,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground",
											children: [
												longDate(start),
												" às ",
												startTime
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 839,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 837,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "Local Retirada:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 844,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground text-right",
											children: pickupLocation
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 845,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 843,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "Devolução:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 848,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground",
											children: [
												longDate(end),
												" às ",
												endTime
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 849,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 847,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "Local Devolução:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 854,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground text-right",
											children: returnLocation
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 855,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 853,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between border-t border-border/60 pt-2 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "Quantidade de diárias:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 858,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground font-bold",
											children: [calculatedDays, " diária(s)"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 859,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 857,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 823,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3 rounded-2xl border border-border bg-card p-5 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-semibold text-foreground text-sm border-b border-border/70 pb-2",
										children: "Dados do Solicitante"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 865,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "Nome completo:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 869,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
											className: "text-foreground",
											children: customer.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 870,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 868,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "Telefone / WhatsApp:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 873,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground",
											children: customer.phone
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 874,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 872,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: "E-mail:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 877,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-foreground",
											children: customer.email.trim() ? customer.email : "Não informado (opcional)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 878,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 876,
										columnNumber: 19
									}, this),
									customer.notes.trim() ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "border-t border-border/60 pt-2 text-[0.72rem] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Observações:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 883,
												columnNumber: 23
											}, this),
											" ",
											customer.notes.trim()
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 882,
										columnNumber: 44
									}, this) : null
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 864,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 821,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-2xl border border-border bg-card p-5 space-y-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-foreground text-sm border-b border-border/70 pb-2",
									children: "Discriminação Detalhada dos Valores"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 890,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
										"Valor das diárias (",
										calculatedDays,
										"x ",
										brl(vehicleDailyRate),
										"):"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 895,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-semibold text-foreground",
										children: brl(dailySubtotal)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 898,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 894,
									columnNumber: 17
								}, this),
								selectedOptionals.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
											"Opcionais selecionados (",
											selectedOptionals.length,
											" item[ns]):"
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 903,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-semibold text-foreground",
											children: ["+", brl(optionalsSubtotal)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 904,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 902,
										columnNumber: 21
									}, this), selectedOptionals.map((id) => {
										const opt = catalogAdditionals.find((o) => o.id === id);
										if (!opt) return null;
										const optCost = opt.type === "per_day" ? opt.price * calculatedDays : opt.price;
										return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between pl-3 text-[0.7rem] text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
												"• ",
												opt.name,
												" (",
												opt.type === "per_day" ? `${brl(opt.price)}/dia` : "taxa única",
												"):"
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 913,
												columnNumber: 27
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: brl(optCost) }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 917,
												columnNumber: 27
											}, this)]
										}, opt.id, true, {
											fileName: _jsxFileName,
											lineNumber: 912,
											columnNumber: 24
										}, this);
									})]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 901,
									columnNumber: 49
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Opcionais selecionados:" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 921,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Nenhum item adicional" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 922,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 920,
									columnNumber: 28
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between border-t border-border/60 pt-2 text-sm font-bold text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Valor Total da Locação (custo efetivo):" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 926,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-primary text-base font-display",
										children: brl(rentalTotal)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 927,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 925,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-1 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between font-bold text-amber-500 text-xs sm:text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 934,
												columnNumber: 23
											}, this), "Valor da Caução Exigida (Garantia da Locação):"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 933,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: depositAmount > 0 ? brl(depositAmount) : "A combinar na retirada" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 937,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 932,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-[0.72rem] text-amber-300/90 leading-relaxed pt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Garantia temporária:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 940,
												columnNumber: 21
											}, this),
											" A caução é bloqueada no cartão de crédito na retirada (pré-autorização) e liberada integralmente após a devolução do veículo sem avarias.",
											" ",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Não é uma cobrança definitiva e não compõe a receita das diárias." }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 943,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 939,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 931,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "rounded-xl border border-border/80 bg-surface/60 p-4 space-y-1.5 mt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Valor a pagar antecipadamente para reservar:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 952,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-bold text-foreground",
												children: [brl(advancePaymentAmount), " (R$ 0,00)"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 953,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 951,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between text-sm font-bold text-foreground border-t border-border/60 pt-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Valor restante da locação a acertar na retirada:" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 958,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-primary font-semibold",
												children: brl(balanceOnPickup)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 959,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 957,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[0.7rem] text-muted-foreground pt-1",
											children: "* O saldo da locação pode ser pago na retirada via PIX, cartão de crédito ou débito."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 961,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 950,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 889,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "hero",
								size: "xl",
								disabled: finalizeReservationMutation.isPending,
								className: "w-full gap-2 font-bold shadow-gold text-sm sm:text-base h-13",
								onClick: () => finalizeReservationMutation.mutate(),
								children: finalizeReservationMutation.isPending ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "size-5 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 972,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Registrando reserva provisória..." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 973,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 971,
									columnNumber: 60
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 975,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Confirmar Solicitação de Reserva" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 976,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 974,
									columnNumber: 27
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 970,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col gap-2.5 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "glass",
									size: "lg",
									className: "flex-1 gap-2 text-xs",
									onClick: handleSendToWhatsApp,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 982,
										columnNumber: 21
									}, this), "Enviar diretamente pelo WhatsApp"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 981,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "lg",
									type: "button",
									onClick: handleCopySummary,
									className: "gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 987,
										columnNumber: 21
									}, this), "Copiar resumo"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 986,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 980,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 969,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 803,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						size: "lg",
						onClick: () => setStep(3),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 997,
							columnNumber: 17
						}, this), " Voltar e editar dados"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 996,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "ghost",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							children: "Voltar à página inicial"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1e3,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 999,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 995,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 802,
				columnNumber: 40
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 368,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 363,
		columnNumber: 10
	}, this);
}
//#endregion
export { ReservationFlow as component };
