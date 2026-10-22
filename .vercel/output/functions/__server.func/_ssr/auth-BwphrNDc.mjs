import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { p as isSupabaseConfigured } from "./SiteLayout-Do4h_GJx.mjs";
import { p as supabase } from "./api-CTawiNw0.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CCcYlxqR.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-BPR289oA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BwphrNDc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var verifyAdminCredentials = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("84ab88aa55c05d3c7b749c3a070ecf1807a70ac2bbed8ca16ec9c8639a4a2a34"));
var _jsxFileName = "/app/applet/src/lib/auth.tsx";
var SESSION_KEY = "solemar.admin.session";
var OWNER_PASSWORD_HASH = "6b4febbbb829331c75bbd78e3622b939f23cc28c73f38d6b777e43195a6028d9";
var AUTHORIZED_EMAILS = ["admn@solemar.com", "admin@solemar.com"];
async function computeSha256(text) {
	if (typeof window !== "undefined" && window.crypto?.subtle) {
		const data = new TextEncoder().encode(text);
		const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
		return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
	}
	return "";
}
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [email, setEmail] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let active = true;
		if (supabase) {
			supabase.auth.getSession().then(({ data }) => {
				if (!active) return;
				setEmail(data.session?.user.email ?? null);
				setLoading(false);
			});
			const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
				setEmail(session?.user.email ?? null);
			});
			return () => {
				active = false;
				sub.subscription.unsubscribe();
			};
		}
		setEmail(window.localStorage.getItem(SESSION_KEY));
		setLoading(false);
		return () => {
			active = false;
		};
	}, []);
	const signIn = (0, import_react.useCallback)(async (mail, password) => {
		const normalizedEmail = (mail || "").trim().toLowerCase();
		if (supabase) try {
			const { error } = await supabase.auth.signInWithPassword({
				email: normalizedEmail,
				password
			});
			if (!error) return;
		} catch {}
		try {
			const res = await verifyAdminCredentials({ data: {
				email: normalizedEmail,
				password
			} });
			if (res && res.authenticated) {
				window.localStorage.setItem(SESSION_KEY, res.email);
				setEmail(res.email);
				return;
			}
		} catch {
			const hash = await computeSha256(password);
			if (AUTHORIZED_EMAILS.includes(normalizedEmail) && hash === OWNER_PASSWORD_HASH) {
				window.localStorage.setItem(SESSION_KEY, normalizedEmail);
				setEmail(normalizedEmail);
				return;
			}
			throw new Error("E-mail ou senha inválidos.");
		}
		throw new Error("E-mail ou senha inválidos.");
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		if (supabase) try {
			await supabase.auth.signOut();
		} catch {}
		window.localStorage.removeItem(SESSION_KEY);
		setEmail(null);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		email,
		loading,
		mode: isSupabaseConfigured ? "supabase" : "server",
		signIn,
		signOut
	}), [
		email,
		loading,
		signIn,
		signOut
	]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthContext.Provider, {
		value,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 131,
		columnNumber: 10
	}, this);
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth precisa estar dentro de AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
