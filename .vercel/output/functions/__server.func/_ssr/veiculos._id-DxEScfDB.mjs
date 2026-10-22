import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { $ as ArrowLeft, C as Luggage, L as DoorOpen, N as Gauge, P as Fuel, b as MessageCircle, n as Users } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, c as brl, d as company, t as Button, u as cn, x as whatsappLink } from "./SiteLayout-Do4h_GJx.mjs";
import { a as getVehicle } from "./api-CTawiNw0.mjs";
import { r as VehicleStatusBadge } from "./StatusBadge-ouZFLwd9.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./veiculos._id-BC13o7uE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/veiculos._id-DxEScfDB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/veiculos.$id.tsx?tsr-split=component";
function VehiclePage() {
	const { id } = Route.useParams();
	const search = Route.useSearch();
	const { data: vehicle, isLoading } = useQuery({
		queryKey: ["vehicle", id],
		queryFn: () => getVehicle(id)
	});
	const [photo, setPhoto] = (0, import_react.useState)(0);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-[60vh] pt-40 text-center text-muted-foreground",
		children: "Carregando…"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 31,
		columnNumber: 12
	}, this);
	if (!vehicle) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-[60vh] pt-40 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-3xl",
			children: "Veículo não encontrado"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			asChild: true,
			variant: "hero",
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/veiculos",
				children: "Ver catálogo"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 40,
				columnNumber: 13
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 39,
			columnNumber: 11
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 12
	}, this);
	const specs = [];
	if (vehicle.transmission) specs.push({
		icon: Gauge,
		label: "Câmbio",
		value: vehicle.transmission
	});
	if (vehicle.fuel) specs.push({
		icon: Fuel,
		label: "Combustível",
		value: vehicle.fuel
	});
	if (vehicle.passengers) specs.push({
		icon: Users,
		label: "Passageiros",
		value: `${vehicle.passengers} lugares`
	});
	if (vehicle.doors) specs.push({
		icon: DoorOpen,
		label: "Portas",
		value: `${vehicle.doors} portas`
	});
	if (vehicle.luggage) specs.push({
		icon: Luggage,
		label: "Malas",
		value: `${vehicle.luggage} malas`
	});
	if (vehicle.year) specs.push({
		icon: Gauge,
		label: "Ano",
		value: String(vehicle.year)
	});
	const canBook = vehicle.status !== "manutencao";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-[1536px] w-full px-5 pt-32 sm:px-8 sm:pt-40 lg:px-12 xl:px-16",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/veiculos",
			className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "size-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 11
			}, this), " Voltar ao catálogo"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 83,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "reveal",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-hidden rounded-3xl border border-border bg-surface",
					children: vehicle.cover_image || vehicle.images[photo] ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: vehicle.cover_image || vehicle.images[photo],
						alt: vehicle.name,
						className: "aspect-[3/2] w-full object-cover object-center"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 63
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid aspect-[3/2] place-items-center text-muted-foreground bg-surface/50",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Car, { className: "size-12 text-muted-foreground/50" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 90,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 202
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 13
				}, this), vehicle.images.length > 1 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-4 flex gap-3 overflow-x-auto",
					children: vehicle.images.map((src, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setPhoto(i),
						className: cn("shrink-0 overflow-hidden rounded-xl border-2", i === photo ? "border-primary" : "border-transparent opacity-70"),
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src,
							alt: "",
							className: "h-20 w-32 object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 95,
							columnNumber: 21
						}, this)
					}, src + i, false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 49
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 93,
					columnNumber: 42
				}, this) : null]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 87,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "reveal reveal-delay-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VehicleStatusBadge, { status: vehicle.status }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 102,
							columnNumber: 15
						}, this), vehicle.is_illustrative_image ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "rounded-full bg-surface px-3 py-0.5 text-xs font-semibold text-muted-foreground border border-border/70",
							children: "Foto ilustrativa"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 103,
							columnNumber: 48
						}, this) : null]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 101,
						columnNumber: 13
					}, this),
					vehicle.category ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "eyebrow mt-5",
						children: [vehicle.group_code ? `${vehicle.group_code} · ` : "", vehicle.category]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 33
					}, this) : null,
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-2 text-3xl sm:text-4xl lg:text-5xl leading-tight font-bold text-foreground",
						children: vehicle.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 13
					}, this),
					vehicle.description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-4 leading-relaxed text-muted-foreground",
						children: vehicle.description
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 115,
						columnNumber: 36
					}, this) : null,
					vehicle.similar_models && vehicle.similar_models.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 rounded-xl border border-border/70 bg-surface/60 p-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-foreground",
							children: "Modelos do grupo: "
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 17
						}, this), vehicle.similar_models.join(" · ")]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 76
					}, this) : null,
					specs.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3",
						children: specs.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded-xl border border-border bg-card p-3.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(s.icon, { className: "size-4.5 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 124,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: s.label
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 125,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-bold text-foreground text-sm",
									children: s.value
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 126,
									columnNumber: 21
								}, this)
							]
						}, s.label, true, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 33
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 122,
						columnNumber: 33
					}, this) : null,
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "glass-panel mt-8 rounded-2xl p-6 border border-border/90",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Tarifa por diária"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-baseline gap-1 mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-display text-4xl font-extrabold text-primary",
									children: vehicle.daily_rate > 0 ? brl(vehicle.daily_rate) : "Consulte a diária"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 133,
									columnNumber: 17
								}, this), vehicle.daily_rate > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-sm font-semibold text-muted-foreground",
									children: "/diária"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 43
								}, this) : null]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-[0.7rem] text-muted-foreground",
								children: "* Valores e disponibilidade física confirmados no atendimento da locadora."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: canBook,
								disabled: !canBook,
								variant: "hero",
								size: "xl",
								className: "mt-5 w-full font-bold shadow-gold h-12",
								children: canBook ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/reserva",
									search: {
										veiculo: vehicle.id,
										...search.inicio ? { inicio: search.inicio } : {},
										...search.fim ? { fim: search.fim } : {}
									},
									children: "Solicitar orçamento deste veículo"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 28
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Indisponível no momento" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 152,
									columnNumber: 29
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 141,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-4 flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: whatsappLink(`Olá! Tenho interesse no veículo ${vehicle.name} (${vehicle.category}). Gostaria de consultar valores e datas.`),
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "size-3.5 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 156,
											columnNumber: 19
										}, this),
										"Dúvidas sobre este veículo? Fale no WhatsApp: ",
										company.phoneInternational
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 155,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-3 text-center text-[0.68rem] text-muted-foreground",
								children: "* Modelo apresentado ou similar da categoria. Valores sujeitos à confirmação com a equipe."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 100,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 86,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 82,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 81,
		columnNumber: 10
	}, this);
}
//#endregion
export { VehiclePage as component };
