import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as createFileRoute, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRouteWithContext, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { b as MessageCircle, f as Search, l as SlidersHorizontal, m as RotateCcw } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, d as company, n as PageHero, o as ThemeProvider, u as cn, x as whatsappLink } from "./SiteLayout-Do4h_GJx.mjs";
import { c as listVehicles } from "./api-CTawiNw0.mjs";
import { t as AuthProvider } from "./auth-BwphrNDc.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Reveal } from "./Reveal-8YcVarBR.mjs";
import { t as Route$7 } from "./reserva-Dl_Kq-GN.mjs";
import { n as VehicleCard, t as Route$8 } from "./VehicleCard-CDcH50Pe.mjs";
import { t as Route$9 } from "./veiculos._id-BC13o7uE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C8hHvfCL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-C4rOX2CO.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var _jsxFileName$2 = "/app/applet/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName$1 = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 22,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 23,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 24,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 28,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 27,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 21,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 20,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 50,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 53,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 57,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 66,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 56,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 49,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 48,
		columnNumber: 5
	}, this);
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Sol & Mar Rent a Car | Locação de Veículos" },
			{
				name: "description",
				content: "Locadora de veículos em Fortaleza - Sol & Mar Rent a Car. Sua viagem. Seu caminho. Sua liberdade. Locação com atendimento humano e frota revisada."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#0d1c33"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "pt-BR",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", { dangerouslySetInnerHTML: { __html: `(function(){try{var s=localStorage.getItem('solemar-theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(p?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}}catch(e){}})();` } }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 114,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 119,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 113,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 123,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 121,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 112,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 137,
			columnNumber: 11
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, {
			position: "top-center",
			richColors: true
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 138,
			columnNumber: 11
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 135,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 134,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 133,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$4 = () => import("./admin-BFfiVfWa.mjs");
var Route$5 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Painel Administrativo da Frota | Sol & Mar Rent a Car" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./como-funciona-CWjPLpe2.mjs");
var Route$4 = createFileRoute("/como-funciona")({
	head: () => ({ meta: [
		{ title: "Como Funciona a Locação | Sol & Mar Rent a Car" },
		{
			name: "description",
			content: "Veja o passo a passo para alugar seu carro na Sol & Mar: simule o período, escolha o veículo, envie sua solicitação e combine a retirada em Fortaleza."
		},
		{
			property: "og:title",
			content: "Como Funciona | Sol & Mar Rent a Car"
		},
		{
			property: "og:description",
			content: "O passo a passo da sua locação em Fortaleza, da simulação à entrega."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./contato-XxrvfLkx.mjs");
var Route$3 = createFileRoute("/contato")({
	head: () => ({ meta: [
		{ title: "Fale Conosco | Sol & Mar Rent a Car - Fortaleza" },
		{
			name: "description",
			content: `Entre em contato com a Sol & Mar Rent a Car em Fortaleza. Atendimento via WhatsApp (${company.phoneInternational}), telefone e Instagram no Meireles.`
		},
		{
			property: "og:title",
			content: "Fale Conosco | Sol & Mar Rent a Car"
		},
		{
			property: "og:description",
			content: "WhatsApp, telefone, Instagram e endereço em Fortaleza, Ceará."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./faq-B7lM8Kgq.mjs");
var Route$2 = createFileRoute("/faq")({
	head: () => ({ meta: [
		{ title: "Perguntas Frequentes | Sol & Mar Rent a Car" },
		{
			name: "description",
			content: "Dúvidas sobre documentos, pagamento, retirada no aeroporto de Fortaleza, caução e diárias na Sol & Mar Rent a Car."
		},
		{
			property: "og:title",
			content: "Perguntas Frequentes | Sol & Mar Rent a Car"
		},
		{
			property: "og:description",
			content: "Tire suas dúvidas sobre o processo de locação de veículos em Fortaleza."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./sobre-DQ6dX49B.mjs");
var Route$1 = createFileRoute("/sobre")({
	head: () => ({ meta: [
		{ title: "Sobre a Sol & Mar Rent a Car | Fortaleza, CE" },
		{
			name: "description",
			content: "Conheça a Sol & Mar Rent a Car: tradição em locação de veículos em Fortaleza desde agosto de 2013, com atendimento próximo e transparente."
		},
		{
			property: "og:title",
			content: "Sobre a Sol & Mar Rent a Car | Fortaleza, CE"
		},
		{
			property: "og:description",
			content: "Tradição em locação de veículos em Fortaleza desde 2013."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var _jsxFileName = "/app/applet/src/routes/veiculos.index.tsx";
var Route = createFileRoute("/veiculos/")({
	loader: async () => {
		return { vehicles: await listVehicles() };
	},
	head: () => ({ meta: [
		{ title: "Catálogo de Veículos | Sol & Mar Rent a Car" },
		{
			name: "description",
			content: "Conheça a frota da Sol & Mar em Fortaleza: econômicos, sedãs, SUVs e picapes com diárias transparentes."
		},
		{
			property: "og:title",
			content: "Catálogo de Veículos | Sol & Mar Rent a Car"
		},
		{
			property: "og:description",
			content: "Econômicos, executivos, SUVs e picapes para alugar em Fortaleza."
		}
	] }),
	component: Catalog
});
function Catalog() {
	const loaderData = Route.useLoaderData();
	const { data: vehicles = loaderData?.vehicles ?? [], isLoading } = useQuery({
		queryKey: ["vehicles"],
		queryFn: listVehicles,
		initialData: loaderData?.vehicles
	});
	const [category, setCategory] = (0, import_react.useState)("Todos");
	const [transmission, setTransmission] = (0, import_react.useState)("Todos");
	const [passengers, setPassengers] = (0, import_react.useState)("Todos");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("default");
	const [query, setQuery] = (0, import_react.useState)("");
	const active = vehicles.filter((v) => v.active);
	const categories = (0, import_react.useMemo)(() => {
		return ["Todos", ...Array.from(new Set(active.map((v) => v.category).filter(Boolean)))];
	}, [active]);
	const hasActiveFilters = category !== "Todos" || transmission !== "Todos" || passengers !== "Todos" || sortOrder !== "default" || query.trim().length > 0;
	const resetFilters = () => {
		setCategory("Todos");
		setTransmission("Todos");
		setPassengers("Todos");
		setSortOrder("default");
		setQuery("");
	};
	const filtered = (0, import_react.useMemo)(() => {
		let result = active.filter((v) => {
			const matchCat = category === "Todos" || v.category === category;
			const matchTrans = transmission === "Todos" || v.transmission === transmission;
			const matchPass = passengers === "Todos" || passengers === "ate5" && (v.passengers ?? 0) <= 5 || passengers === "mais5" && (v.passengers ?? 0) > 5;
			const matchQuery = !query.trim() || v.name.toLowerCase().includes(query.toLowerCase()) || v.category && v.category.toLowerCase().includes(query.toLowerCase()) || (v.features ?? []).some((f) => f.toLowerCase().includes(query.toLowerCase()));
			return matchCat && matchTrans && matchPass && matchQuery;
		});
		if (sortOrder === "price-asc") result = [...result].sort((a, b) => a.daily_rate - b.daily_rate);
		else if (sortOrder === "price-desc") result = [...result].sort((a, b) => b.daily_rate - a.daily_rate);
		return result;
	}, [
		active,
		category,
		transmission,
		passengers,
		sortOrder,
		query
	]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHero, {
		eyebrow: "Nossa Frota",
		title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
			"Encontre o veículo ",
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "italic text-primary",
				children: "ideal"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 32
			}, this),
			" para sua viagem"
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 11
		}, this),
		description: "Filtre por categoria, câmbio e capacidade. Locação por grupo com veículos de referência e modelos similares revisados em Fortaleza."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 100,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-[1536px] w-full px-5 sm:px-8 lg:px-12 xl:px-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-panel space-y-4 rounded-3xl p-5 sm:p-6 shadow-elevate",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[0.68rem] font-semibold tracking-wider text-muted-foreground uppercase",
							children: "Categorias"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setCategory(c),
								className: cn("rounded-xl border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm", category === c ? "border-primary bg-primary text-primary-foreground font-semibold" : "border-border text-muted-foreground hover:bg-surface hover:text-foreground"),
								children: c
							}, c, false, {
								fileName: _jsxFileName,
								lineNumber: 120,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 118,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Transmissão" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 141,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: transmission,
									onChange: (e) => setTransmission(e.target.value),
									className: "h-10 rounded-xl border border-input bg-surface px-3 text-xs text-foreground outline-none focus:border-primary sm:text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Todos",
											children: "Todos os câmbios"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 147,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Manual",
											children: "Manual"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 148,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Automático",
											children: "Automático"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 149,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Passageiros" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 155,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: passengers,
									onChange: (e) => setPassengers(e.target.value),
									className: "h-10 rounded-xl border border-input bg-surface px-3 text-xs text-foreground outline-none focus:border-primary sm:text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Todos",
											children: "Qualquer capacidade"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 161,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "ate5",
											children: "Até 5 pessoas"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 162,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "mais5",
											children: "Mais de 5 pessoas"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 163,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 156,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Ordenar por diária" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: sortOrder,
									onChange: (e) => setSortOrder(e.target.value),
									className: "h-10 rounded-xl border border-input bg-surface px-3 text-xs text-foreground outline-none focus:border-primary sm:text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "default",
											children: "Destaques"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 177,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "price-asc",
											children: "Menor diária primeiro"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 178,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "price-desc",
											children: "Maior diária primeiro"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 179,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 170,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex flex-col gap-1 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Buscar modelo ou item" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 187,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										value: query,
										onChange: (e) => setQuery(e.target.value),
										placeholder: "Ex: ar-condicionado, suv...",
										className: "h-10 w-full rounded-xl border border-input bg-surface pr-3 pl-9 text-xs text-foreground outline-none focus:border-primary sm:text-sm"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 188,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
							"Mostrando ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
								className: "text-foreground",
								children: filtered.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 25
							}, this),
							" de",
							" ",
							active.length,
							" modelos cadastrados na demonstração"
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 200,
							columnNumber: 13
						}, this), hasActiveFilters ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: resetFilters,
							className: "inline-flex items-center gap-1.5 font-medium text-primary transition-colors hover:underline",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 17
							}, this), "Limpar filtros"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 206,
							columnNumber: 15
						}, this) : null]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start",
				children: filtered.map((v, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: i % 3 * 80,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VehicleCard, { vehicle: v }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 222,
						columnNumber: 15
					}, this)
				}, v.id, false, {
					fileName: _jsxFileName,
					lineNumber: 221,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 219,
				columnNumber: 9
			}, this),
			!isLoading && filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "glass-panel mx-auto my-16 max-w-md rounded-2xl p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersHorizontal, { className: "mx-auto size-10 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 229,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "mt-4 text-lg font-semibold",
						children: "Nenhum veículo encontrado"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 230,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-xs leading-relaxed text-muted-foreground",
						children: "Não encontramos modelos com a combinação de filtros selecionada. Tente ajustar os critérios ou limpe os filtros para ver toda a frota."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 231,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-5 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: resetFilters,
							className: "inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 17
							}, this), "Restaurar todos os filtros"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 236,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: whatsappLink("Olá! Gostaria de consultar modelos e disponibilidade na Sol & Mar Rent a Car."),
							target: "_blank",
							rel: "noreferrer",
							className: "inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-2 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "size-3.5 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 17
								}, this),
								"Falar no WhatsApp (",
								company.phoneInternational,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 235,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 228,
				columnNumber: 11
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 110,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 99,
		columnNumber: 5
	}, this);
}
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var AdminRoute = Route$5.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$6
});
var ComoFuncionaRoute = Route$4.update({
	id: "/como-funciona",
	path: "/como-funciona",
	getParentRoute: () => Route$6
});
var ContatoRoute = Route$3.update({
	id: "/contato",
	path: "/contato",
	getParentRoute: () => Route$6
});
var FaqRoute = Route$2.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$6
});
var ReservaRoute = Route$7.update({
	id: "/reserva",
	path: "/reserva",
	getParentRoute: () => Route$6
});
var SobreRoute = Route$1.update({
	id: "/sobre",
	path: "/sobre",
	getParentRoute: () => Route$6
});
var VeiculosIndexRoute = Route.update({
	id: "/veiculos/",
	path: "/veiculos/",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	ComoFuncionaRoute,
	ContatoRoute,
	FaqRoute,
	ReservaRoute,
	SobreRoute,
	VeiculosIdRoute: Route$9.update({
		id: "/veiculos/$id",
		path: "/veiculos/$id",
		getParentRoute: () => Route$6
	}),
	VeiculosIndexRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
