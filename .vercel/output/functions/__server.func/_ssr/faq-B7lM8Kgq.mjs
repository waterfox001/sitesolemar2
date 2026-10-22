import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { b as MessageCircle } from "../_libs/lucide-react.mjs";
import { a as SiteLayout, d as company, n as PageHero, t as Button, x as whatsappLink } from "./SiteLayout-Do4h_GJx.mjs";
import { a as FAQS, i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./faq-data-BaLuDvz4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-B7lM8Kgq.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/faq.tsx?tsr-split=component";
function Faq() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SiteLayout, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageHero, {
		eyebrow: "Tire Suas Dúvidas",
		title: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: ["Perguntas ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "italic text-primary",
			children: "frequentes"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 10,
			columnNumber: 23
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 9,
			columnNumber: 52
		}, this),
		description: "Respostas claras sobre documentação, retirada no aeroporto e regras de locação da Sol & Mar em Fortaleza."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 9,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "mx-auto max-w-3xl px-5 pb-24 sm:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Accordion, {
			type: "single",
			collapsible: true,
			className: "glass-panel rounded-3xl px-6 sm:px-8",
			children: FAQS.map((faq, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem, {
				value: `item-${i}`,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger, {
					className: "py-6 text-left text-base font-medium text-foreground hover:no-underline",
					children: faq.question
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 15,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent, {
					className: "pb-6 leading-relaxed text-sm text-muted-foreground",
					children: faq.answer
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 18,
					columnNumber: 15
				}, this)]
			}, faq.question, true, {
				fileName: _jsxFileName,
				lineNumber: 14,
				columnNumber: 33
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 13,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "glass-panel mt-12 rounded-3xl p-6 text-center sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-lg font-semibold text-foreground",
					children: "Ainda tem alguma dúvida?"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-xs text-muted-foreground sm:text-sm",
					children: "Nossa equipe em Fortaleza está à disposição para tirar qualquer dúvida e preparar seu orçamento sob medida."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "hero",
						size: "lg",
						className: "gap-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: whatsappLink("Olá! Tenho uma dúvida sobre as condições de locação da Sol & Mar."),
							target: "_blank",
							rel: "noreferrer",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, { className: "size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 33,
									columnNumber: 17
								}, this),
								"Falar com a equipe no WhatsApp (",
								company.phoneInternational,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 32,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 30,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 24,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 12,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 8,
		columnNumber: 10
	}, this);
}
//#endregion
export { Faq as component };
