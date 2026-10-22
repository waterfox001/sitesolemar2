import { _ as createFileRoute, g as lazyRouteComponent, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { N as Gauge, P as Fuel, Q as ArrowRight, c as Sparkles, n as Users, q as Car } from "../_libs/lucide-react.mjs";
import { c as brl, t as Button, u as cn } from "./SiteLayout-Do4h_GJx.mjs";
import { c as listVehicles } from "./api-CTawiNw0.mjs";
import { r as VehicleStatusBadge } from "./StatusBadge-ouZFLwd9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/VehicleCard-CDcH50Pe.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var $$splitComponentImporter = () => import("./routes-CP2J6wR5.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Sol & Mar Rent a Car | Locação de Veículos em Fortaleza" },
		{
			name: "description",
			content: "Explore Fortaleza no seu ritmo com a Sol & Mar Rent a Car. Locação com frota revisada, diárias transparentes e atendimento humano desde 2013."
		},
		{
			property: "og:title",
			content: "Sol & Mar Rent a Car | Fortaleza - CE"
		},
		{
			property: "og:description",
			content: "Explore Fortaleza no seu ritmo. Praticidade, atendimento próximo e frota revisada."
		}
	] }),
	loader: async () => {
		return { vehicles: await listVehicles() };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var _jsxFileName = "/app/applet/src/components/site/VehicleCard.tsx";
function VehicleCard({ vehicle, period }) {
	const cover = vehicle.cover_image || vehicle.images[0];
	const isAvailable = vehicle.status === "disponivel";
	const confirmedSpecs = [];
	if (vehicle.transmission && vehicle.transmission.trim().length > 0) confirmedSpecs.push({
		icon: Gauge,
		label: vehicle.transmission
	});
	if (vehicle.fuel && vehicle.fuel.trim().length > 0) confirmedSpecs.push({
		icon: Fuel,
		label: vehicle.fuel
	});
	if (vehicle.passengers && vehicle.passengers > 0) confirmedSpecs.push({
		icon: Users,
		label: `${vehicle.passengers} lugares`
	});
	if (vehicle.year && vehicle.year > 2e3) confirmedSpecs.push({
		icon: Sparkles,
		label: `Ano ${vehicle.year}`
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: cn("card-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 w-full shadow-xs hover:border-primary/50 hover:shadow-md"),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative aspect-[3/2] w-full overflow-hidden bg-surface-2 border-b border-border/60",
			children: [
				cover ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: cover,
					alt: vehicle.name,
					loading: "lazy",
					className: "size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 61,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col items-center justify-center size-full gap-2 text-muted-foreground bg-surface/50 p-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid size-12 place-items-center rounded-2xl bg-surface border border-border/60 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Car, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 70,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 69,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-xs font-semibold text-foreground/80",
						children: vehicle.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VehicleStatusBadge, { status: vehicle.status }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 78,
						columnNumber: 11
					}, this), vehicle.is_illustrative_image ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "rounded-md bg-background/90 px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground backdrop-blur-md shadow-xs ring-1 ring-border/50",
						children: "Foto ilustrativa"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 13
					}, this) : null]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 9
				}, this),
				vehicle.category && vehicle.category.trim().length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute top-3 right-3 z-10",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "rounded-full bg-background/90 px-2.5 py-0.5 text-[0.7rem] font-bold text-foreground backdrop-blur-md shadow-xs ring-1 ring-border/60 uppercase tracking-wider",
						children: vehicle.category
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 88,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 87,
					columnNumber: 11
				}, this) : null
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 59,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-1 flex-col p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-display text-lg sm:text-xl font-bold tracking-tight text-foreground leading-snug",
					children: vehicle.name
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 9
				}, this),
				confirmedSpecs.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3.5 flex flex-wrap items-center gap-2",
					children: confirmedSpecs.map((spec) => {
						const Icon = spec.icon;
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-foreground/90 border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-3.5 text-primary shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 114,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: spec.label }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 19
							}, this)]
						}, spec.label, true, {
							fileName: _jsxFileName,
							lineNumber: 110,
							columnNumber: 17
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 11
				}, this) : null,
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-auto pt-5",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border-t border-border/80 pt-4 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: vehicle.daily_rate && vehicle.daily_rate > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[0.68rem] font-medium text-muted-foreground block",
							children: "Diária confirmada"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-baseline gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-display text-2xl font-extrabold text-primary",
								children: brl(vehicle.daily_rate)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 135,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "/diária"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 130,
							columnNumber: 17
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[0.68rem] font-medium text-muted-foreground block",
							children: "Tarifa de locação"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-lg sm:text-xl font-bold text-foreground",
							children: "Consulte a diária"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 146,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 142,
							columnNumber: 17
						}, this) }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "hero",
							size: "default",
							className: "h-11 font-bold shadow-gold px-4 text-xs sm:text-sm shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/reserva",
								search: {
									veiculo: vehicle.id,
									...period?.start ? { inicio: period.start } : {},
									...period?.end ? { fim: period.end } : {}
								},
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: isAvailable ? "Selecionar" : "Consultar disponibilidade" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 168,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "size-3.5 ml-1.5 shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 154,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 126,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 125,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 98,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 51,
		columnNumber: 5
	}, this);
}
//#endregion
export { VehicleCard as n, Route as t };
