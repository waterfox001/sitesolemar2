import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { S as MapPin, Z as Building2, b as MessageCircle, g as Phone, z as Clock } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, d as company, n as PageHero, t as Button, x as whatsappLink } from "./SiteLayout-Do4h_GJx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contato-XxrvfLkx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/contato.tsx?tsr-split=component";
var field = "h-12 w-full rounded-xl border border-input bg-surface px-4 text-sm outline-none focus:border-primary text-foreground";
function Contact() {
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		message: ""
	});
	const items = [
		{
			icon: Phone,
			label: "Telefone / WhatsApp Comercial",
			value: `${company.phone} (${company.phoneInternational})`,
			note: "Atendimento direto para orçamentos e dúvidas"
		},
		{
			icon: Instagram,
			label: "Instagram Oficial",
			value: "@solemarrentacar",
			note: "Acompanhe nossa frota e dicas de Fortaleza"
		},
		{
			icon: MapPin,
			label: "Endereço Comercial",
			value: company.commercialAddress,
			note: "Sede administrativa (consulte locais de entrega e retirada)"
		},
		{
			icon: Clock,
			label: "Horário de Atendimento",
			value: company.hours,
			note: "Horário padrão comercial da equipe"
		},
		{
			icon: Building2,
			label: "Dados Cadastrais Oficiais",
			value: `${company.legalName} · CNPJ: ${company.cnpj}`,
			note: "Empresa constituída e registrada desde 2013"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHero, {
		eyebrow: "Canais de Atendimento",
		title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Vamos conversar sobre a sua ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "italic text-primary",
			children: "locação"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 40,
			columnNumber: 41
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 39,
			columnNumber: 56
		}, this),
		description: "Fale diretamente com nossa equipe em Fortaleza por WhatsApp ou telefone para tirar dúvidas ou planejar sua viagem com total transparência."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 39,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto grid max-w-[1536px] w-full gap-8 px-5 pb-24 sm:px-8 lg:px-12 xl:px-16 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-3.5",
			children: items.map((i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex gap-4 rounded-2xl border border-border bg-card p-4.5 sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "grid size-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(i.icon, { className: "size-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 46,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 45,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: i.label
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 49,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "break-words font-semibold text-foreground text-sm sm:text-base mt-0.5",
							children: i.value
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 50,
							columnNumber: 17
						}, this),
						i.note ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[0.68rem] text-muted-foreground/80 mt-0.5",
							children: i.note
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 53,
							columnNumber: 27
						}, this) : null
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 15
				}, this)]
			}, i.label, true, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 27
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 43,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			className: "glass-panel flex flex-col gap-4 rounded-3xl p-6 sm:p-8",
			onSubmit: (e) => {
				e.preventDefault();
				const message = form.name.trim() ? `Olá! Sou ${form.name.trim()}. ${form.message.trim()}` : form.message.trim();
				window.open(whatsappLink(message), "_blank");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-semibold sm:text-2xl text-foreground",
					children: "Envie uma mensagem direta"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground leading-relaxed",
					children: "Preencha seus dados para iniciar a conversa no WhatsApp oficial da Sol & Mar Rent a Car."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
					required: true,
					placeholder: "Seu nome completo",
					className: field,
					value: form.name,
					onChange: (e) => setForm({
						...form,
						name: e.target.value
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
					required: true,
					placeholder: "Como podemos te ajudar? (Datas desejadas, categoria de interesse, opções de retirada em Fortaleza...)",
					rows: 5,
					className: "w-full rounded-xl border border-input bg-surface p-4 text-sm outline-none focus:border-primary text-foreground",
					value: form.message,
					onChange: (e) => setForm({
						...form,
						message: e.target.value
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "submit",
					variant: "hero",
					size: "xl",
					className: "gap-2 mt-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "size-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 13
					}, this), "Enviar pelo WhatsApp"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 78,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-[0.68rem] text-muted-foreground text-center",
					children: [
						"* O envio da mensagem abrirá o WhatsApp com o número oficial (",
						company.phoneInternational,
						")."
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 58,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 42,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 38,
		columnNumber: 10
	}, this);
}
//#endregion
export { Contact as component };
