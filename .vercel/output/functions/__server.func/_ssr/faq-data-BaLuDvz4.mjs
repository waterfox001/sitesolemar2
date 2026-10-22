import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as AccordionTrigger$1, i as AccordionItem$1, n as AccordionContent$1, r as AccordionHeader, t as Accordion$1 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { G as ChevronDown } from "../_libs/lucide-react.mjs";
import { u as cn } from "./SiteLayout-Do4h_GJx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-data-BaLuDvz4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ui/accordion.tsx";
var Accordion = Accordion$1;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem$1, {
	ref,
	className: cn("border-b", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 13,
	columnNumber: 3
}, void 0));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionHeader, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger$1, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 31,
			columnNumber: 7
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
AccordionTrigger.displayName = AccordionTrigger$1.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent$1, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("pb-4 pt-0", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 46,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName,
	lineNumber: 41,
	columnNumber: 3
}, void 0));
AccordionContent.displayName = AccordionContent$1.displayName;
var FAQS = [
	{
		question: "Quais documentos são necessários para alugar um veículo?",
		answer: "É necessário apresentar CNH válida (Carteira Nacional de Habilitação) do condutor principal, documento de identidade oficial com foto (RG ou CPF) e comprovante de residência recente. Requisitos específicos de tempo de habilitação são confirmados no atendimento."
	},
	{
		question: "Qual é a idade mínima exigida?",
		answer: "A idade mínima padrão para locação costuma ser de 21 anos com CNH definitiva, mas condições especiais ou taxas para condutores jovens podem ser consultadas diretamente com nossa equipe comercial."
	},
	{
		question: "Como funciona a retirada e entrega no Aeroporto de Fortaleza?",
		answer: "A opção de entrega ou retirada no Aeroporto Internacional de Fortaleza (Pinto Martins) é uma facilidade disponível para simulação. Ao solicitar seu orçamento, informe os detalhes do voo para que nossa equipe avalie e confirme a logística de atendimento adequada à sua chegada."
	},
	{
		question: "Quais são as formas de pagamento aceitas?",
		answer: "As condições comerciais, formas de pagamento (como Pix e cartões de crédito) e eventuais facilidades de parcelamento são alinhadas na proposta de orçamento formalizada pela equipe."
	},
	{
		question: "É exigida caução ou pré-autorização no cartão?",
		answer: "Sim, como prática padrão no setor de locação de veículos, é solicitada uma garantia caução durante o período do contrato. O valor varia conforme a categoria do veículo e é liberado após a devolução e vistoria."
	},
	{
		question: "A quilometragem é livre ou controlada?",
		answer: "Trabalhamos com opções de diárias com quilometragem livre ou pacotes específicos para viagens intermunicipais pelo Ceará. A melhor modalidade para sua rota será detalhada no orçamento."
	},
	{
		question: "Como solicito o cancelamento ou alteração de datas?",
		answer: "Basta entrar em contato com nossa equipe pelo WhatsApp oficial informando o código da sua solicitação ou seu nome. Pedimos que avise com antecedência para reorganizarmos a disponibilidade do veículo."
	},
	{
		question: "Como funcionam os valores das diárias e opcionais?",
		answer: "A diária básica considera 24 horas a partir do horário de retirada, com tolerância combinada em contrato. Os valores apresentados no site são simulações demonstrativas; o valor exato e a inclusão de opcionais (como cadeirinha ou motorista extra) são confirmados na proposta final."
	},
	{
		question: "Posso devolver o carro em outro local diferente da retirada?",
		answer: "Sim, devoluções em locais alternativos em Fortaleza ou na região metropolitana podem ser combinadas previamente com nossa central de atendimento, sujeitas à taxa de retorno conforme a localidade."
	},
	{
		question: "O que acontece após enviar a solicitação pelo site?",
		answer: "Nossa equipe em Fortaleza recebe os dados preenchidos, verifica a disponibilidade física da categoria desejada e envia a confirmação completa da cotação no seu WhatsApp com rapidez."
	}
];
//#endregion
export { FAQS as a, AccordionTrigger as i, AccordionContent as n, AccordionItem as r, Accordion as t };
