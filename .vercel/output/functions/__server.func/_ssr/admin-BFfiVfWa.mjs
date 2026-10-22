import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { D as Layers, F as Eye, H as CircleAlert, I as EyeOff, T as Lock, X as CalendarDays, _ as Pencil, a as Trash2, f as Search, h as Plus, i as Upload, j as Image, p as Save, q as Car, s as Star, t as X, u as ShieldCheck, v as Package, w as LogOut } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, c as brl, m as longDate, t as Button, u as cn, y as shortDate } from "./SiteLayout-Do4h_GJx.mjs";
import { c as listVehicles, d as setAdditionalActive, f as setVehicleActive, i as deleteVehicle, l as saveAdditional, m as updateReservationStatus, n as deleteAdditional, o as listAdditionals, r as deleteReservation, s as listReservations, u as saveVehicle } from "./api-CTawiNw0.mjs";
import { n as useAuth } from "./auth-BwphrNDc.mjs";
import { n as VEHICLE_COLOR_PRESETS, r as VehicleStatusBadge, t as RESERVATION_STATUS_LABEL } from "./StatusBadge-ouZFLwd9.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BFfiVfWa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/admin.tsx?tsr-split=component";
function AdminPage() {
	const { email, loading, signIn, signOut, mode } = useAuth();
	const queryClient = useQueryClient();
	const [loginEmail, setLoginEmail] = (0, import_react.useState)("");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [loginError, setLoginError] = (0, import_react.useState)(null);
	const [isLoggingIn, setIsLoggingIn] = (0, import_react.useState)(false);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [filterActive, setFilterActive] = (0, import_react.useState)("all");
	const [filterStatus, setFilterStatus] = (0, import_react.useState)("all");
	const [editingVehicle, setEditingVehicle] = (0, import_react.useState)(null);
	const [isNewVehicle, setIsNewVehicle] = (0, import_react.useState)(false);
	const [photoVehicle, setPhotoVehicle] = (0, import_react.useState)(null);
	const { data: vehicles = [], isLoading: isLoadingVehicles } = useQuery({
		queryKey: ["vehicles"],
		queryFn: listVehicles
	});
	const saveMutation = useMutation({
		mutationFn: async (veh) => {
			return await saveVehicle(veh);
		},
		onSuccess: (saved) => {
			queryClient.invalidateQueries({ queryKey: ["vehicles"] });
			queryClient.invalidateQueries({ queryKey: ["vehicle", saved.id] });
			toast.success(isNewVehicle ? `Veículo "${saved.name}" cadastrado com sucesso!` : `Veículo "${saved.name}" atualizado com sucesso!`);
			setEditingVehicle(null);
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Erro ao salvar veículo");
		}
	});
	const toggleActiveMutation = useMutation({
		mutationFn: async ({ id, active }) => {
			await setVehicleActive(id, active);
		},
		onSuccess: (_, { active }) => {
			queryClient.invalidateQueries({ queryKey: ["vehicles"] });
			toast.success(active ? "Veículo publicado no catálogo!" : "Veículo ocultado do catálogo!");
		}
	});
	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			await deleteVehicle(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["vehicles"] });
			toast.success("Veículo excluído com sucesso.");
		}
	});
	const [activeTab, setActiveTab] = (0, import_react.useState)("vehicles");
	const [editingAdditional, setEditingAdditional] = (0, import_react.useState)(null);
	const [isNewAdditional, setIsNewAdditional] = (0, import_react.useState)(false);
	const { data: additionals = [], isLoading: isLoadingAdditionals } = useQuery({
		queryKey: ["additionals"],
		queryFn: () => listAdditionals(false)
	});
	const saveAdditionalMutation = useMutation({
		mutationFn: async (opt) => {
			return await saveAdditional(opt);
		},
		onSuccess: (saved) => {
			queryClient.invalidateQueries({ queryKey: ["additionals"] });
			toast.success(isNewAdditional ? `Opcional "${saved.name}" cadastrado com sucesso!` : `Opcional "${saved.name}" atualizado com sucesso!`);
			setEditingAdditional(null);
		},
		onError: (err) => {
			toast.error(err instanceof Error ? err.message : "Erro ao salvar opcional.");
		}
	});
	const toggleAdditionalMutation = useMutation({
		mutationFn: async ({ id, active }) => {
			await setAdditionalActive(id, active);
		},
		onSuccess: (_, { active }) => {
			queryClient.invalidateQueries({ queryKey: ["additionals"] });
			toast.success(active ? "Opcional ativado no catálogo!" : "Opcional desativado do catálogo!");
		}
	});
	const deleteAdditionalMutation = useMutation({
		mutationFn: async (id) => {
			await deleteAdditional(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["additionals"] });
			toast.success("Opcional excluído com sucesso.");
		}
	});
	const [reservationStatusFilter, setReservationStatusFilter] = (0, import_react.useState)("all");
	const { data: reservations = [], isLoading: isLoadingReservations } = useQuery({
		queryKey: ["reservations"],
		queryFn: listReservations
	});
	const updateReservationStatusMutation = useMutation({
		mutationFn: async ({ id, status }) => {
			await updateReservationStatus(id, status);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reservations"] });
			toast.success("Situação da reserva atualizada!");
		}
	});
	const deleteReservationMutation = useMutation({
		mutationFn: async (id) => {
			await deleteReservation(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reservations"] });
			toast.success("Reserva removida com sucesso.");
		}
	});
	const handleLogin = async (e) => {
		e.preventDefault();
		setLoginError(null);
		setIsLoggingIn(true);
		try {
			await signIn(loginEmail, loginPassword);
			toast.success("Autenticação realizada com sucesso!");
		} catch (err) {
			setLoginError(err instanceof Error ? err.message : "Falha na autenticação.");
		} finally {
			setIsLoggingIn(false);
		}
	};
	const filteredVehicles = (0, import_react.useMemo)(() => {
		return vehicles.filter((v) => {
			const matchSearch = !searchTerm.trim() || v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.category && v.category.toLowerCase().includes(searchTerm.toLowerCase());
			const matchActive = filterActive === "all" || filterActive === "active" && v.active || filterActive === "inactive" && !v.active;
			const matchStatus = filterStatus === "all" || v.status === filterStatus;
			return matchSearch && matchActive && matchStatus;
		});
	}, [
		vehicles,
		searchTerm,
		filterActive,
		filterStatus
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-[70vh] items-center justify-center pt-24 text-muted-foreground",
		children: "Carregando painel administrativo..."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 233,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 232,
		columnNumber: 12
	}, this);
	if (!email) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-5 pt-32 pb-20 sm:pt-40",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-panel rounded-3xl border border-border p-6 shadow-elevate sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col items-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 248,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 247,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-4 text-xl font-bold text-foreground sm:text-2xl",
						children: "Acesso Administrativo"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Gestão da frota e catálogo da Sol & Mar Rent a Car"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 253,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 246,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handleLogin,
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs font-medium text-foreground",
						children: ["E-mail institucional", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "email",
							value: loginEmail,
							onChange: (e) => setLoginEmail(e.target.value),
							placeholder: "admn@solemar.com",
							required: true,
							className: "mt-1.5 h-11 w-full rounded-xl border border-input bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 261,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "block text-xs font-medium text-foreground",
						children: ["Senha de acesso", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							type: "password",
							value: loginPassword,
							onChange: (e) => setLoginPassword(e.target.value),
							placeholder: "••••••••",
							required: true,
							className: "mt-1.5 h-11 w-full rounded-xl border border-input bg-surface px-3.5 text-sm outline-none transition-colors focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 266,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 264,
						columnNumber: 15
					}, this),
					loginError ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "size-4 shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 270,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: loginError }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 19
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 269,
						columnNumber: 29
					}, this) : null,
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "submit",
						variant: "hero",
						size: "lg",
						disabled: isLoggingIn,
						className: "w-full font-bold shadow-gold",
						children: isLoggingIn ? "Autenticando..." : "Entrar no Painel"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 274,
						columnNumber: 15
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 258,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 245,
			columnNumber: 11
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 244,
		columnNumber: 9
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 243,
		columnNumber: 12
	}, this);
	const activeCount = vehicles.filter((v) => v.active).length;
	const inactiveCount = vehicles.length - activeCount;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-[1536px] w-full px-5 pt-32 pb-24 sm:px-8 sm:pt-40 lg:px-12 xl:px-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-4 border-b border-border/80 pb-6 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 294,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Painel de Gestão da Sol & Mar Rent a Car" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 295,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 293,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground",
						children: [
							activeTab === "vehicles" && "Gestão da Frota de Veículos",
							activeTab === "additionals" && "Gestão de Opcionais & Acessórios",
							activeTab === "reservations" && "Gestão de Reservas & Disponibilidade"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 297,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: [
							"Conectado como ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
								className: "text-foreground",
								children: email
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 30
							}, this),
							" ·",
							" ",
							activeTab === "vehicles" && `Gerencie individualmente os ${vehicles.length} registros da frota.`,
							activeTab === "additionals" && `Gerencie os ${additionals.length} itens de opcionais e tarifas.`,
							activeTab === "reservations" && `Acompanhe as ${reservations.length} solicitações e controle de estoque.`
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 302,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 292,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						activeTab === "vehicles" && /* @__PURE__ */ (void 0)(Button, {
							variant: "hero",
							size: "sm",
							onClick: () => {
								setIsNewVehicle(true);
								setEditingVehicle({
									name: "",
									category: "Hatch",
									transmission: "Manual",
									fuel: "Flex",
									passengers: 5,
									doors: 4,
									luggage: 2,
									daily_rate: 0,
									deposit_amount: 0,
									fleet_quantity: 1,
									color: "Prata",
									color_hex: "#D1D5DB",
									status: "disponivel",
									active: true,
									images: [],
									description: ""
								});
							},
							className: "gap-1.5 font-bold shadow-gold",
							children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 332,
								columnNumber: 17
							}, this), " Cadastrar Novo Veículo"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 311,
							columnNumber: 42
						}, this),
						activeTab === "additionals" && /* @__PURE__ */ (void 0)(Button, {
							variant: "hero",
							size: "sm",
							onClick: () => {
								setIsNewAdditional(true);
								setEditingAdditional({
									name: "",
									description: "",
									price: 20,
									type: "per_day",
									stock_quantity: 5,
									active: true
								});
							},
							className: "gap-1.5 font-bold shadow-gold",
							children: [/* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 346,
								columnNumber: 17
							}, this), " Cadastrar Novo Opcional"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 335,
							columnNumber: 45
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => signOut(),
							className: "gap-1.5 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 350,
								columnNumber: 15
							}, this), " Sair"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 349,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 310,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 291,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 flex flex-wrap gap-2 border-b border-border/80 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("vehicles"),
						className: cn("flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors", activeTab === "vehicles" ? "bg-primary text-primary-foreground shadow-xs font-bold" : "text-muted-foreground hover:bg-surface hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Car, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 358,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Frota de Veículos" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 359,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: cn("rounded-full px-2 py-0.5 text-[0.65rem] font-bold", activeTab === "vehicles" ? "bg-black/20 text-white" : "bg-muted text-foreground"),
								children: vehicles.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 360,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 357,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("additionals"),
						className: cn("flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors", activeTab === "additionals" ? "bg-primary text-primary-foreground shadow-xs font-bold" : "text-muted-foreground hover:bg-surface hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Layers, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 366,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Opcionais & Acessórios" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 367,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: cn("rounded-full px-2 py-0.5 text-[0.65rem] font-bold", activeTab === "additionals" ? "bg-black/20 text-white" : "bg-muted text-foreground"),
								children: additionals.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 368,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 365,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						onClick: () => setActiveTab("reservations"),
						className: cn("flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors", activeTab === "reservations" ? "bg-primary text-primary-foreground shadow-xs font-bold" : "text-muted-foreground hover:bg-surface hover:text-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarDays, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 374,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Reservas & Disponibilidade" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 375,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: cn("rounded-full px-2 py-0.5 text-[0.65rem] font-bold", activeTab === "reservations" ? "bg-black/20 text-white" : "bg-muted text-foreground"),
								children: reservations.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 376,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 373,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 356,
				columnNumber: 9
			}, this),
			activeTab === "vehicles" && /* @__PURE__ */ (void 0)("div", { children: [
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[0.7rem] font-semibold text-muted-foreground uppercase",
								children: "Total de Veículos"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 389,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-2xl font-bold text-foreground",
								children: vehicles.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 392,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 388,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[0.7rem] font-semibold text-primary uppercase",
								children: "Ativos no Catálogo"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 395,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-2xl font-bold text-primary",
								children: activeCount
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 398,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 394,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[0.7rem] font-semibold text-muted-foreground uppercase",
								children: "Inativos (Ocultos)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 401,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-2xl font-bold text-muted-foreground",
								children: inactiveCount
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 404,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 400,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[0.7rem] font-semibold text-accent uppercase",
								children: "Disponíveis p/ Locação"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 407,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-2xl font-bold text-foreground",
								children: vehicles.filter((v) => v.status === "disponivel").length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 410,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 406,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 387,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ (void 0)("div", {
					className: "mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-surface/50 p-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "relative flex-1 max-w-sm",
						children: [/* @__PURE__ */ (void 0)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 419,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("input", {
							type: "text",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value),
							placeholder: "Buscar por modelo ou categoria...",
							className: "h-10 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-xs outline-none focus:border-primary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 420,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 418,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (void 0)("select", {
							value: filterActive,
							onChange: (e) => setFilterActive(e.target.value),
							className: "h-10 rounded-xl border border-input bg-background px-3 text-xs text-foreground outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (void 0)("option", {
									value: "all",
									children: "Publicação: Todos"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 425,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "active",
									children: "Apenas Ativos (Públicos)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 426,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "inactive",
									children: "Apenas Inativos (Ocultos)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 427,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 424,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("select", {
							value: filterStatus,
							onChange: (e) => setFilterStatus(e.target.value),
							className: "h-10 rounded-xl border border-input bg-background px-3 text-xs text-foreground outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (void 0)("option", {
									value: "all",
									children: "Situação: Todas"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 431,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "disponivel",
									children: "Disponível"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 432,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "reservado",
									children: "Reservado"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 433,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "em_locacao",
									children: "Em locação"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 434,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "manutencao",
									children: "Manutenção"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 435,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 430,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 423,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 417,
					columnNumber: 13
				}, this),
				isLoadingVehicles ? /* @__PURE__ */ (void 0)("div", {
					className: "py-20 text-center text-muted-foreground",
					children: "Carregando frota..."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 441,
					columnNumber: 34
				}, this) : filteredVehicles.length === 0 ? /* @__PURE__ */ (void 0)("div", {
					className: "py-16 text-center text-muted-foreground",
					children: "Nenhum veículo encontrado com os filtros selecionados."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 441,
					columnNumber: 151
				}, this) : /* @__PURE__ */ (void 0)("div", {
					className: "mt-6 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-card",
					children: filteredVehicles.map((vehicle) => {
						const cover = vehicle.cover_image || vehicle.images[0];
						return /* @__PURE__ */ (void 0)("div", {
							className: cn("flex flex-col gap-4 p-4 transition-colors hover:bg-surface/40 sm:flex-row sm:items-center sm:justify-between", !vehicle.active ? "opacity-75 bg-surface/20" : ""),
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "relative size-20 shrink-0 overflow-hidden rounded-xl border border-border/80 bg-surface-2",
									children: [cover ? /* @__PURE__ */ (void 0)("img", {
										src: cover,
										alt: vehicle.name,
										className: "size-full object-cover object-center"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 450,
										columnNumber: 36
									}, this) : /* @__PURE__ */ (void 0)("div", {
										className: "grid size-full place-items-center text-center p-1 text-[0.65rem] text-muted-foreground",
										children: "Sem foto"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 450,
										columnNumber: 126
									}, this), vehicle.images.length > 1 ? /* @__PURE__ */ (void 0)("span", {
										className: "absolute bottom-1 right-1 rounded-md bg-background/90 px-1 py-0.5 text-[0.6rem] font-bold text-foreground",
										children: ["+", vehicle.images.length - 1]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 453,
										columnNumber: 56
									}, this) : null]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 449,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (void 0)("h3", {
												className: "font-bold text-foreground text-base",
												children: vehicle.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 460,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)(VehicleStatusBadge, { status: vehicle.status }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 461,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-bold", vehicle.active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"),
												children: vehicle.active ? "Ativo no catálogo" : "Inativo (oculto)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 462,
												columnNumber: 29
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 459,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
										children: [
											vehicle.category ? /* @__PURE__ */ (void 0)("span", {
												className: "font-semibold text-foreground/90 uppercase text-[0.7rem]",
												children: vehicle.category
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 468,
												columnNumber: 49
											}, this) : /* @__PURE__ */ (void 0)("span", {
												className: "italic text-muted-foreground/75",
												children: "Categoria a confirmar"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 470,
												columnNumber: 41
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: "·" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 473,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: vehicle.transmission ?? "Câmbio a confirmar" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 474,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: "·" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 475,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("span", { children: vehicle.passengers ? `${vehicle.passengers} lugares` : "Lugares a conf." }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 476,
												columnNumber: 29
											}, this),
											vehicle.year ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)("span", { children: "·" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 480,
												columnNumber: 33
											}, this), /* @__PURE__ */ (void 0)("span", { children: ["Ano ", vehicle.year] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 481,
												columnNumber: 33
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 479,
												columnNumber: 45
											}, this) : null
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 467,
										columnNumber: 27
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "mt-2 flex flex-wrap items-center gap-3 text-xs",
										children: [
											/* @__PURE__ */ (void 0)("span", {
												className: "font-bold text-primary text-sm",
												children: vehicle.daily_rate > 0 ? `${brl(vehicle.daily_rate)}/dia` : "Consulte a diária"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 486,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "rounded-md bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-foreground border border-border",
												children: [
													"Caução:",
													" ",
													vehicle.deposit_amount && vehicle.deposit_amount > 0 ? brl(vehicle.deposit_amount) : "A combinar"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 489,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "rounded-md bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground border border-border",
												children: [
													"Frota: ",
													vehicle.fleet_quantity ?? 1,
													" unid."
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 493,
												columnNumber: 29
											}, this),
											vehicle.color ? /* @__PURE__ */ (void 0)("span", {
												className: "inline-flex items-center gap-1 rounded-md bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-foreground border border-border",
												children: [vehicle.color_hex ? /* @__PURE__ */ (void 0)("span", {
													className: "size-2 rounded-full border border-black/20",
													style: { backgroundColor: vehicle.color_hex }
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 497,
													columnNumber: 54
												}, this) : null, vehicle.color]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 496,
												columnNumber: 46
											}, this) : null,
											vehicle.description ? /* @__PURE__ */ (void 0)("span", {
												className: "text-[0.7rem] text-muted-foreground truncate max-w-xs",
												children: vehicle.description
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 502,
												columnNumber: 52
											}, this) : null
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 485,
										columnNumber: 27
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 458,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 448,
								columnNumber: 23
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-center gap-2 self-end sm:self-center",
								children: [
									/* @__PURE__ */ (void 0)("button", {
										type: "button",
										onClick: () => toggleActiveMutation.mutate({
											id: vehicle.id,
											active: !vehicle.active
										}),
										title: vehicle.active ? "Clique para ocultar do catálogo público" : "Clique para publicar no catálogo público",
										className: cn("inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold transition-colors", vehicle.active ? "border border-border bg-surface text-foreground hover:bg-destructive/10 hover:text-destructive" : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"),
										children: vehicle.active ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(EyeOff, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 517,
											columnNumber: 31
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Desativar" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 518,
											columnNumber: 31
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 516,
											columnNumber: 45
										}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Eye, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 520,
											columnNumber: 31
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Ativar" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 521,
											columnNumber: 31
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 519,
											columnNumber: 35
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 512,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => setPhotoVehicle(vehicle),
										className: "gap-1.5 text-xs",
										children: [/* @__PURE__ */ (void 0)(Image, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 527,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", { children: [
											"Fotos (",
											vehicle.images.length,
											")"
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 528,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 526,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (void 0)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => {
											setIsNewVehicle(false);
											setEditingVehicle({ ...vehicle });
										},
										className: "gap-1.5 text-xs",
										children: [/* @__PURE__ */ (void 0)(Pencil, { className: "size-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 538,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", { children: "Editar" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 539,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 532,
										columnNumber: 25
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 510,
								columnNumber: 23
							}, this)]
						}, vehicle.id, true, {
							fileName: _jsxFileName,
							lineNumber: 446,
							columnNumber: 20
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 443,
					columnNumber: 24
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 385,
				columnNumber: 38
			}, this),
			activeTab === "additionals" && /* @__PURE__ */ (void 0)("div", {
				className: "mt-6 space-y-6",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[0.7rem] font-semibold text-muted-foreground uppercase",
								children: "Total de Opcionais"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 554,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-2xl font-bold text-foreground",
								children: additionals.length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 557,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 553,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-border bg-card p-4",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[0.7rem] font-semibold text-primary uppercase",
								children: "Ativos para Locação"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 560,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-2xl font-bold text-primary",
								children: additionals.filter((a) => a.active).length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 563,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 559,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "rounded-2xl border border-border bg-card p-4 col-span-2 sm:col-span-1",
							children: [/* @__PURE__ */ (void 0)("span", {
								className: "text-[0.7rem] font-semibold text-muted-foreground uppercase",
								children: "Desativados / Ocultos"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 568,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-2xl font-bold text-muted-foreground",
								children: additionals.filter((a) => !a.active).length
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 571,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 567,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 552,
					columnNumber: 13
				}, this), isLoadingAdditionals ? /* @__PURE__ */ (void 0)("div", {
					className: "py-20 text-center text-muted-foreground",
					children: "Carregando opcionais..."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 578,
					columnNumber: 37
				}, this) : additionals.length === 0 ? /* @__PURE__ */ (void 0)("div", {
					className: "rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground bg-card",
					children: [
						/* @__PURE__ */ (void 0)(Package, { className: "mx-auto size-8 text-muted-foreground/60 mb-2" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 579,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "font-semibold text-foreground",
							children: "Nenhum opcional cadastrado ainda"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 580,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Clique no botão \"Cadastrar Novo Opcional\" acima para adicionar itens como cadeirinhas, bebê-conforto e condutores."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 581,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 578,
					columnNumber: 153
				}, this) : /* @__PURE__ */ (void 0)("div", {
					className: "divide-y divide-border/60 overflow-hidden rounded-2xl border border-border bg-card",
					children: additionals.map((opt) => /* @__PURE__ */ (void 0)("div", {
						className: cn("flex flex-col gap-4 p-4 transition-colors hover:bg-surface/40 sm:flex-row sm:items-center sm:justify-between", !opt.active ? "opacity-75 bg-surface/20" : ""),
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-start gap-3.5",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20",
								children: /* @__PURE__ */ (void 0)(Layers, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 589,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 588,
								columnNumber: 23
							}, this), /* @__PURE__ */ (void 0)("div", { children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "font-bold text-foreground text-sm sm:text-base",
										children: opt.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 593,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: cn("rounded-md px-2 py-0.5 text-[0.65rem] font-bold uppercase", opt.active ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30" : "bg-muted text-muted-foreground"),
										children: opt.active ? "Ativo no Checkout" : "Desativado"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 596,
										columnNumber: 27
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 592,
									columnNumber: 25
								}, this),
								opt.description ? /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5 max-w-xl",
									children: opt.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 600,
									columnNumber: 44
								}, this) : null,
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-2 flex flex-wrap items-center gap-3 text-xs",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "font-bold text-primary text-sm",
										children: [
											brl(opt.price),
											" ",
											/* @__PURE__ */ (void 0)("span", {
												className: "text-[0.7rem] font-normal text-muted-foreground",
												children: opt.type === "per_day" ? "/diária" : "taxa única"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 606,
												columnNumber: 29
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 604,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "rounded-md bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-foreground border border-border",
										children: [
											"Estoque: ",
											opt.stock_quantity,
											" unidade(s)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 610,
										columnNumber: 27
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 603,
									columnNumber: 25
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 591,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 587,
							columnNumber: 21
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex flex-wrap items-center gap-2 self-end sm:self-center",
							children: [
								/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => toggleAdditionalMutation.mutate({
										id: opt.id,
										active: !opt.active
									}),
									className: cn("inline-flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold transition-colors", opt.active ? "border border-border bg-surface text-foreground hover:bg-destructive/10 hover:text-destructive" : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"),
									children: opt.active ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(EyeOff, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 623,
										columnNumber: 29
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Desativar" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 624,
										columnNumber: 29
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 622,
										columnNumber: 39
									}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Eye, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 626,
										columnNumber: 29
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Ativar" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 627,
										columnNumber: 29
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 625,
										columnNumber: 33
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 618,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => {
										setIsNewAdditional(false);
										setEditingAdditional({ ...opt });
									},
									className: "gap-1.5 text-xs",
									children: [/* @__PURE__ */ (void 0)(Pencil, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 637,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("span", { children: "Editar" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 638,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 631,
									columnNumber: 23
								}, this),
								/* @__PURE__ */ (void 0)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => {
										if (window.confirm(`Deseja excluir o opcional "${opt.name}"?`)) deleteAdditionalMutation.mutate(opt.id);
									},
									className: "text-destructive hover:bg-destructive/10 text-xs",
									children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 646,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 641,
									columnNumber: 23
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 617,
							columnNumber: 21
						}, this)]
					}, opt.id, true, {
						fileName: _jsxFileName,
						lineNumber: 586,
						columnNumber: 41
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 585,
					columnNumber: 24
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 550,
				columnNumber: 41
			}, this),
			activeTab === "reservations" && /* @__PURE__ */ (void 0)("div", {
				className: "mt-6 space-y-6",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-border bg-card p-4",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[0.7rem] font-semibold text-muted-foreground uppercase",
									children: "Total de Reservas"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 660,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-2xl font-bold text-foreground",
									children: reservations.length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 663,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 659,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-border bg-card p-4",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[0.7rem] font-semibold text-amber-500 uppercase",
									children: "Aguardando Confirmação"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 666,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-2xl font-bold text-amber-500",
									children: reservations.filter((r) => r.status === "pendente").length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 669,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 665,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-border bg-card p-4",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[0.7rem] font-semibold text-primary uppercase",
									children: "Confirmadas"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 674,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-2xl font-bold text-primary",
									children: reservations.filter((r) => r.status === "confirmada").length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 677,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 673,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-border bg-card p-4",
								children: [/* @__PURE__ */ (void 0)("span", {
									className: "text-[0.7rem] font-semibold text-emerald-500 uppercase",
									children: "Concluídas / Finalizadas"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 682,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-2xl font-bold text-emerald-500",
									children: reservations.filter((r) => r.status === "concluida").length
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 685,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 681,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 658,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col gap-3 rounded-2xl border border-border bg-surface/50 p-4 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 text-xs font-semibold text-foreground",
							children: [/* @__PURE__ */ (void 0)(CalendarDays, { className: "size-4 text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 694,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("span", { children: "Histórico e Controle de Solicitações de Reserva" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 695,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 693,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("select", {
							value: reservationStatusFilter,
							onChange: (e) => setReservationStatusFilter(e.target.value),
							className: "h-10 rounded-xl border border-input bg-background px-3 text-xs text-foreground outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (void 0)("option", {
									value: "all",
									children: "Todas as situações"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 699,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "pendente",
									children: "Aguardando confirmação"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 700,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "confirmada",
									children: "Confirmada"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 701,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "em_andamento",
									children: "Em andamento"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 702,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "concluida",
									children: "Concluída"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 703,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("option", {
									value: "cancelada",
									children: "Cancelada"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 704,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 698,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 692,
						columnNumber: 13
					}, this),
					isLoadingReservations ? /* @__PURE__ */ (void 0)("div", {
						className: "py-20 text-center text-muted-foreground",
						children: "Carregando reservas..."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 709,
						columnNumber: 38
					}, this) : reservations.length === 0 ? /* @__PURE__ */ (void 0)("div", {
						className: "rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground bg-card",
						children: [
							/* @__PURE__ */ (void 0)(CalendarDays, { className: "mx-auto size-8 text-muted-foreground/60 mb-2" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 710,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "font-semibold text-foreground",
								children: "Nenhuma reserva encontrada"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 711,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: "As reservas iniciadas no simulador de cotação aparecerão listadas aqui para controle da equipe."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 712,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 709,
						columnNumber: 154
					}, this) : /* @__PURE__ */ (void 0)("div", {
						className: "space-y-4",
						children: reservations.filter((r) => reservationStatusFilter === "all" || r.status === reservationStatusFilter).map((res) => {
							const vehicle = vehicles.find((v) => v.id === res.vehicle_id);
							return /* @__PURE__ */ (void 0)("div", {
								className: "rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4 transition-colors hover:border-primary/40",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (void 0)("span", {
												className: "font-display font-bold text-foreground text-base",
												children: ["#", res.code]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 723,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: cn("rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold", res.status === "pendente" && "bg-amber-500/20 text-amber-500 border border-amber-500/30", res.status === "confirmada" && "bg-primary/20 text-primary border border-primary/30", res.status === "em_andamento" && "bg-blue-500/20 text-blue-500 border border-blue-500/30", res.status === "concluida" && "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30", res.status === "cancelada" && "bg-destructive/20 text-destructive border border-destructive/30"),
												children: RESERVATION_STATUS_LABEL[res.status] ?? res.status
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 726,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("span", {
												className: "text-[0.7rem] text-muted-foreground",
												children: ["Registrado em ", shortDate(res.created_at)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 729,
												columnNumber: 29
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 722,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (void 0)("span", {
												className: "text-xs text-muted-foreground",
												children: "Alterar situação:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 736,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("select", {
												value: res.status,
												onChange: (e) => updateReservationStatusMutation.mutate({
													id: res.id,
													status: e.target.value
												}),
												className: "h-8 rounded-lg border border-input bg-surface px-2.5 text-xs text-foreground outline-none focus:border-primary",
												children: [
													/* @__PURE__ */ (void 0)("option", {
														value: "pendente",
														children: "Aguardando confirmação"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 741,
														columnNumber: 31
													}, this),
													/* @__PURE__ */ (void 0)("option", {
														value: "confirmada",
														children: "Confirmada"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 742,
														columnNumber: 31
													}, this),
													/* @__PURE__ */ (void 0)("option", {
														value: "em_andamento",
														children: "Em andamento"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 743,
														columnNumber: 31
													}, this),
													/* @__PURE__ */ (void 0)("option", {
														value: "concluida",
														children: "Concluída"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 744,
														columnNumber: 31
													}, this),
													/* @__PURE__ */ (void 0)("option", {
														value: "cancelada",
														children: "Cancelada"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 745,
														columnNumber: 31
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 737,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (void 0)("button", {
												type: "button",
												onClick: () => {
													if (window.confirm(`Excluir o registro da reserva #${res.code}?`)) deleteReservationMutation.mutate(res.id);
												},
												className: "rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
												title: "Excluir reserva",
												children: /* @__PURE__ */ (void 0)(Trash2, { className: "size-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 753,
													columnNumber: 31
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 748,
												columnNumber: 29
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 735,
										columnNumber: 27
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 721,
									columnNumber: 25
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-xs",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5 rounded-xl bg-surface/40 p-3 border border-border/60",
											children: [
												/* @__PURE__ */ (void 0)("span", {
													className: "text-[0.68rem] font-bold text-accent uppercase tracking-wider block",
													children: "Veículo Solicitado"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 762,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "font-bold text-foreground text-sm",
													children: vehicle?.name ?? "Veículo não localizado"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 765,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "text-muted-foreground",
													children: [
														longDate(res.start_date),
														" (",
														res.start_time || "09:00",
														") →",
														" ",
														longDate(res.end_date),
														" (",
														res.end_time || "09:00",
														")"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 768,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "text-muted-foreground",
													children: [
														/* @__PURE__ */ (void 0)("strong", { children: [res.days, " diária(s)"] }, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 773,
															columnNumber: 31
														}, this),
														" · Retirada:",
														" ",
														res.pickup_location || "Sede / Aeroporto"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 772,
													columnNumber: 29
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 761,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5 rounded-xl bg-surface/40 p-3 border border-border/60",
											children: [
												/* @__PURE__ */ (void 0)("span", {
													className: "text-[0.68rem] font-bold text-muted-foreground uppercase tracking-wider block",
													children: "Registro e Protocolo"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 780,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "font-semibold text-foreground text-xs",
													children: ["ID: ", res.id]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 783,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "text-muted-foreground text-[0.72rem]",
													children: ["Devolução: ", res.return_location || "Sede / Aeroporto"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 784,
													columnNumber: 29
												}, this),
												res.notes ? /* @__PURE__ */ (void 0)("p", {
													className: "text-muted-foreground italic text-[0.7rem] pt-1 border-t border-border/50",
													children: ["Obs: ", res.notes]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 787,
													columnNumber: 42
												}, this) : null
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 779,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5 rounded-xl bg-surface/70 p-3 border border-border/80 col-span-2 lg:col-span-1",
											children: [
												/* @__PURE__ */ (void 0)("span", {
													className: "text-[0.68rem] font-bold text-primary uppercase tracking-wider block",
													children: "Composição de Valores"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 794,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex justify-between text-muted-foreground",
													children: [/* @__PURE__ */ (void 0)("span", { children: [
														"Diárias (",
														res.days,
														"x):"
													] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 798,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "text-foreground font-semibold",
														children: brl(res.daily_subtotal ?? res.days * res.daily_rate)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 799,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 797,
													columnNumber: 29
												}, this),
												res.additionals_subtotal && res.additionals_subtotal > 0 ? /* @__PURE__ */ (void 0)("div", {
													className: "flex justify-between text-muted-foreground",
													children: [/* @__PURE__ */ (void 0)("span", { children: "Opcionais:" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 804,
														columnNumber: 33
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "text-foreground font-semibold",
														children: ["+", brl(res.additionals_subtotal)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 805,
														columnNumber: 33
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 803,
													columnNumber: 89
												}, this) : null,
												/* @__PURE__ */ (void 0)("div", {
													className: "flex justify-between border-t border-border/60 pt-1 font-bold text-foreground",
													children: [/* @__PURE__ */ (void 0)("span", { children: "Valor da Locação:" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 810,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "text-primary",
														children: brl(res.rental_total ?? res.total)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 811,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 809,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex justify-between text-muted-foreground border-t border-dashed border-border/60 pt-1",
													children: [/* @__PURE__ */ (void 0)("span", { children: "Caução (garantia cartão):" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 816,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "text-amber-500 font-bold",
														children: brl(res.deposit_amount ?? vehicle?.deposit_amount ?? 0)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 817,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 815,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex justify-between text-[0.68rem] text-muted-foreground",
													children: [/* @__PURE__ */ (void 0)("span", { children: "Saldo na retirada:" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 822,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "font-semibold text-foreground",
														children: brl(res.balance_on_pickup ?? res.rental_total ?? res.total)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 823,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 821,
													columnNumber: 29
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 793,
											columnNumber: 27
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 759,
									columnNumber: 25
								}, this)]
							}, res.id, true, {
								fileName: _jsxFileName,
								lineNumber: 719,
								columnNumber: 20
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 716,
						columnNumber: 24
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 656,
				columnNumber: 42
			}, this),
			editingVehicle ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-panel w-full max-w-2xl rounded-3xl border border-border p-6 shadow-elevate sm:p-8 animate-in fade-in-50 duration-200 my-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between border-b border-border/70 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-bold text-foreground",
							children: isNewVehicle ? "Cadastrar Novo Veículo" : `Editar ${editingVehicle.name}`
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 841,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Preencha os campos confirmados. Campos não confirmados podem ficar vazios."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 844,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 840,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setEditingVehicle(null),
							className: "rounded-xl p-2 text-muted-foreground hover:bg-surface hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 849,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 848,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 839,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!editingVehicle.name?.trim()) {
								toast.error("O nome do veículo é obrigatório");
								return;
							}
							saveMutation.mutate(editingVehicle);
						},
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-foreground",
								children: ["Nome do Veículo *", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: editingVehicle.name ?? "",
									onChange: (e) => setEditingVehicle((v) => ({
										...v,
										name: e.target.value
									})),
									placeholder: "Ex: Chevrolet Spin 1.8 7 Lugares",
									required: true,
									className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 866,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 864,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "block text-xs font-semibold text-foreground",
										children: ["Categoria (quando confirmada)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: editingVehicle.category ?? "",
											onChange: (e) => setEditingVehicle((v) => ({
												...v,
												category: e.target.value || void 0
											})),
											className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "",
													children: "A confirmar pela locadora"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 880,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Hatch",
													children: "Hatch"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 881,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Sedã",
													children: "Sedã"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 882,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "SUV",
													children: "SUV"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 883,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Picape",
													children: "Picape"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 884,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Minivan",
													children: "Minivan"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 885,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Compacto",
													children: "Compacto"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 886,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 876,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 874,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "block text-xs font-semibold text-foreground",
										children: ["Câmbio (quando confirmado)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: editingVehicle.transmission ?? "",
											onChange: (e) => setEditingVehicle((v) => ({
												...v,
												transmission: e.target.value || void 0
											})),
											className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "",
													children: "A confirmar pela locadora"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 896,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Automático",
													children: "Automático"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 897,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Manual",
													children: "Manual"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 898,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 892,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 890,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "block text-xs font-semibold text-foreground",
										children: ["Combustível (quando confirmado)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
											value: editingVehicle.fuel ?? "",
											onChange: (e) => setEditingVehicle((v) => ({
												...v,
												fuel: e.target.value || void 0
											})),
											className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "",
													children: "A confirmar pela locadora"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 908,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Flex",
													children: "Flex (Gasolina / Etanol)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 909,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Gasolina",
													children: "Gasolina"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 910,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Diesel",
													children: "Diesel"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 911,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Híbrido",
													children: "Híbrido"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 912,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
													value: "Elétrico",
													children: "Elétrico"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 913,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 904,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 902,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "block text-xs font-semibold text-foreground",
										children: ["Quantidade de Lugares", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "number",
											min: "1",
											max: "15",
											value: editingVehicle.passengers ?? "",
											onChange: (e) => setEditingVehicle((v) => ({
												...v,
												passengers: e.target.value ? Number(e.target.value) : null
											})),
											placeholder: "Ex: 5 ou 7 (ou deixe vazio)",
											className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 919,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 917,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 873,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "block text-xs font-semibold text-foreground",
										children: ["Ano do Modelo (quando confirmado)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "number",
											min: "2010",
											max: "2030",
											value: editingVehicle.year ?? "",
											onChange: (e) => setEditingVehicle((v) => ({
												...v,
												year: e.target.value ? Number(e.target.value) : null
											})),
											placeholder: "Ex: 2026 (ou deixe vazio)",
											className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 930,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 928,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "block text-xs font-semibold text-foreground",
										children: ["Preço da Diária em R$ (0 = Consulte a diária)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "number",
											min: "0",
											step: "1",
											value: editingVehicle.daily_rate ?? 0,
											onChange: (e) => setEditingVehicle((v) => ({
												...v,
												daily_rate: Number(e.target.value)
											})),
											className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 938,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 936,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "block text-xs font-semibold text-foreground",
										children: [
											"Valor da Caução em R$ (Garantia por bloqueio no cartão)",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
												type: "number",
												min: "0",
												step: "50",
												value: editingVehicle.deposit_amount ?? 0,
												onChange: (e) => setEditingVehicle((v) => ({
													...v,
													deposit_amount: Number(e.target.value)
												})),
												placeholder: "Ex: 800 (bloqueio temporário no cartão)",
												className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 946,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "mt-1 block text-[0.68rem] text-muted-foreground",
												children: "* Bloqueio temporário de limite na retirada, liberado na devolução."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 950,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 944,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "block text-xs font-semibold text-foreground",
										children: [
											"Quantidade de Unidades na Frota (Estoque)",
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
												type: "number",
												min: "1",
												max: "100",
												value: editingVehicle.fleet_quantity ?? 1,
												onChange: (e) => setEditingVehicle((v) => ({
													...v,
													fleet_quantity: Math.max(1, Number(e.target.value))
												})),
												className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 957,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "mt-1 block text-[0.68rem] text-muted-foreground",
												children: "* Usado para evitar reservas simultâneas acima do estoque real."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 961,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 955,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 927,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-2xl border border-border bg-surface/40 p-3.5 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-foreground",
									children: ["Cor Cadastrada do Veículo", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "text",
										value: editingVehicle.color ?? "",
										onChange: (e) => setEditingVehicle((v) => ({
											...v,
											color: e.target.value
										})),
										placeholder: "Ex: Prata Metálico, Branco Polar, Preto Vulcano",
										className: "mt-1 h-10 w-full rounded-xl border border-input bg-surface px-3 text-xs text-foreground outline-none focus:border-primary"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 971,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 969,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-wrap items-center gap-1.5 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[0.68rem] text-muted-foreground",
										children: "Paleta rápida:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 978,
										columnNumber: 21
									}, this), VEHICLE_COLOR_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										onClick: () => setEditingVehicle((v) => ({
											...v,
											color: preset.label,
											color_hex: preset.hex
										})),
										className: cn("inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[0.68rem] transition-colors", editingVehicle.color === preset.label ? "border-primary bg-primary/10 font-bold text-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground"),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "size-2.5 rounded-full border border-black/20",
											style: { backgroundColor: preset.hex }
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 984,
											columnNumber: 25
										}, this), preset.label]
									}, preset.label, true, {
										fileName: _jsxFileName,
										lineNumber: 979,
										columnNumber: 58
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 977,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 968,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-border/60 pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-foreground",
									children: ["Situação de Disponibilidade", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: editingVehicle.status ?? "disponivel",
										onChange: (e) => setEditingVehicle((v) => ({
											...v,
											status: e.target.value
										})),
										className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "disponivel",
												children: "Disponível para locação"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1e3,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "reservado",
												children: "Reservado"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1001,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "em_locacao",
												children: "Em locação"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1002,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
												value: "manutencao",
												children: "Em manutenção"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1003,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 996,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 994,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col justify-end",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "flex items-center gap-3 rounded-xl border border-border bg-surface p-3 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "checkbox",
											checked: editingVehicle.active ?? true,
											onChange: (e) => setEditingVehicle((v) => ({
												...v,
												active: e.target.checked
											})),
											className: "size-4 rounded border-input text-primary focus:ring-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1009,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-bold text-foreground block",
											children: "Ativo no Catálogo Público"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1014,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[0.68rem] text-muted-foreground block",
											children: "Quando desativado, fica oculto do catálogo sem ser excluído."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1017,
											columnNumber: 25
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1013,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1008,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1007,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 993,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-foreground",
								children: ["Descrição e Versão (informações adicionais da locadora)", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
									rows: 3,
									value: editingVehicle.description ?? "",
									onChange: (e) => setEditingVehicle((v) => ({
										...v,
										description: e.target.value
									})),
									placeholder: "Ex: Ano 2026. Versão e pacote a confirmar pela locadora.",
									className: "mt-1 w-full rounded-xl border border-input bg-surface p-3 text-sm text-foreground outline-none focus:border-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1028,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1026,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-between items-center gap-3 pt-4 border-t border-border/70",
								children: [!isNewVehicle && editingVehicle.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => {
										if (window.confirm(`Tem certeza que deseja excluir o veículo "${editingVehicle.name}"?`)) {
											deleteMutation.mutate(editingVehicle.id);
											setEditingVehicle(null);
										}
									},
									className: "text-destructive hover:bg-destructive/10",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1042,
										columnNumber: 23
									}, this), " Excluir Registro"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1036,
									columnNumber: 57
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1043,
									columnNumber: 33
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										type: "button",
										variant: "ghost",
										onClick: () => setEditingVehicle(null),
										children: "Cancelar"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1046,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										type: "submit",
										variant: "hero",
										disabled: saveMutation.isPending,
										className: "gap-2 font-bold shadow-gold",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1050,
											columnNumber: 23
										}, this), saveMutation.isPending ? "Salvando..." : "Salvar Alterações"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1049,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1045,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1035,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 853,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 838,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 837,
				columnNumber: 27
			}, this) : null,
			photoVehicle ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-panel w-full max-w-2xl rounded-3xl border border-border p-6 shadow-elevate sm:p-8 animate-in fade-in-50 duration-200 my-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between border-b border-border/70 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-xl font-bold text-foreground",
								children: ["Fotos de: ", photoVehicle.name]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1066,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Envie fotos reais do veículo, defina a foto principal do catálogo ou remova imagens."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1069,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1065,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setPhotoVehicle(null),
								className: "rounded-xl p-2 text-muted-foreground hover:bg-surface hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1075,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1074,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1064,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-5 rounded-2xl border-2 border-dashed border-border/80 bg-surface/40 p-6 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mx-auto grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1082,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1081,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-3 text-sm font-bold text-foreground",
									children: "Enviar fotos do veículo"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1084,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Selecione fotos do seu dispositivo (JPEG, PNG ou WebP). Proporção recomendada 3:2."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1085,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-gold hover:bg-primary/90 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Upload, { className: "size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1090,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Escolher Arquivos" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1091,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "file",
											multiple: true,
											accept: "image/*",
											className: "hidden",
											onChange: (e) => {
												const files = e.target.files;
												if (!files || files.length === 0) return;
												Array.from(files).forEach((file) => {
													const reader = new FileReader();
													reader.onload = (event) => {
														const base64 = event.target?.result;
														if (base64) setPhotoVehicle((prev) => {
															if (!prev) return prev;
															const updatedImages = [...prev.images, base64];
															const updatedVehicle = {
																...prev,
																images: updatedImages,
																cover_image: prev.cover_image || base64
															};
															saveMutation.mutate(updatedVehicle);
															return updatedVehicle;
														});
													};
													reader.readAsDataURL(file);
												});
												toast.success("Foto(s) carregada(s) e salva(s)!");
											}
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1092,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1089,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1080,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "flex items-center gap-2 text-xs text-muted-foreground cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "checkbox",
									checked: photoVehicle.is_illustrative_image ?? false,
									onChange: (e) => {
										const updated = {
											...photoVehicle,
											is_illustrative_image: e.target.checked
										};
										setPhotoVehicle(updated);
										saveMutation.mutate(updated);
									},
									className: "size-4 rounded border-input text-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1123,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									"Marcar estas fotos como ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "ilustrativas" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1132,
										columnNumber: 45
									}, this),
									" (exibe o aviso no catálogo público para não induzir o cliente ao erro)."
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1131,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1122,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1121,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
								className: "text-xs font-bold text-foreground uppercase tracking-wider mb-3",
								children: [
									"Fotos cadastradas (",
									photoVehicle.images.length,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1140,
								columnNumber: 17
							}, this), photoVehicle.images.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "py-6 text-center text-xs text-muted-foreground bg-surface/30 rounded-xl border border-border/60",
								children: "Nenhuma foto cadastrada ainda. Utilize o botão acima para enviar."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1144,
								columnNumber: 53
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
								children: photoVehicle.images.map((imgSrc, idx) => {
									const isCover = photoVehicle.cover_image === imgSrc || !photoVehicle.cover_image && idx === 0;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: cn("group relative aspect-[3/2] overflow-hidden rounded-xl border bg-surface-2", isCover ? "border-primary ring-2 ring-primary/50" : "border-border"),
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
												src: imgSrc,
												alt: "",
												className: "size-full object-cover object-center"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1150,
												columnNumber: 27
											}, this),
											isCover ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "absolute top-2 left-2 rounded-md bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-foreground shadow-xs",
												children: "Principal"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1153,
												columnNumber: 38
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => {
													const updated = {
														...photoVehicle,
														cover_image: imgSrc
													};
													setPhotoVehicle(updated);
													saveMutation.mutate(updated);
													toast.success("Foto principal definida!");
												},
												className: "absolute top-2 left-2 rounded-md bg-background/90 px-2 py-0.5 text-[0.65rem] font-bold text-foreground opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-sm",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: "inline size-3 mr-1 text-primary" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1164,
													columnNumber: 31
												}, this), "Tornar Principal"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1155,
												columnNumber: 38
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
												type: "button",
												onClick: () => {
													const newImages = photoVehicle.images.filter((_, i) => i !== idx);
													const newCover = photoVehicle.cover_image === imgSrc ? newImages[0] : photoVehicle.cover_image;
													const updated = {
														...photoVehicle,
														images: newImages,
														cover_image: newCover
													};
													setPhotoVehicle(updated);
													saveMutation.mutate(updated);
													toast.success("Foto removida.");
												},
												title: "Remover foto",
												className: "absolute top-2 right-2 rounded-lg bg-destructive/90 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-xs hover:bg-destructive",
												children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "size-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1181,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1169,
												columnNumber: 27
											}, this)
										]
									}, `photo-${idx}`, true, {
										fileName: _jsxFileName,
										lineNumber: 1149,
										columnNumber: 24
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1146,
								columnNumber: 26
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1139,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 flex justify-end border-t border-border/70 pt-4",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "hero",
								onClick: () => setPhotoVehicle(null),
								children: "Concluir Fotos"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1189,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1188,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1063,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1062,
				columnNumber: 25
			}, this) : null,
			editingAdditional ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "glass-panel w-full max-w-lg rounded-3xl border border-border p-6 shadow-elevate sm:p-8 animate-in fade-in-50 duration-200 my-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between border-b border-border/70 pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-xl font-bold text-foreground",
							children: isNewAdditional ? "Cadastrar Novo Opcional" : `Editar ${editingAdditional.name}`
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1203,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Configure os dados, forma de cobrança e quantidade disponível."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1206,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1202,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							onClick: () => setEditingAdditional(null),
							className: "rounded-xl p-2 text-muted-foreground hover:bg-surface hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1211,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1210,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1201,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							if (!editingAdditional.name?.trim()) {
								toast.error("O nome do opcional é obrigatório");
								return;
							}
							saveAdditionalMutation.mutate({
								...editingAdditional,
								name: editingAdditional.name.trim(),
								price: Number(editingAdditional.price ?? 0)
							});
						},
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-foreground",
								children: ["Nome do Opcional *", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: editingAdditional.name ?? "",
									onChange: (e) => setEditingAdditional((prev) => prev ? {
										...prev,
										name: e.target.value
									} : null),
									placeholder: "Ex: Cadeirinha Infantil (1 a 4 anos)",
									required: true,
									className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1229,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1227,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "block text-xs font-semibold text-foreground",
								children: ["Descrição do Opcional", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
									rows: 2,
									value: editingAdditional.description ?? "",
									onChange: (e) => setEditingAdditional((prev) => prev ? {
										...prev,
										description: e.target.value
									} : null),
									placeholder: "Ex: Item de segurança certificado pelo Inmetro com fixação rápida.",
									className: "mt-1 w-full rounded-xl border border-input bg-surface p-3 text-sm text-foreground outline-none focus:border-primary"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1237,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1235,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-foreground",
									children: ["Preço em R$ *", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "number",
										min: "0",
										step: "1",
										value: editingAdditional.price ?? 0,
										onChange: (e) => setEditingAdditional((prev) => prev ? {
											...prev,
											price: Number(e.target.value)
										} : null),
										required: true,
										className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1246,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1244,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-foreground",
									children: ["Tipo de Cobrança", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
										value: editingAdditional.type ?? "per_day",
										onChange: (e) => setEditingAdditional((prev) => prev ? {
											...prev,
											type: e.target.value
										} : null),
										className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "per_day",
											children: "Por Diária (multiplicado pelos dias)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1258,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "per_rental",
											children: "Taxa Única por Locação"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1259,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1254,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1252,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1243,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "block text-xs font-semibold text-foreground",
									children: ["Quantidade Disponível em Estoque", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "number",
										min: "0",
										max: "100",
										value: editingAdditional.stock_quantity ?? 5,
										onChange: (e) => setEditingAdditional((prev) => prev ? {
											...prev,
											stock_quantity: Math.max(0, Number(e.target.value))
										} : null),
										className: "mt-1 h-11 w-full rounded-xl border border-input bg-surface px-3 text-sm text-foreground outline-none focus:border-primary"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1267,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1265,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex flex-col justify-end",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "flex items-center gap-3 rounded-xl border border-border bg-surface p-3 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "checkbox",
											checked: editingAdditional.active ?? true,
											onChange: (e) => setEditingAdditional((prev) => prev ? {
												...prev,
												active: e.target.checked
											} : null),
											className: "size-4 rounded border-input text-primary focus:ring-primary"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1275,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-bold text-foreground block",
											children: "Ativo no Checkout"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1280,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[0.68rem] text-muted-foreground block",
											children: "Visível para seleção do cliente na cotação"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1283,
											columnNumber: 25
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1279,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1274,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1273,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1264,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-end items-center gap-2 pt-4 border-t border-border/70",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "ghost",
									onClick: () => setEditingAdditional(null),
									children: "Cancelar"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1292,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "submit",
									variant: "hero",
									disabled: saveAdditionalMutation.isPending,
									className: "gap-2 font-bold shadow-gold",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1296,
										columnNumber: 21
									}, this), saveAdditionalMutation.isPending ? "Salvando..." : "Salvar Opcional"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1295,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1291,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1215,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1200,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1199,
				columnNumber: 30
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 289,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 288,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPage as component };
