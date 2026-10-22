//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CCcYlxqR.js
var manifest = { "84ab88aa55c05d3c7b749c3a070ecf1807a70ac2bbed8ca16ec9c8639a4a2a34": {
	functionName: "verifyAdminCredentials_createServerFn_handler",
	importer: () => import("./_ssr/server-auth-DU_WGriA.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
