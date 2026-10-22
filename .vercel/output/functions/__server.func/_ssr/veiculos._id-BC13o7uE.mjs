import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/veiculos._id-BC13o7uE.js
var $$splitComponentImporter = () => import("./veiculos._id-DxEScfDB.mjs");
var Route = createFileRoute("/veiculos/$id")({
	validateSearch: (s) => ({
		...typeof s["inicio"] === "string" ? { inicio: s["inicio"] } : {},
		...typeof s["fim"] === "string" ? { fim: s["fim"] } : {}
	}),
	head: () => ({ meta: [
		{ title: "Detalhes do veículo | Sol & Mar Rent a Car" },
		{
			name: "description",
			content: "Fotos, especificações e diária do veículo. Reserve online."
		},
		{
			property: "og:title",
			content: "Detalhes do veículo | Sol & Mar Rent a Car"
		},
		{
			property: "og:description",
			content: "Fotos, especificações e diária. Reserve online."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
