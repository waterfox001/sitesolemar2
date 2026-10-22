import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reserva-Dl_Kq-GN.js
var $$splitComponentImporter = () => import("./reserva-ClRkzK5R.mjs");
var Route = createFileRoute("/reserva")({
	validateSearch: (s) => ({
		...typeof s["inicio"] === "string" ? { inicio: s["inicio"] } : {},
		...typeof s["fim"] === "string" ? { fim: s["fim"] } : {},
		...typeof s["horaInicio"] === "string" ? { horaInicio: s["horaInicio"] } : {},
		...typeof s["horaFim"] === "string" ? { horaFim: s["horaFim"] } : {},
		...typeof s["localRetirada"] === "string" ? { localRetirada: s["localRetirada"] } : {},
		...typeof s["localDevolucao"] === "string" ? { localDevolucao: s["localDevolucao"] } : {},
		...typeof s["categoria"] === "string" ? { categoria: s["categoria"] } : {},
		...typeof s["veiculo"] === "string" ? { veiculo: s["veiculo"] } : {}
	}),
	head: () => ({ meta: [
		{ title: "Solicitar Orçamento de Locação | Sol & Mar Rent a Car" },
		{
			name: "description",
			content: "Simule e solicite seu orçamento de aluguel de veículo em Fortaleza. Escolha datas, horários e categoria sem burocracia."
		},
		{
			property: "og:title",
			content: "Solicitar Orçamento | Sol & Mar Rent a Car"
		},
		{
			property: "og:description",
			content: "Simule e envie seu pedido de orçamento de locação de veículo pelo WhatsApp."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
