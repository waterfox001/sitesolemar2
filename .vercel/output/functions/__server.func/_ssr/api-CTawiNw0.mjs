import { _ as seedReservations, f as daysBetween, g as seedCustomers, h as seedAdditionals, i as SUPABASE_URL, p as isSupabaseConfigured, r as SUPABASE_ANON_KEY, v as seedVehicles } from "./SiteLayout-Do4h_GJx.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-CTawiNw0.js
/**
* Cliente Supabase criado exclusivamente a partir de variáveis de ambiente.
* Se as variáveis não existirem, o app roda em modo demonstração local.
*/
var supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: {
	persistSession: true,
	autoRefreshToken: true
} }) : null;
var KEY = "solemar.db.v5";
var PREV_KEYS = [
	"solemar.db.v4",
	"solemar.db.v3",
	"solemar.db.v2",
	"solemar.db.v1"
];
var fresh = () => ({
	vehicles: structuredClone(seedVehicles),
	customers: structuredClone(seedCustomers),
	reservations: structuredClone(seedReservations),
	additionals: structuredClone(seedAdditionals)
});
var memory = null;
function normalizeVehicle(v) {
	let category = v.category;
	if (category === "Sedan") category = "Sedã";
	let name = v.name;
	if (name.includes("Citroen")) name = name.replace("Citroen", "Citroën");
	return {
		...v,
		category,
		name,
		fleet_quantity: v.fleet_quantity !== void 0 ? Math.max(1, Number(v.fleet_quantity)) : 1,
		deposit_amount: v.deposit_amount !== void 0 ? Number(v.deposit_amount) : 0
	};
}
function readDB() {
	if (typeof window === "undefined") {
		memory ??= fresh();
		return memory;
	}
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) {
			let migratedVehicles = structuredClone(seedVehicles);
			let migratedCustomers = structuredClone(seedCustomers);
			let migratedReservations = structuredClone(seedReservations);
			let migratedAdditionals = structuredClone(seedAdditionals);
			for (const prevKey of PREV_KEYS) {
				const prevRaw = window.localStorage.getItem(prevKey);
				if (prevRaw) {
					try {
						const prevParsed = JSON.parse(prevRaw);
						if (Array.isArray(prevParsed.vehicles) && prevParsed.vehicles.length > 0) migratedVehicles = seedVehicles.map((seedV) => {
							const userV = prevParsed.vehicles?.find((v) => v.id === seedV.id);
							if (!userV) return normalizeVehicle(seedV);
							return normalizeVehicle({
								...seedV,
								...userV,
								category: userV.category === "Sedan" ? "Sedã" : userV.category || seedV.category,
								cover_image: userV.cover_image || seedV.cover_image,
								images: userV.images && userV.images.length > 0 ? userV.images : seedV.images,
								is_illustrative_image: userV.cover_image ? false : seedV.is_illustrative_image,
								fleet_quantity: userV.fleet_quantity !== void 0 ? userV.fleet_quantity : seedV.fleet_quantity ?? 1,
								deposit_amount: userV.deposit_amount !== void 0 ? userV.deposit_amount : seedV.deposit_amount ?? 0
							});
						});
						if (Array.isArray(prevParsed.customers) && prevParsed.customers.length > 0) migratedCustomers = prevParsed.customers;
						if (Array.isArray(prevParsed.reservations) && prevParsed.reservations.length > 0) migratedReservations = prevParsed.reservations;
						if (Array.isArray(prevParsed.additionals) && prevParsed.additionals.length > 0) migratedAdditionals = prevParsed.additionals;
					} catch {}
					break;
				}
			}
			for (const k of PREV_KEYS) window.localStorage.removeItem(k);
			const initial = {
				vehicles: migratedVehicles.map(normalizeVehicle),
				customers: migratedCustomers,
				reservations: migratedReservations,
				additionals: migratedAdditionals
			};
			window.localStorage.setItem(KEY, JSON.stringify(initial));
			return initial;
		}
		const parsed = JSON.parse(raw);
		const vehiclesWithPhotos = (parsed.vehicles ?? []).map((v) => {
			const match = seedVehicles.find((s) => s.id === v.id);
			let item = { ...v };
			if (match && (!item.images || item.images.length === 0)) item = {
				...item,
				cover_image: item.cover_image || match.cover_image,
				images: match.images,
				is_illustrative_image: item.cover_image ? false : match.is_illustrative_image
			};
			return normalizeVehicle(item);
		});
		return {
			vehicles: vehiclesWithPhotos.length > 0 ? vehiclesWithPhotos : structuredClone(seedVehicles),
			customers: parsed.customers ?? structuredClone(seedCustomers),
			reservations: parsed.reservations ?? structuredClone(seedReservations),
			additionals: Array.isArray(parsed.additionals) && parsed.additionals.length > 0 ? parsed.additionals : structuredClone(seedAdditionals)
		};
	} catch {
		return fresh();
	}
}
function writeDB(db) {
	memory = db;
	if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(db));
}
var uid$1 = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
var isRemoteEnabled = () => isSupabaseConfigured && Boolean(supabase);
var ACTIVE_STATUSES = [
	"pendente",
	"confirmada",
	"em_andamento"
];
var uid = uid$1;
function overlaps(aStart, aEnd, bStart, bEnd) {
	return aStart <= bEnd && aEnd >= bStart;
}
function genCode() {
	return `SM${Math.floor(1e5 + Math.random() * 9e5)}`;
}
async function listVehicles() {
	if (isRemoteEnabled()) {
		const { data, error } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false });
		if (error) throw error;
		return data ?? [];
	}
	return readDB().vehicles;
}
async function getVehicle(id) {
	if (isRemoteEnabled()) {
		const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).maybeSingle();
		if (error) throw error;
		return data ?? null;
	}
	return readDB().vehicles.find((v) => v.id === id) ?? null;
}
async function saveVehicle(input) {
	if (isRemoteEnabled()) {
		if (input.id) {
			const { id, created_at: _created, ...payload } = input;
			const { data, error } = await supabase.from("vehicles").update(payload).eq("id", id).select().single();
			if (error) throw error;
			return data;
		}
		const { id: _ignored, created_at: _created2, ...payload } = input;
		const { data, error } = await supabase.from("vehicles").insert(payload).select().single();
		if (error) throw error;
		return data;
	}
	const db = readDB();
	if (input.id) {
		const index = db.vehicles.findIndex((v) => v.id === input.id);
		const current = db.vehicles[index];
		if (index < 0 || !current) throw new Error("Veículo não encontrado");
		const updated = {
			...current,
			...input,
			fleet_quantity: input.fleet_quantity !== void 0 ? Number(input.fleet_quantity) : current.fleet_quantity ?? 1,
			deposit_amount: input.deposit_amount !== void 0 ? Number(input.deposit_amount) : current.deposit_amount
		};
		db.vehicles[index] = updated;
		writeDB(db);
		return updated;
	}
	const created = {
		id: uid("v"),
		name: input.name,
		brand: input.brand,
		model: input.model,
		category: input.category,
		transmission: input.transmission,
		fuel: input.fuel,
		passengers: input.passengers ?? null,
		doors: input.doors ?? null,
		luggage: input.luggage ?? null,
		daily_rate: input.daily_rate ?? 0,
		deposit_amount: input.deposit_amount !== void 0 ? Number(input.deposit_amount) : void 0,
		fleet_quantity: input.fleet_quantity !== void 0 ? Math.max(1, Number(input.fleet_quantity)) : 1,
		color: input.color,
		color_hex: input.color_hex,
		available_additionals: input.available_additionals ?? [],
		status: input.status ?? "disponivel",
		images: input.images ?? [],
		cover_image: input.cover_image,
		is_illustrative_image: input.is_illustrative_image ?? false,
		features: input.features ?? [],
		description: input.description ?? "",
		plate: input.plate ?? null,
		year: input.year ?? null,
		engine: input.engine,
		active: input.active !== void 0 ? input.active : true,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	db.vehicles.unshift(created);
	writeDB(db);
	return created;
}
async function deleteVehicle(id) {
	if (isRemoteEnabled()) {
		const { error } = await supabase.from("vehicles").delete().eq("id", id);
		if (error) throw error;
		return;
	}
	const db = readDB();
	db.vehicles = db.vehicles.filter((v) => v.id !== id);
	writeDB(db);
}
async function setVehicleActive(id, active) {
	if (isRemoteEnabled()) {
		const { error } = await supabase.from("vehicles").update({ active }).eq("id", id);
		if (error) throw error;
		return;
	}
	const db = readDB();
	db.vehicles = db.vehicles.map((v) => v.id === id ? {
		...v,
		active
	} : v);
	writeDB(db);
}
async function listReservations() {
	if (isRemoteEnabled()) {
		const { data, error } = await supabase.from("reservations").select("*").order("start_date", { ascending: true });
		if (error) throw error;
		return data ?? [];
	}
	return [...readDB().reservations].sort((a, b) => a.start_date.localeCompare(b.start_date));
}
/** Reservas ativas que conflitam com o período informado. */
async function conflictingReservations(vehicleId, start, end, ignoreId) {
	if (isRemoteEnabled()) {
		let query = supabase.from("reservations").select("*").eq("vehicle_id", vehicleId).in("status", ACTIVE_STATUSES).lte("start_date", end).gte("end_date", start);
		if (ignoreId) query = query.neq("id", ignoreId);
		const { data, error } = await query;
		if (error) throw error;
		return data ?? [];
	}
	return readDB().reservations.filter((r) => {
		if (r.id === ignoreId) return false;
		if (r.vehicle_id !== vehicleId) return false;
		if (!ACTIVE_STATUSES.includes(r.status)) return false;
		return overlaps(r.start_date, r.end_date, start, end);
	});
}
/**
* Controle de Disponibilidade e Estoque da Frota:
* Verifica quantas unidades existem na frota para o veículo e quantas já estão reservadas
* no período solicitado, garantindo que se houver 2 unidades e 1 reservada, a outra continua disponível.
*/
async function getVehicleAvailability(vehicleId, start, end, ignoreReservationId) {
	const vehicle = await getVehicle(vehicleId);
	if (!vehicle) return {
		isAvailable: false,
		availableUnits: 0,
		totalUnits: 0,
		reservedUnits: 0
	};
	const totalUnits = Math.max(1, vehicle.fleet_quantity ?? 1);
	if (!vehicle.active || vehicle.status === "manutencao") return {
		isAvailable: false,
		availableUnits: 0,
		totalUnits,
		reservedUnits: 0
	};
	if (!start || !end) {
		const isAvail = vehicle.status === "disponivel";
		return {
			isAvailable: isAvail,
			availableUnits: isAvail ? totalUnits : 0,
			totalUnits,
			reservedUnits: isAvail ? 0 : totalUnits
		};
	}
	const reservedUnits = (await conflictingReservations(vehicleId, start, end, ignoreReservationId)).length;
	const availableUnits = Math.max(0, totalUnits - reservedUnits);
	return {
		isAvailable: availableUnits > 0 && vehicle.status !== "manutencao",
		availableUnits,
		totalUnits,
		reservedUnits
	};
}
async function createReservation(input) {
	const vehicle = await getVehicle(input.vehicle_id);
	if (!vehicle) throw new Error("Veículo não encontrado.");
	if (vehicle.status === "manutencao") throw new Error("Este veículo está em manutenção.");
	if (input.end_date < input.start_date) throw new Error("Período de locação inválido.");
	const availability = await getVehicleAvailability(vehicle.id, input.start_date, input.end_date);
	if (!availability.isAvailable) throw new Error(`Todas as unidades deste veículo (${availability.totalUnits}) já estão reservadas para o período solicitado. Por favor, escolha outro modelo ou ajuste as datas.`);
	const days = daysBetween(input.start_date, input.end_date);
	const dailyTotal = days * (vehicle.daily_rate || 0);
	let additionalsTotal = 0;
	const processedAdditionals = (input.additionals || []).map((add) => {
		const cost = add.type === "per_day" ? add.price * days : add.price;
		additionalsTotal += cost;
		return {
			id: add.id,
			name: add.name,
			price: add.price,
			type: add.type,
			total: cost
		};
	});
	const rentalTotal = dailyTotal + additionalsTotal;
	const depositAmount = vehicle.deposit_amount || 0;
	const advancePaymentAmount = input.advance_payment_amount ?? 0;
	const balanceOnPickup = Math.max(0, rentalTotal - advancePaymentAmount);
	const grandTotal = rentalTotal + depositAmount;
	if (isRemoteEnabled()) {
		const { data: customer, error: customerError } = await supabase.from("customers").insert({
			name: input.customer.name,
			email: input.customer.email ? input.customer.email.trim() : null,
			phone: input.customer.phone,
			document: input.customer.document ?? null,
			city: input.customer.city ?? null,
			notes: input.customer.notes ?? null
		}).select().single();
		if (customerError) throw customerError;
		const { data, error } = await supabase.from("reservations").insert({
			vehicle_id: vehicle.id,
			customer_id: customer.id,
			start_date: input.start_date,
			end_date: input.end_date,
			start_time: input.start_time ?? "09:00",
			end_time: input.end_time ?? "09:00",
			pickup_location: input.pickup_location ?? null,
			return_location: input.return_location ?? null,
			days,
			daily_rate: vehicle.daily_rate,
			daily_subtotal: dailyTotal,
			additionals_subtotal: additionalsTotal,
			rental_total: rentalTotal,
			deposit_amount: depositAmount,
			advance_payment_amount: advancePaymentAmount,
			balance_on_pickup: balanceOnPickup,
			total: grandTotal,
			status: "pendente",
			additionals: processedAdditionals,
			payment_status: "pendente_checkout",
			payment_provider: null,
			payment_gateway_note: "Ponto de checkout preparado. Reserva aguardando definição do provedor de pagamento da locadora."
		}).select().single();
		if (error) {
			if (String(error.message).includes("reservations_no_overlap") || String(error.message).includes("Capacidade esgotada")) throw new Error("Todas as unidades deste veículo já estão reservadas para o período solicitado. Por favor, escolha outro modelo ou ajuste as datas.");
			throw error;
		}
		return {
			reservation: data,
			vehicle
		};
	}
	const db = readDB();
	const customer = {
		id: uid("c"),
		name: input.customer.name,
		email: input.customer.email ? input.customer.email.trim() : null,
		phone: input.customer.phone,
		document: input.customer.document ?? null,
		city: input.customer.city ?? null,
		notes: input.customer.notes ?? null,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	const reservation = {
		id: uid("r"),
		code: genCode(),
		vehicle_id: vehicle.id,
		customer_id: customer.id,
		start_date: input.start_date,
		end_date: input.end_date,
		start_time: input.start_time ?? "09:00",
		end_time: input.end_time ?? "09:00",
		pickup_location: input.pickup_location ?? null,
		return_location: input.return_location ?? null,
		days,
		daily_rate: vehicle.daily_rate,
		daily_subtotal: dailyTotal,
		additionals_subtotal: additionalsTotal,
		rental_total: rentalTotal,
		deposit_amount: depositAmount,
		advance_payment_amount: advancePaymentAmount,
		balance_on_pickup: balanceOnPickup,
		total: grandTotal,
		status: "pendente",
		additionals: processedAdditionals,
		payment_status: "pendente_checkout",
		payment_provider: null,
		payment_gateway_note: "Ponto de checkout preparado. Aguardando ativação oficial do gateway do proprietário.",
		notes: null,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	db.customers.unshift(customer);
	db.reservations.unshift(reservation);
	writeDB(db);
	return {
		reservation,
		vehicle
	};
}
async function updateReservationStatus(id, status) {
	if (isRemoteEnabled()) {
		const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
		if (error) throw error;
		return;
	}
	const db = readDB();
	db.reservations = db.reservations.map((r) => r.id === id ? {
		...r,
		status
	} : r);
	writeDB(db);
}
async function deleteReservation(id) {
	if (isRemoteEnabled()) {
		const { error } = await supabase.from("reservations").delete().eq("id", id);
		if (error) throw error;
		return;
	}
	const db = readDB();
	db.reservations = db.reservations.filter((r) => r.id !== id);
	writeDB(db);
}
async function listAdditionals(onlyActive = false) {
	if (isRemoteEnabled()) try {
		let query = supabase.from("additionals").select("*").order("created_at", { ascending: true });
		if (onlyActive) query = query.eq("active", true);
		const { data, error } = await query;
		if (!error && Array.isArray(data) && data.length > 0) return data;
	} catch {}
	const list = readDB().additionals ?? [];
	return onlyActive ? list.filter((a) => a.active) : list;
}
async function saveAdditional(input) {
	if (isRemoteEnabled()) {
		if (input.id) {
			const { id, created_at: _c, ...payload } = input;
			const { data, error } = await supabase.from("additionals").update(payload).eq("id", id).select().single();
			if (error) throw error;
			return data;
		}
		const { id: _ignored, created_at: _c2, ...payload } = input;
		const { data, error } = await supabase.from("additionals").insert(payload).select().single();
		if (error) throw error;
		return data;
	}
	const db = readDB();
	db.additionals = db.additionals ?? [];
	if (input.id) {
		const index = db.additionals.findIndex((a) => a.id === input.id);
		if (index >= 0) {
			const updated = {
				...db.additionals[index],
				...input,
				price: Number(input.price) || 0,
				stock_quantity: input.stock_quantity !== void 0 ? Number(input.stock_quantity) : db.additionals[index].stock_quantity ?? 1
			};
			db.additionals[index] = updated;
			writeDB(db);
			return updated;
		}
	}
	const created = {
		id: input.id || uid("opt"),
		name: input.name,
		description: input.description ?? "",
		price: Number(input.price) || 0,
		type: input.type ?? "per_day",
		stock_quantity: input.stock_quantity !== void 0 ? Number(input.stock_quantity) : 1,
		active: input.active !== void 0 ? input.active : true,
		created_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	db.additionals.push(created);
	writeDB(db);
	return created;
}
async function deleteAdditional(id) {
	if (isRemoteEnabled()) {
		const { error } = await supabase.from("additionals").delete().eq("id", id);
		if (error) throw error;
		return;
	}
	const db = readDB();
	db.additionals = (db.additionals ?? []).filter((a) => a.id !== id);
	writeDB(db);
}
async function setAdditionalActive(id, active) {
	if (isRemoteEnabled()) {
		const { error } = await supabase.from("additionals").update({ active }).eq("id", id);
		if (error) throw error;
		return;
	}
	const db = readDB();
	db.additionals = (db.additionals ?? []).map((a) => a.id === id ? {
		...a,
		active
	} : a);
	writeDB(db);
}
//#endregion
export { getVehicle as a, listVehicles as c, setAdditionalActive as d, setVehicleActive as f, deleteVehicle as i, saveAdditional as l, updateReservationStatus as m, deleteAdditional as n, listAdditionals as o, supabase as p, deleteReservation as r, listReservations as s, createReservation as t, saveVehicle as u };
