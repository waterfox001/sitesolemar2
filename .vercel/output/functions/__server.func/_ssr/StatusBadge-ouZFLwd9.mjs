import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { u as cn } from "./SiteLayout-Do4h_GJx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-ouZFLwd9.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var VEHICLE_COLOR_PRESETS = [
	{
		label: "Branco",
		hex: "#FFFFFF",
		border: true
	},
	{
		label: "Preto",
		hex: "#111827"
	},
	{
		label: "Prata",
		hex: "#D1D5DB"
	},
	{
		label: "Cinza",
		hex: "#6B7280"
	},
	{
		label: "Azul",
		hex: "#1E40AF"
	},
	{
		label: "Vermelho",
		hex: "#DC2626"
	},
	{
		label: "Prata metálico",
		hex: "#E5E7EB",
		border: true
	},
	{
		label: "Cinza metálico",
		hex: "#4B5563"
	}
];
var VEHICLE_STATUS_LABEL = {
	disponivel: "Disponível",
	reservado: "Reservado",
	em_locacao: "Em locação",
	manutencao: "Manutenção"
};
var RESERVATION_STATUS_LABEL = {
	pendente: "Aguardando confirmação",
	confirmada: "Confirmada",
	em_andamento: "Em andamento",
	concluida: "Concluída",
	cancelada: "Cancelada"
};
var _jsxFileName = "/app/applet/src/components/site/StatusBadge.tsx";
var base = "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.68rem] font-semibold tracking-wide uppercase";
var vehicleTone = {
	disponivel: "border-success/40 bg-success/10 text-success",
	reservado: "border-primary/40 bg-primary/10 text-primary",
	em_locacao: "border-accent/40 bg-accent/10 text-accent",
	manutencao: "border-destructive/40 bg-destructive/10 text-destructive"
};
function VehicleStatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn(base, vehicleTone[status], className),
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "size-1.5 rounded-full bg-current" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 36,
			columnNumber: 7
		}, this), VEHICLE_STATUS_LABEL[status]]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 5
	}, this);
}
//#endregion
export { VEHICLE_COLOR_PRESETS as n, VehicleStatusBadge as r, RESERVATION_STATUS_LABEL as t };
