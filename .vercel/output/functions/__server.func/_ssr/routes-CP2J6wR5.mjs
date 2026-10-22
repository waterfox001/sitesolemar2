import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { H as CircleAlert, J as CarFront, M as Headphones, Q as ArrowRight, S as MapPin, X as CalendarDays, b as MessageCircle, c as Sparkles, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, b as todayISO, d as company, s as addDaysISO, t as Button, u as cn, x as whatsappLink } from "./SiteLayout-Do4h_GJx.mjs";
import { c as listVehicles } from "./api-CTawiNw0.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Reveal } from "./Reveal-8YcVarBR.mjs";
import { a as FAQS, i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./faq-data-BaLuDvz4.mjs";
import { t as DateRangePicker } from "./DateRangePicker-Cws5I0xU.mjs";
import { n as VehicleCard, t as Route } from "./VehicleCard-CDcH50Pe.mjs";
import { t as about_team_default } from "./about-team-BQhe6nLD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CP2J6wR5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/site/SectionHeading.tsx";
function SectionHeading({ eyebrow, title, description, align = "left", className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
		className: cn("max-w-2xl", align === "center" && "mx-auto text-center", className),
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "eyebrow",
				children: eyebrow
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 20,
				columnNumber: 18
			}, this) : null,
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "mt-4 text-3xl leading-[1.18] font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 21,
				columnNumber: 7
			}, this),
			description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 25,
				columnNumber: 9
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 19,
		columnNumber: 5
	}, this);
}
var hero_coast_default = "/assets/hero-coast-wS5NXjCF.jpg";
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
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
var steps = [
	{
		icon: CalendarDays,
		title: "1. Período e local",
		text: "Informe as datas e horários de retirada e devolução no Aeroporto Internacional de Fortaleza."
	},
	{
		icon: CarFront,
		title: "2. Escolha o veículo",
		text: "Compare categorias, itens de conforto e diárias do catálogo demonstrativo com total clareza."
	},
	{
		icon: Sparkles,
		title: "3. Opcionais & Dados",
		text: "Adicione itens demonstrativos (como cadeirinha ou motorista extra) e informe seu contato básico."
	},
	{
		icon: MessageCircle,
		title: "4. Envio pelo WhatsApp",
		text: "Receba o resumo estruturado e envie para nossa equipe confirmar a disponibilidade e o valor."
	}
];
var perks = [
	{
		icon: ShieldCheck,
		title: "Frota revisada",
		text: "Manutenção preventiva rigorosa e checklist de segurança antes de cada locação."
	},
	{
		icon: Sparkles,
		title: "Sem surpresas",
		text: "Orçamento claro e detalhado antes do fechamento, sem taxas escondidas."
	},
	{
		icon: Headphones,
		title: "Atendimento próximo",
		text: `Equipe disponível em Fortaleza pelo telefone e WhatsApp (${company.phoneInternational}) para tirar qualquer dúvida.`
	},
	{
		icon: MapPin,
		title: "Retirada no Aeroporto",
		text: "Ponto estratégico no Aeroporto Internacional de Fortaleza para você não perder tempo."
	}
];
function Home() {
	const navigate = useNavigate();
	const [start, setStart] = (0, import_react.useState)(todayISO());
	const [startTime, setStartTime] = (0, import_react.useState)("09:00");
	const [end, setEnd] = (0, import_react.useState)(addDaysISO(todayISO(), 3));
	const [endTime, setEndTime] = (0, import_react.useState)("09:00");
	const [pickupLocation] = (0, import_react.useState)(company.defaultPickupLocation);
	const [category, setCategory] = (0, import_react.useState)("Todas");
	const [validationError, setValidationError] = (0, import_react.useState)(null);
	const [visibleCount, setVisibleCount] = (0, import_react.useState)(6);
	const loaderData = Route.useLoaderData();
	const { data: vehicles = loaderData?.vehicles ?? [] } = useQuery({
		queryKey: ["vehicles"],
		queryFn: listVehicles,
		initialData: loaderData?.vehicles
	});
	const activeVehicles = (0, import_react.useMemo)(() => vehicles.filter((v) => v.active), [vehicles]);
	const displayedVehicles = (0, import_react.useMemo)(() => {
		const categoriesMap = /* @__PURE__ */ new Map();
		for (const v of activeVehicles) {
			const cat = v.category || "Outros";
			if (!categoriesMap.has(cat)) categoriesMap.set(cat, []);
			categoriesMap.get(cat).push(v);
		}
		const result = [];
		const entries = Array.from(categoriesMap.values());
		let maxLen = 0;
		for (const list of entries) if (list.length > maxLen) maxLen = list.length;
		for (let i = 0; i < maxLen; i++) for (const list of entries) if (list[i]) result.push(list[i]);
		return result.length > 0 ? result : activeVehicles;
	}, [activeVehicles]).slice(0, visibleCount);
	const handleSearchSubmit = (event) => {
		event.preventDefault();
		setValidationError(null);
		if (end < start) {
			setValidationError("A data de devolução não pode ser anterior à data de retirada.");
			return;
		}
		if (end === start && endTime <= startTime) {
			setValidationError("Para devolução no mesmo dia, selecione um horário posterior ao da retirada.");
			return;
		}
		navigate({
			to: "/reserva",
			search: {
				inicio: start,
				fim: end,
				horaInicio: startTime,
				horaFim: endTime,
				localRetirada: pickupLocation,
				localDevolucao: pickupLocation,
				...category !== "Todas" ? { categoria: category } : {}
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative min-h-[94vh] overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: hero_coast_default,
					alt: "Carro em estrada litorânea ao pôr do sol",
					width: 1920,
					height: 1200,
					className: "absolute inset-0 size-full object-cover object-[center_30%] sm:object-[center_35%] lg:object-[86%_45%] xl:object-[90%_45%]"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 127,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/25 lg:w-[65%] lg:from-background lg:via-background/80 lg:to-transparent" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background to-transparent" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative mx-auto flex min-h-[94vh] max-w-[1536px] w-full flex-col justify-end px-5 pt-36 pb-16 sm:px-8 sm:pb-24 lg:px-12 xl:px-16",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "eyebrow reveal",
								children: [
									"\"",
									company.tagline,
									"\""
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 134,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "reveal reveal-delay-1 mt-4 text-3xl font-semibold leading-[1.18] sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.12] tracking-tight",
								children: [
									"Explore Fortaleza",
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "inline-block text-gradient-gold italic pr-2 pb-1",
										children: "no seu ritmo"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 15
									}, this),
									"."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "reveal reveal-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
								children: "Encontre o veículo ideal para sua próxima viagem e descubra Fortaleza com mais liberdade, conforto e praticidade. Conte com a Sol & Mar Rent a Car desde 2013."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 240,
						className: "mt-10 w-full",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							onSubmit: handleSearchSubmit,
							className: "glass-panel space-y-4 rounded-3xl p-5 shadow-elevate sm:p-7 lg:max-w-3xl xl:max-w-4xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-semibold tracking-wider text-primary uppercase",
										children: "Simulação de Locação"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 150,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-muted-foreground",
										children: ["Local provisório: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
											className: "text-foreground",
											children: pickupLocation
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 154,
											columnNumber: 37
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 153,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 149,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DateRangePicker, {
									start,
									end,
									onChangeRange: (s, e) => {
										setStart(s);
										setEnd(e);
										setValidationError(null);
									},
									startTime,
									endTime,
									onChangeStartTime: (t) => {
										setStartTime(t);
										setValidationError(null);
									},
									onChangeEndTime: (t) => {
										setEndTime(t);
										setValidationError(null);
									},
									hours: HOURS
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 159,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "flex items-center gap-2 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Categoria preferida:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 174,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: category,
											onChange: (e) => setCategory(e.target.value),
											className: "h-10 rounded-xl border border-input bg-surface px-3 text-xs font-medium text-foreground outline-none focus:border-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Todas",
													children: "Todas as categorias"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 176,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Hatch",
													children: "Hatch / Compacto"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 177,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Sedã",
													children: "Sedã"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 178,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "SUV",
													children: "SUV"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 179,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Picape",
													children: "Picape"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 180,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Minivan",
													children: "Minivan / 7 Lugares"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 181,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 175,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 173,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										type: "submit",
										variant: "hero",
										size: "xl",
										className: "w-full sm:w-auto font-bold shadow-gold",
										children: ["Consultar veículos disponíveis", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 187,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 185,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 15
								}, this),
								validationError ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 rounded-xl border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "size-4 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 193,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: validationError }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 194,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 34
								}, this) : null
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 148,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 126,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-[1536px] w-full px-5 py-24 sm:px-8 sm:py-32 lg:px-12 xl:px-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-8 md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
						eyebrow: "Nossa frota em Fortaleza",
						title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Veículos para cada ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "italic text-primary",
							children: "tipo de viagem"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 205,
							columnNumber: 36
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 69
						}, this),
						description: "Do compacto ágil para o trânsito da cidade ao SUV para as praias e litoral. Locação por categoria com veículos revisados e modelos de referência."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 120,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "glass",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/veiculos",
								children: ["Ver catálogo completo", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 209,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 203,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start",
					children: displayedVehicles.map((vehicle, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: index * 90,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VehicleCard, {
							vehicle,
							period: {
								start,
								end
							}
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 15
						}, this)
					}, vehicle.id, false, {
						fileName: _jsxFileName,
						lineNumber: 218,
						columnNumber: 54
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 217,
					columnNumber: 9
				}, this),
				activeVehicles.length > visibleCount ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-12 flex flex-col sm:flex-row items-center justify-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "outline",
						size: "xl",
						onClick: () => setVisibleCount((prev) => prev + 6),
						className: "w-full sm:w-auto font-bold border-border/80 hover:border-primary shadow-xs",
						children: [
							"Carregar mais veículos (",
							activeVehicles.length - visibleCount,
							" restantes)"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 227,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "hero",
						size: "xl",
						className: "w-full sm:w-auto font-bold shadow-gold",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/veiculos",
							children: ["Ver catálogo completo", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4 ml-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 231,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 230,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 226,
					columnNumber: 49
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-12 text-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "glass",
						size: "xl",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/veiculos",
							children: ["Explorar catálogo completo da frota", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-4 ml-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 238,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 237,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 236,
					columnNumber: 20
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 202,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "border-y border-border bg-surface/40 py-24 sm:py-32",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-[1536px] w-full px-5 sm:px-8 lg:px-12 xl:px-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
						eyebrow: "Como funciona",
						title: "Quatro passos simples até a sua viagem",
						description: "Transparência e atendimento humano desde o primeiro contato até a entrega das chaves.",
						align: "center"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 249,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
						className: "mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
							as: "li",
							delay: index * 100,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "card-hover h-full rounded-2xl border border-border bg-card p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "grid size-12 place-items-center rounded-xl bg-primary/12 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(step.icon, { className: "size-6" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 255,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 254,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-display text-3xl text-border",
											children: ["0", index + 1]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 257,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "mt-6 text-lg font-semibold",
										children: step.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 259,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-2 text-xs leading-relaxed text-muted-foreground",
										children: step.text
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 260,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 252,
								columnNumber: 17
							}, this)
						}, step.title, false, {
							fileName: _jsxFileName,
							lineNumber: 251,
							columnNumber: 41
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 360,
						className: "mt-12 text-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "hero",
							size: "xl",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/reserva",
								children: "Solicitar orçamento agora"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 265,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 248,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 247,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto grid max-w-[1536px] w-full items-center gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:px-12 xl:px-16 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: about_team_default,
					alt: "Atendimento Sol & Mar Rent a Car em Fortaleza",
					width: 1400,
					height: 1e3,
					loading: "lazy",
					className: "rounded-3xl border border-border object-cover shadow-elevate"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 276,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-panel absolute -bottom-8 -right-4 hidden rounded-2xl p-6 sm:block lg:-right-10",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-display text-3xl font-semibold text-primary",
						children: "Desde 2013"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 278,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 max-w-[10rem] text-xs text-muted-foreground",
						children: "Atendimento próximo e confiança em Fortaleza, Ceará"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 279,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 277,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 275,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 274,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
				eyebrow: "Sobre a Sol & Mar",
				title: "Locação sem burocracia, do jeito que deve ser",
				description: "Atuando em Fortaleza desde agosto de 2013, oferecemos locação de veículos com atendimento personalizado, foco na segurança e transparência nos valores."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 287,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
				className: "mt-10 grid gap-5 sm:grid-cols-2",
				children: perks.map((perk, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					as: "li",
					delay: index * 90,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(perk.icon, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 292,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 291,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold",
								children: perk.title
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 295,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted-foreground",
								children: perk.text
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 296,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 294,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 290,
						columnNumber: 17
					}, this)
				}, perk.title, false, {
					fileName: _jsxFileName,
					lineNumber: 289,
					columnNumber: 41
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 288,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 286,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 273,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			id: "faq",
			className: "mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SectionHeading, {
					align: "center",
					eyebrow: "Tire Suas Dúvidas",
					title: "Perguntas Frequentes",
					description: "Respostas claras sobre documentação, retirada no aeroporto e regras de locação da Sol & Mar em Fortaleza."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 310,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 309,
				columnNumber: 11
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 308,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				delay: 120,
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Accordion, {
					type: "single",
					collapsible: true,
					className: "glass-panel rounded-3xl px-6 sm:px-8",
					children: FAQS.map((faq, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem, {
						value: `home-faq-${i}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger, {
							className: "py-6 text-left text-base font-medium text-foreground hover:no-underline",
							children: faq.question
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 317,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent, {
							className: "pb-6 leading-relaxed text-sm text-muted-foreground",
							children: faq.answer
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 320,
							columnNumber: 17
						}, this)]
					}, faq.question, true, {
						fileName: _jsxFileName,
						lineNumber: 316,
						columnNumber: 35
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 315,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 314,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 307,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mx-auto max-w-[1536px] w-full px-5 sm:px-8 lg:px-12 xl:px-16",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				className: "relative overflow-hidden rounded-3xl border border-border bg-surface p-10 sm:p-16",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-primary/15 blur-3xl" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 331,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "eyebrow",
								children: "Pronto para sua viagem em Fortaleza?"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 334,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-4 text-3xl leading-tight font-semibold sm:text-4xl",
								children: "Envie sua solicitação e combine os detalhes com nossa equipe."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 335,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 text-sm text-muted-foreground",
								children: [
									"Dúvidas sobre modelos ou datas? Ligue para ",
									company.phoneInternational,
									" ou fale conosco direto no WhatsApp."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 333,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "hero",
							size: "xl",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/reserva",
								children: "Solicitar orçamento"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 345,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 344,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "glass",
							size: "xl",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: whatsappLink(),
								target: "_blank",
								rel: "noreferrer",
								children: [
									"Falar no WhatsApp (",
									company.phoneInternational,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 348,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 347,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 343,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 332,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 330,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 329,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 124,
		columnNumber: 10
	}, this);
}
//#endregion
export { Home as component };
