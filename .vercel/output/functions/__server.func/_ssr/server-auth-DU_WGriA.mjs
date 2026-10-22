import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-BPR289oA.mjs";
import crypto from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/server-auth-DU_WGriA.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Autenticação Administrativa Segura da Sol & Mar Rent a Car.
*
* Executada exclusivamente no ambiente de servidor (Node.js/runtime).
* As credenciais oficiais do proprietário nunca são expostas em bundles do cliente
* nem em arquivos públicos de frontend.
*
* A senha inicial autorizada é validada exclusivamente por comparação de hash SHA-256.
*/
var OWNER_PASSWORD_HASH = "6b4febbbb829331c75bbd78e3622b939f23cc28c73f38d6b777e43195a6028d9";
var AUTHORIZED_EMAILS = ["admn@solemar.com", "admin@solemar.com"];
var verifyAdminCredentials_createServerFn_handler = createServerRpc({
	id: "84ab88aa55c05d3c7b749c3a070ecf1807a70ac2bbed8ca16ec9c8639a4a2a34",
	name: "verifyAdminCredentials",
	filename: "src/lib/server-auth.ts"
}, (opts) => verifyAdminCredentials.__executeServer(opts));
var verifyAdminCredentials = createServerFn({ method: "POST" }).validator((input) => input).handler(verifyAdminCredentials_createServerFn_handler, async ({ data }) => {
	const inputEmail = (data?.email || "").trim().toLowerCase();
	const inputPassword = data?.password || "";
	const hash = crypto.createHash("sha256").update(inputPassword).digest("hex");
	if (!AUTHORIZED_EMAILS.includes(inputEmail) || !(hash === OWNER_PASSWORD_HASH)) throw new Error("E-mail ou senha inválidos.");
	return {
		authenticated: true,
		email: inputEmail,
		timestamp: Date.now()
	};
});
//#endregion
export { verifyAdminCredentials_createServerFn_handler };
