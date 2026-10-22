import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { J as CarFront, O as KeyRound, X as CalendarDays, b as MessageCircle, c as Sparkles, r as UserRound } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, d as company, n as PageHero, t as Button } from "./SiteLayout-Do4h_GJx.mjs";
import { t as Reveal } from "./Reveal-8YcVarBR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/como-funciona-CWjPLpe2.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/como-funciona.tsx?tsr-split=component";
var steps = [
	{
		icon: CalendarDays,
		title: "1. Período e local de retirada",
		text: "Informe as datas e horários em que precisará do veículo no Aeroporto Internacional de Fortaleza ou na loja no Meireles."
	},
	{
		icon: CarFront,
		title: "2. Escolha da categoria",
		text: "Navegue pelo catálogo demonstrativo e selecione o grupo de veículos que melhor atende sua viagem (econômico, sedã, SUV ou picape)."
	},
	{
		icon: Sparkles,
		title: "3. Opcionais e estimativa",
		text: "Indique necessidades especiais, como cadeirinha de bebê ou condutor adicional, e visualize a estimativa de diárias sem surpresas."
	},
	{
		icon: UserRound,
		title: "4. Dados de contato básicos",
		text: "Preencha apenas nome, WhatsApp e e-mail. Não solicitamos dados de pagamento nem documentação sensível nesta fase."
	},
	{
		icon: MessageCircle,
		title: "5. Atendimento no WhatsApp",
		text: `Nossa equipe em Fortaleza recebe seu pedido pelo WhatsApp (${company.phoneInternational}), verifica a disponibilidade física da frota e formaliza a proposta personalizada.`
	},
	{
		icon: KeyRound,
		title: "6. Retirada e vistoria",
		text: "No dia e horário combinados, você apresenta CNH e documento válido, realiza a vistoria e inicia sua viagem com segurança."
	}
];
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHero, {
		eyebrow: "Processo Transparente",
		title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Do orçamento à ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "italic text-primary",
			children: "estrada"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 28
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 34,
			columnNumber: 56
		}, this),
		description: "Entenda como funciona o fluxo de locação com a Sol & Mar em Fortaleza: facilidade online com o cuidado de um atendimento humano."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-5xl px-5 pb-24 sm:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
			className: "relative space-y-6 border-l border-border pl-8 sm:pl-12",
			children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				as: "li",
				delay: i * 80,
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "absolute top-6 -left-[2.85rem] grid size-10 place-items-center rounded-full bg-gradient-gold text-primary-foreground shadow-gold sm:-left-[4.1rem] sm:size-12",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(s.icon, { className: "size-5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 41,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 40,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "card-hover rounded-2xl border border-border bg-card p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "eyebrow",
							children: ["Etapa 0", i + 1]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 44,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-2 text-xl font-semibold text-foreground sm:text-2xl",
							children: s.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 45,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: s.text
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 17
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 15
				}, this)]
			}, s.title, true, {
				fileName: _jsxFileName,
				lineNumber: 39,
				columnNumber: 32
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-14 text-center",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				asChild: true,
				variant: "hero",
				size: "xl",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/reserva",
					children: "Solicitar meu orçamento agora"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 52,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 37,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 10
	}, this);
}
//#endregion
export { HowItWorks as component };
