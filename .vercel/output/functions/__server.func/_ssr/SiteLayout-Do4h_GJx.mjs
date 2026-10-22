import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Slot } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { $ as ArrowLeft, B as CircleQuestionMark, K as Check, S as MapPin, U as ChevronRight, Y as Calendar, b as MessageCircle, c as Sparkles, d as Send, g as Phone, k as Instagram, m as RotateCcw, o as Sun, t as X, u as ShieldCheck, x as Menu, y as Moon, z as Clock } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SiteLayout-Do4h_GJx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
/**
* Configuração institucional e de ambiente do site Sol & Mar Rent a Car.
* Toda a configuração externa vem de variáveis de ambiente padrão do Vite
* (.env / .env.example) com fallbacks oficiais auditados.
*/
var env = {
	"BASE_URL": "/",
	"DEV": true,
	"MODE": "production",
	"PROD": false,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_COMPANY_ADDRESS": "Rua Exemplo, 000 - Centro, Cidade/UF",
	"VITE_COMPANY_EMAIL": "contato@exemplo.com.br",
	"VITE_COMPANY_HOURS": "Seg a Sáb, 08h às 18h",
	"VITE_COMPANY_INSTAGRAM": "https://instagram.com/",
	"VITE_COMPANY_PHONE": "+55 (00) 0000-0000",
	"VITE_COMPANY_WHATSAPP": "5500000000000",
	"VITE_DEMO_ADMIN_EMAIL": "admin@solemar.com",
	"VITE_DEMO_ADMIN_PASSWORD": "admin123",
	"VITE_SUPABASE_STORAGE_BUCKET": "veiculos"
};
function read(key, fallback) {
	const value = env[key];
	return value && value.trim().length > 0 ? value.trim() : fallback;
}
var SUPABASE_URL = read("VITE_SUPABASE_URL", "");
var SUPABASE_ANON_KEY = read("VITE_SUPABASE_ANON_KEY", "");
read("VITE_SUPABASE_STORAGE_BUCKET", "veiculos");
var isSupabaseConfigured = SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
var company = {
	name: "Sol & Mar Rent a Car",
	legalName: "Andre de Sousa Marques",
	cnpj: "18.617.401/0001-50",
	tagline: "A liberdade onde o sol e o mar te levarem.",
	phone: read("VITE_COMPANY_PHONE", "(85) 99974-3558"),
	phoneInternational: "+55 85 99974-3558",
	whatsapp: read("VITE_COMPANY_WHATSAPP", "5585999743558"),
	email: read("VITE_COMPANY_EMAIL", ""),
	commercialAddress: "Avenida da Abolição, 1894, Meireles, Fortaleza - CE, Brasil",
	address: read("VITE_COMPANY_ADDRESS", "Avenida da Abolição, 1894, Meireles, Fortaleza - CE"),
	city: "Fortaleza, CE",
	establishedDate: "2 de agosto de 2013",
	establishedYear: 2013,
	hours: read("VITE_COMPANY_HOURS", "Segunda a sábado: 08h às 18h"),
	instagram: read("VITE_COMPANY_INSTAGRAM", "https://instagram.com/solemarrentacar"),
	defaultPickupLocation: "Aeroporto Internacional de Fortaleza"
};
var whatsappLink = (message = "Olá! Gostaria de informações sobre locação de veículos na Sol & Mar Rent a Car.") => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
var _jsxFileName$7 = "/app/applet/src/lib/theme.tsx";
var ThemeContext = (0, import_react.createContext)(void 0);
var STORAGE_KEY$1 = "solemar-theme";
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("dark");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY$1);
			if (saved === "light" || saved === "dark") {
				setThemeState(saved);
				applyTheme(saved);
			} else {
				const initialTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
				setThemeState(initialTheme);
				applyTheme(initialTheme);
			}
		} catch {
			applyTheme("dark");
		}
		setMounted(true);
	}, []);
	const applyTheme = (t) => {
		const root = document.documentElement;
		if (t === "dark") {
			root.classList.add("dark");
			root.classList.remove("light");
		} else {
			root.classList.add("light");
			root.classList.remove("dark");
		}
	};
	const setTheme = (nextTheme) => {
		setThemeState(nextTheme);
		applyTheme(nextTheme);
		try {
			localStorage.setItem(STORAGE_KEY$1, nextTheme);
		} catch {}
	};
	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeContext.Provider, {
		value: {
			theme,
			setTheme,
			toggleTheme
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 64,
		columnNumber: 5
	}, this);
}
function useTheme() {
	const context = (0, import_react.useContext)(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}
var brl = (value) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(value || 0);
var shortDate = (iso) => {
	const [y, m, d] = iso.split("-");
	if (!y || !m || !d) return iso;
	return `${d}/${m}/${y}`;
};
var longDate = (iso) => {
	return (/* @__PURE__ */ new Date(`${iso}T12:00:00`)).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
};
var todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var addDaysISO = (iso, days) => {
	const date = /* @__PURE__ */ new Date(`${iso}T12:00:00`);
	date.setDate(date.getDate() + days);
	return date.toISOString().slice(0, 10);
};
/** Diárias cobradas entre duas datas (mínimo de 1). */
var daysBetween = (start, end) => {
	const a = (/* @__PURE__ */ new Date(`${start}T12:00:00`)).getTime();
	const b = (/* @__PURE__ */ new Date(`${end}T12:00:00`)).getTime();
	const diff = Math.round((b - a) / 864e5);
	return Math.max(1, diff);
};
var toyota_hilux_1792460480131_default = "/assets/toyota_hilux_1792460480131-DuUln9zR.jpg";
var chevrolet_tracker_1792460480596_default = "/assets/chevrolet_tracker_1792460480596-DpdZFAbW.jpg";
var fiat_pulse_1792460480931_default = "/assets/fiat_pulse_1792460480931-DuoA7KU6.jpg";
var citroen_c3_1792460481794_default = "/assets/citroen_c3_1792460481794-BL31F7Nt.jpg";
var vw_polo_1792460482457_default = "/assets/vw_polo_1792460482457-DobsvUcg.jpg";
var chevrolet_onix_plus_1792460483292_default = "/assets/chevrolet_onix_plus_1792460483292-CnJHXXCI.jpg";
var chevrolet_spin_1792460483644_default = "/assets/chevrolet_spin_1792460483644-CGJvo40X.jpg";
var peugeot_208_1792460483887_default = "/assets/peugeot_208_1792460483887-C-KW32im.jpg";
var spin_silver_studio_1792460625684_default = "/assets/spin_silver_studio_1792460625684-B3hhP9_E.jpg";
var tracker_blue_studio_1792460637001_default = "/assets/tracker_blue_studio_1792460637001-CWed0xxi.jpg";
var jeep_renegade_1792460483551_default = "/assets/jeep_renegade_1792460483551-uQ3g07Kc.jpg";
var onix_silver_studio_1792460649666_default = "/assets/onix_silver_studio_1792460649666-BuLVDOMG.jpg";
var vw_tera_1792460484059_default = "/assets/vw_tera_1792460484059-BzWO7BOr.jpg";
/**
* Catálogo Oficial da Sol & Mar Rent a Car.
* Contém exatamente as 13 configurações informadas pelo proprietário.
* Cada veículo possui administração individual (ativação/desativação, diária, especificações e envio de fotos).
* Fotos ilustrativas em estúdio sem logotipos artificiais ou distorções.
* Nenhuma especificação não confirmada foi deduzida ou inventada.
*/
var seedVehicles = [
	{
		id: "v-toyota-hilux-2026",
		name: "Toyota Hilux",
		category: "Picape",
		year: 2026,
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: toyota_hilux_1792460480131_default,
		images: [toyota_hilux_1792460480131_default],
		is_illustrative_image: true,
		description: "Toyota Hilux, ano 2026, versão a confirmar.",
		created_at: "2026-01-01T10:00:00.000Z"
	},
	{
		id: "v-chevrolet-tracker-turbo-aut",
		name: "Chevrolet Tracker Turbo",
		category: "SUV",
		transmission: "Automático",
		engine: "Turbo",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: chevrolet_tracker_1792460480596_default,
		images: [chevrolet_tracker_1792460480596_default],
		is_illustrative_image: true,
		description: "Chevrolet Tracker turbo automático, versão exata a confirmar.",
		created_at: "2026-01-02T10:00:00.000Z"
	},
	{
		id: "v-fiat-pulse-2026-aut",
		name: "Fiat Pulse 2026",
		category: "SUV",
		year: 2026,
		transmission: "Automático",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: fiat_pulse_1792460480931_default,
		images: [fiat_pulse_1792460480931_default],
		is_illustrative_image: true,
		description: "Fiat Pulse 2026 automático.",
		created_at: "2026-01-03T10:00:00.000Z"
	},
	{
		id: "v-citroen-c3-10-manual",
		name: "Citroën C3 1.0",
		category: "Hatch",
		transmission: "Manual",
		engine: "1.0",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: citroen_c3_1792460481794_default,
		images: [citroen_c3_1792460481794_default],
		is_illustrative_image: true,
		description: "Citroën C3 1.0 manual.",
		created_at: "2026-01-04T10:00:00.000Z"
	},
	{
		id: "v-vw-polo-10-manual",
		name: "Volkswagen Polo 1.0",
		category: "Hatch",
		transmission: "Manual",
		engine: "1.0",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: vw_polo_1792460482457_default,
		images: [vw_polo_1792460482457_default],
		is_illustrative_image: true,
		description: "Volkswagen Polo 1.0 manual.",
		created_at: "2026-01-05T10:00:00.000Z"
	},
	{
		id: "v-chevrolet-onix-plus-10-manual",
		name: "Chevrolet Onix Plus Sedã 1.0",
		category: "Sedã",
		transmission: "Manual",
		engine: "1.0",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: chevrolet_onix_plus_1792460483292_default,
		images: [chevrolet_onix_plus_1792460483292_default],
		is_illustrative_image: true,
		description: "Chevrolet Onix Plus sedã 1.0 manual.",
		created_at: "2026-01-06T10:00:00.000Z"
	},
	{
		id: "v-chevrolet-spin-18-aut-7lug-2026",
		name: "Chevrolet Spin 1.8 7 Lugares",
		category: "Minivan",
		transmission: "Automático",
		engine: "1.8",
		passengers: 7,
		year: 2026,
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: chevrolet_spin_1792460483644_default,
		images: [chevrolet_spin_1792460483644_default],
		is_illustrative_image: true,
		description: "Chevrolet Spin 1.8 automático, 7 lugares, ano 2026.",
		created_at: "2026-01-07T10:00:00.000Z"
	},
	{
		id: "v-peugeot-208-10-manual",
		name: "Peugeot 208 1.0",
		category: "Hatch",
		transmission: "Manual",
		engine: "1.0",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: peugeot_208_1792460483887_default,
		images: [peugeot_208_1792460483887_default],
		is_illustrative_image: true,
		description: "Peugeot 208 1.0 manual.",
		created_at: "2026-01-08T10:00:00.000Z"
	},
	{
		id: "v-chevrolet-spin-18-cambio-confirmar",
		name: "Chevrolet Spin 1.8",
		category: "Minivan",
		engine: "1.8",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: spin_silver_studio_1792460625684_default,
		images: [spin_silver_studio_1792460625684_default],
		is_illustrative_image: true,
		description: "Chevrolet Spin 1.8, câmbio a confirmar.",
		created_at: "2026-01-09T10:00:00.000Z"
	},
	{
		id: "v-chevrolet-tracker-12-aut",
		name: "Chevrolet Tracker 1.2",
		category: "SUV",
		transmission: "Automático",
		engine: "1.2",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: tracker_blue_studio_1792460637001_default,
		images: [tracker_blue_studio_1792460637001_default],
		is_illustrative_image: true,
		description: "Chevrolet Tracker 1.2 automático.",
		created_at: "2026-01-10T10:00:00.000Z"
	},
	{
		id: "v-jeep-renegade-18-aut",
		name: "Jeep Renegade 1.8",
		category: "SUV",
		transmission: "Automático",
		engine: "1.8",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: jeep_renegade_1792460483551_default,
		images: [jeep_renegade_1792460483551_default],
		is_illustrative_image: true,
		description: "Jeep Renegade 1.8 automático.",
		created_at: "2026-01-11T10:00:00.000Z"
	},
	{
		id: "v-chevrolet-onix-plus-16-aut",
		name: "Chevrolet Onix Plus Sedã 1.6",
		category: "Sedã",
		transmission: "Automático",
		engine: "1.6",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: onix_silver_studio_1792460649666_default,
		images: [onix_silver_studio_1792460649666_default],
		is_illustrative_image: true,
		description: "Chevrolet Onix Plus sedã 1.6 automático.",
		created_at: "2026-01-12T10:00:00.000Z"
	},
	{
		id: "v-vw-tera-10-suv-aut",
		name: "Volkswagen Tera 1.0 SUV",
		category: "SUV",
		transmission: "Automático",
		engine: "1.0",
		daily_rate: 0,
		status: "disponivel",
		active: true,
		cover_image: vw_tera_1792460484059_default,
		images: [vw_tera_1792460484059_default],
		is_illustrative_image: true,
		description: "Volkswagen Tera 1.0 SUV automático, versão a confirmar.",
		created_at: "2026-01-13T10:00:00.000Z"
	}
];
var seedAdditionals = [
	{
		id: "opt-bebe-conforto",
		name: "Bebê Conforto (0 a 1 ano)",
		description: "Item de segurança indispensável para recém-nascidos até 1 ano ou 13 kg.",
		price: 20,
		type: "per_day",
		stock_quantity: 6,
		active: true,
		created_at: "2026-01-01T10:00:00.000Z"
	},
	{
		id: "opt-cadeirinha-infantil",
		name: "Cadeirinha Infantil (1 a 4 anos)",
		description: "Assento com cinto próprio para crianças de 9 kg a 18 kg.",
		price: 20,
		type: "per_day",
		stock_quantity: 8,
		active: true,
		created_at: "2026-01-01T10:00:00.000Z"
	},
	{
		id: "opt-assento-elevacao",
		name: "Assento de Elevação (4 a 7 anos)",
		description: "Booster de segurança para crianças de 15 kg a 36 kg.",
		price: 15,
		type: "per_day",
		stock_quantity: 10,
		active: true,
		created_at: "2026-01-01T10:00:00.000Z"
	},
	{
		id: "opt-condutor-adicional",
		name: "Condutor Adicional",
		description: "Autorização de cobertura para um segundo motorista habilitado durante a locação.",
		price: 15,
		type: "per_day",
		stock_quantity: 99,
		active: true,
		created_at: "2026-01-01T10:00:00.000Z"
	},
	{
		id: "opt-protecao-pneus-vidros",
		name: "Proteção Especial de Pneus e Vidros",
		description: "Reduz a responsabilidade financeira em caso de danos a retrovisores, vidros e pneus.",
		price: 25,
		type: "per_day",
		stock_quantity: 99,
		active: true,
		created_at: "2026-01-01T10:00:00.000Z"
	}
];
var seedCustomers = [{
	id: "c-exemplo-1",
	name: "Cliente Sol & Mar",
	email: "cliente@exemplo.com",
	phone: "(85) 99974-3558",
	document: "000.000.000-00",
	city: "Fortaleza/CE",
	notes: null,
	created_at: (/* @__PURE__ */ new Date()).toISOString()
}];
var seedReservations = [{
	id: "r-exemplo-1",
	code: "SM000001",
	vehicle_id: "v-toyota-hilux-2026",
	customer_id: "c-exemplo-1",
	start_date: addDaysISO(todayISO(), 3),
	end_date: addDaysISO(todayISO(), 6),
	start_time: "09:00",
	end_time: "09:00",
	pickup_location: "Aeroporto Internacional de Fortaleza",
	return_location: "Aeroporto Internacional de Fortaleza",
	days: 3,
	daily_rate: 0,
	daily_subtotal: 0,
	additionals_subtotal: 0,
	rental_total: 0,
	deposit_amount: 0,
	advance_payment_amount: 0,
	balance_on_pickup: 0,
	total: 0,
	status: "pendente",
	payment_status: "pendente_checkout",
	payment_provider: null,
	payment_gateway_note: "Aguardando definição do provedor comercial e integração de pré-autorização.",
	notes: "Simulação de cotação",
	created_at: (/* @__PURE__ */ new Date()).toISOString()
}];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName$6 = "/app/applet/src/components/ui/button.tsx";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			hero: "bg-gradient-gold text-primary-foreground font-semibold shadow-gold transition-all duration-300 hover:brightness-105 hover:-translate-y-0.5",
			sea: "bg-gradient-sea text-accent-foreground font-semibold transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5",
			glass: "glass-panel text-foreground font-medium transition-all duration-300 hover:border-primary/50 hover:text-primary",
			subtle: "bg-surface-2 text-foreground hover:bg-surface-2/70"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-11 rounded-lg px-8",
			xl: "h-13 rounded-xl px-9 text-base tracking-wide",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 49,
		columnNumber: 7
	}, void 0);
});
Button.displayName = "Button";
var _jsxFileName$5 = "/app/applet/src/components/site/Logo.tsx";
/**
* Apresentação Oficial da Logo Sol & Mar Rent a Car.
*
* Utiliza a imagem oficial com eliminação das margens escuras vazias desnecessárias,
* garantindo que a tipografia "Sol&Mar RENT A CAR Locação de Veículos" e o sol ocupem
* todo o espaço visual com nitidez, amplitude horizontal e sem distorções.
*/
function Logo({ className, imageClassName, priority = false }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: "/",
		className: cn("group flex items-center shrink-0 transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl", className),
		"aria-label": "Sol & Mar Rent a Car — página inicial",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: cn("relative shrink-0 overflow-hidden rounded-2xl shadow-sm ring-1 ring-border/80 bg-[#0f1c30] transition-all duration-300 group-hover:ring-primary/60 group-hover:shadow-md", imageClassName || "h-16 sm:h-20 md:h-24 lg:h-28 w-auto aspect-[1242/1130]"),
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: "/logo-sol-e-mar-clean.png",
				alt: "Sol & Mar Rent a Car",
				width: 280,
				height: 255,
				loading: priority ? "eager" : "lazy",
				className: "size-full object-contain p-0.5 transition-transform duration-500 group-hover:scale-105"
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 35,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 29,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 21,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/site/ThemeToggle.tsx";
function ThemeToggle({ className }) {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		type: "button",
		onClick: toggleTheme,
		"aria-label": isDark ? "Alternar para tema claro" : "Alternar para tema escuro",
		title: isDark ? "Mudar para modo claro" : "Mudar para modo escuro",
		className: cn("relative grid size-10 place-items-center rounded-xl border transition-all duration-300", "border-border bg-surface/80 text-foreground hover:bg-surface-2 hover:border-primary/50", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: cn("size-4.5 transition-all duration-300 text-amber-500", isDark ? "scale-0 rotate-90 opacity-0 absolute" : "scale-100 rotate-0 opacity-100") }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 22,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { className: cn("size-4.5 transition-all duration-300 text-sky-400", isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0 absolute") }, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 28,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "sr-only",
				children: isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 34,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 10,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/site/Header.tsx";
var nav = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/veiculos",
		label: "Veículos"
	},
	{
		to: "/como-funciona",
		label: "Como funciona"
	},
	{
		to: "/sobre",
		label: "Sobre"
	},
	{
		to: "/faq",
		label: "FAQ"
	},
	{
		to: "/contato",
		label: "Contato"
	}
];
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => setOpen(false), [pathname]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const isHome = pathname === "/";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "glass-panel border-b border-border py-2.5 shadow-sm" : "border-b border-transparent py-4"),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto flex max-w-[1536px] w-full items-center gap-4 px-5 sm:px-8 lg:px-12 xl:px-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, {
					className: "shrink-0",
					imageClassName: scrolled ? "h-14 sm:h-16 md:h-18 lg:h-20 w-auto aspect-[1242/1130]" : "h-18 sm:h-22 md:h-26 lg:h-30 xl:h-32 w-auto aspect-[1242/1130]",
					priority: true
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 45,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "ml-auto hidden items-center gap-1 lg:flex",
					children: nav.map((item) => {
						if (item.to === "/faq" && isHome) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "#faq",
							className: "rounded-full px-3.5 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:bg-surface/70",
							children: item.label
						}, item.to, false, {
							fileName: _jsxFileName$3,
							lineNumber: 59,
							columnNumber: 17
						}, this);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: item.to,
							className: "rounded-full px-3.5 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:bg-surface/70",
							activeProps: { className: "text-foreground font-bold bg-surface/90 shadow-xs" },
							activeOptions: { exact: item.to === "/" },
							children: item.label
						}, item.to, false, {
							fileName: _jsxFileName$3,
							lineNumber: 69,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 55,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "ml-auto flex items-center gap-2 lg:ml-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: `tel:${company.phone.replace(/[^0-9+]/g, "")}`,
							className: "hidden items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary lg:flex",
							title: "Ligar ou enviar mensagem para a Sol & Mar",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "size-3.5 text-primary" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 88,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: company.phoneInternational }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 89,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 83,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeToggle, {}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 93,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "hero",
							size: "sm",
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/reserva",
								children: "Solicitar orçamento"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 96,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 95,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/admin",
							"aria-label": "Painel administrativo da frota",
							title: "Painel administrativo da frota",
							className: "grid size-9 shrink-0 place-items-center rounded-xl border border-border/80 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-surface hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 106,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 100,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setOpen((v) => !v),
							"aria-label": open ? "Fechar menu" : "Abrir menu",
							className: "grid size-10 shrink-0 place-items-center rounded-xl border border-border text-foreground hover:bg-surface transition-colors lg:hidden",
							children: open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 115,
								columnNumber: 21
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 115,
								columnNumber: 48
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 109,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 82,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 44,
			columnNumber: 7
		}, this), open ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-panel mx-4 mt-3 rounded-2xl border border-border p-4 shadow-elevate lg:hidden animate-in fade-in-50 duration-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "flex flex-col gap-1",
					children: nav.map((item) => {
						if (item.to === "/faq" && isHome) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "#faq",
							onClick: () => setOpen(false),
							className: "rounded-xl px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground",
							children: item.label
						}, item.to, false, {
							fileName: _jsxFileName$3,
							lineNumber: 126,
							columnNumber: 19
						}, this);
						return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: item.to,
							className: "rounded-xl px-4 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground",
							activeProps: { className: "text-primary font-semibold bg-surface" },
							activeOptions: { exact: item.to === "/" },
							children: item.label
						}, item.to, false, {
							fileName: _jsxFileName$3,
							lineNumber: 137,
							columnNumber: 17
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 122,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3 space-y-2 border-t border-border pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: `tel:${company.phone.replace(/[^0-9+]/g, "")}`,
							className: "flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-xs font-medium text-foreground hover:text-primary transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Phone, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 155,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Telefone / WhatsApp: ", company.phoneInternational] }, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 156,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 151,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between px-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Alternar aparência"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 160,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeToggle, {}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 161,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 159,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/admin",
							onClick: () => setOpen(false),
							className: "flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-xs font-medium text-foreground hover:text-primary transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 169,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Painel administrativo da frota" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 170,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 164,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 150,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					asChild: true,
					variant: "hero",
					size: "lg",
					className: "mt-3 w-full",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/reserva",
						children: "Solicitar orçamento"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 175,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 174,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 121,
			columnNumber: 9
		}, this) : null]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 36,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/site/Footer.tsx";
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "mt-32 border-t border-border bg-surface/80 dark:bg-sidebar transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto grid max-w-[1536px] w-full gap-12 px-5 py-16 sm:px-8 lg:px-12 xl:px-16 lg:grid-cols-[1.3fr_1fr_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Logo, { imageClassName: "h-18 sm:h-22 lg:h-26 w-auto aspect-[1242/1130]" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 12,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-bold tracking-wider text-primary uppercase",
							children: [
								"\"",
								company.tagline,
								"\""
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 13,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "max-w-sm text-sm leading-relaxed text-muted-foreground",
							children: "Locação de veículos em Fortaleza com atendimento próximo, frota revisada e solicitação de orçamento transparente. Tradição e atendimento humanizado desde 2013."
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 16,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 11,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "eyebrow",
						children: "Navegação"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 24,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-5 space-y-3 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/veiculos",
								className: "transition-colors hover:text-foreground",
								children: "Catálogo de veículos"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 27,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 26,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/reserva",
								className: "transition-colors hover:text-foreground",
								children: "Solicitar orçamento"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 32,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 31,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/como-funciona",
								className: "transition-colors hover:text-foreground",
								children: "Como funciona"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 37,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 36,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/sobre",
								className: "transition-colors hover:text-foreground",
								children: "Sobre a empresa"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 42,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 41,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/faq",
								className: "transition-colors hover:text-foreground",
								children: "Perguntas frequentes"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 47,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 46,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/contato",
								className: "transition-colors hover:text-foreground",
								children: "Fale conosco"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 52,
								columnNumber: 15
							}, this) }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 51,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 25,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 23,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "eyebrow",
						children: "Atendimento e Localização"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 61,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
						className: "mt-5 space-y-4 text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "mt-0.5 size-4 shrink-0 text-primary" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 64,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-foreground font-medium text-xs",
										children: "Endereço Comercial:"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 66,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs",
										children: company.commercialAddress
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 67,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-[0.68rem] text-muted-foreground/80 mt-0.5",
										children: "(Sede administrativa — consulte opções de entrega e retirada)"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 68,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 65,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 63,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "mt-0.5 size-4 shrink-0 text-primary" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 74,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-foreground font-medium",
										children: "Horário de Atendimento:"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 76,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: company.hours }, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 77,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 75,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 73,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Instagram, { className: "mt-0.5 size-4 shrink-0 text-primary" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 81,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-foreground font-medium",
										children: "Instagram Oficial:"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 83,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
										href: company.instagram,
										target: "_blank",
										rel: "noreferrer",
										className: "hover:underline text-primary font-medium",
										children: "@solemarrentacar"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 84,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 82,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 80,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 62,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 60,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$2,
			lineNumber: 9,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "hairline-top",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto flex max-w-[1536px] w-full flex-col items-center justify-center gap-1.5 px-5 py-8 text-center text-xs text-muted-foreground sm:px-8 lg:px-12 xl:px-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-medium text-foreground/90",
						children: "© 2026 Sol & Mar Rent a Car. Todos os direitos reservados."
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 106,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: "Fortaleza, Ceará"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 109,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-[0.75rem] text-muted-foreground/75",
						children: ["Feito por ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-foreground/80 font-medium",
							children: "Localway"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 111,
							columnNumber: 23
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 110,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 105,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 104,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 8,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/site/WhatsAppAssistant.tsx";
var ASSISTANT_TOPICS = [
	{
		id: "alugar",
		label: "Quero alugar um carro",
		icon: Sparkles,
		type: "rental"
	},
	{
		id: "disponibilidade",
		label: "Consultar disponibilidade",
		icon: Calendar,
		type: "rental"
	},
	{
		id: "valores",
		label: "Consultar valores da frota",
		icon: Clock,
		type: "rental"
	},
	{
		id: "frota",
		label: "Saber mais sobre a frota",
		icon: Check,
		type: "info"
	},
	{
		id: "ajuste",
		label: "Alterar ou esclarecer uma solicitação",
		icon: MessageCircle,
		type: "simple"
	},
	{
		id: "duvida",
		label: "Tenho outra dúvida",
		icon: CircleQuestionMark,
		type: "simple"
	}
];
var LOCATIONS = [
	"Sede Meireles (Av. da Abolição, 1894)",
	"Aeroporto Internacional de Fortaleza (provisório / sob consulta)",
	"Hotel / Orla de Fortaleza (sob consulta)"
];
var INITIAL_RENTAL_DATA = {
	topic: "",
	categoryOrVehicle: "",
	pickupDate: "",
	pickupTime: "09:00",
	returnDate: "",
	returnTime: "18:00",
	pickupLocation: LOCATIONS[0],
	returnLocation: LOCATIONS[0],
	name: "",
	notes: "",
	simpleQuestion: ""
};
var STORAGE_KEY = "solemar_assistant_state_v1";
function WhatsAppAssistant() {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)("welcome");
	const [data, setData] = (0, import_react.useState)(INITIAL_RENTAL_DATA);
	const [freeInput, setFreeInput] = (0, import_react.useState)("");
	const messagesEndRef = (0, import_react.useRef)(null);
	const searchParams = useRouterState({ select: (s) => s.location.search ?? {} });
	(0, import_react.useEffect)(() => {
		try {
			const saved = sessionStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (parsed.data) setData(parsed.data);
				if (parsed.step) setStep(parsed.step);
			}
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
				step,
				data
			}));
		} catch {}
	}, [step, data]);
	(0, import_react.useEffect)(() => {
		if (searchParams.veiculo && !data.categoryOrVehicle) {
			const found = seedVehicles.find((v) => v.id === searchParams.veiculo);
			if (found) setData((prev) => ({
				...prev,
				categoryOrVehicle: `${found.name} (${found.category})`,
				pickupDate: searchParams.inicio || prev.pickupDate,
				returnDate: searchParams.fim || prev.returnDate
			}));
		}
	}, [searchParams, data.categoryOrVehicle]);
	(0, import_react.useEffect)(() => {
		if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [isOpen, step]);
	const resetConversation = () => {
		setData(INITIAL_RENTAL_DATA);
		setStep("welcome");
		setFreeInput("");
		try {
			sessionStorage.removeItem(STORAGE_KEY);
		} catch {}
	};
	const handleSelectTopic = (topic) => {
		setData((prev) => ({
			...prev,
			topic: topic.label
		}));
		if (topic.type === "rental") setStep("rental_vehicle");
		else if (topic.type === "info") {
			setData((prev) => ({
				...prev,
				simpleQuestion: "Gostaria de conhecer os modelos e categorias disponíveis na frota."
			}));
			setStep("simple_summary");
		} else setStep("simple_question");
	};
	const handleSelectVehicle = (value) => {
		setData((prev) => ({
			...prev,
			categoryOrVehicle: value
		}));
		setStep("rental_dates");
	};
	const handleConfirmDates = () => {
		if (!data.pickupDate || !data.returnDate) return;
		setStep("rental_location");
	};
	const handleConfirmName = () => {
		if (!data.name.trim()) return;
		setStep("rental_notes");
	};
	const handleFinishRental = () => {
		setStep("rental_summary");
	};
	const handleFinishSimple = () => {
		if (!freeInput.trim()) return;
		setData((prev) => ({
			...prev,
			simpleQuestion: freeInput.trim()
		}));
		setStep("simple_summary");
	};
	const finalWhatsAppText = (0, import_react.useMemo)(() => {
		if (step === "rental_summary") return [
			`*SOLICITAÇÃO VIA SITE — SOL & MAR RENT A CAR*`,
			``,
			data.name ? `*Nome do Solicitante:* ${data.name}` : `*Solicitante:* Contato pelo site`,
			`*Assunto:* ${data.topic || "Locação de Veículo"}`,
			`*Categoria/Veículo:* ${data.categoryOrVehicle || "A definir"}`,
			`*Retirada:* ${data.pickupDate || "A combinar"} às ${data.pickupTime}`,
			`*Local de Retirada:* ${data.pickupLocation}`,
			`*Devolução:* ${data.returnDate || "A combinar"} às ${data.returnTime}`,
			`*Local de Devolução:* ${data.returnLocation}`,
			data.notes ? `*Observações:* ${data.notes}` : "",
			``,
			`_Mensagem preparada pelo assistente do site. Aguardo confirmação de disponibilidade e orçamento formal._`
		].filter(Boolean).join("\n");
		return [
			`*CONTATO VIA SITE — SOL & MAR RENT A CAR*`,
			``,
			data.name ? `*Nome:* ${data.name}` : "",
			`*Assunto:* ${data.topic || "Dúvida geral"}`,
			`*Mensagem:* ${data.simpleQuestion || "Gostaria de mais informações sobre locação."}`,
			``,
			`_Contato iniciado através do site solemarrentacar.com.br_`
		].filter(Boolean).join("\n");
	}, [step, data]);
	const handleOpenWhatsApp = () => {
		const url = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(finalWhatsAppText)}`;
		window.open(url, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed right-5 bottom-5 z-40 flex items-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			onClick: () => setIsOpen((prev) => !prev),
			"aria-label": isOpen ? "Fechar assistente de atendimento" : "Abrir assistente no WhatsApp",
			"aria-expanded": isOpen,
			className: cn("group relative grid size-14 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold transition-all duration-300 hover:scale-105 active:scale-95", !isOpen && "motion-safe:animate-pulse"),
			children: [!isOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "absolute -inset-1 rounded-full bg-primary/20 blur-sm pointer-events-none" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 259,
				columnNumber: 13
			}, this) : null, isOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-6 transition-transform duration-200 group-hover:rotate-90" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 263,
				columnNumber: 13
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "size-6 transition-transform duration-200" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 265,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 247,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 246,
		columnNumber: 7
	}, this), isOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		role: "dialog",
		"aria-label": "Assistente de Atendimento Sol & Mar",
		className: "animate-in fade-in-50 slide-in-from-bottom-4 fixed right-4 bottom-22 z-50 flex w-[23rem] max-w-[calc(100vw-2rem)] flex-col rounded-3xl border border-border bg-card/95 shadow-elevate backdrop-blur-xl duration-200 max-h-[82vh] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between border-b border-border/80 bg-surface/70 px-4 py-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: "/logo%20sol%20e%20mar.jpeg",
							alt: "Sol & Mar",
							className: "size-9 rounded-xl object-cover ring-1 ring-border shadow-xs"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 281,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 286,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 280,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-display font-bold text-xs text-foreground truncate",
							children: "Sol & Mar Rent a Car"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 289,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[0.68rem] text-muted-foreground font-medium",
							children: "Atendimento oficial · Fortaleza - CE"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 292,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 288,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 279,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: resetConversation,
						title: "Recomeçar atendimento",
						className: "grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "size-3.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 305,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 299,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setIsOpen(false),
						title: "Fechar assistente",
						className: "grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 313,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 307,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 298,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 278,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 overflow-y-auto p-4 space-y-3.5 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-start gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
							src: "/logo%20sol%20e%20mar.jpeg",
							alt: "",
							className: "size-6 rounded-lg object-cover ring-1 ring-border mt-0.5 shrink-0"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 322,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "max-w-[85%] rounded-2xl rounded-tl-sm bg-surface p-3 text-foreground leading-relaxed shadow-2xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-xs text-primary mb-1",
									children: "Assistente Sol & Mar"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 328,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
									"Olá! ☀️ Seja bem-vindo(a) à ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Sol & Mar Rent a Car" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 330,
										columnNumber: 47
									}, this),
									". Como podemos ajudar na sua próxima viagem?"
								] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 329,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1.5 text-[0.68rem] text-muted-foreground",
									children: "Organizamos sua solicitação aqui para atendimento ágil no WhatsApp oficial."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 333,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 327,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 321,
						columnNumber: 13
					}, this),
					step === "welcome" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-2 pt-1 animate-in fade-in-50",
						children: [
							/* @__PURE__ */ (void 0)("p", {
								className: "text-[0.7rem] font-bold text-muted-foreground uppercase tracking-wider pl-1",
								children: "Selecione uma opção para começar:"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 342,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-1 gap-1.5",
								children: ASSISTANT_TOPICS.map((topic) => {
									return /* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => handleSelectTopic(topic),
										className: "flex items-center justify-between gap-2 rounded-xl border border-border/80 bg-surface/50 p-2.5 text-left font-medium text-foreground transition-all hover:border-primary/60 hover:bg-surface hover:shadow-xs active:scale-[0.99]",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)(topic.icon, { className: "size-3.5 text-primary shrink-0" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 356,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", { children: topic.label }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 357,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 355,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5 text-muted-foreground shrink-0" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 359,
											columnNumber: 25
										}, this)]
									}, topic.id, true, {
										fileName: _jsxFileName$1,
										lineNumber: 349,
										columnNumber: 23
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 345,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "border-t border-border/70 pt-2.5 mt-2",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-[0.68rem] text-muted-foreground mb-1.5",
									children: "Ou digite uma mensagem livre diretamente:"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 366,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex gap-1.5",
									children: [/* @__PURE__ */ (void 0)("input", {
										type: "text",
										placeholder: "Ex: Gostaria de saber os horários de domingo...",
										value: freeInput,
										onChange: (e) => setFreeInput(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter" && freeInput.trim()) handleFinishSimple();
										},
										className: "flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 370,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(Button, {
										size: "sm",
										variant: "hero",
										disabled: !freeInput.trim(),
										onClick: handleFinishSimple,
										className: "h-auto px-3",
										children: /* @__PURE__ */ (void 0)(Send, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 389,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 382,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 369,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 365,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 341,
						columnNumber: 15
					}, this),
					data.topic && step !== "welcome" && /* @__PURE__ */ (void 0)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground p-2.5 font-medium shadow-xs",
							children: data.topic
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 399,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 398,
						columnNumber: 15
					}, this),
					step === "rental_vehicle" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-2 pt-1 animate-in fade-in-50",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl rounded-tl-sm bg-surface p-3 text-foreground leading-relaxed",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-semibold text-xs mb-1",
								children: "Qual categoria de veículo você prefere?"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 409,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "A locação é confirmada por categoria (com modelo de referência ou similar):"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 412,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 408,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-1 gap-1.5",
							children: [seedVehicles.map((v) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => handleSelectVehicle(`${v.name} (${v.category})`),
								className: "flex items-center justify-between gap-2 rounded-xl border border-border/80 bg-surface/50 p-2.5 text-left transition-all hover:border-primary/60 hover:bg-surface",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
									className: "font-semibold text-foreground text-xs",
									children: v.category
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 426,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-[0.68rem] text-muted-foreground",
									children: v.reference_model || v.name
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 427,
									columnNumber: 25
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 425,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5 text-muted-foreground shrink-0" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 431,
									columnNumber: 23
								}, this)]
							}, v.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 419,
								columnNumber: 21
							}, this)), /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => handleSelectVehicle("Ainda em dúvida / Quero recomendação"),
								className: "rounded-xl border border-dashed border-border p-2 text-center text-xs text-muted-foreground hover:bg-surface hover:text-foreground transition-colors",
								children: "Ainda estou em dúvida (ajudem-me a escolher)"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 434,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 417,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 407,
						columnNumber: 15
					}, this),
					data.categoryOrVehicle && step !== "welcome" && step !== "rental_vehicle" && /* @__PURE__ */ (void 0)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground p-2.5 font-medium",
							children: data.categoryOrVehicle
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 448,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 447,
						columnNumber: 15
					}, this),
					step === "rental_dates" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-2.5 pt-1 animate-in fade-in-50",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl rounded-tl-sm bg-surface p-3 text-foreground leading-relaxed",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-semibold text-xs mb-1",
								children: "Para quais datas você precisa?"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 458,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "Informe os dias previstos de retirada e devolução em Fortaleza:"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 459,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 457,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-2 rounded-2xl border border-border/80 bg-surface/40 p-3",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[0.65rem] font-semibold text-muted-foreground block mb-1",
										children: "Retirada:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 467,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "date",
										value: data.pickupDate,
										onChange: (e) => setData({
											...data,
											pickupDate: e.target.value
										}),
										className: "w-full rounded-lg border border-border bg-card px-2 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 470,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 466,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[0.65rem] font-semibold text-muted-foreground block mb-1",
										children: "Horário:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 478,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "time",
										value: data.pickupTime,
										onChange: (e) => setData({
											...data,
											pickupTime: e.target.value
										}),
										className: "w-full rounded-lg border border-border bg-card px-2 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 481,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 477,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 465,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-2 pt-1 border-t border-border/60",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[0.65rem] font-semibold text-muted-foreground block mb-1",
										children: "Devolução:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 492,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "date",
										value: data.returnDate,
										onChange: (e) => setData({
											...data,
											returnDate: e.target.value
										}),
										className: "w-full rounded-lg border border-border bg-card px-2 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 495,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 491,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[0.65rem] font-semibold text-muted-foreground block mb-1",
										children: "Horário:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 503,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "time",
										value: data.returnTime,
										onChange: (e) => setData({
											...data,
											returnTime: e.target.value
										}),
										className: "w-full rounded-lg border border-border bg-card px-2 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 506,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 502,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 490,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "hero",
									disabled: !data.pickupDate || !data.returnDate,
									onClick: handleConfirmDates,
									className: "w-full font-bold mt-1",
									children: ["Confirmar datas", /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 523,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 515,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 464,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 456,
						columnNumber: 15
					}, this),
					data.pickupDate && data.returnDate && (step === "rental_location" || step === "rental_name" || step === "rental_notes" || step === "rental_summary") && /* @__PURE__ */ (void 0)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground p-2.5 font-medium",
							children: [
								"De ",
								data.pickupDate,
								" (",
								data.pickupTime,
								") até ",
								data.returnDate,
								" (",
								data.returnTime,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 537,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 536,
						columnNumber: 17
					}, this),
					step === "rental_location" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-2 pt-1 animate-in fade-in-50",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl rounded-tl-sm bg-surface p-3 text-foreground leading-relaxed",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-semibold text-xs mb-1",
								children: "Onde deseja retirar o carro?"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 548,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "Selecione o local de preferência (a devolução usará o mesmo local por padrão):"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 549,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 547,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: LOCATIONS.map((loc) => /* @__PURE__ */ (void 0)("button", {
								type: "button",
								onClick: () => {
									setData((prev) => ({
										...prev,
										pickupLocation: loc,
										returnLocation: loc
									}));
									setStep("rental_name");
								},
								className: cn("flex w-full items-center justify-between gap-2 rounded-xl border p-2.5 text-left font-medium text-xs transition-all", data.pickupLocation === loc ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary/40" : "border-border/80 bg-surface/50 text-foreground hover:bg-surface"),
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(MapPin, { className: "size-3.5 text-primary shrink-0" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 575,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("span", { children: loc }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 576,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 574,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5 text-muted-foreground shrink-0" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 578,
									columnNumber: 23
								}, this)]
							}, loc, true, {
								fileName: _jsxFileName$1,
								lineNumber: 556,
								columnNumber: 21
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 554,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 546,
						columnNumber: 15
					}, this),
					data.pickupLocation && (step === "rental_name" || step === "rental_notes" || step === "rental_summary") && /* @__PURE__ */ (void 0)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground p-2.5 font-medium",
							children: data.pickupLocation
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 589,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 588,
						columnNumber: 17
					}, this),
					step === "rental_name" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-2.5 pt-1 animate-in fade-in-50",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl rounded-tl-sm bg-surface p-3 text-foreground leading-relaxed",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-semibold text-xs mb-1",
								children: "Como podemos te chamar?"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 599,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[0.7rem] text-muted-foreground",
								children: "Informe seu nome para personalizarmos o atendimento no WhatsApp:"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 600,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 598,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex gap-1.5",
							children: [/* @__PURE__ */ (void 0)("input", {
								type: "text",
								placeholder: "Seu nome completo",
								value: data.name,
								onChange: (e) => setData({
									...data,
									name: e.target.value
								}),
								onKeyDown: (e) => {
									if (e.key === "Enter" && data.name.trim()) handleConfirmName();
								},
								className: "flex-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none",
								autoFocus: true
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 606,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)(Button, {
								size: "sm",
								variant: "hero",
								disabled: !data.name.trim(),
								onClick: handleConfirmName,
								className: "h-auto px-3 font-bold",
								children: "Avançar"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 617,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 605,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 597,
						columnNumber: 15
					}, this),
					data.name && (step === "rental_notes" || step === "rental_summary") && /* @__PURE__ */ (void 0)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (void 0)("div", {
							className: "max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground p-2.5 font-medium",
							children: data.name
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 633,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 632,
						columnNumber: 15
					}, this),
					step === "rental_notes" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-2.5 pt-1 animate-in fade-in-50",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl rounded-tl-sm bg-surface p-3 text-foreground leading-relaxed",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "font-semibold text-xs mb-1",
									children: "Alguma observação especial? (opcional)"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 643,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Ex: necessidade de cadeira de bebê, voo chegando à noite, condutor adicional:"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 646,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 642,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("textarea", {
								rows: 2,
								placeholder: "Observações ou dúvidas adicionais...",
								value: data.notes,
								onChange: (e) => setData({
									...data,
									notes: e.target.value
								}),
								className: "w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 651,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setStep("rental_name"),
									className: "text-[0.7rem] text-muted-foreground hover:underline",
									children: "Voltar"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 660,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "hero",
									onClick: handleFinishRental,
									className: "font-bold",
									children: ["Ver resumo da solicitação", /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 674,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 667,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 659,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 641,
						columnNumber: 15
					}, this),
					step === "simple_question" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-2.5 pt-1 animate-in fade-in-50",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl rounded-tl-sm bg-surface p-3 text-foreground leading-relaxed",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "font-semibold text-xs mb-1",
									children: "Qual a sua dúvida ou solicitação?"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 684,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Digite abaixo o que você precisa para nossa equipe já receber o contexto:"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 685,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 683,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("textarea", {
								rows: 3,
								placeholder: "Escreva sua mensagem aqui...",
								value: freeInput,
								onChange: (e) => setFreeInput(e.target.value),
								className: "w-full rounded-xl border border-border bg-surface p-2.5 text-xs text-foreground focus:border-primary focus:outline-none",
								autoFocus: true
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 690,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setStep("welcome"),
									className: "text-[0.7rem] text-muted-foreground hover:underline",
									children: "Voltar às opções"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 700,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "hero",
									disabled: !freeInput.trim(),
									onClick: handleFinishSimple,
									className: "font-bold",
									children: ["Preparar mensagem", /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 715,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 707,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 699,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 682,
						columnNumber: 15
					}, this),
					step === "rental_summary" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3 pt-1 animate-in fade-in-50",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl rounded-tl-sm bg-surface p-3 text-foreground leading-relaxed",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "font-bold text-xs text-primary mb-1",
									children: "Pronto! Veja o resumo da sua solicitação:"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 725,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Revise as informações antes de continuar o atendimento no WhatsApp oficial:"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 728,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 724,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-border bg-surface/60 p-3 space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[0.68rem] text-muted-foreground block",
										children: "Solicitante:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 735,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("strong", {
										className: "text-foreground",
										children: data.name
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 736,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 734,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[0.68rem] text-muted-foreground block",
										children: "Categoria:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 739,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("strong", {
										className: "text-foreground",
										children: data.categoryOrVehicle
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 740,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 738,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-2 gap-1 text-[0.7rem]",
										children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground block",
											children: "Retirada:"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 744,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", { children: [
											data.pickupDate,
											" às ",
											data.pickupTime
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 745,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 743,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-muted-foreground block",
											children: "Devolução:"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 750,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", { children: [
											data.returnDate,
											" às ",
											data.returnTime
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 751,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 749,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 742,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[0.68rem] text-muted-foreground block",
										children: "Local:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 757,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-foreground text-[0.7rem]",
										children: data.pickupLocation
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 758,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 756,
										columnNumber: 19
									}, this),
									data.notes ? /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[0.68rem] text-muted-foreground block",
										children: "Observações:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 762,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "text-foreground text-[0.7rem]",
										children: data.notes
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 765,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 761,
										columnNumber: 21
									}, this) : null
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 733,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2 pt-1",
								children: [/* @__PURE__ */ (void 0)(Button, {
									variant: "hero",
									size: "default",
									className: "w-full gap-2 font-bold shadow-gold",
									onClick: handleOpenWhatsApp,
									children: [/* @__PURE__ */ (void 0)(MessageCircle, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 777,
										columnNumber: 21
									}, this), "Continuar atendimento pelo WhatsApp"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 771,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between text-[0.7rem] text-muted-foreground px-1",
									children: [/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setStep("rental_vehicle"),
										className: "hover:underline flex items-center gap-1",
										children: [/* @__PURE__ */ (void 0)(ArrowLeft, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 787,
											columnNumber: 23
										}, this), " Alterar dados"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 782,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", { children: company.phoneInternational }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 789,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 781,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 770,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 723,
						columnNumber: 15
					}, this),
					step === "simple_summary" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-3 pt-1 animate-in fade-in-50",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl rounded-tl-sm bg-surface p-3 text-foreground leading-relaxed",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "font-bold text-xs text-primary mb-1",
									children: "Sua mensagem está pronta para envio!"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 799,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Ao clicar no botão, o WhatsApp abrirá com sua dúvida para nossa equipe em Fortaleza:"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 802,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 798,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-border bg-surface/60 p-3 space-y-2 text-xs",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[0.68rem] text-muted-foreground block",
									children: "Assunto:"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 810,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("strong", {
									className: "text-foreground",
									children: data.topic || "Atendimento"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 811,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 809,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[0.68rem] text-muted-foreground block",
									children: "Mensagem:"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 814,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-foreground text-[0.72rem] italic",
									children: [
										"\"",
										data.simpleQuestion,
										"\""
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 815,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 813,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 808,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "space-y-2 pt-1",
								children: [/* @__PURE__ */ (void 0)(Button, {
									variant: "hero",
									size: "default",
									className: "w-full gap-2 font-bold shadow-gold",
									onClick: handleOpenWhatsApp,
									children: [/* @__PURE__ */ (void 0)(MessageCircle, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 826,
										columnNumber: 21
									}, this), "Continuar atendimento pelo WhatsApp"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 820,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between text-[0.7rem] text-muted-foreground px-1",
									children: [/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => setStep("welcome"),
										className: "hover:underline flex items-center gap-1",
										children: [/* @__PURE__ */ (void 0)(ArrowLeft, { className: "size-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 836,
											columnNumber: 23
										}, this), " Outra dúvida"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 831,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("span", { children: company.phoneInternational }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 838,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 830,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 819,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 797,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref: messagesEndRef }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 844,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 319,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border-t border-border/80 bg-surface/40 px-4 py-2.5 text-center text-[0.65rem] text-muted-foreground",
				children: "Atendimento oficial · Resposta direta no WhatsApp da Sol & Mar"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 848,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 272,
		columnNumber: 9
	}, this) : null] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 244,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/components/site/SiteLayout.tsx";
function SiteLayout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen flex-col bg-gradient-deep",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Header, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 9,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1",
				children
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 11,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WhatsAppAssistant, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 14,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 8,
		columnNumber: 5
	}, this);
}
function PageHero({ eyebrow, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 30,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative mx-auto max-w-[1536px] w-full px-5 sm:px-8 lg:px-12 xl:px-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "eyebrow reveal",
					children: eyebrow
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "reveal reveal-delay-1 mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl",
					children: title
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 33,
					columnNumber: 9
				}, this),
				description ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "reveal reveal-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
					children: description
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 11
				}, this) : null
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 31,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 29,
		columnNumber: 5
	}, this);
}
//#endregion
export { seedReservations as _, SiteLayout as a, todayISO as b, brl as c, company as d, daysBetween as f, seedCustomers as g, seedAdditionals as h, SUPABASE_URL as i, buttonVariants as l, longDate as m, PageHero as n, ThemeProvider as o, isSupabaseConfigured as p, SUPABASE_ANON_KEY as r, addDaysISO as s, Button as t, cn as u, seedVehicles as v, whatsappLink as x, shortDate as y };
